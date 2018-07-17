<template>
  <div class="col-lg-2 pr-3 pl-0">
    <b-form-select id="filter-periodicities" v-model="selected" :options="options" v-on:change="updateFilter ($event)">
      <template slot="first">
        <option value="null" disabled>Periodicity</option>
      </template>
    </b-form-select>
  </div>
</template>

<script>

export default {
  name: 'FilterPeriodicities',

  data () {
    return {
      selected: null,
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