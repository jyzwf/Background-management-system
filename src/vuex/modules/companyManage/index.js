//企业管理部分

import {
	CHANGE_COMPANY_STATE,
	CLEAR_COMPANY_DATA,
	SAVE_COMPANY_DATA,
	GET_CHARGER_LIST,
	GET_COMPANY_DEDAIL,
	CHANGE_COMPANY_DATA,
	GET_COMPANY_TYPE_LIST,
	DELETE_COMPANY
} from '../../mutation-type'

import qs from 'qs'
import axios from 'axios'
import FormValidate from 'components/common/validate'

const companyManage = {
	state: {
		companyData: {
			name: '', //企业名
			boss: '', //委托人/代理人
			manager: '', //负责人
			tel: '', //联系方式
			address: '', //地址
			type: '', //报税类型
			tax_num: '', //税号
			tax_psw: '', //报税密码
			note: '', //备注
			is_country: false, //是否国税
			is_local: false, //是否地税
		},
		company_id: '', //公司的id
		company_state: 1, //1:添加、2:管理
		c_modal_state: false, //模态框的显示隐藏
		chargerList: [], //负责人列表
		companyTypeList: [], //公司类型列表

	},
	getters: {
		add_change_company(state) {
			let add = {
					url: 'company/add',
					sendData: {...state.companyData
					}
				},
				change = {
					url: "company/update",
					sendData: {
						_id: state.company_id,
						...state.companyData
					}
				};

			return {
				add,
				change
			}
		}
	},
	mutations: {
		change_company_state(state, n) {
			state.company_state = n;
		},
		clear_company_data(state) {
			for (let k of Object.keys(state.companyData)) {
				state.companyData[k] = ''
			}
			state.company_id = '';
		},



		get_charger_list(state, list) {
			state.chargerList = [...list]
		},

		get_company_type_list(state, list) {
			state.companyTypeList = [...list]
		},

		get_company_detail(state, list) {
			for (let key of Object.keys(state.companyData)) {
				state.companyData[key] = list[key]
			}

			state.company_id = list._id;

		}
	},
	actions: {
		async [CHANGE_COMPANY_STATE]({
			commit,
			state,
			dispatch
		}, n) {
			state.c_modal_state = n.state == 1 || n.state == 2;
			if (!n.state) {
				commit('clear_company_data');
			} else {
				let [chargerList, companyTypeList] = await Promise.all([dispatch('GET_CHARGER_LIST'), dispatch('GET_COMPANY_TYPE_LIST')]);
				// await ;
				// await ;

				if (n.state == 2) {
					dispatch('GET_COMPANY_DEDAIL', n.id);
				}
			}
			commit('change_company_state', n.state)
		},

		[CLEAR_COMPANY_DATA]({
			commit
		}) {
			commit('clear_company_data');
		},

		[GET_COMPANY_DEDAIL]({
			commit,
			state,
			rootState,
			dispatch
		}, _id) {
			// await dispatch('GET_CHARGER_LIST');

			axios.get(`${rootState.baseData.baseUrl}company/detail/${_id}`)
				.then((res) => {
					commit('get_company_detail', res.data.result);
				})
		},

		[SAVE_COMPANY_DATA]({
			commit,
			state,
			getters,
			rootState,
			dispatch
		}) {
			let addCompanyValid = {
				name: state.companyData.name,
				boss: state.companyData.boss,
				manager: state.companyData.manager,
				tel: state.companyData.tel,
				address: state.companyData.address,
				type: state.companyData.type,
				tax_num: state.companyData.tax_num,
				tax_psw: state.companyData.tax_psw,
			};

			let addErrMag = {
				name: '请填写公司名',
				boss: '请填写代理人',
				manager: '请选择负责人',
				tel: '请填写联系方式',
				address: '请填写地址',
				type: '请选择报税类型',
				tax_num: '请填写税号',
				tax_psw: '请填写报税密码'
			}
			let f = new FormValidate(addCompanyValid, addErrMag),
				errMsg;
			if (errMsg = f.isRequire()) {
				return alert(errMsg);
			}

			let now_save_type = !state.company_id.trim() ? getters.add_change_company.add : getters.add_change_company.change;
			commit('change_loading_state');
			axios.post(`${rootState.baseData.baseUrl+now_save_type.url}`, qs.stringify({...now_save_type.sendData
				}))
				.then((res) => {
					if (res.data.code == 200) {
						dispatch('CHANGE_COMPANY_STATE', 0);

					}
					commit('change_loading_state');
				}, (err) => {
					alert('服务器开小差啦');
					commit('change_loading_state');
				})
		},

		[GET_CHARGER_LIST]({
			commit,
			state,
			rootState
		}, list) {
			if (state.chargerList.length == 0) {
				commit('change_loading_state');
				axios.get(`${rootState.baseData.baseUrl}users/getmanager`)
					.then((res) => {
						commit('get_charger_list', res.data.result);
						commit('change_loading_state');
					})
			}
		},

		[DELETE_COMPANY]({
			commit,
			state,
			rootState,
			dispatch
		}, adminPsd) {
			commit('change_loading_state');
			return new Promise((resolve, reject) => {
				axios.post(`${rootState.baseData.baseUrl}company/delete`, qs.stringify({
						id: state.company_id,
						superpsw: adminPsd
					}))
					.then((res) => {
						if (res.data.code == 200) {
							dispatch('CHANGE_COMPANY_STATE', 0);
							commit('change_loading_state');
							resolve();
						} else {
							alert('抱歉你没有权限删除');
							reject();
						}

					}, (err) => {
						alert('服务器开小差啦');
						reject();
					})
			})

		},

		[GET_COMPANY_TYPE_LIST]({
			commit,
			state,
			rootState
		}, list) {
			if (state.companyTypeList.length == 0) {
				axios.get(`${rootState.baseData.baseUrl}type/company`)
					.then((res) => {
						commit('get_company_type_list', res.data.result);
					})
			}
		}
	}
}

export {
	companyManage
}