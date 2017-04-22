import Vue from 'vue';
import VueRouter from 'vue-router';
import CmIndex from 'views/index';
// import operatorCookieIns from 'components/common/operateCookie';
Vue.use(VueRouter);

const routes = [{
	path: '/',
	component: CmIndex,
	children: [{
		//首页
		path: '',
		meta: {
			needAuth: true,
			navIdx: 1
		},
		component(resolve) {
			require(['views/taxStatistics.vue'], resolve)
		}
	}, {
		//报税统计
		path: 'taxStatistics',
		name: 'taxStatistics',
		meta: {
			needAuth: true,
			navIdx: 1
		},
		component(resolve) {
			require(['views/taxStatistics.vue'], resolve)
		}
	}, {
		//报税管理
		path: 'taxManage',
		name: 'taxManage',
		meta: {
			needAuth: true,
			navIdx: 2
		},
		component(resolve) {
			require(['views/taxManage.vue'], resolve)
		}
	}, {
		//账簿管理
		path: 'bookManage/:month',
		name: 'bookManage',
		meta: {
			needAuth: true,
			navIdx: 2
		},
		component(resolve) {
			require(['views/bookManage.vue'], resolve)
		}
	}, {
		//企业管理
		path: 'companyManage',
		name: 'companyManage',
		meta: {
			needAuth: true,
			navIdx: 3
		},
		component(resolve) {
			require(['views/companyManage.vue'], resolve)
		}
	}, {
		//职工管理
		path: 'workerManage',
		name: 'workerManage',
		meta: {
			needAuth: true,
			navIdx: 4
		},
		component(resolve) {
			require(['views/workerManage.vue'], resolve)
		}
	}, {
		//收支管理
		path: 'revenueManage',
		name: 'revenueManage',
		meta: {
			needAuth: true,
			navIdx: 5
		},
		component(resolve) {
			require(['views/revenueManage.vue'], resolve)
		}
	}, {
		//个人中心
		path: 'userCenter',
		name: 'userCenter',
		meta: {
			needAuth: true,
			navIdx: 6
		},
		component(resolve) {
			require(['views/userCenter.vue'], resolve)
		}
	}],

}, {
	path: '/login',
	name: 'login',
	meta: {
		needAuth: false,
		navIdx: 1
	},
	component(resolve) {
		require(['views/login.vue'], resolve)
	}
}];

const router = new VueRouter({
	routes
});



export default router;