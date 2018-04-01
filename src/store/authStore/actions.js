import axios from 'axios';
import * as types from './mutation-types';
import { registerUrl } from '../../env';
import apiRequest from '../../utils/apiRequest';

export const authUser = ({ commit }, {
  name, email, password, password_confirmation,
}) => {
  commit(types.SET_AUTH_USER_START);
  return axios.post(registerUrl, {
    name,
    email,
    password,
    password_confirmation,
  }).then(({ data }) => data.user)
    .then((user) => {
      apiRequest.authToken({ email, password })
        .then((response) => {
          window.localStorage.setItem('authUser', JSON.stringify(response.data));
          commit(types.SET_AUTH_USER, user);
          commit(types.SET_AUTH_USER_SUCCESS);
        });
    })
    .catch((error) => {
    // TODO : Do Server not response error handler
      if (error.message === 'Network Error') {
      }
      if (error.response.status === 422) {
        commit(types.SET_AUTH_USER_VALIDATION_ERROR, error);
      } else {
        commit(types.SET_AUTH_USER_ERROR, error);
      }
      return Promise.reject(error);
    });
};

export const loginUser = ({ commit }, { email, password }) => {
  commit(types.LOGIN_USER_START);
  return apiRequest.loginUser({ email, password })
    .then(response => Promise.resolve(response.data.user))
    .catch((error) => {
      commit(types.LOGIN_USER_ERROR, error);
      return Promise.reject(error);
    })
    .then(user => apiRequest.authToken({ email, password })
      .then((response) => {
        window.localStorage.setItem('authUser', JSON.stringify(response.data));
        commit(types.SET_AUTH_USER, user);
        commit(types.LOGIN_USER_SUCCESS);
      }));
};

export const userData = async ({ commit }) => {
  commit(types.FETCH_USER_DATA_START);
  try {
    const { data: user } = await apiRequest.get('me');
    commit(types.FETCH_USER_DATA_SUCCESS, user);
  } catch (error) {
    commit(types.FETCH_USER_DATA_ERROR, error);
  }
};

export const logoutUser = ({ commit }) => {
  return new Promise((resolve) => {
    window.localStorage.removeItem('authUser');
    commit(types.LOGOUT_USER);
    resolve();
  });

};
