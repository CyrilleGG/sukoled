<template>
  <div class="col-lg-2 pr-0">
    <b-form-select id="filter-periodicities" v-model="selected" :options="options" v-on:change="updateFilter ($event)"></b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterPeriodicities',
  data () {
    return {
      selected: 'all',
      options: {
        all: 'All',
        monthly: 'Monthly',
        quarterly: 'Quarterly'
      }
    }
  },

  methods: {
    updateFilter (selected) {
      this.$emit('selected-periodicity', selected)
    }
  }
}
</script>

<style scoped>



</style>