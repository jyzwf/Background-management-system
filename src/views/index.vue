<template lang="jade">
	.cm-wrapper
		<!-- 顶部导航 -->
		nav.navbar.navbar-inverse.navbar-fixed-top(role="navigation")
			.container
				.navbar-header
					button.navbar-toggle.collapsed(data-toggle='collapse',data-target='#accounting-nav', @click="toggleCollapse")
						span.sr-only Toggle navigation
						span.icon-bar
						span.icon-bar
						span.icon-bar
					.navbar-brand#cm-company 财茂
				.navbar-brand#logout.pull-right
					a(@click.prevent.stop='logout') 退出
				.navbar-collapse#accounting-nav(:class="{'collapse':collapsed}")
					<!-- 左边导航 -->
					ul.list-group.side-nav
						li.list-group-item(v-for='(l,idx) in navLeft',:class="{active:idx==i}",@click.prevent.stop='toggleNav(idx,l.link)') {{l.name}}
			
			<!-- 主要的路由部分 -->
		#cm-main-wrapper
			router-view
</template>

<style lang='scss' scoped>
$white:#fff;
$black:#000;
$nav-bg:#222;
$nav-unactive:rgb(157,157,157);
	#mc-time,#logout a{
		color:$white;
	}

	#cm-company{
		color:$white;
	}

	.side-nav{
			li{
				background: transparent;
        		border:none;
				display: block;
				color:$nav-unactive;
				border-radius: 0;
				border-left:transparent 3px solid;
				cursor: pointer;
				&:hover{
        			background-color: $black !important;
        			color:$white;
        			border-left-color: $white;
        		};

        		&.active{
        			background-color: $black !important;
        			color:$white;
        			border-left-color: $white;
        		}
			}
	}

	/*td{
		min-width:100px;
	}*/

	@media(max-width:768px) {
	    .cm-wrapper {
    	    padding: 10px;
    	}

    	#logout{
    		position: fixed;
    		top:0;
    		right:70px;
    	}
	}

	@media(min-width:768px) {
    	.cm-wrapper {
    	    padding-left: 225px;
    	}
	
    	#cm-main-wrapper {
    	    padding: 20px;
    	}

    	.side-nav {
	        position: fixed;
	        top: 51px;
	        left: 225px;
	        width: 225px;
	        margin-left: -225px;
	        border: none;
	        border-radius: 0;
	        overflow-y: auto;
	        background-color: $nav-bg;
	        bottom: 0;
	        overflow-x: hidden;
	        padding-bottom: 40px;
	        margin-bottom: 0;
	    }
	}
</style>

<script type="text/javascript">
import operatorCookieIns from 'components/common/operateCookie';
	export default{
		data(){
			return {
				collapsed:true,
				i:null,
				taxResult:['序号','企业名','负责人','是否申报','金额','日期','提交'],
				accountIden:1
			}
		},
		computed:{
			navLeft(){
				if(operatorCookieIns.getCookie('accountIden')==100){
					return [
						{name:'报税统计',link:'taxStatistics'},
						{name:'报税管理',link:'taxManage'},
						{name:'企业管理',link:'companyManage'},
						{name:'职工管理',link:'workerManage'},
						{name:'收支管理',link:'revenueManage'},
						{name:'个人中心',link:'userCenter'},
					];
				}else{
					return [
						{name:'报税管理',link:'taxManage'},
						{name:'个人中心',link:'userCenter'},
					];
				}
			}
		},
		methods:{
			//切换顶部导航的显示隐藏
			toggleCollapse(){
				this.collapsed = !this.collapsed
			},

			toggleNav(idx,link){
				this.i = idx;
				localStorage.navIdx = idx;
				this.$router.push({name:link})
			},

			logout(){
				this.$store.commit('logout');
				this.$router.push({name:'login'})
			}
		},
		mounted(){
			this.i = localStorage.navIdx||0;
		}
	}
</script>