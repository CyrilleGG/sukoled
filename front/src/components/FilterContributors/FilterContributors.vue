<template>
  <div class="col-lg-2 pr-0">
    <b-form-select id="filter-contributors" v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterContributors',
  data () {
    return {
      selected: 'raf',
      options: {
        raf: 'RAF',
        affiliates: 'Affiliates',
        all: 'All'
      }
    }
  }
}
</script>

<style scoped>



</style>