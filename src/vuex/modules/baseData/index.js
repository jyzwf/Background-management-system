import {
    CM_INDEX,
    GET_LOGIN,
    CHANGE_LOADING_STATE
} from '../../mutation-type';

import qs from 'qs';
import axios from 'axios';
import operatorCookieIns from 'components/common/operateCookie'

const baseData = {
    state: {
        baseUrl: '***',
        login: {
            tel: null,
            password: null,
            role: null,
            realname: null,
            token: null
        },
        loadingState: false
    },
    mutations: {
        save_login(state, res) { //保存登入信息
            state.login = {...state.login,
                ...res
            };
            operatorCookieIns.setCookie('accountT', res.token, 1).setCookie('accountIden', res.role, 1);

        },
        logout(state) { //退出登入
            operatorCookieIns.deleteCookie('accountT').deleteCookie('accountIden');
            for (let k of Object.keys(state.login)) {
                state.login[k] = null;
            }
        },
        change_loading_state(state) {
            state.loadingState = !state.loadingState;
        }
    },
    actions: {
        [GET_LOGIN]({ //请求登入
            commit,
            state,
            getters
        }, n) {
            let sendData = {};
            if (n == 1) { //1表示直接登录的验证
                sendData = {
                    tel: state.login.tel,
                    password: state.login.password
                }
            } else if (n == 2) { //只有token的时候
                state.token = operatorCookieIns.getCookie('accountT');
                sendData = {
                    token: state.token
                }
            }

            commit('change_loading_state');
            return new Promise((resolve, reject) => {
                axios.post(`${state.baseUrl}users/login`, qs.stringify({...sendData
                    }))
                    .then((res) => {
                        if (res.data.code == 200) {
                            commit('save_login', res.data.result);
                            commit('change_loading_state');
                            resolve();
                        } else {
                            reject();
                        }
                    }, (err) => {
                        alert('服务器开小差啦');
                        reject();
                    })
            })

        },



    }
}

export {
    baseData
}