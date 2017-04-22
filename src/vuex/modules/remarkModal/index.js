//企业管理部分

import {
	CHANGE_COMPANY_STATE,
	CLEAR_COMPANY_DATA,
	SAVE_COMPANY_DATA,
	GET_CHARGER_LIST
} from '../../mutation-type'

import qs from 'qs'
import axios from 'axios'

const remarkModal = {
	state: {
		remarkData: {
			remark: ''
		},
		company_state: 1, //1:添加、2:管理
		c_modal_state: false, //模态框的显示隐藏
		chargerList: [] //负责人列表
	},

	mutations: {
		change_company_state(state, n) {
			state.company_state = n;
		},
		clear_company_data(state) {
			for (let k of Object.keys(state.companyData)) {
				state.companyData[k] = ''
			}
		},
		get_charger_list(state, list) {
			state.chargerList = [...list]
		}
	},
	actions: {
		[CHANGE_COMPANY_STATE]({
			commit,
			state
		}, n) {
			state.c_modal_state = n == 1 || n == 2;
			if (n == 1) {
				commit('clear_company_data');
			}
			commit('change_company_state', n)
		},

		[CLEAR_COMPANY_DATA]({
			commit
		}) {
			commit('clear_company_data');
		},

		[SAVE_COMPANY_DATA]({
			commit,
			state,
			rootState
		}) {
			commit('change_loading_state');
			axios.post(`${rootState.baseData.baseUrl}company/add`, qs.stringify({...state.companyData
				}))
				.then((res) => {
					if (res.data.code == 200) {
						commit('clear_company_data')
						state.c_modal_state = false
					}
					commit('change_loading_state');
				}, (err) => {
					alert('服务器开小差啦');
					commit('change_loading_state');
				})
		},

		[GET_CHARGER_LIST]({
			commit
		}, list) {
			commit('get_charger_list', list)
		}
	}
}

export {
	remarkModal
}