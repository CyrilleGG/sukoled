<template>
  <div class="col-lg-2 pr-0">
    <b-form-select id="filter-months" v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterMonths',
  data () {
    return {
      selected: 'jan',
      options: {
        jan: 'January',
        feb: 'February',
        all: 'All'
      }
    }
  }
}
</script>

<style scoped>



</style>