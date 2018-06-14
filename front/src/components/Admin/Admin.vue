<template>
  <div id="Admin" class="container-fluid">
    <Header :role="userInfo.role" />
    <div class="row py-5 page-content">
      <div class="col-lg-8 mx-auto">
        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Contributions</h2>
          <h4 class="col-lg-7 pl-0">Watch the progress of the different contributions</h4>
          <div class="col-lg-2 ml-auto mr-3">
            <b-btn id="new-campaign" size="small">New campaign <img src="@/assets/icons/next.png" alt=""></b-btn>
          </div>
          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        <div class="row">
          <FilterContributors />
          <FilterPeriodicities />
          <FilterMonths />
          <FilterSemesters />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import FilterContributors from '@/components/FilterContributors/FilterContributors'
import FilterPeriodicities from '@/components/FilterPeriodicities/FilterPeriodicities'
import FilterMonths from '@/components/FilterMonths/FilterMonths'
import FilterSemesters from '@/components/FilterSemesters/FilterSemesters'

export default {
  name: 'Admin',

  components: {
    Header,
    Footer,
    FilterContributors,
    FilterPeriodicities,
    FilterMonths,
    FilterSemesters
  },

  data () {
    return {
      userInfo: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    }
    this.$data.userInfo = this.$root.$data.userInfo
  }
}
</script>

<style scoped>

#Admin .page-content h2 {
  font-size: 1.6rem;
}

#Admin .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#Admin #new-campaign {
  background-color: #8e44ad;
  border-color: #8e44ad;
}

#Admin #new-campaign:hover {
  background-color: #793a93;
  border-color: #793a93;
}

#Admin #new-campaign img {
  height: 20px;
}

#Admin .page-content .divider {
  background-color: #e7e7e7;
}

</style>
