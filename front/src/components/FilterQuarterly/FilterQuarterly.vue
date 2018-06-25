<template>
  <div class="col-lg-2 pr-0">
    <b-form-select id="filter-quarterly" v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterQuarterly',
  data () {
    return {
      selected: 'q1',
      options: {
        q1: 'Q1',
        q2: 'Q2',
        all: 'All'
      }
    }
  }
}
</script>

<style scoped>



</style>