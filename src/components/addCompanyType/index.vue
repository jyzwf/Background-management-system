<template lang="jade">
	modal(modalTitle="增加公司类型",:hide='hideAddModal')
			form.form-horizontal(role="form",slot='modal-body')
				.form-group
					label.col-sm-2.control-label(for='add_company_type') 公司类型
					.col-sm-10
						input.form-control#add_company_type(v-model='addType')
			button.btn.btn-primary(data-dismiss="modal",type="button",slot='modal-btn',@click='addCompanyType') 保存
</template>

<script type="text/javascript">
	import modal from 'components/modal'
	import qs from 'qs'
	import axios from 'axios'
	import FormValidate from 'components/common/validate'

	export default{
		props:{
			hideAddModal:{
				type:Function,
				default:null
			},
		},
		data(){
			return {
				addType:''
			}
		},
		components:{
			modal
		},
		methods:{
			addCompanyType(){
				let f = new FormValidate({
					addType:this.addType,
				},{
					addType:'请添加类型'
				}),
				errMsg;

				if( errMsg = f.isRequire()){
					return alert(errMsg);
				}

				axios.post(`${this.$store.state.baseData.baseUrl}type/company`,qs.stringify({
					company_type:this.addType
				}))
				.then((res)=>{
					if(res.data.code==200){
						alert('添加成功');
						this.hideAddModal(0)
					}
				},(err)=>{
					alert('服务器开小差啦')
				})
			}
		},
		mounted(){
			this.modalRemark = this.nowRemark
		}
	}
</script>