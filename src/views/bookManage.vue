<template lang="jade">
	.book_management
		<!-- 返回上一页 -->
		.go-back
			router-link.pull-left(to='/taxManage',exact) 返回
			h2 {{month}}月账簿
		
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
					tr(v-for='(t,idx) in booksCxt')
						td.text-center {{idx+1}}
						td.text-center
							a(@click.prevent='toggleModal(2,t._id)') {{t.company}}
						td.text-center
							button.btn.btn-xs(@click="toggleTaxState('nationalTax',t,false)",:class="{'btn-success':t.is_country,'btn-default':!t.is_country}") {{t.is_country?'已报税':'未报税'}}
						td.text-center
							button.btn.btn-xs(@click="toggleTaxState('localTax',t,false)",:class="{'btn-success':t.is_local,'btn-default':!t.is_local}") {{t.is_local?'已报税':'未报税'}}
						td.text-center 蒋巍
						td.text-center.cursorPointer(@click='toggleRemarkModal(1,t.note,t)') {{t.note?t.note:''}}
							img(src='../assets/ic_remove.svg',v-if='!t.note')
		<!-- 分页 -->
		pagination
		addCompany(:hideAddModal='toggleModal',v-if='modal')
		addRemarks(:hideAddModal='toggleRemarkModal',v-if='remarkModal',:nowRemark='rContent',:changeNote='toggleTaxState',:nowItem = 'changeType.note')
</template>

<style lang="scss" scoped>
	.go-back{
		position: relative;
		a{
			position: absolute;
			top:50%;
			transform:translateY(-50%);
			left:0;
		}
	}
</style>

<script type="text/javascript">
	import addCompany from 'components/addCompany'
	import pagination from 'components/pagination'
	import addRemarks from 'components/addRemarks'
	import qs from 'qs'
	import axios from 'axios'


	export default{
		data(){
			return {
				//备注信息模态框是否出现
				remarkModal:false,
				//当前备注的信息
				rContent:'',
				booksCxt:[],
				changeType:{
					nationalTax:'is_country',
					localTax:'is_local',
					note:null
				}
			}
		},
		components:{
			addCompany,
			pagination,
			addRemarks
		},
		computed:{
			modal(){
				return this.$store.state.companyManage.c_modal_state
			},
			month(){
				return this.$route.params.month
			},
			selfName(){
				return this.$store.state.baseData.login.realname
			}
		},
		methods:{
			//显示隐藏模态框
			toggleModal(state,id){
				this.$store.dispatch('CHANGE_COMPANY_STATE',{
					state,
					id
				})
			},
			//显示隐藏备注模态框
			toggleRemarkModal(state,r,t){
				this.remarkModal = state==1;
				this.rContent = r?r:'';

				this.changeType.note = t?t:null;
			},
			//修改企业的报税类型
			toggleTaxState(type,t,isNote,noteCxt){
				// t[type] = !t[type]
				let sendData = null;
				if(isNote){
					console.log(noteCxt)
					sendData = {note:noteCxt}
				}else{
					sendData = {[this.changeType[type]]:!t[this.changeType[type]]}
				}
				// return ;
				axios.post(`${this.$store.state.baseData.baseUrl}taxstatistics/manage/commit`, qs.stringify({
					manager:this.selfName,
					ts_id:t._id,
					...sendData
				}))
				.then((res) => {
					if (res.data.code == 200) {
						if(!isNote)
							t[this.changeType[type]] = !t[this.changeType[type]]
						else{
							this.toggleRemarkModal(0)
							t.note = noteCxt
						}
					}
				}, (err) => {
					alert('服务器开小差啦')
				})
			},

			//删除企业
			delectCompany(i,c){
				let t = confirm('你确认要删除吗?');
				if(t){
					
				}
			},

			//获取该负责人的账簿列表
			getSelfBooks(){
				axios.post(`${this.$store.state.baseData.baseUrl}taxstatistics/manage/mytax/list`,qs.stringify({
					manager:this.selfName,
					time:this.month
				})).then(res =>{
					if(res.data.code == 200){
						this.booksCxt = Array.isArray(res.data.result)?[...res.data.result]:''
					}
				})
			}

		},
		mounted(){
			this.getSelfBooks();
		}
	}
</script>