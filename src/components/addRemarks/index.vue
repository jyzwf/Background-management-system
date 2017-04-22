<template lang="jade">
	modal(modalTitle="修改备注",:hide='hideAddModal')
			form.form-horizontal(role="form",slot='modal-body')
				.form-group
					label.col-sm-2.control-label(for='company_remark_modal') 备注
					.col-sm-10
						textarea.form-control#company_remark_modal('rows'="2",v-model='modalRemark',placeholder='可选')
			button.btn.btn-primary(data-dismiss="modal",type="button",slot='modal-btn',@click='changeNote(null,nowItem,true,modalRemark)') 保存
			
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
			nowRemark:{
				type:String,
				default:''
			},
			changeNote:{
				type:Function,
				default:''
			},
			nowItem:{
				type:Object,
				default:null
			}
		},
		data(){
			return {
				modalRemark:''
			}
		},
		components:{
			modal
		},
		mounted(){
			this.modalRemark = this.nowRemark
		}
	}
</script>