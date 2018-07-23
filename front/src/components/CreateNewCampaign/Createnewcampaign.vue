<template>
  <div class="form-container">
    <h1>{{ msg }}</h1>
    <form id="login-form">
      <!-- Champ à remplir + description -->
      <p> Contribution Id </p>
      <input type="text" name="contribution_id" v-model="input.contribution_id" id="contribution_id" placeholder="Contribution_id">
      <p> User (user) </p>
      <input type="text" name="user_id" v-model="input.user_id" id="user_id" placeholder="User">
      <p> Starts_at (timestamp) </p>
      <input type="text" name="starts_at" v-model="input.starts_at" id="starts_at" placeholder="Starts_at">
      <p> Ends_at (timestamp) </p>
      <input type="text" name="ends_at" v-model="input.ends_at" id="ends_at" placeholder="Ends_at">
      <p> Name (timestamp) </p>
      <input type="text" name="name" v-model="input.name" id="name" placeholder="Name">
      <input type="submit" value="Login" v-on:click.prevent="sendToDb()">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'

export default {
  name: 'CreateNewCampaign',
  data () {
    return {
      msg: 'Create a new campaign here',
      input: {
        // Input demandés vide -- remplit pour testing
        user_id: '', //'nico',
        starts_at: '', //'2018-06-20 10:37:07.288293+00',
        ends_at: '', //'2018-06-20 10:37:07.288293+01',
        contribution_id:'',
        name:''
      },
      data: null,
      selected:null
    }
  },

  methods: {
    sendToDb () {
      // Envoyer ces infos au back
      if (this.input.user_id !== '' && this.input.starts_at !== '' && this.input.ends_at !=='' && this.input.contribution_id !=='' && this.input.name !=='') {
        http.post('campaign/', this.input)

          .then((response) => {
            console.log('Success!')
          })

          .catch((error) => {
            console.log('NOPE')
          })

      } else {
        console.log('Please, enter a name and a name')
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
