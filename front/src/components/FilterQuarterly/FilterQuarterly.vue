<template>
  <div class="col-lg-2 pr-3 pl-0">
    <b-form-select id="filter-quarterly" v-model="selected" :options="options" v-on:change="updateFilter($event)">
      <template slot="first">
        <option value="null" disabled>Quarter</option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'FilterQuarterly',

  data () {
    return {
      selected: null,
      options: [
        { value: 'all', text: 'All'},
        { value: moment( moment().quarter() ).format('YYYY-MM-01T00:00:00.000') + 'Z', text: 'Q' + moment().subtract(1, 'quarters').format('Q YYYY') },
        { value: moment( moment().subtract(1, 'quarters').quarter() ).format('YYYY-MM-01T00:00:00.000') + 'Z', text: 'Q' + moment().subtract(2, 'quarters').format('Q YYYY') },
        { value: moment( moment().subtract(2, 'quarters').quarter() ).format('YYYY-MM-01T00:00:00.000') + 'Z', text: 'Q' + moment().subtract(3, 'quarters').format('Q YYYY') },
        { value: moment( moment().subtract(3, 'quarters').quarter() ).format('YYYY-MM-01T00:00:00.000') + 'Z', text: 'Q' + moment().subtract(4, 'quarters').format('Q YYYY') }
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