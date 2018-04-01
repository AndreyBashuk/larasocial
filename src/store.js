import Vue from 'vue';
import Vuex from 'vuex';

import authStore from './store/authStore';
import mainStore from './store/mainStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    mainStore,
  },
});
