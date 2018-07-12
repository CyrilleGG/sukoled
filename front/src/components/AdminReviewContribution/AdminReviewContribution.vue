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

              <th class="col-lg-4 py-3 pl-5">Name</th>
              <th class="col-lg-2 py-3 text-center">n-1</th>
              <th class="col-lg-2 py-3 text-center">n</th>
              <th class="col-lg-2 py-3 text-center">Limit</th>
              <th class="col-lg-2 py-3 text-center">Threshold</th>

            </tr>
            <tr class="row">

              <td class="col-lg-4 py-3 pl-5">{{ data.input.input_name }}</td>
              <td class="col-lg-2 py-3 text-center">xx-1</td>
              <td class="col-lg-2 py-3 text-center last">{{ data.input.input_value }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_limit }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_threshold }}</td>

            </tr>
          </table>

          <p class="col-lg-12 mb-0 pl-0 font-weight-bold">Contributor's comment</p>
          <p v-if="data.input.comment_contributor !== null || data.input.comment_contributor !== ''" class="col-lg-12 mb-3 pl-0 light">{{ data.input.comment_contributor }}</p>
          <p v-else class="col-lg-12 mb-0 pl-0">The contributor didn't write any comment for this contribution</p>

          <p v-if="data.input.highlight !== null" class="col-lg-12 mb-0 pl-0 font-weight-bold">Contributor's highlights</p>
          <p v-if="data.input.highlight !== null" class="col-lg-12 mb-3 pl-0 light">higlights du contributeur</p>

          <b-form id="request-modification" class="col-lg-11 mt-4">

            <b-form-group id="comment-group" class="row">
              <b-form-textarea id="admin-comment" class="col-lg-12" v-model="comment_admin" placeholder="Write your request..." :rows="4"></b-form-textarea>
            </b-form-group>

            <div class="row">
              <div class="col-lg-12 px-0 text-right">
                <b-button class="mx-1 purple" size="md" v-on:click="hideComment ()">Cancel</b-button>
                <b-button class="mx-1 orange" v-on:click="sendModificationRequest ()" replace size="md">Send Request</b-button>
              </div>
            </div>

          </b-form>
        </div>

        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="mx-1 ml-auto purple" :to="{ path: './'}" replace size="md">Edit</b-button>
          <b-button class="mx-1 orange" size="md" v-on:click="displayComment ()">Request a modification</b-button>
          <b-button class="mx-1 green" :to="{ path: './'}" replace size="md">Validate</b-button>
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

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
      department_slug: this.$route.query.department_slug
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
    const parent_version_id = this.$route.query.parent_version_id

    axios.get('http://localhost:3000/api/inputs/'+ contribution_id +'/version/'+ version_id)
      .then((response) => {
        this.$data.data = response.data
        // this.$data.data = response.data.inputs
      })

      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
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

    sendModificationRequest () {
      axios.post('http://localhost:3000/api/versionRefused/'+ this.$route.query.version_id +'/'+ this.$route.query.contribution_id, {
        user_id: this.$root.$data.username,
        comment: this.$data.comment_admin
      })
        .then((response) => {
          this.$router.replace( {name: 'admin'} )
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