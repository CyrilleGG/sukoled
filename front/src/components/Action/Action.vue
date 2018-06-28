<template>
  <div class="col-lg-1 my-auto text-right">

    <b-button v-if="status == 'hold'" class="py-1 px-3" size="sm" variant="outline-primary">resend</b-button>

    <b-button v-else class="py-1 px-3" :to="{ path: 'review'}" append size="sm" variant="outline-primary">view</b-button>
    
  </div>
</template>

<script>

export default {
  name: 'Action',

  props: [
    'status'
  ]
}
</script>

<style scoped>

.btn-outline-primary {
  color: #914eb7;
  border-color: #914eb7;
  border-radius: 15px;
  font-size: 0.8rem;
}

.btn-outline-primary:hover {
  color: #ffffff;
  background-color: #914eb7;
}

</style>