<template>
  <div id="ViewBusinessLine" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Breakdown BY Business line</h2>
          <h4 class="col-lg-7 pl-0">Indicators in €m - (source : GCM/ Credit reporting)</h4>

          <div class="col-lg-2 ml-auto pr-0 text-right">
              <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
          </div>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-7 pl-0">
                <p v-if="total.current == null">Loading...</p>
                <table v-else class="table table-striped border">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" class="text-uppercase text-center">Business line</th>
                            <th
                                v-for="(date, index) in dates"
                                v-bind:key="index"
                            >
                                <div scope="col" class="text-uppercase text-center"> {{ date }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr>
                            <td rowspan="10" class="text-center table-title rotate"> <div>CIB</div> </td>
                        </tr>
                        <tr v-for="(cib, cibindex) in cibs.current" v-bind:key="'cib'+cibindex">
                            <td class="text-left"> {{ cib.ind_business_line }} </td>
                            <td class="text-center"> {{ cib.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ cibs.previous[cibindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ cibs.reference[cibindex].sum_mt_expo_global }} </td>
                        </tr>


                        <tr>
                            <td rowspan="4" class="text-center table-title rotate"> <div>SFS</div> </td>
                        </tr>
                        <tr v-for="(sfs, sfsindex) in sfss.current" v-bind:key="'sfs'+sfsindex">
                            <td class="text-left"> {{ sfs.ind_business_line }} </td>
                            <td class="text-center"> {{ sfs.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ sfss.previous[sfsindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ sfss.reference[sfsindex].sum_mt_expo_global }} </td>
                        </tr>


                        <tr v-for="(insurance, insuranceindex) in insurances.current" v-bind:key="'insurance'+insuranceindex">
                            <td colspan="2" class="table-title text-left"> Insurance </td>
                            <td class="text-center"> {{ insurance.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ insurances.previous[insuranceindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ insurances.reference[insuranceindex].sum_mt_expo_global }} </td>
                        </tr>
                        

                        <tr v-for="(awm, awmindex) in awms.current" v-bind:key="'awm'+awmindex">
                            <td colspan="2" class="table-title text-left"> AWM </td>
                            <td class="text-center"> {{ awm.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ awms.previous[awmindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ awms.reference[awmindex].sum_mt_expo_global }} </td>
                        </tr>


                        <tr v-for="(coface, cofaceindex) in cofaces.current" v-bind:key="'coface'+cofaceindex">
                            <td colspan="2" class="table-title text-left"> Coface </td>
                            <td class="text-center"> {{ coface.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ cofaces.previous[cofaceindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ cofaces.reference[cofaceindex].sum_mt_expo_global }} </td>
                        </tr>
                        
                        
                        <tr v-for="(other, otherindex) in other_activities.current" v-bind:key="'other'+otherindex">
                            <td colspan="2" class="table-title text-left"> Insurance </td>
                            <td class="text-center"> {{ other.sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ other_activities.previous[otherindex].sum_mt_expo_global }} </td>
                            <td class="text-center"> {{ other_activities.reference[otherindex].sum_mt_expo_global }} </td>
                        </tr>


                        <tr>
                            <td class="text-center"></td>
                            <td class="text-center">Total</td>
                            <td class="text-center">{{ total.current }}</td>
                            <td class="text-center">{{ total.previous }}</td>
                            <td class="text-center">{{ total.reference }}</td>
                        </tr>


                    </tbody>
                </table>
          </div>
          <div class="col-lg-5">
            <view-comment class="border right-column"
              v-for="(comment, index) in comments"
              v-bind:key="index"
              v-bind:title="comment.title"
              v-bind:comment="comment.comment"
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
import ViewComment from '@/components/ViewComment/ViewComment'

export default {
  name: 'ViewBusinessLine',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewComment
  },

  data () {
    return {
        comments: [
            {
                title:"Comments",
                comment:"Business Line comment. The 20 biggest corporates represent 16.5% in the total corporate exposure as of end of Mars 2018 (compared to 16.7% as of end of February 2018)."
            }
        ],
        dates: [
            moment().subtract(2, 'months').format('MMMM-YY'),
            moment().subtract(3, 'months').format('MMMM-YY'),
            moment().subtract(1, 'years').month(11).format('MMMM-YY')
        ],
        cibs: {
            current: [],
            previous: [],
            reference: []
        },
        sfss: {
            current: [],
            previous: [],
            reference: []
        },
        insurances: {
            current: [],
            previous: [],
            reference: []
        },
        awms: {
            current: [],
            previous: [],
            reference: []
        },
        cofaces: {
            current: [],
            previous: [],
            reference: []
        },
        other_activities: {
            current: [],
            previous: [],
            reference: []
        },
        total: {
            current: null,
            previous: null,
            reference: null
        }
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }

    http.get('dtm/breakdown/line/'+ moment().year() +'/'+ moment().subtract(1, 'months').month())
        .then(response => {
            response.data.data.current.breakdown_current.forEach(line => {
                if (line.ind_core_business == 'CIB') {
                    this.$data.cibs.current.push(line)
                } else if (line.ind_core_business == 'SFS') {
                    this.$data.sfss.current.push(line)
                } else if (line.ind_core_business == 'Insurance') {
                    this.$data.insurances.current.push(line)
                } else if (line.ind_core_business == 'AWM') {
                    this.$data.awms.current.push(line)
                } else if (line.ind_core_business == 'Coface') {
                    this.$data.cofaces.current.push(line)
                } else {
                    this.$data.other_activities.current.push(line)
                }
            })
            this.$data.total.current = response.data.data.current.total_current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

            response.data.data.previous.breakdown_previous.forEach(line => {
                if (line.ind_core_business == 'CIB') {
                    this.$data.cibs.previous.push(line)
                } else if (line.ind_core_business == 'SFS') {
                    this.$data.sfss.previous.push(line)
                } else if (line.ind_core_business == 'Insurance') {
                    this.$data.insurances.previous.push(line)
                } else if (line.ind_core_business == 'AWM') {
                    this.$data.awms.previous.push(line)
                } else if (line.ind_core_business == 'Coface') {
                    this.$data.cofaces.previous.push(line)
                } else {
                    this.$data.other_activities.previous.push(line)
                }
            })
            this.$data.total.previous = response.data.data.previous.total_previous.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

            response.data.data.reference.breakdown_reference.forEach(line => {
                if (line.ind_core_business == 'CIB') {
                    this.$data.cibs.reference.push(line)
                } else if (line.ind_core_business == 'SFS') {
                    this.$data.sfss.reference.push(line)
                } else if (line.ind_core_business == 'Insurance') {
                    this.$data.insurances.reference.push(line)
                } else if (line.ind_core_business == 'AWM') {
                    this.$data.awms.reference.push(line)
                } else if (line.ind_core_business == 'Coface') {
                    this.$data.cofaces.reference.push(line)
                } else {
                    this.$data.other_activities.reference.push(line)
                }
            })
            this.$data.total.reference = response.data.data.reference.total_reference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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

#ViewBusinessLine .page-content {
  margin-top: 98px;
  min-height: 85vh;
}

#ViewBusinessLine .page-content h2 {
  font-size: 1.6rem;
}

#ViewBusinessLine .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#ViewBusinessLine .page-content .divider {
  background-color: #e7e7e7;
}

#ViewBusinessLine .right-column {
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
    background-color:#fff;
}

.table-title {
    background:#464b5a;
    color: #ffffff;
}

td {
    text-align:right;
}

.rotate {
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 1.5em;
}

.rotate div {
    -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
    -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
    -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
    filter:  progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083);  /* IE6,IE7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083)"; /* IE8 */
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
