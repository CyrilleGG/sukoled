<template>
  <div id="ContributorReviewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div v-if="data !== null" class="row py-5 page-content">
      <div class="col-lg-7  my-auto mx-auto">

        <div class="row mb-3 rounded py-4 px-5 content">

          <h3 class="col-lg-12 pl-0">Review your contribution</h3>
          <p class="col-lg-12 mb-4 pl-0 font-italic">{{ data.contribution.contribution_name }}</p>

          <div v-if="data.input.comment_admin !== null" id="admin-comment" class="col-lg-12 d-flex align-items-center ali mb-4 rounded p-3">
            <img src="@/assets/icons/warning.png" width="40px" alt="Warning">
            <p v-html="data.input.comment_admin" class="d-inline-block mb-0 ml-4"></p>
          </div>

          <table v-if="department_slug == 'raf'" class="col-lg-12 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-6 py-3 pl-5">Name</th>
              <th class="col-lg-2 py-3 text-center">{{ month () }}</th>
              <th class="col-lg-2 py-3 text-center">Limit</th>
              <th class="col-lg-2 py-3 text-center">Threshold</th>

            </tr>
            <tr class="row">

              <td class="col-lg-6 py-3 pl-5">{{ data.input.input_name }}</td>
              <td class="col-lg-2 py-3 text-center last">{{ data.input.input_value }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_limit }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_threshold }}</td>

            </tr>
          </table>

          <table v-if="department_slug == 'subsidaries'" class="col-lg-12 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-8 py-3 pl-5">Name</th>
              <th class="col-lg-4 py-3 text-center">{{ month () }}</th>

            </tr>
            <tr v-for="(value, key, index) in data.input.version_file" class="row" :key="index">

              <td class="col-lg-8 py-3 pl-5">{{ key }}</td>
              <td class="col-lg-4 py-3 text-center last">{{ value }}</td>

            </tr>
          </table>

          <div class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Your comment</p>
              <p v-if="data.input.comment_contributor == '' || data.input.comment_contributor == null" class="col-lg-12 pl-0 text-danger">You didn't write any comment for this contribution</p>
              <p v-else v-html="data.input.comment_contributor" class="col-lg-12 mb-3 pl-0 light"></p>
            </div>
          </div>

          <div v-if="data.input.highlight !== null" class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Your highlights</p>
              <p v-if="data.input.highlight == '' || data.input.highlight == null" class="col-lg-12 pl-0 text-danger">You didn't write any highlight for this contribution</p>
              <p v-else v-html="data.input.highlight" class="col-lg-12 mb-3 pl-0 light"></p>
            </div>
          </div>

          <div v-if="data.input.highlight !== null" class="col-lg-12">
            <div class="row">
              <p class="col-lg-12 mt-3 mb-1 pl-0 font-weight-bold">Elements you added for this contribution</p>
              <p v-if="data.input.highlight == '' || data.input.highlight == null" class="col-lg-12 pl-0 text-danger">You didn't upload any additional element for this contribution</p>
              <p v-else class="col-lg-12 mb-3 pl-0 light">{{ data.input.highlight }}</p>
            </div>
          </div>

        </div>

        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="mx-1 ml-auto purple" v-on:click="goToModify ()" size="md">Modify the contribution</b-button>
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

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default {
  name: 'ContributorReviewContribution',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      department_slug: this.$route.query.department_slug,
      data: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
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
          this.$data.data = response.data.data
          this.$data.data.input.version_file = JSON.parse(this.$data.data.input.version_file)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  methods: {
    month () {
      return moment().subtract(1, 'months').format('MMMM')
    },

    lastMonth () {
      return moment().subtract(2, 'months').format('MMMM')
    },

    displayComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      form.style.display = 'block'
      actions.style.display = 'none'
    },

    hideComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      form.style.display = 'none'
      actions.style.display = 'flex'
    },

    goToModify () {
      const data = this.$data.data
      this.$root.$data.formInput = {
        comment_contributor: data.input.comment_contributor,
        highlight: data.input.highlight,
        contribution_id: data.contribution.contribution_id,
        contribution_limit: data.contribution.contribution_limit,
        contribution_threshold: data.contribution.contribution_threshold,
        contribution_values: {
          input_id: data.input.input_id,
          input_name: data.input.input_name,
          input_value: data.input.input_value,
        },
        department_slug: this.$data.department_slug,
        user_id: this.$root.$data.userInfo.user_id,
        version_id: this.$route.query.version_id
      }

      this.$router.replace({ name: 'contributor-send-contribution', query: { contribution_id: this.$route.query.contribution_id, version_id: this.$route.query.version_id, department_slug: this.$route.query.department_slug } })
    }
  }
}
</script>

<style scoped>

#ContributorReviewContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#ContributorReviewContribution .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#ContributorReviewContribution .step {
  left: -25px;
  top: 30px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorReviewContribution h3 {
  font-size: 1.2rem;
}

#ContributorReviewContribution #admin-comment {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

/* #ContributorReviewContribution #admin-comment p {
  line-height: 40px;
} */

#ContributorReviewContribution table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#ContributorReviewContribution table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#ContributorReviewContribution table .last {
  background-color: rgba(126,68,170, 0.2);
}

#ContributorReviewContribution #request-modification {
  display: none;
}

#ContributorReviewContribution #comment {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#ContributorReviewContribution .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorReviewContribution .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#ContributorReviewContribution .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#ContributorReviewContribution .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#ContributorReviewContribution .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#ContributorReviewContribution .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>