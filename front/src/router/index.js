import Vue from 'vue'
import Router from 'vue-router'

import CreateContrib from '@/components/CreateContrib/CreateContrib'
import CreateNewCampaign from '@/components/CreateNewCampaign/Createnewcampaign'

import Login from '@/components/Login/Login'

import Viewer from '@/components/Viewer/Viewer'
import ViewInternalRating from '@/components/ViewInternalRating/ViewInternalRating'
import ViewEconomicSector from '@/components/ViewEconomicSector/ViewEconomicSector'
import ViewBaselSegment from '@/components/ViewBaselSegment/ViewBaselSegment'
import ViewBusinessLine from '@/components/ViewBusinessLine/ViewBusinessLine'
import ViewHighlight from '@/components/ViewHighlight/ViewHighlight'

import Contributor from '@/components/Contributor/Contributor'
import ContributorSendContribution from '@/components/ContributorSendContribution/ContributorSendContribution'
import ContributorReviewContribution from '@/components/ContributorReviewContribution/ContributorReviewContribution'
import ContributorViewContribution from '@/components/ContributorViewContribution/ContributorViewContribution'
import ContributorPreviewContribution from '@/components/ContributorPreviewContribution/ContributorPreviewContribution'

import Admin from '@/components/Admin/Admin'
import AdminReviewContribution from '@/components/AdminReviewContribution/AdminReviewContribution'
import AdminViewContribution from '@/components/AdminViewContribution/AdminViewContribution'
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
      name: 'view-internal-rating',
      path: '/view/internal-rating',
      component: ViewInternalRating
    }, {
      name: 'view-economic-sector',
      path: '/view/economic-sector',
      component: ViewEconomicSector
    }, {
      name: 'view-basel-segment',
      path: '/view/basel-segment',
      component: ViewBaselSegment
    }, {
      name: 'view-business-line',
      path: '/view/business-line',
      component:ViewBusinessLine
    }, {
      name: 'view-highlight',
      path: '/view/highlight',
      component:ViewHighlight
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
      name: 'contributor-view-contribution',
      path: '/contributor/view',
      component: ContributorViewContribution
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
      name: 'admin-view-contribution',
      path: '/admin/view',
      component: AdminViewContribution
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
