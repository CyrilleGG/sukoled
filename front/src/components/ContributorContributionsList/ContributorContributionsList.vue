<template>
  <div class="col-lg-12">
    <div id="contributions-list-header" class="row mb-2 px-2">

      <p class="col-lg-1 my-auto text-center text-uppercase">Type</p>
      <p class="col-lg-3 my-auto text-uppercase">Name</p>
      <p class="col-lg-2 my-auto text-uppercase">Deadline</p>
      <p class="col-lg-3 my-auto text-center text-uppercase">Modifications</p>
      <p class="col-lg-2 my-auto text-uppercase">Status</p>
      <p class="col-lg-1 my-auto text-right text-uppercase">Action</p>

    </div>
    <div class="row">

      <contributor-contributions-list-item></contributor-contributions-list-item>
      <contributor-contributions-list-item></contributor-contributions-list-item>

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