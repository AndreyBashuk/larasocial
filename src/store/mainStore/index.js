import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  chats: null,
  isLoading: false,
  status: null,
  sendMessageLoading: false,
  sendMessageError: null,
  paginatedMessageLoading: false,
  paginatedMessageError: null,
};

export default {
  state,
  actions,
  mutations,
};
