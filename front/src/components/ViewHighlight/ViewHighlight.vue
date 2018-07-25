<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0">Highlights</h2>
          <h4 class="col-lg-7 pl-0">Grouping of different highlights of paper reporting</h4>

          <div class="col-lg-2 ml-auto pr-0 text-right">
              <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
          </div>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-12 comment">

            <view-highlight-comment class="border right-column"
              v-for="(highlight, index) in highlights"
              v-bind:key="index"
              v-bind:name="highlight.contribution_name"
              v-bind:department="highlight.department_name"
              v-bind:highlight="highlight.highlight"
            />

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
import { http } from '../../http'
import moment from 'moment'

import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewHighlightComment from '@/components/ViewHighlightComment/ViewHighlightComment'

export default {
  name: 'ViewBusinessLine',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewHighlightComment
  },

  data () {
    return {
      highlights: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }

    http.get('highlights')
      .then(response => {
        this.$data.highlights = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    moment (date) {
      return moment(date).format('MMMM-YY')
    },

    printPage () {
      document.getElementById('print').style.display = 'none'
      window.print()
      document.getElementById('print').style.display = 'inline-block'
    }
  }
}
</script>

<style scoped>

#Viewer .page-content {
  margin-top: 98px;
  min-height: 85vh;
}

#Viewer .page-content h2 {
  font-size: 1.6rem;
}

#Viewer .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#Viewer .page-content .divider {
  background-color: #e7e7e7;
}

#Viewer .right-column {
  margin-bottom:15px;
}

.comment div div {
    color:white;
}

.purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

.purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

</style>
