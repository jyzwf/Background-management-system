<template lang="jade">
	.book_management
		<!-- 企业统计 -->
		h2.text-right.margin-bottom-20
			button.btn.btn-sm.btn-success.margin-right-16(@click='toggleModal(1)') 新增企业
			button.btn.btn-sm.btn-success(@click='toggleAddCompanyTypeModal(1)') 新增公司类型

		<!-- 搜索结果 -->
		.search_result
			table.table.table-bordered.table-hover
				thead
					tr
						th.text-center 序号
						th.text-center 名称
						th.text-center 委托人
						th.text-center 负责人
						th.text-center 联系方式
						th.text-center 类型
						th.text-center 
				tbody
					tr(v-for='(c,idx) in compagies')
						td.text-center {{idx +1}}
						td.text-center {{c.name}}
						td.text-center {{c.boss}}
						td.text-center {{c.manager}}
						td.text-center {{c.tel}}
						td.text-center {{c.type=='未声明'||c.type==''?'':c.type}}
							img(src='../assets/ic_remove.svg',v-if="c.type=='未声明'||c.type==''")

						td.text-center
							button.btn.btn-info.btn-xs(@click='toggleModal(2,c._id)') 管理
		pagination(:allPage='totalPage')
		<!-- 新增企业的modal -->
		addCompany(:hideAddModal='toggleModal',v-if='modal',:reloadCompany='getCompanies')
		addCompanyType(:hideAddModal='toggleAddCompanyTypeModal',v-if='addCompanyTypeModal')

</template>

<script type="text/javascript">
	import addCompany from 'components/addCompany'
	import addCompanyType from 'components/addCompanyType'
	import pagination from 'components/pagination'
	import qs from 'qs'
	import axios from 'axios'

	export default{
		data(){
			return {
				mTitle:'',
				compagies:[],
				totalPage:1,
				//添加公司信息模态框是否出现
				addCompanyTypeModal:false,
			}
		},
		components:{
			addCompany,
			pagination,
			addCompanyType
		},
		computed:{
			modal(){
				return this.$store.state.companyManage.c_modal_state
			}
		},
		methods:{
			//显示隐藏模态框
			toggleModal(state,id){

				this.$store.dispatch('CHANGE_COMPANY_STATE',{
					state,
					id
				})
				
				// if(state==2){
				// 	this.$store.dispatch('GET_COMPANY_DEDAIL',id)
				// }
			},
			toggleAddCompanyTypeModal(state){
				this.addCompanyTypeModal = state==1;
			},
			//删除企业
			delectCompany(i,c){
				let t = confirm('你确认要删除吗?');
				if(t){
					
				}
			},
			getCompanies(page){
				axios.post(`${this.$store.state.baseData.baseUrl}company/list`,qs.stringify({
					page
				}))
				.then((res)=>{
					if(res.data.code==200){
						this.compagies = res.data.result.company_result;
						this.totalPage = +res.data.result.total_page
					}
				},(err)=>{
					alert('服务器开小差啦')
				})
			}
		},
		mounted(){
			this.getCompanies(1);
		}
	}
</script>