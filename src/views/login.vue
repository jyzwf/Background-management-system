<template lang="jade">
	.panel.panel-info.login-panel
		.panel-heading.text-center 登录
		.panel-body
			.form-horizontal
				.form-group
					label.col-sm-2.control-label(for='login-name') 登入名
					.col-sm-10
						input.form-control#login-name(placeholder='请输入用户名',v-model='loginData.tel')
				.form-group
					label.col-sm-2.control-label(for='login-psd') 密码
					.col-sm-10
						input.form-control#login-psd(placeholder='请输入密码',type='password',v-model='loginData.password')
				.form-group
					.col-sm-10.col-sm-offset-2
						button.btn.btn-success.btn-block(@click='toLogin(1)') 登录

</template>


<style lang="scss" scoped>
	.login-panel{
		width:400px;
		position: fixed;
		top:50%;
		left:50%;
		transform:translate3d(-50%,-50%,0);

		label{
			white-space: nowrap;
		}
	}
</style>

<script type="text/javascript">
import operatorCookieIns from 'components/common/operateCookie';

	export default{
		computed:{
			loginData(){
				return this.$store.state.baseData.login
			},
		},
		// beforeCreate(){
		// 	this.$store.commit('logout');
		// },
		methods:{
			toLogin(n){
				localStorage.navIdx = 0;
				this.$store.dispatch('GET_LOGIN',n).then(data=>{
					
					this.$router.push('/')
				}).catch((err)=>{
					alert('登录名密码错误，请核对后输入')
				});
			}
		},
		mounted(){
			//判断是否有token,有就直接登录
			if (operatorCookieIns.getCookie('accountT')) {
				this.toLogin(2);
			}
		}
	}
</script>