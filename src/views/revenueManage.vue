<template lang="jade">
	.book_management
		h2.text-right.margin-bottom-20
			button.btn.btn-sm.btn-success(@click='toggleModal(1)') 新增收支记录

		<!-- 搜索结果 -->
		.search_result
			table.table.table-bordered.table-hover
				thead
					tr
						th.text-center 序号
						th.text-center 企业
						th.text-center 收费标准
						th.text-center 摘要
						th.text-center 备注
				tbody
					tr(v-for='(r,idx) in revenue_list')
						td.text-center {{idx+1}}
						td.text-center {{r.company}}
						td.text-center {{r.standard}}
						td.text-center {{r.abstract}}
							img(src='../assets/ic_remove.svg',v-if='!r.abstract')
						td.text-center {{r.note}}
							img(src='../assets/ic_remove.svg',v-if='!r.note')
		<!-- 新增员工的modal -->
		addRevenue(:hideAddModal='toggleModal',v-if='modal')

</template>

<script type="text/javascript">
	import addRevenue from 'components/addRevenue'
	// import pagination from 'components/pagination'
	// import qs from 'qs'
	// import axios from 'axios'

	export default{
		data(){
			return {
				// workerList:[]
			}
		},
		components:{
			addRevenue,
			// pagination
		},
		computed:{
			modal(){
				return this.$store.state.revenueManage.r_modal_state
			},
			revenue_list(){
				return this.$store.state.revenueManage.revenue_list
			},
		},
		methods:{
			//显示隐藏模态框
			toggleModal(state){
				this.$store.dispatch('CHANGE_REVENUE_STATE',state);
				// if(state==2){
				// 	this.$store.dispatch('GET_WORKER_DETAIL',id)
				// }
			},

			

		},
		mounted(){
			this.$store.dispatch('GET_REVENUE_LIST')
		}
	}
</script>