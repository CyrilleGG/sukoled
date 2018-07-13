<template>
  <div id="AdminViewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div v-if="this.data !== null" class="row py-5 page-content">
      <div class="col-lg-8  my-auto mx-auto">

        <div class="row mb-3 rounded py-4 pl-5 content">

          <h3 class="col-lg-12 mb-5 pl-0">{{ data.contribution.contribution_name }}</h3>

          <table v-if="department_slug == 'raf'" class="col-lg-11 d-block mb-4 rounded">
            <tr class="row">

              <th class="col-lg-4 py-3 pl-5">Name</th>
              <th class="col-lg-2 py-3 text-center">{{ lastMonth () }}</th>
              <th class="col-lg-2 py-3 text-center">{{ month () }}</th>
              <th class="col-lg-2 py-3 text-center">Limit</th>
              <th class="col-lg-2 py-3 text-center">Threshold</th>

            </tr>
            <tr class="row">

              <td class="col-lg-4 py-3 pl-5">{{ data.input.input_name }}</td>
              <td class="col-lg-2 py-3 text-center">xx-1</td>
              <td id="value" class="col-lg-2 py-3 text-center last">{{ data.input.input_value }}</td>
              <td id="input" class="col-lg-2 py-3 text-center last"><b-form-input :id="data.input.input_slug" class="text-center" v-model="data.input.input_value" type="text" :name="data.input.input_slug"></b-form-input></td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_limit }}</td>
              <td class="col-lg-2 py-3 text-center">{{ data.contribution.contribution_threshold }}</td>

            </tr>
          </table>

          <p class="col-lg-12 mb-0 pl-0 font-weight-bold">Your comment</p>
          <p v-if="data.input.comment_contributor !== null || data.input.comment_contributor !== ''" class="col-lg-12 mb-3 pl-0 light">{{ data.input.comment_contributor }}</p>
          <p v-else class="col-lg-12 mb-0 pl-0">The contributor didn't write any comment for this contribution</p>

          <p v-if="data.input.highlight !== null" class="col-lg-12 mb-0 pl-0 font-weight-bold">Contributor's highlights</p>
          <p v-if="data.input.highlight !== null" class="col-lg-12 mb-3 pl-0 light">higlights du contributeur</p>
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
      department_slug: this.$route.query.department_slug
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

    axios.get('http://localhost:3000/api/inputs/'+ contribution_id +'/version/'+ version_id)
      .then((response) => {
        this.$data.data = response.data
      })

      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    month () {
      return moment().subtract(1, 'months').format('MMMM')
    },

    lastMonth () {
      return moment().subtract(2, 'months').format('MMMM')
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