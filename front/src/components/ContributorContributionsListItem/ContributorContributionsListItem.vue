<template>
  <div class="contributions-list-item col-lg-12 mb-2">
    <div class="row px-2 h-100">

      <div class="contribution-name col-lg-2 my-auto">
        <p class="mb-0 ">{{ department_name }}</p>
        <p v-if="department_name == 'RAF'" class="mb-0 font-italic">{{ name }}</p>
      </div>

      <p class="col-lg-2 my-auto">{{ starts_at }}</p>

      <p class="col-lg-2 my-auto">{{ ends_at }}</p>

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

  props: [
    'name',
    'department_name',
    'starts_at',
    'ends_at',
    'status_contributor'
  ],

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

.contribution-name p:nth-child(2) {
  font-size: 0.8rem;
}

</style>