<template>
  <div id="AdminManagePolicies" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-6 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Manage policies</h2>
          <h4 class="col-lg-7 pl-0">Manage from here the users policies</h4>
        </div>

        <div class="row">
          <div id="manage-policies" class="col-lg-12  my-auto mx-auto">


            <div class="row mb-5 rounded py-4 pl-5 pr-5 content">

              <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

              <h3 class="col-lg-12 mb-5 pl-5">Select the contribution you would like to manage</h3>

              <b-form-select id="filter-contributions" class="col-lg-5 mb-3 ml-5" :options="this.contributions"></b-form-select>

            </div>



            <div class="row mb-5 rounded py-4 pl-5 pr-5 content">

              <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

              <h3 class="col-lg-12 mb-5 pl-5">Manage the users that can contribute to this contribution</h3>

              <b-form class="col-lg-12 mb-5 pl-5">
                <b-form-group class="row pl-3">
                  <b-form-input id="add-user" class="d-inline-block col-lg-4" type="text" placeholder="Write the username" name="add-user"></b-form-input>
                  <b-button class="purple ml-3" size="sm">Add</b-button>
                </b-form-group>
              </b-form>

              <div class="col-lg-12 mb-3 pl-5">
                <div class="d-inline-block mr-2 user">
                  <p class="d-inline-block mb-0 px-2">username</p>
                  <div class="d-inline-block pr-3 pl-2">X</div>
                </div>
              </div>

            </div>


          </div>
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'AdminManagePolicies',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      contributions: ['contrib1', 'contrib2']
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
  },

  methods: {
    // c
  }
}
</script>

<style scoped>

#AdminManagePolicies .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#AdminManagePolicies .page-content h2 {
  font-size: 1.6rem;
}

#AdminManagePolicies .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#AdminManagePolicies #manage-policies .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#AdminManagePolicies #manage-policies .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminManagePolicies #manage-policies h3 {
  font-size: 1.2rem;
}

#AdminManagePolicies #manage-policies .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#AdminManagePolicies #manage-policies .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#AdminManagePolicies #manage-policies .user {
  color: #914eb7;
  border: 1px solid #914eb7;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: 0.3s ease;
}

#AdminManagePolicies #manage-policies .user:hover {
  color: #ffffff;
  background-color: #914eb7;
}

#AdminManagePolicies #manage-policies .user>p,
#AdminManagePolicies #manage-policies .user>div {
  line-height: 1.5rem;
}

#AdminManagePolicies #manage-policies .user>div {
  border-left: 1px solid #8e44ad;
}

#AdminManagePolicies #manage-policies .user:hover>div {
  cursor: pointer;
  border-left: 1px solid #ffffff;
}

</style>