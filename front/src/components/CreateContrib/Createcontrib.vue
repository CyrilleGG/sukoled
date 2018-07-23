<template>
  <div class="form-container">
    <h1>{{ msg }}</h1>
    <form id="login-form">
      <!-- Champ à remplir + description -->
      <p> Name (Text) </p>
      <input type="text" name="name" v-model="input.name" id="name" placeholder="Name">

      <p> Period (mensuel/trimestriel) </p>
      <div>
        <b-form-select v-model="input.period" :options="options" class="mb-3" name="period" id="period">
        </b-form-select>
      </div>

      <p> User (user) </p>
      <input type="text" name="user_id" v-model="input.user_id" id="user_id" placeholder="User">
      <p> Department (nom en minuscule) </p>
      <input type="text" name="department_id" v-model="input.department_id" id="department_id" placeholder="Department">
      <p> Limit (text) </p>
      <input type="text" name="limit" v-model="input.limit" id="limit" placeholder="Limit">
      <p> Treshold (text) </p>
      <input type="text" name="threshold" v-model="input.threshold" id="threshold" placeholder="Treshold">
      <input type="text" name="input" v-model="input.input" id="input" placeholder="Input">
      <input type="text" name="inputName" v-model="input.inputName" id="inputName" placeholder="inputName">
      <input type="text" name="description" v-model="input.description" id="description" placeholder="Description">
      <input type="text" name="file" v-model="input.file" id="file" placeholder="File">

      <input type="submit" value="Login" v-on:click.prevent="sendToDb()">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'

export default {
  name: 'CreateContrib',
  data () {
    return {
      msg: 'Create a new contribution here',
      input: {
        // Input demandés vide -- remplit pour testing
        name: '',
        period: '',
        user_id:'',
        department_id:'', // get la liste de departements
        limit:'',
        threshold:'',
        input:'',
        inputName:'',
        description:'',
        file:'',
        status_admin:'hold',
        status_contributor:'not delivered',
        starts_at:'2018-06-20 10:37:07.288293+00',
        ends_at:'2018-06-20 10:37:07.288293+01'
      },
      data: null,
      selected:null,
      options:[
        // Valeur par défaut
        { value:'monthly',text:'monthly'},
        { value:'quaterly', text:'quaterly'}
      ]
    }
  },

  methods: {
    sendToDb () {
      // Envoyer ces infos au back
      if (this.input.name !== '' && this.input.period !== '' && this.input.user_id !== '' && this.input.department_id !== '' && this.input.limit !== '' && this.input.threshold !== '' && this.input.input !== '' && this.input.inputName !== '' && this.input.description !== '' && this.input.file !== '' && this.input.starts_at !== '' && this.input.ends_at !=='') {
        http.post('createcontrib', this.input)

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
