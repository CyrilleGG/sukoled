<template>
<div class="col-lg-1 my-auto">
  <p class="status d-inline mb-0 py-2 px-3 text-uppercase" v-bind:class="[status_admin]">
    {{ status_admin }}
  </p>
</div>
</template>

<script>

export default {
  name: 'Status',

  props: [
    'status_admin'
  ]
}
</script>

<style scoped>

.status {
  border-radius: 5px;
  line-height: 1rem;
  font-size: 0.7rem;
  color: #ffffff;
  background-color: #999999;
}

.done {
  background-color: #2ecc71;
}

.progress {
  background-color: #fdad2a;
}

.hold {
  background-color: #f93519;
}

.delivered {
  background-color: #914eb7;
}

</style>