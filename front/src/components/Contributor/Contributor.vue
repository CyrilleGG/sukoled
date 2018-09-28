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
          <p v-else class="col-lg-12">You have no history.</p>
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

    this.$root.$data.formInput = null

    http.get('contributor/'+ this.$root.$data.userInfo.username)
      .then((response) => {
        const wrong = response.data.data.contributions
        var right = wrong

        for (let i = 0; i < wrong.length; i++) {
          for (let j = 0; j < right.length; j++) {
            if (wrong[i].contribution_id == right[j].contribution_id && wrong[i].version_ends_at == right[j].version_ends_at) {
              if (wrong[i].version_status_contributor !== right[j].version_status_contributor && right[j].version_status_contributor == 'not sent') {
                right.splice(j, 1)
              }
            }
          }
        }

        let waiting = [];
        let done = [];

        right.forEach(function (contribution) {
          if (contribution.version_status_contributor !== 'done') {
            waiting.push(contribution);
          } else {
            done.push(contribution);
          }
        });

        for (var i = 0; i < waiting.length; i++) {
          this.$data.contributions.waiting = waiting
        }
        for (var i = 0; i < done.length; i++) {
          this.$data.contributions.done = done
        }

        this.$data.numOfAlerts = this.$data.contributions.waiting.length
      })
      .catch((error) => {
        console.log(error)
      })
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
