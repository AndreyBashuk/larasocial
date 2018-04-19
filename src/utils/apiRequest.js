import axios from 'axios';
import { API_URI, tokenUrl, loginUrl, apiClientSecret, apiClientId } from '../env';

function headers() {
  const accessToken = JSON.parse(window.localStorage.getItem('authUser')).access_token;
  if (window.Echo.socketId() !== undefined) {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Socket-ID': window.Echo.socketId(),
      },
    };
  }
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export default class apiRequest {
  static get(path, withoutURI = false) {
    if (withoutURI) { return axios.get(`${path}`, headers()); }
    return axios.get(`${API_URI}/${path}`, headers());
  }

  static post(path, data) {
    return axios.post(`${API_URI}/${path}`, data, headers());
  }

  static put(path, data) {
    return axios.put(`${API_URI}/${path}`, data, headers());
  }

  static delete(path, id) {
    return axios.delete(`${API_URI}/${path}`, headers());
  }

  static authGet(path) {
    return axios.get(`${API_URI}/${path}`, headers());
  }

  static authToken({ email, password }) {
    const postData = {
      grant_type: 'password',
      client_id: apiClientId,
      client_secret: apiClientSecret,
      username: email,
      password,
      scope: '',
    };
    return axios.post(tokenUrl, postData);
  }

  static loginUser({ email, password }) {
    return axios.post(loginUrl, { email, password });
  }
}
