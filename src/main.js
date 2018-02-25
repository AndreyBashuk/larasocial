// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';
import store from './store';
import router from './router';
import App from './App';

Vue.config.productionTip = false;
Vue.config.devtools = true;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if (authUser && authUser.access_token) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

Vue.use(Vuetify);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
