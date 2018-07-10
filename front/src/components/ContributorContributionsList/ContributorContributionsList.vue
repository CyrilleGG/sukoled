<template>
  <div class="col-lg-12">
    <div id="contributions-list-header" class="row mb-2 px-2">

      <p class="col-lg-2 my-auto text-uppercase">Type</p>
      <p class="col-lg-2 my-auto text-uppercase">Name</p>
      <p class="col-lg-2 my-auto text-uppercase">Deadline</p>
      <p class="col-lg-3 my-auto text-center text-uppercase">Modifications</p>
      <p class="col-lg-2 my-auto text-uppercase">Status</p>
      <p class="col-lg-1 my-auto text-right text-uppercase">Action</p>

    </div>
    <div class="row">

      <contributor-contributions-list-item
        v-for="(contribution, index) in contributions"
        v-bind:key="index"
        v-bind:contribution_id="contribution.contribution_id"
        v-bind:version_id="contribution.version_id"
        v-bind:contribution_name="contribution.contribution_name"
        v-bind:version_name="contribution.version_name"
        v-bind:department_name="contribution.department_name"
        v-bind:ends_at="contribution.version_ends_at"
        v-bind:status_contributor="contribution.version_status_contributor" />

    </div>
  </div>
</template>

<script>
import ContributorContributionsListItem from '@/components/ContributorContributionsListItem/ContributorContributionsListItem'

export default {
  name: 'ContributorContributionsList',

  components: {
    ContributorContributionsListItem
  },

  props: [
    'contributions'
  ],

  methods: {
    // c
  }
}
</script>

<style scoped>

#contributions-list-header {
  height: 60px;
  color: #999999;
  background-color: rgba(255,255,255,0.7);
}

</style>