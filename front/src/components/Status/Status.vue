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
      if (this.$props.status == 'not sent') {
        return 'not-sent'
      } else if (this.$props.status == 'in progress') {
        return 'in-progress'
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

.in-progress, .invalid {
  background-color: #fdad2a;
}

.unreceived, .not-sent {
  background-color: #f93519;
}

.delivered, .pending {
  background-color: #914eb7;
}

</style>
