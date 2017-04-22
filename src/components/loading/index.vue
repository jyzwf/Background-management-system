<!-- 提示组件 -->
<template lang="jade">
	#loading_part
		#loading
			span L
			span o
			span a
			span d
			span i
			span n
			span g
</template>

<style lang='scss' scoped>
$loading_bg:rgba(0,0,0,.42);
$loading_color:#fff;
	#loading_part{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background:transparent;
		display: flex;
		justify-content:center;
		align-items:center;
		z-index:9999;

		#loading{
			font-size:26px/1.5 Monospace;
			color:$loading_color;
			padding:20px;
			background:$loading_bg;
			border-radius:4px;
			perspective:100px;

			span{
				animation:flip 2s infinite;
				display: inline-block;
				transform-origin:50% 50% -0.1rem;
				transform-style: preserve-3d;

				@for $i from 1 to 8{
    			 	&:nth-child(#{$i}){
    				   animation-delay:$i/10+s;
    				 }
				}
			}	
		}

		@keyframes flip{
			to{
				transform:rotateX(1turn)
			}
		}
	}
</style>