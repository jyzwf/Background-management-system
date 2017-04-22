<!-- 报税管理 -->
<template lang="jade">
	.tax_statistics

		<!-- 报税账簿 -->
		#tax-books.margin-top-20
			section
				.book-cover.margin-right-16.margin-bottom-30
					<!-- font -->
					.cover_front
						button.btn(@click='createBooks') 添加
					<!-- pages -->
					ul.book-pages
						li(v-for='i in 5')
					<!-- back -->
					ul.cover-back
						li
				router-link.book-cover.cursorPointer.margin-right-16.margin-bottom-30(v-for='i in taxBooks',:to="{name:'bookManage',params:{month:i}}")
					<!-- font -->
					.cover_front
						h3 {{i}}
					<!-- pages -->
					ul.book-pages
						li(v-for='i in 5')
					<!-- back -->
					ul.cover-back
						li


</template>

<style lang="scss" scoped>
	section{
		display: flex;
		flex-wrap:wrap;
	}


	.book-cover{
		width:calc((100% - 80px) / 5);
		height:225px;
		perspective: 1000px;
		transform-style: preserve-3d;
		position: relative;
	}
	
	.cover_front{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		transform: rotateY(-34deg) translateZ(8px);
		background: #fffbec;
		z-index: 100;
		
		&>*{
			left:50%;
			top:50%;
			position: absolute;
			transform: translate3d(-50%,-50%,0);
			margin:0;
		}

		button{
			background: transparent;
			border:1px solid #333;
			outline: none;
		}
	}

	.book-pages{
		position: absolute;
		width:100%;
		height: 98%;
		top: 1%;
    	left: 3%;
    	z-index: 10;
		
		@for $i from 1 through 5{
			li:nth-of-type(#{$i}){
				width:100%;
				height:100%;
				position: absolute;
    			top: 0;
    			left: 0;
				transform: rotateY(-28deg-3deg*$i);
				background: -webkit-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
				box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0px 1px rgba(150, 150, 150, 0.2);
    			border-radius: 0px 5px 5px 0px;
    			transform-style: preserve-3d;
			}
		}
	}

	.cover-back{
		position: absolute;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	transform: rotateY(-15deg) translateZ(-8px);
		

		li:first-child{
			background: #fffbec;
			position: absolute;
    		top: 0;
    		left: 0;
    		width: 100%;
    		height: 100%;
		}


	}

	@media(max-width:768px) {
	    .book-cover{
			width:calc((100% -64px) / 4);
			height:225px;
			perspective: 1000px;
			transform-style: preserve-3d;
			position: relative;
		}
	}

</style>

<script type="text/javascript">
import pagination from 'components/pagination'
import qs from 'qs'
import axios from 'axios'

	export default{
		data(){
			return {
				taxBooks:[]
			}
		},
		components:{
			pagination
		},
		methods:{
			getTaxBooks(){
				axios.get(`${this.$store.state.baseData.baseUrl}taxstatistics/list/book`)
				.then((res)=>{
					if(res.data.code == 0){
						this.taxBooks = res.data.result;
					}
					
					// this.totalPage = +res.data.result.total_page
				},(err)=>{
					alert('服务器开小差啦')
				})
			},
			createBooks(){
				axios.get(`${this.$store.state.baseData.baseUrl}taxstatistics/manage/newbook`)
				.then((res)=>{
					if(res.data.code == 200){
						if(res.data.result='本月账本已经存在'){
							alert('本月账本已经存在')
						}
					}
				},(err)=>{
					alert('服务器开小差啦')
				})
			}
		},
		mounted(){
			this.getTaxBooks();
		}
	}
</script>

