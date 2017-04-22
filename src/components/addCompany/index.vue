<template lang="jade">
	modal(modalTitle="企业信息",:hide='hideAddModal')
			form.form-horizontal(role="form",slot='modal-body')
				.form-group
					label.col-sm-2.control-label(for='company_name') 企业名称
					.col-sm-10
						input.form-control#company_name(v-model='companySource.name',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label(for='company_client') 委托人
					.col-sm-10
						input.form-control#company_client(v-model='companySource.boss',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label(for='company_agent') 负责人
					.col-sm-10
						select.form-control#company_charge(v-model='companySource.manager',:disabled='companyState==2')
							option(value='',seleted disabled) 请选择
							option(:value='i.realname',v-for='i in chargerList') {{i.realname}}
				.form-group
					label.col-sm-2.control-label(for='company_tel') 联系方式
					.col-sm-10
						input.form-control#company_tel(type='tel',v-model='companySource.tel',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label(for='tax_num') 税号
					.col-sm-10
						input.form-control#tax_num(type='tel',v-model='companySource.tax_num',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label(for='tax_psw') 报税密码
					.col-sm-10
						input.form-control#tax_psw(type='tel',v-model='companySource.tax_psw',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label 国税/地税
					.col-sm-10.text-left
						label.checkbox-inline
							input(type='checkbox',v-model='companySource.is_country',value="国税",:disabled='companyState==2')
							国税
						label.checkbox-inline
							input(type='checkbox',v-model='companySource.is_local',value="地税",:disabled='companyState==2')
							地税	
				.form-group
					label.col-sm-2.control-label(for='company_address') 地址
					.col-sm-10
						input.form-control#company_address(type='address',v-model='companySource.address',:disabled='companyState==2')
				.form-group
					label.col-sm-2.control-label(for='tax_type') 类型
					.col-sm-10
						select.form-control#tax_type(v-model='companySource.type',:disabled='companyState==2')
							option(value='未声明',seleted disabled) 请选择类型
							option(:value='i.company_type',v-for='i in companyTypeList') {{i.company_type}}
				.form-group
					label.col-sm-2.control-label(for='company_remark') 备注
					.col-sm-10
						textarea.form-control#company_remark('rows'="2",v-model='companySource.note',:disabled='companyState==2',placeholder='可选')
				.form-group(v-if='isDeleteCompany')
					label.col-sm-2.control-label(for='delete_company_permit') 许可密码
					.col-sm-10
						input.form-control#delete_company_permit(type='tel',v-model='delete_company_permit',placeholder='请输入删除口令')
			button.btn.btn-danger(data-dismiss="modal",type="button",slot='modal-btn',@click='deleteCompany',v-if='isTaxStatistics&&companyState==2') {{isDeleteCompany?'确定删除':'删除'}}
			button.btn.btn-primary(data-dismiss="modal",type="button",slot='modal-btn',@click='changeBtn',v-if='isTaxStatistics') {{companyState==1?'保存':'修改'}}
			
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
			reloadCompany:{
				type:Function,
				default:null
			}
		},
		data(){
			return {
				delete_company_permit:'',
				isDeleteCompany:false
			}
		},
		components:{
			modal
		},
		computed:{
			companySource(){
				return this.$store.state.companyManage.companyData
			},
			companyState(){
				// console.log(this.$store.state.companyManage.company_state)
				return this.$store.state.companyManage.company_state
			},
			chargerList(){
				return this.$store.state.companyManage.chargerList
			},
			companyTypeList(){
				return this.$store.state.companyManage.companyTypeList
			},
			isTaxStatistics(){
				return this.$route.name !== 'taxStatistics'
			},
			
		},
		methods:{
			changeBtn(){	//改变保存修改按钮的状态
				this.companyState == 2? this.$store.dispatch('CHANGE_COMPANY_STATE',{state:1}):this.$store.dispatch('SAVE_COMPANY_DATA');
			},
			deleteCompany(){
				//删除公司
				if(!this.isDeleteCompany){
					this.isDeleteCompany = true;
					return
				}
				let t = confirm('你确定删除这家公司吗?');
				if(t){
					this.$store.dispatch('DELETE_COMPANY',this.delete_company_permit).then(()=>this.reloadCompany())
				}
				
			}
		},
		mounted(){
			
		}
	}
</script>