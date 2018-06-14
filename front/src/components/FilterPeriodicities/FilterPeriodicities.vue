<template>
  <div class="col-lg-2 pr-0">
    <b-form-select id="filter-periodicities" v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterPeriodicities',
  data () {
    return {
      selected: 'months',
      options: {
        months: 'Months',
        semesters: 'Semesters',
        all: 'All'
      }
    }
  }
}
</script>

<style scoped>



</style>