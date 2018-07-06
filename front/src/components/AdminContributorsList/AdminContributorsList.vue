<template>
  <div class="col-lg-12">

    <div class="row mb-3">
      <filter-departments v-on:selected-department="selectedDepartment = $event" />
      <filter-periodicities v-on:selected-periodicity="selectedPeriodicity = $event" />
      <filter-monthly v-if="selectedPeriodicity == 'monthly'" />
      <filter-quarterly v-if="selectedPeriodicity == 'quarterly'" />
    </div>

    <div class="row">
      <div id="contributors-list" class="col-lg-12">
        <div id="contributors-list-header" class="row px-2">

          <div class="col-lg-1 d-flex justify-content-center align-items-center">
            <b-form-checkbox class="mr-0" v-model="checked" v-on:change="all ($event)"></b-form-checkbox>
          </div>
          <p class="col-lg-1 my-auto text-center text-uppercase">Order</p>
          <p class="col-lg-3 my-auto text-uppercase">Contribution</p>
          <p class="col-lg-2 my-auto text-center text-uppercase">Last request</p>
          <p class="col-lg-2 my-auto text-center text-uppercase">Last iteration</p>
          <p class="col-lg-1 my-auto text-center text-uppercase">Status</p>
          <p class="col-lg-2 my-auto text-right text-uppercase">Action</p>

        </div>

        <b-list-group id="contributors-list-items" class="row" flush>
          <admin-contributors-list-item
            v-for="(contribution, index) in contributions"
            v-if="(contribution.department == selectedDepartment || selectedDepartment == 'all') && (contribution.period == selectedPeriodicity || selectedPeriodicity == 'all')"
            v-bind:key="index"
            v-bind:checked="contribution.checked"
            v-bind:order="contribution.contribution_order"
            v-bind:name="contribution.contribution_name"
            v-bind:starts_at="contribution.version_starts_at"
            v-bind:modified_at="contribution.version_created_at"
            v-bind:status_admin="contribution.version_status_admin"
            v-on:check-state="updateCheckedItems ($event)"
          />
        </b-list-group>
        
      </div>
    </div>

    <p>{{ selectedContributions }}</p>

  </div> 
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

import AdminContributorsListItem from '@/components/AdminContributorsListItem/AdminContributorsListItem'
import FilterDepartments from '@/components/FilterDepartments/FilterDepartments'
import FilterPeriodicities from '@/components/FilterPeriodicities/FilterPeriodicities'
import FilterMonthly from '@/components/FilterMonthly/FilterMonthly'
import FilterQuarterly from '@/components/FilterQuarterly/FilterQuarterly'

export default {
  name: 'AdminContributorsList',

  components: {
    FilterDepartments,
    FilterPeriodicities,
    FilterMonthly,
    FilterQuarterly,
    AdminContributorsListItem
  },

  data () {
    return {
      checked: false,
      selectedPeriodicity: 'all',
      selectedDepartment: 'all',
      contributions: [],
      
      selectedContributions: []
    }
  },

  created () {
    axios.get('http://localhost:3000/api/contributions')
      .then((response) => {
        for (var i = 0; i < response.data.contributions.length; i++) {
          response.data.contributions[i].checked = false
        }
        this.$data.contributions = response.data.contributions
      })

      .catch((error) => {
        console.log('No contribs')
      })
  },

  methods: {
    updateCheckedItems (contribution) {
      const contributions = this.$data.contributions
      const selected = this.$data.selectedContributions
      if (contribution[0] == true) {
        for (var i = 0; i < contributions.length; i++) {
          if (contributions[i].name == contribution[1].name) {
            this.$data.contributions[i].checked = true
          }
        }
        this.$data.selectedContributions.push(contribution[1])
      } else {
        for (var i = 0; i < contributions.length; i++) {
          if (contributions[i].name == contribution[1].name) {
            this.$data.contributions[i].checked = false
          }
        }
        for (var j = 0; j < selected.length; j++) {
          if (contribution[1].name == selected[j].name) {
            this.$data.selectedContributions.splice(j, 1)
          }
        }
      }
    },

    all (check) {                                               // bug : dernier élément du tableau contributions push dans selectedContributions
      const contributions = this.$data.contributions
      var selected = this.$data.selectedContributions
      if (check == true) {
        for (var i = 0; i < contributions.length; i++) {
          for (var j = 0; j < selected.length; j++) {
            if (contributions[i].name == selected[j].name) {
              this.$data.selectedContributions.splice(j, 1)
            }
          }
          this.$data.selectedContributions.push(contributions[i])
          contributions[i].checked = true
        }
      } else {
        for (var i = 0; i < contributions.length; i++) {
          contributions[i].checked = false
          this.$data.selectedContributions.splice(i)
        }
      }
    }
  }
}
</script>

<style scoped>

#contributors-list {
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
}

#contributors-list #contributors-list-header {
  height: 60px;
  color: #999999;
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

</style>