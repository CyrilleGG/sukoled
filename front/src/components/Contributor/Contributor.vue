<template>
  <div id="Contributor" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-9 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 text-center">Hi! Welcome back to the Hestia</h2>
          <p v-if="numOfAlerts > 1" id="sub-title" class="col-lg-12 text-center">{{ numOfAlerts }} elements require your attention. Do not hesitate to check the details.</p>
          <p v-else id="sub-title" class="col-lg-12 text-center">{{ numOfAlerts }} element requires your attention. Do not hesitate to check the details.</p>
        </div>

        <div class="row mb-5">
          <contributor-contributions-list v-bind:contributions="contributions.waiting" />
        </div>

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">History</h2>
          <h4 class="col-lg-7 pl-0">You can consult your latest contributions sent</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>

        <div class="row">
          <contributor-contributions-list v-if="contributions.done.length > 0" v-bind:contributions="contributions.done" />
          <p class="col-lg-12">You have no history.</p>
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
import ContributorContributionsList from '@/components/ContributorContributionsList/ContributorContributionsList'

export default {
  name: 'Contributor',

  components: {
    Header,
    Footer,
    ContributorContributionsList
  },

  data () {
    return {
      numOfAlerts: null,
      contributions: {
        waiting: [],
        done: []
      }
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }

    axios.get('http://localhost:3000/api/contributor/'+ this.$root.$data.userInfo.username)
      .then((response) => {
        for (var i = 0; i < response.data.data.waiting.length; i++) {
          this.$data.contributions.waiting = response.data.data.waiting
        }
        for (var i = 0; i < response.data.data.done.length; i++) {
          this.$data.contributions.done = response.data.data.done
        }
      })

      .catch((error) => {
        console.log(error)
      })
    
    this.$data.numOfAlerts = this.$data.contributions.waiting.length + 1
  }
}
</script>

<style scoped>

#Contributor .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#Contributor .page-content h2 {
  font-size: 1.5rem;
}

#Contributor .page-content #sub-title {
  color: #999999;
}

#Contributor .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#Contributor .page-content .divider {
  background-color: #e7e7e7;
}

</style>
