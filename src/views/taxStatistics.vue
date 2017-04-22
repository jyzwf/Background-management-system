<template lang="jade">
	.tax_statistics
		<!-- 搜索条件 -->
		form.form-inline.margin-bottom-20.text-left(role='form')
			.form-group.margin-right-16
				label.margin-right-16 请选择搜索类型
				select.form-control(v-model='selectType')
					option(value='s_month') 按月份筛选
					option(value='s_person') 按负责人筛选
			<!-- 月份筛选 -->
			.form-group.margin-right-16(v-show='selectType=="s_month"')
				select.form-control(v-model='selectMonth')
					option(v-for='m in months',:value='m') {{m}}
			<!-- 负责人筛选 -->
			.form-group.margin-right-16(v-show='selectType=="s_person"')
				select.form-control(v-model='selectManager')
					option(value='',seleted disabled) 请选择
					option(v-for='(s,idx) in chargerList',:value='s.realname') {{s.realname}}
			.form-group
				button.btn.btn-info(@click='getStatisticalList') 搜索

		<!-- 搜索结果的统计 -->
		.panel.panel-info
			.panel-heading 统计
			.panel-body 本月应申报企业<b>{{ statisticalCompany.total_company }}</b>家，国税<b>{{ statisticalCompany.count_country }}</b>家，地税<b>{{ statisticalCompany.count_local }}</b>家

		<!-- 搜索结果 -->
		.search_result
			table.table.table-bordered.table-hover
				thead
					tr
						th.text-center 序号
						th.text-center 企业名
						th.text-center 国税
						th.text-center 地税
						th.text-center 负责人
						th.text-center 备注
				tbody
					tr(v-for='(s,idx) in statisticalList')
						td.text-center {{idx+1}}
						td.text-center
							a(@click.prevent='toggleModal(2,s._id)') {{s.company}}
						td.text-center
							img(src='../assets/ic_check.svg',v-if='s.is_country')
							img(src='../assets/ic_remove.svg',v-if='!s.is_country')
						td.text-center
							img(src='../assets/ic_check.svg',v-if='s.is_local')
							img(src='../assets/ic_remove.svg',v-if='!s.is_local')
						td.text-center {{s.manager}}
						td.text-center {{s.note?s.note:''}}
							img(src='../assets/ic_remove.svg',v-if='!s.note')
		<!-- 分页 -->
		pagination
		addCompany(:hideAddModal='toggleModal',v-if='modal')

</template>

<style lang='scss' scoped>
	
</style>

<script type="text/javascript">
import pagination from 'components/pagination'
import addCompany from 'components/addCompany'
import qs from 'qs'
import axios from 'axios'


	export default{
		data(){
			return {
				//月份
				months:[],
				//选择的月份
				selectMonth:'',
				//筛选的类型
				selectType:'s_month',
				//选择负责人
				selectManager:'',
				//统计列表
				statisticalList:[],
				statisticalCompany:{},
				
			}
		},
		components:{
			pagination,
			addCompany
		},
		computed:{
			modal(){
				return this.$store.state.companyManage.c_modal_state
			},
			chargerList(){
				return this.$store.state.companyManage.chargerList
			},
			statisticalShowWay(){	//搜索方式
				if(this.selectType=='s_month'){
					return {
						url:'taxstatistics/list/index',
						sendData:{
							time:this.selectMonth
						}
					}
				}else{
					return {
						url:'taxstatistics/list/manager',
						sendData:{
							manager:this.selectManager
						}
						
					}
				}
			}
		},
		methods:{
			//显示隐藏模态框
			toggleModal(state,id){
				this.$store.dispatch('CHANGE_COMPANY_STATE',{
					state,
					id
				})
				// this.$store.dispatch('CHANGE_COMPANY_STATE',state);

				// if(state==2){
				// 	this.$store.dispatch('GET_COMPANY_DEDAIL',id)
				// }
			},

			//删除企业
			delectCompany(i,c){
				let t = confirm('你确认要删除吗?');
				if(t){
					
				}
			},
			
			//获取账簿的时间
			getTaxBooks(){
				axios.get(`${this.$store.state.baseData.baseUrl}taxstatistics/list/book`)
				.then((res)=>{
					if(res.data.code == 0){
						this.months = [...res.data.result];
						this.getNowData();
						this.getStatisticalList();
					}
					
				},(err)=>{
					alert('服务器开小差啦')
				})
			},


			getStatisticalList(page){
				axios.post(`${this.$store.state.baseData.baseUrl+this.statisticalShowWay.url}`,qs.stringify({
					...this.statisticalShowWay.sendData
				}))
				.then((res)=>{
					if(res.data.code==200){
						this.statisticalList = res.data.result.list;
						this.statisticalCompany = {...res.data.result.count};
						
					}
					
					// this.totalPage = +res.data.result.total_page
				},(err)=>{
					alert('服务器开小差啦')
				})
			},

			addZero(num){
				return num<10?'0'+num:num
			},

			//获取当前的时间格式
			getNowData(){
				let d = new Date();
				this.selectMonth = `${d.getFullYear()}-${this.addZero(d.getMonth()+1)}`;
			}
		},
		mounted(){
			this.getTaxBooks();
			this.$store.dispatch('GET_CHARGER_LIST');
		}
	}
</script>

