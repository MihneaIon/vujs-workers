import Vue from 'vue';
import Vuex from 'vuex';
import time from './modules/time'
import sorting from './modules/sorting'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        time,
        sorting,
    }
})