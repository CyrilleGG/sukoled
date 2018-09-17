<template>
  <div id="AdminViewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div v-if="this.data !== null" class="row py-5 page-content">
      <div class="col-lg-7  my-auto mx-auto">

        <div class="row mb-3 rounded py-4 pl-5 content">

          <h3 class="col-lg-12 mb-5 pl-0">{{ data.contribution.contribution_name }}</h3>

          <table v-if="department_slug == 'raf'" class="col-lg-11 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-6 py-3 pl-3">Name</th>
              <th class="col-lg-2 py-3 text-center">{{ month () }}</th>
              <th class="col-lg-2 py-3 text-center">Limit</th>
              <th class="col-lg-2 py-3 text-center">Threshold</th>

            </tr>
            <tr class="row">

              <td class="col-lg-6 py-3 pl-3">{{ data.input.input_name }}</td>
              <td class="col-lg-2 py-3 text-center last">{{ data.input.input_value }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_limit }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_threshold }}</td>

            </tr>
          </table>

          <table v-if="department_slug == 'subsidaries'" class="col-lg-11 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-8 py-3 pl-5">Name</th>
              <th class="col-lg-4 py-3 text-center">{{ quarter () }}</th>

            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">Gross EAD*</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.exposure.grossEAD }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">Net EAD*</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.exposure.netEAD }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">out of which Real Estate Leasing net EAD</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.exposure.realEstate }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">out of which Equipment Leasing net EAD</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.exposure.equipment }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">out of which Renewable Energy net EAD</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.exposure.renewable }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">RWA Credit</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.rwa.rwaCredit }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">RWA Operational</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.rwa.rwaOperational }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">Defaulted Exposure</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.defaulted.exposure }}</td>
            </tr>
            
            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">% of defaulted net EAD</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.defaulted.netEAD }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">Cost of risk</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.costOfRisk.costOfRisk }}</td>
            </tr>

            <tr class="row">
              <td class="col-lg-8 py-3 pl-5">Cost of risk in % of net EAD</td>
              <td class="col-lg-4 py-3 text-center last">{{ view_file.costOfRisk.netEAD }}</td>
            </tr>

          </table>

          <div class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Contributor's comment</p>
              <p v-if="data.input.comment_contributor == '' || data.input.comment_contributor == null" class="col-lg-12 pl-0 text-danger">The contributor didn't write any comment for this contribution</p>
              <p v-else v-html="data.input.comment_contributor" class="col-lg-12 mb-3 pl-0 light"></p>
            </div>
          </div>

          <div v-if="data.input.highlight !== null" class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Contributor's highlights</p>
              <p v-if="data.input.highlight == '' || data.input.highlight == null" class="col-lg-12 pl-0 text-danger">The contributor didn't write any highlight for this contribution</p>
              <p v-else v-html="data.input.highlight" class="col-lg-12 mb-3 pl-0 light"></p>
            </div>
          </div>
        </div>

        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'
import moment from 'moment'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'AdminViewContribution',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      data: null,
      department_slug: this.$route.query.department_slug,
      view_file: {
        exposure: {
          grossEAD: null,
          netEAD: null,
          realEstate: null,
          equipment: null,
          renewable: null
        },
        rwa: {
          rwaCredit: null,
          rwaOperational: null,
          total: null
        },
        defaulted: {
          exposure: null,
          netEAD: null
        },
        costOfRisk: {
          costOfRisk: null,
          netEAD: null
        }
      }
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

    const contribution_id = this.$route.query.contribution_id
    const version_id = this.$route.query.version_id
    const department_slug = this.$route.query.department_slug

    if (department_slug == 'raf') {
      http.get('inputs/'+ contribution_id +'/version/'+ version_id)
        .then((response) => {
          this.$data.data = response.data.data
        })

        .catch((error) => {
          console.log(error)
        })
    } else if (department_slug == 'subsidaries') {
      http.get('versionView/'+ contribution_id +'/version/'+ version_id)
        .then((response) => {
          var json
          this.$data.data = response.data.data

          json = JSON.parse(this.$data.data.input.version_file)
          this.$data.view_file.exposure.grossEAD = json['Gross EAD*']
          this.$data.view_file.exposure.netEAD = json['Net EAD*']
          this.$data.view_file.exposure.realEstate = json['out of which Real Estate Leasing net EAD']
          this.$data.view_file.exposure.equipment = json['out of which Equipment Leasing net EAD']
          this.$data.view_file.exposure.renewable = json['out of which Renewable Energy net EAD']
          this.$data.view_file.rwa.rwaCredit = json['RWA Credit']
          this.$data.view_file.rwa.rwaOperational = json['RWA Operational']
          this.$data.view_file.rwa.total = json['Total RWA']
          this.$data.view_file.defaulted.exposure = json['Defaulted exposure']
          this.$data.view_file.defaulted.netEAD = json['% of defaulted net EAD']
          this.$data.view_file.costOfRisk.costOfRisk = json['Cost of risk']
          this.$data.view_file.costOfRisk.netEAD = json['Cost of risk in % of net EAD']

          this.$data.data.input.version_file = JSON.parse(this.$data.data.input.version_file)
        })

        .catch((error) => {
          console.log(error)
        })
    }
  },

  methods: {
    month () {
      return moment(this.$data.data.date).subtract(1, 'months').format('MMMM YY')
    },

    quarter () {
      return 'Q' + moment(this.$data.data.date).subtract(1, 'quarters').format('Q YYYY')
    }
  }
}
</script>

<style scoped>

#AdminViewContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#AdminViewContribution .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#AdminViewContribution .step {
  left: -25px;
  top: 30px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminViewContribution h3 {
  font-size: 1.2rem;
}

#AdminViewContribution table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#AdminViewContribution table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#AdminViewContribution table .last {
  background-color: rgba(126,68,170, 0.2);
}

#AdminViewContribution table #input {
  display: none;
}

#AdminViewContribution .light {
  color: #999999;
}

#AdminViewContribution #request-modification {
  display: none;
}

#AdminViewContribution #admin-comment {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#AdminViewContribution #cancel {
  display: none;
}

#AdminViewContribution #submit {
  display: none;
}

#AdminViewContribution .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminViewContribution .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#AdminViewContribution .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#AdminViewContribution .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#AdminViewContribution .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#AdminViewContribution .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>