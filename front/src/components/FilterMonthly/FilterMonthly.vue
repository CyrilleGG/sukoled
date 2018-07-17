<template>
  <div class="col-lg-2 pr-3 pl-0">
    <b-form-select id="filter-monthly" v-model="selected" :options="options" v-on:change="updateFilter($event)">
      <template slot="first">
        <option value="null" disabled>Month</option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'FilterMonthly',

  data () {
    return {
      selected: null,
      options: [
        { value: 'all', text: 'All'},
        { value: moment().format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(1, 'months').format('MMMM YYYY') },
        { value: moment().subtract(1, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(2, 'months').format('MMMM YYYY') },
        { value: moment().subtract(2, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(3, 'months').format('MMMM YYYY') },
        { value: moment().subtract(3, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(4, 'months').format('MMMM YYYY') },
        { value: moment().subtract(4, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(5, 'months').format('MMMM YYYY') },
        { value: moment().subtract(5, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(6, 'months').format('MMMM YYYY') },
        { value: moment().subtract(6, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(7, 'months').format('MMMM YYYY') },
        { value: moment().subtract(7, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(8, 'months').format('MMMM YYYY') },
        { value: moment().subtract(8, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(9, 'months').format('MMMM YYYY') },
        { value: moment().subtract(9, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(10, 'months').format('MMMM YYYY') },
        { value: moment().subtract(10, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(11, 'months').format('MMMM YYYY') },
        { value: moment().subtract(11, 'months').format('YYYY-MM-01T00:00:00.000') + 'Z', text: moment().subtract(12, 'months').format('MMMM YYYY') }
      ]
    }
  },

  methods: {
    updateFilter (selected) {
      this.$emit('selected-period', selected)
    }
  }
}
</script>

<style scoped>



</style>