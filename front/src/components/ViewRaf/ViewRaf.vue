<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>
<div class="page-content">
    <div class="row py-5">
        <div class="col-lg-10 mx-auto">

            <div class="row mb-5">
            <h2 class="col-lg-12 pl-0">RAF</h2>
            <h4 class="col-lg-7 pl-0">Risk Appetite Framework indicators</h4>

            <div class="col-lg-2 ml-auto pr-0 text-right">
                <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
            </div>

            <div class="w-100"></div>
            <div class="col-lg-12 mt-3 pt-1 divider"></div>
            </div>
        </div>
    </div>
            
    <div class="row">
        <div class="col-lg-12">
            

            <table class="table table-striped border mr-5">
                <thead>
                    <tr>
                        <th/>
                        <th scope="col">Risk Type</th>
                        <th/>
                        <th
                            v-for="(date, dateindex) in dates"
                            v-bind:key="dateindex"
                            v-bind:date="date.date"
                        >
                            {{ moment(date) }}
                        </th>
                        <th scope="col" class="text-center raf-limit"> Limit </th>
                        <th scope="col" class="text-center raf-threshold"> Threshold for declaration </th>
                        <th scope="col" class="text-center"> Remarks </th>
                        
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div>Market Risk</div> 
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">Global VaR</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, globalvindex) in marketRisk.globalVar.values" 
                            v-bind:key="globalvindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ marketRisk.globalVar.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ marketRisk.globalVar.threshold }}</span>
                        </td>
                        <td v-if="marketRisk.globalVar.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ marketRisk.globalVar.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="4" class="text-center table-title rotate">
                            <div>Credit Risk</div> 
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">Credit RWA</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, creditindex) in creditRisk.creditRwa.values" 
                            v-bind:key="creditindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ creditRisk.creditRwa.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ creditRisk.creditRwa.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.creditRwa.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.creditRwa.remark }}</td>
                    </tr>
                    <tr>
                        <!-- <td></td> -->
                        <td class="text-center">NPL Rate</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, nplindex) in creditRisk.nplRate.values" 
                            v-bind:key="nplindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ creditRisk.nplRate.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ creditRisk.nplRate.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.nplRate.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.nplRate.remark }}</td>
                    </tr>
                    <tr>
                        <td class="text-center">Watchlist exposures (excluding WL3)</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, wlindex) in creditRisk.wacthlistExposure.values" 
                            v-bind:key="wlindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ creditRisk.wacthlistExposure.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ creditRisk.wacthlistExposure.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.wacthlistExposure.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.wacthlistExposure.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="4" class="text-center table-title rotate">
                            <div>Concentration Risk</div> 
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">Warehousing</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, warehousingindex) in concentrationRisk.warehousing.values" 
                            v-bind:key="warehousingindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ concentrationRisk.warehousing.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ concentrationRisk.warehousing.threshold }}</span>
                        </td>
                        <td v-if="concentrationRisk.warehousing.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ concentrationRisk.warehousing.remark }}</td>
                    </tr>
                    <tr>
                        <td class="text-center">Country</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, countryindex) in concentrationRisk.country.values" 
                            v-bind:key="countryindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text"></span>
                            <span class="line-red"/> 
                            <span class="threshold-text"></span>
                        </td>
                        <td v-if="concentrationRisk.country.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ concentrationRisk.country.remark }}</td>
                    </tr>
                    <tr>
                        <td class="text-center">Individual RWA</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, indirwaindex) in concentrationRisk.individualRWA.values" 
                            v-bind:key="indirwaindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ concentrationRisk.individualRWA.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ concentrationRisk.individualRWA.threshold }}</span>
                        </td>
                        <td v-if="concentrationRisk.individualRWA.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ concentrationRisk.individualRWA.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div>Operational Risk</div> 
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">Ratio incidents/GOI</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, ratiogindex) in operationalRisk.ratioIncidents.values" 
                            v-bind:key="ratiogindex"
                            v-bind:value="value"
                        >
                            <p v-if="value == ''" class="text-center">NA</p>
                            <p v-else>{{ value }}</p>
                        </td>

                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3" style="display: none"/>
                            <span class="limit-text">{{ operationalRisk.ratioIncidents.limit }}</span>
                            <span class="line-red"/> 
                            <span class="threshold-text">{{ operationalRisk.ratioIncidents.threshold }}</span>
                        </td>
                        <td v-if="operationalRisk.ratioIncidents.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ operationalRisk.ratioIncidents.remark }}</td>
                    </tr>
                </tbody>
            </table>


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

export default {
  name: 'ViewRaf',

  components: {
    Header,
    HeaderView,
    Footer
  },

  data () {
    return {
        dates: [],
        marketRisk: {
            globalVar: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            }
        },
        creditRisk: {
            creditRwa: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            },
            nplRate: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            },
            wacthlistExposure: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            },
        },
        concentrationRisk: {
            warehousing: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            },
            country: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            },
            individualRWA: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            }
        },
        operationalRisk: {
            ratioIncidents: {
                limit: null,
                threshold: null,
                values: [],
                remark: ''
            }
        }
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }

    http.get('raf')
        .then(response => {
            response.data.data.forEach(raf => {
                if (this.$data.dates.length == 0) {
                    this.$data.dates.push(raf.version_ends_at)
                } else {
                    if (!this.$data.dates.includes(raf.version_ends_at)) {
                        this.$data.dates.push(raf.version_ends_at)
                    }
                }

                if (raf.contribution_order == 1) {
                    this.$data.marketRisk.globalVar.values.push(raf.contribution_value)
                    this.$data.marketRisk.globalVar.limit = raf.contribution_limit
                    this.$data.marketRisk.globalVar.threshold = raf.contribution_threshold
                    this.$data.marketRisk.globalVar.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 9) {
                    this.$data.creditRisk.creditRwa.values.push(raf.contribution_value)
                    this.$data.creditRisk.creditRwa.limit = raf.contribution_limit
                    this.$data.creditRisk.creditRwa.threshold = raf.contribution_threshold
                    this.$data.creditRisk.creditRwa.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 11) {
                    this.$data.creditRisk.nplRate.values.push(raf.contribution_value)
                    this.$data.creditRisk.nplRate.limit = raf.contribution_limit
                    this.$data.creditRisk.nplRate.threshold = raf.contribution_threshold
                    this.$data.creditRisk.nplRate.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 12) {
                    this.$data.creditRisk.wacthlistExposure.values.push(raf.contribution_value)
                    this.$data.creditRisk.wacthlistExposure.limit = raf.contribution_limit
                    this.$data.creditRisk.wacthlistExposure.threshold = raf.contribution_threshold
                    this.$data.creditRisk.wacthlistExposure.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 15) {
                    this.$data.concentrationRisk.warehousing.values.push(raf.contribution_value)
                    this.$data.concentrationRisk.warehousing.limit = raf.contribution_limit
                    this.$data.concentrationRisk.warehousing.threshold = raf.contribution_threshold
                    this.$data.concentrationRisk.warehousing.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 18) {
                    this.$data.creditRisk.country.values.push(raf.contribution_value)
                    this.$data.creditRisk.country.limit = raf.contribution_limit
                    this.$data.creditRisk.country.threshold = raf.contribution_threshold
                    this.$data.creditRisk.country.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 20) {
                    this.$data.creditRisk.individualRWA.values.push(raf.contribution_value)
                    this.$data.creditRisk.individualRWA.limit = raf.contribution_limit
                    this.$data.creditRisk.individualRWA.threshold = raf.contribution_threshold
                    this.$data.creditRisk.individualRWA.remark = raf.version_comment_contributor
                } else if (raf.contribution_order == 27) {
                    this.$data.operationalRisk.ratioIncidents.values.push(raf.contribution_value)
                    this.$data.operationalRisk.ratioIncidents.limit = raf.contribution_limit
                    this.$data.operationalRisk.ratioIncidents.threshold = raf.contribution_threshold
                    this.$data.operationalRisk.ratioIncidents.remark = raf.version_comment_contributor
                }
            });
        })
        .catch(error => {
            console.log(error)
        })
  },

  methods: {
    moment (date) {
        return moment(date).format('MMMM') ;
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

.py-5{
    padding-bottom: 0rem !important;
}




table {
    margin-bottom:15px;
    background-color:#fff;
}

.table td {
    vertical-align:middle;
}

thead {
    color: #B5BBC9;
}

.margin-table {
    margin-left:-3em !important;
}

.raf-gradient {
    height:100%;
    background: #FF8B94; /* For browsers that do not support gradients */
    background: linear-gradient(to right, #DCEDC1, #fcf3a7, #fcf3a7, #FF8B94);
    position:relative;
    overflow-y:hidden;
    overflow-x:hidden;
    -webkit-print-color-adjust: exact;
}

.raf-limit {
    color:orange;
}

.raf-threshold {
    color:red;
}

.row-name {
    padding-top:1.5rem;
    padding-bottom:1.5rem;
    vertical-align: baseline;
    text-align:center !important;
}

.row-name-second {
    vertical-align: middle !important;
}

.rotate {
    text-align: center;
    white-space: nowrap;
    width: 1.5em;
    height:100%;
    background-color:#464b5a;
    color: #ffffff;
}

.rotate div {
    -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
    -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
    -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
    filter:  progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083);  /* IE6,IE7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083)"; /* IE8 */
}

.dot {
  height: 15px;
  width: 15px;
  background-color: rgb(36, 196, 36);
  border-radius: 50%;
  display: inline-block;
}

.dot.position-3{
    position:absolute;
    top:41%;
}

.line-orange {
    width: 100%;
    height: 0px;
    background-color: transparent;
    border: rgb(255, 166, 0); /*on supprime le style par défaut*/
    border-style:dashed;
    -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
    -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
    -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
    position:absolute;
    overflow-y:hidden;
    overflow-x:hidden;
    right:25%;
}

.line-red {
    width: 100%;
    height: 0px;
    background-color: transparent;
    border: rgb(255, 0, 0); /*on supprime le style par défaut*/
    border-style:dashed;
    -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
    -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
    -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
    position:absolute;
    overflow-y:hidden;
    overflow-x:hidden;
    left:25%;
}

.limit-text {
    background-color:transparent;
    position:absolute;
    left:30%;
    top:35%;
}

.threshold-text {
    background-color:transparent;
    position:absolute;
    left:79%;
    top:35%;
}

tr .remarks{
    max-width:250px;
}

.data-now {
    font-weight:bold;
}

.purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
  -webkit-print-color-adjust: exact;
}

.purple:hover {
  border-color: #793a93;
  background-color: #793a93;
  -webkit-print-color-adjust: exact;
}

</style>
