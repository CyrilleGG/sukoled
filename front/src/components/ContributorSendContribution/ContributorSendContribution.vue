<template>
  <div id="ContributorSendContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div v-if="data !== null" class="row py-5 page-content">
      <contributor-form-lease v-if="data.department_slug == 'lease'" v-bind:data="data" />
      <contributor-form-raf v-if="data.department_slug == 'raf'" v-bind:data="data" />
    </div>

    <Footer />
    
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ContributorFormLease from '@/components/ContributorFormLease/ContributorFormLease'
import ContributorFormRaf from '@/components/ContributorFormRaf/ContributorFormRaf'

export default {
  name: 'ContributorSendContribution',

  components: {
    Header,
    Footer,
    ContributorFormLease,
    ContributorFormRaf
  },

  data () {
    return {
      data: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }

    axios.get('http://localhost:3000/api/contributionRaf/'+ this.$route.query.contribution_id +'/version/'+ this.$route.query.version_id +'/user/'+ this.$root.$data.userInfo.username)
      .then((response) => {
        this.$data.data = response.data
      })

      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    //c
  }
}
</script>

<style scoped>

#ContributorSendContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

</style>