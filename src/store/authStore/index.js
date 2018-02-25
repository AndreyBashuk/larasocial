import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  authUser: null,
  errors: null,
  errorMessage: null,
  isLoading: false,
  status: null,
};

export default {
  state,
  actions,
  mutations,
};
