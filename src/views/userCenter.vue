<template lang="jade">
	.user-center
		head
			资料管理

		section
			.user-pic
				h2 {{user.realname}}
			.user-source
					ul
						li
</template>

<script type="text/javascript">
// import 
	export default{
		computed:{
			user(){
				return this.$store.state.baseData.login
			},
		},
		methods:{
			
		}
	}
</script>