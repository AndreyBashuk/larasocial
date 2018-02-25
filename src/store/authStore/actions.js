import * as types from './mutation-types';
import { registerUrl, loginUrl } from '../../env';
import axios from 'axios';
import apiRequest from '../../utils/apiRequest';

export const authUser = ({ commit }, { name, email, password, password_confirmation}) => {

  commit(types.SET_AUTH_USER_START);
  return axios.post(registerUrl, {
    name,
    email,
    password,
    password_confirmation,
  }).then(({ data }) => {
    return data.user;
  }).then(user => {
    apiRequest.authToken( { email, password } )
      .then((response) => {
      window.localStorage.setItem('authUser', JSON.stringify(response.data));
      commit(types.SET_AUTH_USER, user);
      commit(types.SET_AUTH_USER_SUCCESS);
    });
  })
    .catch(error => {
    //TODO : Do Server not response error handler
    if(error.message === 'Network Error') {
    }
    if (error.response.status === 422) {
      commit(types.SET_AUTH_USER_VALIDATION_ERROR, error);
    }
    else {
      commit(types.SET_AUTH_USER_ERROR, error);
    }
    return Promise.reject(error);
  });
};

export const loginUser = ({commit}, { email, password }) => {
  commit(types.LOGIN_USER_START);
  return apiRequest.loginUser({ email, password })
  .then((response) => {
    window.localStorage.setItem('authUser', JSON.stringify(response.data));
    return response.data.user;
  })
  .catch((error) => {
    commit(types.LOGIN_USER_ERROR, error);
    return Promise.reject(error);
  })
  .then(user => {
    apiRequest.authToken( { email, password } )
      .then((response) => {
        window.localStorage.setItem('authUser', JSON.stringify(response.data));
        commit(types.SET_AUTH_USER, user);
        commit(types.LOGIN_USER_SUCCESS);
      });
  });
}
