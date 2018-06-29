<template>
  <div id="Admin" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-9 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Contributions</h2>
          <h4 class="col-lg-7 pl-0">Watch the progress of the different contributions</h4>

          <div class="col-lg-2 ml-auto mr-3">
            <b-button id="new-campaign" class="align-middle" :to="{ path: 'new-campaign'}" append  size="small">New campaign <img class="ml-1" src="@/assets/icons/plus-symbol.png" alt=""></b-button>
          </div>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>

        <div class="row">
          <admin-contributors-list />
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AdminContributorsList from '@/components/AdminContributorsList/AdminContributorsList'

export default {
  name: 'Admin',

  components: {
    Header,
    Footer,
    AdminContributorsList
  },

  data () {
    return {
      // c
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
  }
}
</script>

<style scoped>

#Admin .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#Admin .page-content h2 {
  font-size: 1.6rem;
}

#Admin .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#Admin #new-campaign {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#Admin #new-campaign:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#Admin #new-campaign img {
  height: 15px;
}

#Admin .page-content .divider {
  background-color: #e7e7e7;
}

</style>
