//员工管理部分

import {
	CHANGE_WORKER_STATE,
	CLEAR_WORKER_DATA,
	SAVE_WORKER_DATA,
	GET_WORKER_LIST,
	GET_WORKER_DETAIL,
	DELETE_WORKER
} from '../../mutation-type'

import qs from 'qs'
import axios from 'axios'
import FormValidate from 'components/common/validate'

const workerManage = {
	state: {
		workerData: {
			password: '', //
			realname: '', //真实姓名
			work: '', //工作身份：老板 职工
			tel: '', //手机(用作登录)
			money: '', //薪资[可选]
		},
		worker_state: 1, //1:添加、2:管理
		w_modal_state: false, //模态框的显示隐藏
		worker_list: [], //工人列表
		worker_id: ''
	},
	getters: {
		add_change_worker(state) {
			let add = {
					url: 'users/adduser',
					sendData: {...state.workerData
					}
				},
				change = {
					url: "users/update",
					sendData: {
						_id: state.worker_id,
						...state.workerData
					}
				};

			return {
				add,
				change
			}
		}
	},
	mutations: {
		change_worker_state(state, n) {
			state.worker_state = n;
		},
		clear_worker_data(state) {
			for (let k of Object.keys(state.workerData)) {
				state.workerData[k] = ''
			}
			state.worker_id = '';
		},

		get_worker_list(state, list) {
			state.worker_list = [...list]
		},

		get_worker_detail(state, list) {
			for (let key of Object.keys(state.workerData)) {
				state.workerData[key] = list[key]
			}



		}
	},
	actions: {
		[CHANGE_WORKER_STATE]({
			commit,
			state
		}, n) {
			state.w_modal_state = n == 1 || n == 2;
			if (!n) {
				commit('clear_worker_data');
			}
			commit('change_worker_state', n)
		},

		[CLEAR_WORKER_DATA]({
			commit
		}) {
			commit('clear_worker_data');
		},

		[SAVE_WORKER_DATA]({
			commit,
			state,
			getters,
			rootState,
			dispatch
		}) {
			let addWorkerValid = {
				realname: state.workerData.realname,
				password: state.workerData.password,
				tel: state.workerData.tel,
				work: state.workerData.work,
			};

			let addErrMag = {
				realname: '请填写姓名',
				password: '请填写密码',
				tel: '请填写联系方式',
				work: '请选择身份',
			}
			let f = new FormValidate(addWorkerValid, addErrMag),
				errMsg;
			if (errMsg = f.isRequire()) {
				return alert(errMsg);
			}

			commit('change_loading_state');
			let now_save_type = !state.worker_id.trim() ? getters.add_change_worker.add : getters.add_change_worker.change;
			axios.post(`${rootState.baseData.baseUrl+now_save_type.url}`, qs.stringify({...now_save_type.sendData
				}))
				.then((res) => {
					if (res.data.code == 200) {
						dispatch('CHANGE_WORKER_STATE', 0);
						dispatch('GET_WORKER_LIST');
					} else {
						alert('服务器开小差啦')
					}
					commit('change_loading_state');
				}, (err) => {
					alert('服务器开小差啦');
					commit('change_loading_state');
				})
		},

		[GET_WORKER_DETAIL]({
			commit,
			state,
			rootState,
			dispatch
		}, _id) {
			state.worker_id = _id;
			axios.get(`${rootState.baseData.baseUrl}users/detail/${_id}`)
				.then((res) => {
					commit('get_worker_detail', res.data.result);
				})
		},

		[DELETE_WORKER]({
			commit,
			state,
			rootState,
			dispatch
		}, adminPsd) {
			axios.post(`${rootState.baseData.baseUrl}users/delete`, qs.stringify({
					id: state.worker_id,
					superpsw: adminPsd
				}))
				.then((res) => {
					if (res.data.code == 200) {
						dispatch('CHANGE_WORKER_STATE', 0);
						dispatch('GET_WORKER_LIST');
					} else {
						alert('抱歉你没有权限删除')
					}
				}, (err) => {
					alert('服务器开小差啦')
				})
		},

		[GET_WORKER_LIST]({
			commit,
			state,
			rootState
		}) {
			axios.get(`${rootState.baseData.baseUrl}users/list`)
				.then((res) => {
					commit('get_worker_list', res.data.result)
				})
		}
	}
}

export {
	workerManage
}