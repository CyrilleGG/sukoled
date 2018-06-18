import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Viewer from '@/components/Viewer/Viewer'
import Contributor from '@/components/Contributor/Contributor'
import Admin from '@/components/Admin/Admin'
import CreateContrib from '@/components/CreateContrib/CreateContrib'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    }, {
      name: 'viewer',
      path: '/viewer',
      component: Viewer
    }, {
      name: 'contributor',
      path: '/contributor',
      component: Contributor
    }, {
      name: 'admin',
      path: '/admin',
      component: Admin
    }, {
      // Vue contrib
      name: 'createcontrib',
      path: '/createcontrib',
      component: CreateContrib
    }
  ]
})
