import axios from 'axios'
import VueAxios from 'vue-axios'

export const http = axios.create(
  {
    baseURL: 'http://localhost:3000/api/'
  })