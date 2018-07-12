<template>
  <div class="col-lg-2 pr-3 pl-0">
    <b-form-select id="filter-departments" v-model="selected" :options="options" v-on:change="updateFilter($event)"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterDepartments',
  data () {
    return {
      selected: 'all',
      options: {
        all: 'All',
        raf: 'RAF',
        subsidaries: 'Subsidaries'
      }
    }
  },

  methods: {
    updateFilter (selected) {
      this.$emit('selected-department', selected)
    }
  }
}
</script>

<style scoped>



</style>