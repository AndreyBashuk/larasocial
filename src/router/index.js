import Vue from 'vue';
import Router from 'vue-router';

const HomePage = () => import('@/views/HomePage');
const LoginPage = () => import('@/views/LoginPage');
const RegisterPage = () => import('@/views/RegisterPage');

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
      path: '/chat/:chat_id?',
      name: 'home',
      component: HomePage,
      props: true,
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
