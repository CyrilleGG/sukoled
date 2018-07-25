<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-4">
          <h2 class="col-lg-12 pl-0 text-uppercase">Top 20</h2>
          <h4 class="col-lg-7 pl-0">Indicators in €m - (source : GCM/ Credit reporting. Financial Department)</h4>

          <div class="col-lg-2 ml-auto pr-0 text-right">
              <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
          </div>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-9 pl-0">

            <p v-if="results == null">Loading...</p>
            <view-top-20-list v-else v-bind:top_companies="top_companies" v-bind:results="results" />

          </div>
          <div class="col-lg-3">

            <!-- <view-comment class="border right-column"
              v-for="(comment, index) in comments"
              v-bind:key="index"
              v-bind:title="comment.title"
              v-bind:comment="comment.comment"
            /> -->

            <div v-if="results !== null" id="view-comment" class="row">
              <table class="table col-lg-12">
                <tr scope="row">
                  <th scope="col" id="result-header" colspan="2" class="border-top-0 text-center">Result</th>
                </tr>
                <tr scope="row">
                  <td scope="col" class="text-right">{{ currentMonth () }} :</td>
                  <td scope="col" class="text-left px-0">{{ results.current }}</td>
                </tr>
                <tr scope="row">
                  <td scope="col" class="text-right">{{ referenceMonth () }} :</td>
                  <td scope="col" class="text-left px-0">{{ results.reference }}</td>
                </tr>
              </table>
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
import { http } from '../../http'
import moment from 'moment'

import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewTop20List from '@/components/ViewTop20List/ViewTop20List'
import ViewComment from '@/components/ViewComment/ViewComment'

export default {
  name: 'Viewer',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewTop20List,
    ViewComment
  },

  data () {
    return {
      top_companies: [],
      results: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }

    http.get('dtm/top/'+ moment().year() +'/'+ moment().subtract('1', 'months').month())
      .then(response => {
        this.$data.top_companies = response.data.data.companies
        this.$data.results = response.data.data.total
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    currentMonth () {
      return moment().subtract(1, 'months').format('MMMM-YY')
    },

    referenceMonth () {
      return moment().subtract(1, 'years').month(11).format('MMMM-YY')
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

#view-comment {
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
}

#view-comment #view-comment-header {
  height: 30px;
  font-weight:bold;
  color:purple;
  text-transform: uppercase;
}

.view-result-box {
    width:100%;
    margin-left:0 !important;
    margin-right:0 !important;
    margin-bottom:0 !important;
}

.box-content {
    margin-left: 1.5rem !important;
    margin-right: 1.5rem !important;
}

table {
    margin-bottom:0;
}

tr:first-child{
    font-weight: bold;
}

td {
    text-align:right
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
