import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
	baseData
} from './modules/baseData/'

import {
	companyManage
} from './modules/companyManage/'

import {
	workerManage
} from './modules/workerManege/'
import {
	revenueManage
} from './modules/revenueManage/'

const store = {
	modules: {
		baseData,
		companyManage,
		workerManage,
		revenueManage
	}
}

export default new Vuex.Store(store)