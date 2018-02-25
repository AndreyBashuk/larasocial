import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import RegisterPage from '@/views/RegisterPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterPage,
    },
  ],
});
