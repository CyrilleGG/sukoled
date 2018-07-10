<template>
  <div id="AdminNewCampaign" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <b-form id="new-campaign" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-2 pl-5">When do you want to start ?</h3>
          <p class="col-lg-12 mb-5 pl-5">Select a month or a quarter</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-radio-group id="periodicities" class="col-lg-6 my-auto" v-model="selectedPeriodicity" :options="periodicities" name="periodicities"></b-form-radio-group>

              <b-form-select v-if="selectedPeriodicity == 'monthly'" id="month" class="col-lg-3" v-model="input.starts_at" :options="months"></b-form-select>
              <b-form-select v-else id="quarter" class="col-lg-3" v-model="input.starts_at" :options="quarters"></b-form-select>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-2 pl-5">Which contributions do you want?</h3>
          <p class="col-lg-12 mb-5 pl-5">Select the contributions from which you need data</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-radio-group id="departments" class="col-lg-6 my-2" v-model="selectedDepartment" :options="departments" name="departments"></b-form-radio-group>

              <b-list-group v-if="selectedDepartment == 'raf'" class="col-lg-6">
                <b-list-group-item v-for="(contribution, index) in contributions.raf" :key="index">
                  <b-form-checkbox v-model="input.contributions" :value="contribution">{{ contribution.contribution_name }}</b-form-checkbox>
                </b-list-group-item>
              </b-list-group>

              <b-list-group v-else class="col-lg-6">
                <b-list-group-item v-for="(contribution, index) in contributions.subsidaries" :key="index">
                  <b-form-checkbox v-model="input.contributions" :value="contribution">{{ contribution.contribution_name }}</b-form-checkbox>
                </b-list-group-item>
              </b-list-group>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-2 pl-5">Want to add instructions?</h3>
          <p class="col-lg-12 mb-5 pl-5">You can enter a message that will be sent to all concerned contributors</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="message" class="col-lg-12" v-model="message" placeholder="Write your request..." :rows="4"></b-form-textarea>

            </div>
          </div>
        </b-form-group>
        

        <div id="actions" class="row">
          <div class="col-lg-12 px-0 text-right">
            <b-button class="mx-1 purple" v-b-modal.confirm size="md">Submit</b-button>
          </div>
        </div>

        <b-modal v-if="input.contributions.length > 0" id="confirm" ref="confirm" hide-footer>
          <p>You are about to send an email in order to recover <span>{{ displayNumOfcontributions () }}</span> for <span>{{ displayPeriod () }}</span>, with the following message :</p>
          <p id="display-message" class="p-3 rounded">{{ input.message }}</p>
          <b-button size="md" v-on:click="closeModal ()">Cancel</b-button>
          <b-button class="green" v-on:click="createCampaign ()" replace size="md">Confirm</b-button>
        </b-modal>

      </b-form>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'AdminNewCampaign',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      selectedPeriodicity: 'monthly',
      selectedDepartment: 'raf',

      periodicities: [
        { value: 'monthly', text: 'Monthly' },
        { value: 'quarterly', text: 'Quarterly' }
      ],
      months: [
        { value: moment( moment().year() + '-01-01' ).month(0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'January' },
        { value: moment( moment().year() + '-01-01' ).month(1).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'February' },
        { value: moment( moment().year() + '-01-01' ).month(2).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'March' },
        { value: moment( moment().year() + '-01-01' ).month(3).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'April' },
        { value: moment( moment().year() + '-01-01' ).month(4).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'May' },
        { value: moment( moment().year() + '-01-01' ).month(5).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'June' },
        { value: moment( moment().year() + '-01-01' ).month(6).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'July' },
        { value: moment( moment().year() + '-01-01' ).month(7).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'August' },
        { value: moment( moment().year() + '-01-01' ).month(8).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'September' },
        { value: moment( moment().year() + '-01-01' ).month(9).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'October' },
        { value: moment( moment().year() + '-01-01' ).month(10).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'November' },
        { value: moment( moment().year() + '-01-01' ).month(11).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'December' }
      ], 
      quarters: [
        { value: moment( moment().year() + '-01-01' ).quarter(1).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'Q1' },
        { value: moment( moment().year() + '-01-01' ).quarter(2).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'Q2' },
        { value: moment( moment().year() + '-01-01' ).quarter(3).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'Q3' },
        { value: moment( moment().year() + '-01-01' ).quarter(4).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z', text: 'Q4' }
      ],

      departments:[
        { value: 'raf', text: 'RAF' },
        { value: 'subsidaries', text: 'Subsidaries' }
      ],
      contributions: {
        raf: [],
        subsidaries: []
      },

      input: {
        starts_at: '',
        ends_at: '',
        contributions: []
        // message: null
      },
      message: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }

    axios.get('http://localhost:3000/api/campaign/')
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].department_slug == 'raf') {
            this.$data.contributions.raf.push(response.data[i])
          } else {
            this.$data.contributions.subsidaries.push(response.data[i])
          }
        }
      })
      .catch((error) => {
        console.log('No contribs')
      })
  },

  updated() {
    if (this.$data.selectedPeriodicity == 'monthly') {
      this.$data.input.ends_at = moment(this.$data.input.starts_at).add('27', 'days').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z'
    } else {
      this.$data.input.ends_at = moment(this.$data.input.starts_at).add('2', 'months').add('27', 'days').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z'
    }
  },

  methods: {
    displayNumOfcontributions () {
      if (this.$data.input.contributions.length > 0 && this.$data.input.contributions.length > 1) {
        return this.$data.input.contributions.length + ' contributions'
      } else if (this.$data.input.contributions.length = 1) {
        return '1 contribution'
      }
    },

    displayPeriod () {
      var period = this.$data.input.starts_at
      if (period.length > 0) {
        if (period.length > 2) {
          for (var i = 0; i < this.$data.months.length; i++) {
            if (period == this.$data.months[i].value) {
              return this.$data.months[i].text
              break
            }
          }
        } else {
          for (var i = 0; i < this.$data.quarters.length; i++) {
            if (period == this.$data.quarters[i].value) {
              return this.$data.quarters[i].text
              break
            }
          }
        }
      }
    },

    createCampaign () {
      const contributions = this.$data.input.contributions
      var version_name = 'Report for '
      if (this.$data.selectedPeriodicity == 'monthly') {
        version_name = version_name + moment(this.$data.input.starts_at).format('MMMM YYYY')
      } else {
        version_name = version_name + 'Q' + moment(this.$data.input.starts_at).quarter() + ' ' + moment().year()
      }
      for (var i = 0; i < contributions.length; i++) {
        axios.post('http://localhost:3000/api/campaign/', {
          contribution_id: contributions[i].contribution_id,
          version_name: version_name,
          user_id: this.$root.$data.userInfo.user_id,
          starts_at: this.$data.input.starts_at,
          ends_at: this.$data.input.ends_at,
        })
          .then((response) => {
            this.$router.replace( {name: 'admin'} )
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },

    closeModal () {
      this.$refs.confirm.hide()
    }
  }
}
</script>

<style scoped>

#AdminNewCampaign .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#AdminNewCampaign .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#AdminNewCampaign .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminNewCampaign h3 {
  font-size: 1.2rem;
}

#AdminNewCampaign .list-group {
  max-height: 160px;
  overflow: scroll;
  overflow-x:hidden;
}

#AdminNewCampaign #message {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#AdminNewCampaign #confirm span {
  color: #8e44ad;
}

#AdminNewCampaign #confirm #display-message {
  color: #999999;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
}

#AdminNewCampaign .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminNewCampaign .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#AdminNewCampaign .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#AdminNewCampaign .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#AdminNewCampaign .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#AdminNewCampaign .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>