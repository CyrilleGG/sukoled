<template>
  <div class="form-container">
    <form id="login-form">

      <input id="username" v-model="input.username" type="text" placeholder="Username" name="username">

      <input id="password" v-model="input.password" type="password" placeholder="Password" name="password">

      <input type="submit" value="Login" v-on:click.prevent="login()">
      
    </form>
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

  methods: {
    login () {
      if (this.input.username !== '' && this.input.password !== '') {
        axios.post('http://localhost:3000/api/login', this.input)

          .then((response) => {
            console.log('Success!')

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
            console.log('NOPE')
          })

      } else {
        console.log('Please, enter a username and a password')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    min-height: 20vh;
  }

  input {
    display: block;
    max-width: 10%;
  }
</style>
