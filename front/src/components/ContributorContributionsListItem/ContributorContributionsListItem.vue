<template>
  <div class="contributions-list-item col-lg-12 mb-2">
    <div class="row px-2 h-100">

      <div class="contribution-name col-lg-2 my-auto">
        <p class="mb-0 ">{{ department_name }}</p>
        <p class="mb-0 font-italic">{{ contribution_name }}</p>
      </div>

      <p class="col-lg-3 my-auto">{{ version_name }}</p>

      <p class="col-lg-2 my-auto">{{ moment (ends_at) }}</p>

      <p class="col-lg-2 my-auto text-center">{{ moment (version_created_at) }}</p>

      <status v-bind:status="status_contributor" />

      <action 
        v-bind:status="status_contributor"
        v-bind:contribution_id="contribution_id"
        v-bind:version_id="version_id"
        v-bind:department_slug="department_slug"
       />

    </div>
  </div>
</template>

<script>
import moment from 'moment'

import Status from '@/components/Status/Status'
import Action from '@/components/Action/Action'

export default {
  name: 'ContributorContributionsListItem',

  components: {
    Status,
    Action
  },

  props: [
    'contribution_id',
    'version_id',
    'contribution_name',
    'version_name',
    'version_created_at',
    'department_name',
    'department_slug',
    'ends_at',
    'status_contributor'
  ],

  methods: {
    moment (date) {
      return moment(date).format('MMMM DD, YYYY')
    }
  }
}
</script>

<style scoped>

.contributions-list-item {
  border-radius: 0 0 10px 10px;
  height: 60px;
  background-color: #ffffff;
}

.contribution-name p:nth-child(2) {
  font-size: 0.8rem;
}

</style>