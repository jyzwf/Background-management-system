<template lang="jade">
	.book_management
		<!-- 企业统计 -->
		h2.text-right.margin-bottom-20
			button.btn.btn-sm.btn-success(@click='toggleModal(1)') 新增员工

		<!-- 搜索结果 -->
		.search_result
			table.table.table-bordered.table-hover
				thead
					tr
						th.text-center 序号
						th.text-center 名字
						th.text-center 手机号
						th.text-center 
				tbody
					tr(v-for='(w,idx) in workerList')
						td.text-center {{idx+1}}
						td.text-center {{w.realname}}
						td.text-center {{w.tel}}
						td.text-center
							button.btn.btn-info.btn-xs(@click='toggleModal(2,w._id)') 管理
		<!-- 新增员工的modal -->
		addWorker(:hideAddModal='toggleModal',v-if='modal')

</template>

<script type="text/javascript">
	import addWorker from 'components/addWorker'
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
			addWorker,
			// pagination
		},
		computed:{
			modal(){
				return this.$store.state.workerManage.w_modal_state
			},
			workerList(){
				return this.$store.state.workerManage.worker_list
			},
		},
		methods:{
			//显示隐藏模态框
			toggleModal(state,id){
				this.$store.dispatch('CHANGE_WORKER_STATE',state);
				if(state==2){
					this.$store.dispatch('GET_WORKER_DETAIL',id)
				}
			},

			

		},
		mounted(){
			this.$store.dispatch('GET_WORKER_LIST')
		}
	}
</script>