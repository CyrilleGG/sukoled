<template>
  <div id="AdminReviewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div v-if="this.data !== null" class="row py-5 page-content">
      <div class="col-lg-8  my-auto mx-auto">

        <div class="row mb-3 rounded py-4 pl-5 content">

          <h3 class="col-lg-12 pl-0">Review the contribution</h3>
          <p class="col-lg-12 mb-4 pl-0 font-italic">{{ data.contribution.contribution_name }}</p>

          <table v-if="department_slug == 'raf'" class="col-lg-11 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-6 py-3 pl-5">Name</th>
              <th class="col-lg-2 py-3 text-center">{{ month () }}</th>
              <th class="col-lg-2 py-3 text-center">Limit</th>
              <th class="col-lg-2 py-3 text-center">Threshold</th>

            </tr>
            <tr class="row">

              <td class="col-lg-6 py-3 pl-5">{{ data.input.input_name }}</td>
              <td id="value" class="col-lg-2 py-3 text-center last">{{ data.input.input_value }}</td>
              <td id="input" class="col-lg-2 py-3 text-center last"><b-form-input :id="data.input.input_slug" class="text-center" v-model="data.input.input_value" type="text" :name="data.input.input_slug"></b-form-input></td>
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

          <div v-if="data.input.highlight !== null" class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Elements added for this contribution</p>
              <div class="col-lg-12 my-2" v-if="data.input.additionalFiles.length > 0">
                <div v-for="(file, index) in data.input.additionalFiles" class="mb-2" :key="index">
                  <img v-if="file.file_type == 'image/png' || file.file_type == 'image/jpeg' || file.file_type == 'image/svg+xml'" :id="index" :alt="file.name">
                  <div v-else>
                    <img src="@/assets/icons/file.png" class="d-inline-block icon" height="35px" alt="Additional file">
                    <p class="d-inline-block ml-3">{{ file.name }}</p>
                  </div>
                </div>
              </div>
              <p v-else class="col-lg-12 mb-3 pl-0 text-danger">The contributor didn't upload any additional element for this contribution</p>
            </div>
          </div>

          <b-form id="request-modification" class="col-lg-11 mt-4">

            <b-form-group id="comment-group" class="row">
              <b-form-textarea id="admin-comment" class="col-lg-12" v-model="comment_admin" placeholder="Write your feedback..." :rows="8" :no-resize="true"></b-form-textarea>
            </b-form-group>
            <div class="row">
              <div class="col-lg-12 px-0 text-right">
                <b-button class="mx-1 purple" size="md" v-on:click="hideComment ()">Cancel</b-button>
                <b-button class="mx-1 orange" v-on:click="comment_admin = comment_admin.replace(/\n/g, '<br>'); sendModificationRequest ()" replace size="md">Send</b-button>
              </div>
            </div>

          </b-form>
        </div>

        <div v-if="department_slug == 'raf'" id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button id="cancel" class="mx-1 ml-auto purple" v-on:click="hideEdit ()" size="md">Cancel</b-button>
          <b-button id="edit" class="mx-1 ml-auto purple" v-on:click="displayEdit ()" size="md">Edit</b-button>
          <b-button id="request-button" class="mx-1 orange" size="md" v-on:click="displayComment ()">Send feedback</b-button>
          <b-button id="validate" class="mx-1 green" v-on:click="acceptContribution ()" size="md">Validate</b-button>
          <b-button id="submit" class="mx-1 green" v-on:click="submitContribution ()" size="md">Submit</b-button>
        </div>

        <div v-else-if="department_slug == 'subsidaries'" id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button id="cancel" class="mx-1 ml-auto purple" v-on:click="hideEdit ()" size="md">Cancel</b-button>
          <b-button id="request-button" class="mx-1 ml-auto orange" size="md" v-on:click="displayComment ()">Send feedback</b-button>
          <b-button id="validate" class="mx-1 green" v-on:click="acceptContribution ()" size="md">Validate</b-button>
          <b-button id="submit" class="mx-1 green" v-on:click="submitContribution ()" size="md">Submit</b-button>
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
  name: 'AdminReviewContribution',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      data: null,
      comment_admin: '',
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

  mounted() {
    setTimeout(() => {
      this.readFiles()
    }, 100);
  },

  methods: {
    month () {
      return moment(this.$data.data.date).subtract(1, 'months').format('MMMM YY')
    },

    quarter () {
      return 'Q' + moment(this.$data.data.date).subtract(1, 'quarters').format('Q YYYY')
    },

    readFiles () {
      if (this.$data.data !== null) {
        const files = this.$data.data.input.additionalFiles

        if (!files) {} else {
          files.forEach((file, i) => {
            if (file.file_type == 'image/png' || file.file_type == 'image/jpeg' || file.file_type == 'image/svg+xml') {
              var binary = file.file_binary
              var type = file.file_type
              var url = "data:" + type + ';base64,/' + binary
              var output = document.getElementById(i)
              
              output.src = url
            }
          })
        }
      }
    },

    displayComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      actions.style.display = 'none'
      form.style.display = 'block'
    },

    hideComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      form.style.display = 'none'
      actions.style.display = 'flex'
    },

    displayEdit () {
      const input = document.getElementById('input')
      const cancel = document.getElementById('cancel')
      const edit = document.getElementById('edit')
      const value = document.getElementById('value')
      const request = document.getElementById('request-button')
      const validate = document.getElementById('validate')
      const vsubmit= document.getElementById('submit')
      edit.style.display = 'none'
      value.style.display = 'none'
      request.style.display = 'none'
      validate.style.display = 'none'
      input.style.display = 'table-cell'
      cancel.style.display = 'inline-block'
      submit.style.display = 'inline-block'
    },

    hideEdit () {
      const input = document.getElementById('input')
      const cancel = document.getElementById('cancel')
      const edit = document.getElementById('edit')
      const value = document.getElementById('value')
      const request = document.getElementById('request-button')
      const validate = document.getElementById('validate')
      const vsubmit= document.getElementById('submit')
      input.style.display = 'none'
      cancel.style.display = 'none'
      submit.style.display = 'none'
      value.style.display = 'table-cell'
      edit.style.display = 'inline-block'
      request.style.display = 'inline-block'
      validate.style.display = 'inline-block'
    },

    sendModificationRequest () {
      http.post('versionRefused/'+ this.$route.query.version_id +'/'+ this.$route.query.contribution_id, {
        user_id: this.$root.$data.userInfo.user_id,
        comment_admin: this.$data.comment_admin,
        input_value_id: this.$data.data.input.input_value_id
      })
        .then((response) => {
          this.$router.replace( {name: 'admin'} )
        })
        .catch((error) => {
          console.log(error)
        })
    },

    acceptContribution () {
      http.patch('versionValidate/'+ this.$route.query.version_id)
        .then((response) => {
          this.$router.replace({ name: 'admin' })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    submitContribution () {
      const input = this.$data.data.input
      
      http.patch('versionSubmit/'+ this.$route.query.version_id, input)
        .then((response) => {
          this.$router.replace({ name: 'admin' })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

#AdminReviewContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#AdminReviewContribution .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#AdminReviewContribution .step {
  left: -25px;
  top: 30px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminReviewContribution h3 {
  font-size: 1.2rem;
}

#AdminReviewContribution table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#AdminReviewContribution table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#AdminReviewContribution table .last {
  background-color: rgba(126,68,170, 0.2);
}

#AdminReviewContribution table #input {
  display: none;
}

#AdminReviewContribution .light {
  color: #999999;
}

#AdminReviewContribution #request-modification {
  display: none;
}

#AdminReviewContribution #admin-comment {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#AdminReviewContribution #cancel {
  display: none;
}

#AdminReviewContribution #submit {
  display: none;
}

#AdminReviewContribution .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminReviewContribution .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#AdminReviewContribution .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#AdminReviewContribution .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#AdminReviewContribution .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#AdminReviewContribution .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>