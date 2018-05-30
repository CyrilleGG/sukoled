<template>
  <div class="form-container">
    <h1>{{ msg }}</h1>
    <form id="login-form">
      <input type="text" name="username" v-model="input.username" id="username" placeholder="Username">
      <input type="password" name="password" v-model="input.password" id="password" placeholder="Password">
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
      msg: 'Welcome to Bac à sable',
      input: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    login () {
      if (this.input.username !== '' && this.input.password !== '') {
        axios.post('http://localhost:3000/login', this.input)
          .then((response) => {
            console.log('Success!')
            this.$router.replace({name: 'welcome'})
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
