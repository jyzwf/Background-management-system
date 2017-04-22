//员工管理部分

import {
	GET_REVENUE_LIST,
	SAVE_REVENUE_DATA,
	CHANGE_REVENUE_STATE
} from '../../mutation-type'

import qs from 'qs'
import axios from 'axios'
import FormValidate from 'components/common/validate'

const revenueManage = {
	state: {
		revenue_data: {
			company: '', //
			standard: '', //收费标准
			abstract: '', //摘要
			note: '', //备注
			time: ''
		},
		revenue_state: 1, //1:添加、2:管理
		r_modal_state: false, //模态框的显示隐藏
		revenue_list: [], //收支列表
	},

	mutations: {
		change_revenue_state(state, n) {
			state.revenue_state = n;
		},
		clear_revenue_data(state) {
			for (let k of Object.keys(state.revenue_data)) {
				state.revenue_data[k] = ''
			}
		},

		get_revenue_list(state, list) {
			state.revenue_list = [...list]
		},

		get_revenue_detail(state, list) {
			for (let key of Object.keys(state.revenue_data)) {
				state.revenue_data[key] = list[key]
			}
			// state.worker_id = list._id;
		}
	},
	actions: {
		[CHANGE_REVENUE_STATE]({
			commit,
			state
		}, n) {
			state.r_modal_state = n == 1 || n == 2;
			if (!n) {
				commit('clear_revenue_data');
			}
			commit('change_revenue_state', n)
		},

		// [CLEAR_WORKER_DATA]({
		// 	commit
		// }) {
		// 	commit('clear_worker_data');
		// },

		[SAVE_REVENUE_DATA]({
			commit,
			state,
			getters,
			rootState,
			dispatch
		}) {
			let addRevenueValid = {
				company: state.revenue_data.company,
				standard: state.revenue_data.standard,
				time: state.revenue_data.time,
			};

			let addErrMag = {
				company: '请填写公司名',
				standard: '请填写收费标准',
				time: '请填写时间'
			}
			let f = new FormValidate(addRevenueValid, addErrMag),
				errMsg;
			if (errMsg = f.isRequire()) {
				return alert(errMsg);
			}
			commit('change_loading_state');
			axios.post(`${rootState.baseData.baseUrl}ernote/add`, qs.stringify({...state.revenue_data
				}))
				.then((res) => {
					if (res.data.code == 200) {
						dispatch('CHANGE_REVENUE_STATE', 0);
						dispatch('GET_REVENUE_LIST');

					}
					commit('change_loading_state');
				}, (err) => {
					alert('服务器开小差啦');
					commit('change_loading_state');
				})
		},

		// [GET_REVENUE_DETAIL]({
		// 	commit,
		// 	state,
		// 	rootState,
		// 	dispatch
		// }, _id) {
		// 	axios.get(`${rootState.baseData.baseUrl}users/detail/${_id}`)
		// 		.then((res) => {
		// 			commit('get_worker_detail', res.data.result);
		// 		})
		// },

		[GET_REVENUE_LIST]({
			commit,
			state,
			rootState
		}) {
			commit('change_loading_state');
			axios.get(`${rootState.baseData.baseUrl}ernote/list`)
				.then((res) => {
					commit('get_revenue_list', res.data.result);
					commit('change_loading_state');
				})
		}
	}
}

export {
	revenueManage
}