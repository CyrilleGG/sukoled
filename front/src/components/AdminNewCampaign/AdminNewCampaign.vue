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
        { value: '2018-01-01T00:00:01.000Z', text: 'January' },
        { value: '2018-02-01T00:00:01.000Z', text: 'February' },
        { value: '2018-03-01T00:00:01.000Z', text: 'March' },
        { value: '2018-04-01T00:00:01.000Z', text: 'April' },
        { value: '2018-05-01T00:00:01.000Z', text: 'May' },
        { value: '2018-06-01T00:00:01.000Z', text: 'June' },
        { value: '2018-07-01T00:00:01.000Z', text: 'July' },
        { value: '2018-08-01T00:00:01.000Z', text: 'August' },
        { value: '2018-09-01T00:00:01.000Z', text: 'September' },
        { value: '2018-10-01T00:00:01.000Z', text: 'October' },
        { value: '2018-11-01T00:00:01.000Z', text: 'November' },
        { value: '2018-12-01T00:00:01.000Z', text: 'December' }
      ],
      quarters: [
        { value: '2018-01-01T00:00:01.000Z', text: 'Q1' },
        { value: '2018-04-01T00:00:01.000Z', text: 'Q2' },
        { value: '2018-07-01T00:00:01.000Z', text: 'Q3' },
        { value: '2018-10-01T00:00:01.000Z', text: 'Q4' }
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
      message: null,
      test: moment('2018-10-01T00:00:01.000Z')
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

    axios.get('http://localhost:3000/api/contributions')
      .then((response) => {
        for (var i = 0; i < response.data.contributions.length; i++) {
          if (response.data.contributions[i].department_name == 'RAF') {
            this.$data.contributions.raf.push(response.data.contributions[i])
          } else {
            this.$data.contributions.subsidaries.push(response.data.contributions[i])
          }
        }
      })
      .catch((error) => {
        console.log('No contribs')
      })
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
      for (var i = 0; i < contributions.length; i++) {
        axios.post('/api/campaign/', {
          contribution_id: contribution.contribution_id,
          version_name: 'Report for ' + this.$data.input.starts_at,
          user_id: this.$root.$data.userInfo.user_id,
          starts_at: this.$data.input.starts_at,
          ends_at: this.$data.input.ends_at,
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