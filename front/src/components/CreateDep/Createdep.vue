<template>
  <div class="form-container">
    <h1>{{ msg }}</h1>
    <form id="login-form">
      <input type="text" name="slug" v-model="input.slug" id="slug" placeholder="Slug">
      <input type="text" name="name" v-model="input.name" id="name" placeholder="Name">
      <input type="submit" value="Login" v-on:click.prevent="sendToDb()">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: 'Createdep',
  data () {
    return {
      msg: 'Create a new department here',
      input: {
        slug: '',
        name: ''
      },
      data: null
    }
  },

  methods: {
    sendToDb () {
      if (this.input.slug !== '' && this.input.name !== '') {
        axios.post('http://localhost:3000/createdep', this.input)

          .then((response) => {
            console.log('Success!')
          })

          .catch((error) => {
            console.log('NOPE')
          })

      } else {
        console.log('Please, enter a slug and a name')
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
