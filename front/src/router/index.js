import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    }, {
      name: 'welcome',
      path: '/welcome',
      component: Welcome
    }
  ]
})
