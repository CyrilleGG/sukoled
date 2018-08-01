<template>
  <div class="col-lg-12">

    <div class="row mb-3">
      <filter-departments v-on:selected-department="selectedDepartment = $event" />
      <filter-periodicities v-on:selected-periodicity="selectedPeriodicity = $event; selectedPeriod = 'all'" />
      <filter-monthly v-if="selectedPeriodicity == 'monthly'" v-on:selected-period="selectedPeriod = $event" />
      <filter-quarterly v-if="selectedPeriodicity == 'quarterly'" v-on:selected-period="selectedPeriod = $event" />
    </div>

    <div class="row">
      <div id="contributors-list" class="col-lg-12">
        <div id="contributors-list-header" class="row px-2">

          <div class="col-lg-1 d-flex justify-content-center align-items-center">
            <b-form-checkbox class="mr-0" v-model="checked" v-on:change="all ($event)"></b-form-checkbox>
          </div>
          <p class="col-lg-1 my-auto text-uppercase">Type</p>
          <p class="col-lg-1 my-auto text-center text-uppercase">Order</p>
          <p class="col-lg-2 my-auto text-uppercase">Name</p>
          <p class="col-lg-2 my-auto text-center text-uppercase">Deadline</p>
          <p class="col-lg-2 my-auto text-center text-uppercase">Last iteration</p>
          <p class="col-lg-1 my-auto text-center text-uppercase">Status</p>
          <p class="col-lg-2 my-auto text-right text-uppercase">Action</p>

        </div>

        <b-list-group id="contributors-list-items" class="row" flush>
          <admin-contributors-list-item
            v-for="(contribution, index) in contributions"
            v-if="(contribution.department_slug == selectedDepartment || selectedDepartment == 'all') && (contribution.contribution_period == selectedPeriodicity || selectedPeriodicity == 'all') && (contribution.version_starts_at == selectedPeriod || selectedPeriod == 'all')"
            v-bind:key="index"
            v-bind:checked="contribution.checked"
            v-bind:department_name="contribution.department_name"
            v-bind:department_slug="contribution.department_slug"
            v-bind:order="contribution.contribution_order"
            v-bind:name="contribution.contribution_name"
            v-bind:ends_at="contribution.version_ends_at"
            v-bind:modified_at="contribution.version_created_at"
            v-bind:status_admin="contribution.version_status_admin"
            v-bind:contribution_id="contribution.contribution_id"
            v-bind:version_id="contribution.version_id"
            v-bind:parent_version_id="contribution.parent_version_id"
            v-on:check-state="updateCheckedItems ($event)"
          />
        </b-list-group>
        
      </div>
    </div>

    <b-modal id="confirm" ref="confirm" hide-footer>
      <p>Are you sure to resend a contribution request ?</p>
      <b-button class="purple" v-on:click="closeModal ()" size="md">Cancel</b-button>
      <b-button class="green" v-on:click="closeModal ()" replace size="md">Confirm</b-button>
    </b-modal>

    <!-- <p>{{ selectedContributions }}</p> -->

  </div> 
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'
import moment from 'moment'

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
      selectedDepartment: 'all',
      selectedPeriodicity: 'all',
      selectedPeriod : 'all',
      contributions: [],
      
      selectedContributions: []
    }
  },

  created () {
    http.get('contributions')
      .then((response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          response.data.data[i].checked = false
          response.data.data[i].version_starts_at = moment(response.data.data[i].version_starts_at).format('YYYY-MM-DDT00:00:00.000') + 'Z'
          response.data.data[i].version_ends_at = moment(response.data.data[i].version_ends_at).format('YYYY-MM-DDT00:00:00.000') + 'Z'
        }
        this.$data.contributions = response.data.data
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

    all (check) {
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
    },

    closeModal () {
      this.$refs.confirm.hide()
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

#confirm .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#confirm .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#confirm .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#confirm .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>