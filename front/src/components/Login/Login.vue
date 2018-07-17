<template>
  <div id="Login" class="container-fluid">
    <div class="row">

      <div class="col-lg-9 px-0">
        <img src="@/assets/welcome.png" class="w-100" alt="Welcome image">
      </div>

      <div id="welcome" class="col-lg-3 pt-5">
        <div class="row">
          <h1 class="col-lg-12 mb-0 text-center">Natixis</h1>
          <p class="col-lg-12 mb-5 text-center text-uppercase">Hestia</p>
          <h3 class="col-lg-12 mt-3 text-center">Welcome</h3>
          <h4 class="col-lg-8 mx-auto mb-3 text-center">Please, enter your username and password</h4>

          <b-form id="login" class="col-lg-12 my-3">
            <div class="row">
              <b-form-input id="username" class="col-lg-9 mx-auto my-2 rounded-0" v-model="input.username" type="text" placeholder="Username" name="username" autocomplete="off"></b-form-input>
              <b-form-input id="password" class="col-lg-9 mx-auto my-2 rounded-0" v-model="input.password" type="password" placeholder="Password" name="password"></b-form-input>
              <b-button class="col-lg-9 mx-auto my-2 rounded-0 purple" v-on:click.prevent="login()">Login</b-button>
            </div>
          </b-form>
          
          <p id="error" class="col-lg-9 mx-auto border border-danger p-3 text-danger">The username or password is incorrect.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: 'Login',
  
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      data: null
    }
  },

  updated() {
    document.getElementById('error').style.display = 'none'
  },

  methods: {
    login () {
      if (this.input.username !== '' && this.input.password !== '') {
        axios.post('http://localhost:3000/api/login', this.input)

          .then((response) => {
            this.$emit('auth', true)
            this.$root.$data.userInfo = response.data

            const role = this.$root.$data.userInfo.role
            if (role == 'mod') {
              this.$router.replace( {name: 'admin'} )
            } else if (role == 'contrib'){
              this.$router.replace( {name: 'contributor'} )
            } else {
              this.$router.replace( {name: 'viewer'} )
            }
          })

          .catch((error) => {
            document.getElementById('error').style.display = 'flex'
          })

      } else {
        document.getElementById('error').style.display = 'flex'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#Login {
  max-height: 100vh;
  overflow: hidden;
}

#Login #welcome {
  background-color: #ffffff;
}

#Login #welcome h1 {
  color: #8e44ad;
}

#Login #welcome h3 {
  font-size: 1.2rem;
}

#Login #welcome h4 {
  font-size: 1rem;
}
#Login #welcome #error {
  display: none;
  font-size: 0.9rem;
  box-sizing: border-box;
}

#Login .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#Login .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

</style>
