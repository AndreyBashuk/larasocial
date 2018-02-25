import * as types from './mutation-types';

export default {

  [types.SET_AUTH_USER](state, authUser) {
    state.authUser = authUser;
  },

  [types.SET_AUTH_USER_START](state) {
    state.isLoading = true;
  },

  [types.SET_AUTH_USER_SUCCESS](state) {
    state.isLoading = false;
    state.errorMessage = null;
    state.errors = null;
  },

  [types.SET_AUTH_USER_ERROR](state, error) {
    state.isLoading = false;
    state.status = error.response.status;
  },

  [types.SET_AUTH_USER_VALIDATION_ERROR](state, error) {
    state.isLoading = false;
    state.errors  = error.response.data.errors;
  },

  [types.LOGIN_USER_START](state) {
    state.isLoading = true;
  },

  [types.LOGIN_USER_SUCCESS](state) {
    state.isLoading = false;
    state.errorMessage  = null;
    state.errors = null;
  },

  [types.LOGIN_USER_ERROR](state, error) {
    state.isLoading = false;
    state.errors  = error.response.data.errors;
  }
};

