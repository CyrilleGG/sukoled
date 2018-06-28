<template>
  <div class="contributions-list-item col-lg-12 mb-2">
    <div class="row px-2 h-100">

      <p class="col-lg-1 my-auto text-center">RAF</p>

      <p class="col-lg-3 my-auto">Report July 2018</p>

      <p class="col-lg-2 my-auto">June 30, 2018</p>

      <p class="col-lg-3 my-auto text-center">0</p>

      <status v-bind:status="status_contributor" />

      <action v-bind:status="status_contributor" />

    </div>
  </div>
</template>

<script>
import Status from '@/components/Status/Status'
import Action from '@/components/Action/Action'

export default {
  name: 'ContributorContributionsListItem',

  components: {
    Status,
    Action
  },

  data () {
    return {
      status_contributor: 'not delivered'
    }
  },

  methods: {
    // c
  }
}
</script>

<style scoped>

.contributions-list-item {
  border-radius: 0 0 10px 10px;
  height: 60px;
  background-color: #ffffff;
}

</style>