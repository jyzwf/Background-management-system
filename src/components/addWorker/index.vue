<template lang="jade">
	modal(modalTitle="员工信息",:hide='hideAddModal')
			form.form-horizontal(role="form",slot='modal-body')
				.form-group
					label.col-sm-2.control-label(for='worker_name') 姓名
					.col-sm-10
						input.form-control#company_name(v-model='workerSource.realname',:disabled='workerState==2')
				.form-group
					label.col-sm-2.control-label(for='worker_pwd') 密码
					.col-sm-10
						input.form-control#worker_pwd(v-model='workerSource.password',:disabled='workerState==2',type='password')
				.form-group
					label.col-sm-2.control-label(for='worker_tel') 联系方式
					.col-sm-10
						input.form-control#worker_tel(type='tel',v-model='workerSource.tel',:disabled='workerState==2')
				.form-group
					label.col-sm-2.control-label(for='worker_type') 身份
					.col-sm-10
						select.form-control#worker_type(v-model='workerSource.work',:disabled='workerState==2')
							option(value='',seleted disabled) 请选择
							option(value='老板') 老板
							option(value='职工') 职工
				.form-group
					label.col-sm-2.control-label(for='worker_money') 薪资
					.col-sm-10
						input.form-control#worker_money(type='tel',v-model='workerSource.money',:disabled='workerState==2',placeholder='可选')
				.form-group(v-if='isDeleteWorker')
					label.col-sm-2.control-label(for='delete_worker_permit') 许可密码
					.col-sm-10
						input.form-control#delete_worker_permit(type='tel',v-model='delete_worker_permit',placeholder='请输入删除口令')
			button.btn.btn-danger(data-dismiss="modal",type="button",slot='modal-btn',@click='deleteWorker',v-if='workerState==2') {{isDeleteWorker?'确定删除':'删除'}}
			button.btn.btn-primary(data-dismiss="modal",type="button",slot='modal-btn',@click='changeBtn') {{workerState==1?'保存':'修改'}}
			
</template>

<script type="text/javascript">
	import modal from 'components/modal'
	import qs from 'qs'
	import axios from 'axios'

	export default{
		props:{
			hideAddModal:{
				type:Function,
				default:null
			},
			// modalState:{
			// 	type:Boolean,
			// 	default:false
			// },
		},
		data(){
			return {
				delete_worker_permit:'',
				isDeleteWorker:false
			}
		},
		components:{
			modal
		},
		computed:{
			workerSource(){
				return this.$store.state.workerManage.workerData
			},
			workerState(){
				// console.log(this.$store.state.companyManage.company_state)
				return this.$store.state.workerManage.worker_state
			},
		},
		methods:{
			changeBtn(){	//改变保存修改按钮的状态
				this.workerState == 2? this.$store.dispatch('CHANGE_WORKER_STATE',1):this.$store.dispatch('SAVE_WORKER_DATA');
			},
			deleteWorker(){
				//删除公司
				if(!this.isDeleteWorker){
					this.isDeleteWorker = true;
					return
				}
				let t = confirm('你确定删除这位员工吗?');
				if(t){
					this.$store.dispatch('DELETE_WORKER',this.delete_worker_permit)
				}
				
			}
		},
		mounted(){
			
		}
	}
</script>