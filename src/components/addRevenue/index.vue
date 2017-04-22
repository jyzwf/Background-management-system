<template lang="jade">
	modal(modalTitle="添加收支",:hide='hideAddModal')
			form.form-horizontal(role="form",slot='modal-body')
				.form-group
					label.col-sm-2.control-label(for='revenue_company') 公司名
					.col-sm-10
						input.form-control#revenue_company(v-model='revenueSource.company',:disabled='revenueState==2')
				.form-group
					label.col-sm-2.control-label(for='revenue_standard') 收费标准
					.col-sm-10
						input.form-control#revenue_standard(v-model='revenueSource.standard',:disabled='revenueState==2')
				.form-group
					label.col-sm-2.control-label(for='revenue_time') 时间
					.col-sm-10
						input.form-control#revenue_time(v-model='revenueSource.time',:disabled='revenueState==2')
				.form-group
					label.col-sm-2.control-label(for='revenue_abstract') 摘要
					.col-sm-10
						textarea.form-control#revenue_abstract('rows'="2",v-model='revenueSource.abstract',:disabled='revenueState==2',placeholder='可选')
				
				.form-group
					label.col-sm-2.control-label(for='revenue_company') 备注
					.col-sm-10
						textarea.form-control#revenue_company('rows'="2",v-model='revenueSource.note',:disabled='revenueState==2',placeholder='可选')
			button.btn.btn-primary(data-dismiss="modal",type="button",slot='modal-btn',@click='changeBtn') 保存
			
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
		components:{
			modal
		},
		computed:{
			revenueSource(){
				return this.$store.state.revenueManage.revenue_data
			},
			revenueState(){
				return this.$store.state.revenueManage.revenue_state
			},
		},
		methods:{
			changeBtn(){	//改变保存修改按钮的状态
				this.$store.dispatch('SAVE_REVENUE_DATA');
			},
			deleteWorker(){
				//删除员工
				
			}
		},
		mounted(){
			
		}
	}
</script>