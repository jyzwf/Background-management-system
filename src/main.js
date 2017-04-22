// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/'
import accounting from './scss/accounting'
import store from './vuex/store'

import operatorCookieIns from 'components/common/operateCookie';
// 验证是否登录
router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.needAuth)) {
		//验证登入
		if (!operatorCookieIns.getCookie('accountT')) {
			//如果有直接用token请求
			next({
				path: '/login'
			})
		} else {
			store.dispatch('GET_LOGIN', 2).then(() => next()).catch(err => next({
				path: '/login'
			}));
		}
	} else {
		next();
	}
})


/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	},
	router,
	store,
	mounted() {
		// console.log(operatorCookieIns.getCookie('accountT'))
		// 	// store.dispatch('GET_LOGIN').then(data => next()).catch(err => next(false));
	}
})

//15988818786
//13985634592  
// Vue.config.devtools = true