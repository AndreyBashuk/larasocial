// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';
import Echo from 'laravel-echo';
import VAnimateCss from 'v-animate-css';
import store from './store';
import router from './router';
import App from './App';
import { SITE_URI } from './env';

window.Pusher = require('pusher-js');

const authUser = JSON.parse(window.localStorage.getItem('authUser'));

window.Echo = new Echo({
  authEndpoint: `${SITE_URI}broadcasting/auth`,
  broadcaster: 'pusher',
  key: 'f26fe926d7eb9fa107a2',
  auth: {
    headers: {
      Authorization: `Bearer ${authUser ? authUser.access_token : ''}`,
    },
  },
  cluster: 'eu',
  encrypted: true,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (authUser && authUser.access_token) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

Vue.use(Vuetify);
Vue.use(VAnimateCss);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
