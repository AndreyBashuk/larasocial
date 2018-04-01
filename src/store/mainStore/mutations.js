/* eslint-disable no-param-reassign */
import * as types from './mutation-types';

export default {
  [types.FETCH_USER_CHATS_START](state) {
    state.isLoading = true;
  },

  [types.FETCH_USER_CHATS_SUCCESS](state, chats) {
    state.chats = chats;
    state.isLoading = false;
    state.status = 'success';
  },

  [types.FETCH_USER_CHATS_ERROR](state, error) {
    state.isLoading = false;
    state.errors = error.response.data.errors;
    state.status = 'failed';
  },
};
