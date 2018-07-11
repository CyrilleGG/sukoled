<template>
  <div id="AdminManagePolicies" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-6 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Manage policies</h2>
          <h4 class="col-lg-7 pl-0">Manage from here the users policies</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>

        <div class="row">
          <div id="manage-policies" class="col-lg-12  my-auto mx-auto">


            <div class="row mb-5 rounded py-4 pl-3 pr-5 content">

              <h3 class="col-lg-12 mb-5 pl-3">Select the contribution you would like to manage</h3>

              <b-form-select id="filter-contributions" class="col-lg-5 mb-3 ml-3" v-model="selectedContribution" :options="this.contributions"></b-form-select>

            </div>



            <div class="row mb-5 rounded py-4 pl-3 pr-5 content">

              <h3 class="col-lg-12 mb-5 pl-3">Manage the users that can contribute to this contribution</h3>

              <b-form class="col-lg-12 mb-5 pl-3">
                <b-form-group class="row mb-0 pl-3">
                  <b-form-input id="add-user" class="d-inline-block col-lg-4" v-model="search" type="text" placeholder="Write the username" name="add-user" autocomplete="off"></b-form-input>
                  <b-button class="purple ml-3" v-on:click="addUser (search)" size="sm">Add</b-button>
                </b-form-group>
                <div v-if="search !== ''" class="row pl-3">
                  <ul id="search-results" class="col-lg-4 position-absolute mb-0 px-0">
                    <li v-for="(user,index) in filteredUsers" v-bind:key="index">
                      <span class="d-inline-block pl-3 w-100" v-on:click="search = user">{{ user }}</span>
                    </li>
                  </ul>
                </div>
              </b-form>

              <!-- <div class="col-lg-12 mb-3 pl-5">
                <div class="d-inline-block mr-2 user">
                  <p class="d-inline-block mb-0 px-2">username</p>
                  <div class="d-inline-block pr-3 pl-2">X</div>
                </div>
              </div> -->

            </div>


          </div>
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
  name: 'AdminManagePolicies',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      search: '',
      contributions: [],
      selectedContribution: null,
      users: []
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

    axios.get('http://localhost:3000/api/campaign')
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.$data.contributions.push({
            value: response.data[i].contribution_id,
            text: response.data[i].contribution_name
          })
        }
      })
      .catch((error) => {
        console.log('No contribs')
      })

      axios.get('http://localhost:3000/api/createPolicies')
      .then((response) => {
        console.log(response.data)
        for (var i = 0; i < response.data.users.length; i++) {
          this.$data.users.push(response.data.users[i])
        }
      })
      .catch((error) => {
        console.log('No contribs')
      })
  },

  computed: {
    filteredUsers () {
      var search = this.$data.search
      if (search !== '') {
        return this.$data.users.filter(user => {
          return user.toLowerCase().includes(search.toLowerCase())
        })
      }
    }
  },

  methods: {
    addUser (username) {
      axios.post('http://localhost:3000/api/createPolicies', {
        contribution_id: this.$data.selectedContribution,
        user_id: username
      })
        .then((response) => {
          console.log('success')
        }).catch((error) => {
          console.log(error)
        })
    }
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

#AdminManagePolicies .page-content .divider {
  background-color: #e7e7e7;
}

#AdminManagePolicies #manage-policies .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1);
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

#AdminManagePolicies #manage-policies #search-results {
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0 5px 25px rgba(0,0,0,0.15);
  list-style: none;
}

#AdminManagePolicies #manage-policies #search-results span {
  transition: 0.3s ease;
}

#AdminManagePolicies #manage-policies #search-results span:hover {
  background-color: #eeeeee;
  text-decoration: none;
  cursor: pointer;
}

#AdminManagePolicies #manage-policies .user {
  position: relative;
  color: #914eb7;
  border: 1px solid #914eb7;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: 0.3s ease;
}

#AdminManagePolicies #manage-policies #search-results li {
  line-height: 30px;
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