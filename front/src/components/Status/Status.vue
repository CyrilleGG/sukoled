<template>
<div class="col-lg-2 my-auto">
  <p class="status d-inline mb-0 py-2 px-3 text-uppercase" v-bind:class="displayClass ()">
    {{ status }}
  </p>
</div>
</template>

<script>

export default {
  name: 'Status',

  props: [
    'status'
  ],

  methods: {
    displayClass () {
      if (this.$props.status == 'not delivered') {
        return 'not-delivered'
      } else if (this.$props.status == 'on hold') {
        return 'on-hold'
      } else {
        return this.$props.status
      }
    }
  }
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

.progress, .invalid {
  background-color: #fdad2a;
}

.hold, .not-delivered {
  background-color: #f93519;
}

.delivered, .pending {
  background-color: #914eb7;
}

</style>