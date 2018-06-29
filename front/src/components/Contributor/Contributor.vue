<template>
  <div id="Contributor" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-9 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 text-center">Hi! Welcome back to the Dashboard</h2>
          <p id="sub-title" class="col-lg-12 text-center">{{ numOfAlerts }} elements require your attention. Please, check the details.</p>
        </div>

        <div class="row mb-5">
          <contributor-contributions-list v-bind:contributions="contributions.ongoing" />
        </div>

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">History</h2>
          <h4 class="col-lg-7 pl-0">You can consult your old contributions here</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>

        <div class="row">
          <contributor-contributions-list v-bind:contributions="contributions.history" />
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
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
      numOfAlerts: 3,

      contributions: {
        ongoing: [
          {
            name: 'Global Exposure',
            department_name: 'RAF',
            starts_at: '01-06-2918',
            ends_at: '30-06-2018',
            status_contributor: 'invalid',
          }, {
            name: 'Lease',
            department_name: 'Lease',
            starts_at: '01-06-2018',
            ends_at: '30-06-2018',
            status_contributor: 'not delivered',
          }, {
            name: 'Factor',
            department_name: 'Factor',
            starts_at: '01-06-2018',
            ends_at: '30-06-2018',
            status_contributor: 'pending',
          }
        ],

        history: [
          {
            name: 'Global Exposure',
            department_name: 'RAF',
            starts_at: '01-05-2918',
            ends_at: '30-05-2018',
            status_contributor: 'done',
          }, {
            name: 'Lease',
            department_name: 'Lease',
            starts_at: '01-05-2018',
            ends_at: '30-05-2018',
            status_contributor: 'done',
          }, {
            name: 'Factor',
            department_name: 'Factor',
            starts_at: '01-05-2018',
            ends_at: '30-05-2018',
            status_contributor: 'done',
          }, {
            name: 'Global Exposure',
            department_name: 'RAF',
            starts_at: '01-04-2918',
            ends_at: '30-04-2018',
            status_contributor: 'done',
          }, {
            name: 'Lease',
            department_name: 'Lease',
            starts_at: '01-04-2018',
            ends_at: '30-04-2018',
            status_contributor: 'done',
          }, {
            name: 'Factor',
            department_name: 'Factor',
            starts_at: '01-04-2018',
            ends_at: '30-04-2018',
            status_contributor: 'done',
          }
        ]
      }
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }
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
