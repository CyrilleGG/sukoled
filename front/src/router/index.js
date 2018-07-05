import Vue from 'vue'
import Router from 'vue-router'

import CreateContrib from '@/components/CreateContrib/CreateContrib'
import CreateNewCampaign from '@/components/CreateNewCampaign/Createnewcampaign'

import Login from '@/components/Login/Login'

import Viewer from '@/components/Viewer/Viewer'

import Contributor from '@/components/Contributor/Contributor'
import ContributorSendContribution from '@/components/ContributorSendContribution/ContributorSendContribution'
import ContributorReviewContribution from '@/components/ContributorReviewContribution/ContributorReviewContribution'
import ContributorPreviewContribution from '@/components/ContributorPreviewContribution/ContributorPreviewContribution'

import Admin from '@/components/Admin/Admin'
import AdminReviewContribution from '@/components/AdminReviewContribution/AdminReviewContribution'
import AdminNewCampaign from '@/components/AdminNewCampaign/AdminNewCampaign'
import AdminManagePolicies from '@/components/AdminManagePolicies/AdminManagePolicies'


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
      name: 'contributor-send-contribution',
      path: '/contributor/send-contribution',
      component: ContributorSendContribution
    }, {
      name: 'contributor-review-contribution',
      path: '/contributor/review',
      component: ContributorReviewContribution
    }, {
      name: 'contributor-preview-contribution',
      path: '/contributor/send-contribution/preview',
      component: ContributorPreviewContribution
    }, {
      name: 'admin',
      path: '/admin',
      component: Admin
    }, {
      name: 'admin-review-contribution',
      path: '/admin/review',
      component: AdminReviewContribution
    }, {
      name: 'admin-new-campaign',
      path: '/admin/new-campaign',
      component: AdminNewCampaign
    }, {
      name: 'admin-manage-policies',
      path: '/admin/manage-policies',
      component: AdminManagePolicies
    }, {
      // Vue contrib
      name: 'createcontrib',
      path: '/createcontrib',
      component: CreateContrib
    }, {
      name: 'createnewcampaign',
      path: '/createnewcampaign',
      component: CreateNewCampaign
    }
  ]
})
