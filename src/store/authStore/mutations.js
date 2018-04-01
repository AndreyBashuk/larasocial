/* eslint-disable no-param-reassign */
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
    state.errors = error.response.data.errors;
  },

  [types.LOGIN_USER_START](state) {
    state.isLoading = true;
  },

  [types.LOGIN_USER_SUCCESS](state) {
    state.isLoading = false;
    state.errorMessage = null;
    state.errors = null;
    state.status = 'success';
  },

  [types.LOGIN_USER_ERROR](state, error) {
    state.isLoading = false;
    state.errors = error.response.data.errors;
    state.status = 'failed';
  },

  [types.FETCH_USER_DATA_START](state) {
    state.isLoading = true;
  },

  [types.FETCH_USER_DATA_SUCCESS](state, user) {
    state.isLoading = false;
    state.status = 'success';
    state.authUser = user;
  },

  [types.FETCH_USER_DATA_ERROR](state, errors) {
    state.isLoading = false;
    state.status = 'failed';
    state.errors = errors;
  },

  [types.LOGOUT_USER](state) {
    state.authUser = null;
  },
};

