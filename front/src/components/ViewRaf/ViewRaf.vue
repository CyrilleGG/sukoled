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
                            v-for="(date, index) in dates"
                            v-bind:key="index"
                            v-bind:date="date.date"
                        >
                            <div scope="col" class="text-center"> {{ moment(date.date) }} </div>
                        </th>
                        <th scope="col" class="text-center raf-limit"> Limit </th>
                        <th scope="col" class="text-center raf-threshold"> Threshold for declaration </th>
                        <th scope="col" class="text-center"> Remarks </th>
                        
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">         <div>I.R Risk</div> 
                        </td>
                    <tr
                        v-for="(data, index) in risks"
                        v-bind:key="index"
                        v-bind:name="data.name"
                        v-bind:info_5="data.info_5"
                        v-bind:info_4="data.info_4"
                        v-bind:info_3="data.info_3"
                        v-bind:info_2="data.info_2"
                        v-bind:info_1="data.info_1"
                        v-bind:limit="data.limit"
                        v-bind:threshold="data.treshold"
                        v-bind:remarks="data.remarks"
                    >
                        <td class="text-center"> {{ data.name }} </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td v-if="data.info_5 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_5 }} </td>
                        <td v-if="data.info_4 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_4 }} </td>
                        <td v-if="data.info_3 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_3 }} </td>
                        <td v-if="data.info_2 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_2 }} </td>
                        <td v-if="data.info_1 == ''" class="text-center data-now">
                            <div> NA </div>
                        </td>
                        <td v-else class="text-center data-now"> {{ data.info_1 }} </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> {{ data.limit }} </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> {{ data.threshold }} </span>
                        </td>
                        <td class="text-center remarks"> Significant alert: TALEVERAS </td>
                    </tr>


                    <tr>
                        <td rowspan="4" class="text-center table-title rotate">         <div>Solvency</div> 
                        </td>
                    <tr
                        v-for="(data, index) in solvency"
                        v-bind:key="index"
                        v-bind:name="data.name"
                        v-bind:info_5="data.info_5"
                        v-bind:info_4="data.info_4"
                        v-bind:info_3="data.info_3"
                        v-bind:info_2="data.info_2"
                        v-bind:info_1="data.info_1"
                        v-bind:limit="data.limit"
                        v-bind:threshold="data.treshold"
                        v-bind:remarks="data.remarks"
                    >
                        <td class="text-center"> {{ data.name }} </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td v-if="data.info_5 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_5 }} </td>
                        <td v-if="data.info_4 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_4 }} </td>
                        <td v-if="data.info_3 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_3 }} </td>
                        <td v-if="data.info_2 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_2 }} </td>
                        <td v-if="data.info_1 == ''" class="text-center data-now">
                            <div> NA </div>
                        </td>
                        <td v-else class="text-center data-now"> {{ data.info_1 }} </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> {{ data.limit }} </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> {{ data.threshold }} </span>
                        </td>
                        <td class="text-center remarks">  </td>
                    </tr>


                    <tr>
                        <td rowspan="4" class="text-center table-title rotate">         <div>Insurance <br/> Risk</div> 
                        </td>
                    <tr
                        v-for="(data, index) in insurance"
                        v-bind:key="index"
                        v-bind:name="data.name"
                        v-bind:info_5="data.info_5"
                        v-bind:info_4="data.info_4"
                        v-bind:info_3="data.info_3"
                        v-bind:info_2="data.info_2"
                        v-bind:info_1="data.info_1"
                        v-bind:limit="data.limit"
                        v-bind:threshold="data.treshold"
                        v-bind:remarks="data.remarks"
                    >
                        <td class="text-center"> {{ data.name }} </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td v-if="data.info_5 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_5 }} </td>
                        <td v-if="data.info_4 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_4 }} </td>
                        <td v-if="data.info_3 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_3 }} </td>
                        <td v-if="data.info_2 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_2 }} </td>
                        <td v-if="data.info_1 == ''" class="text-center data-now">
                            <div> NA </div>
                        </td>
                        <td v-else class="text-center data-now"> {{ data.info_1 }} </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> {{ data.limit }} </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> {{ data.threshold }} </span>
                        </td>
                        <td class="text-center remarks">  </td>
                    </tr>


                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">         <div>A. M.</div> 
                        </td>
                    <tr
                        v-for="(data, index) in am"
                        v-bind:key="index"
                        v-bind:name="data.name"
                        v-bind:info_5="data.info_5"
                        v-bind:info_4="data.info_4"
                        v-bind:info_3="data.info_3"
                        v-bind:info_2="data.info_2"
                        v-bind:info_1="data.info_1"
                        v-bind:limit="data.limit"
                        v-bind:threshold="data.treshold"
                        v-bind:remarks="data.remarks"
                    >
                        <td class="text-center"> {{ data.name }} </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td v-if="data.info_5 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_5 }} </td>
                        <td v-if="data.info_4 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_4 }} </td>
                        <td v-if="data.info_3 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_3 }} </td>
                        <td v-if="data.info_2 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_2 }} </td>
                        <td v-if="data.info_1 == ''" class="text-center data-now">
                            <div> NA </div>
                        </td>
                        <td v-else class="text-center data-now"> {{ data.info_1 }} </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> {{ data.limit }} </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> {{ data.threshold }} </span>
                        </td>
                        <td class="text-center remarks">  </td>
                    </tr>


                    <tr>
                        <td rowspan="3" class="text-center table-title rotate">         <div>Finan Part.</div> 
                        </td>
                    <tr
                        v-for="(data, index) in finan"
                        v-bind:key="index"
                        v-bind:name="data.name"
                        v-bind:info_5="data.info_5"
                        v-bind:info_4="data.info_4"
                        v-bind:info_3="data.info_3"
                        v-bind:info_2="data.info_2"
                        v-bind:info_1="data.info_1"
                        v-bind:limit="data.limit"
                        v-bind:threshold="data.treshold"
                        v-bind:remarks="data.remarks"
                    >
                        <td class="text-center"> {{ data.name }} </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td v-if="data.info_5 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_5 }} </td>
                        <td v-if="data.info_4 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_4 }} </td>
                        <td v-if="data.info_3 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_3 }} </td>
                        <td v-if="data.info_2 == ''" class="text-center">
                            <div> - </div>
                        </td>
                        <td v-else class="text-center"> {{ data.info_2 }} </td>
                        <td v-if="data.info_1 == ''" class="text-center data-now">
                            <div> NA </div>
                        </td>
                        <td v-else class="text-center data-now"> {{ data.info_1 }} </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> {{ data.limit }} </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> {{ data.threshold }} </span>
                        </td>
                        <td class="text-center remarks">  </td>
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
        dates: [
            {
                date:"2018-03-01 00:00:00"
            },
            {
                date:"2018-02-01 00:00:00"
            },
            {
                date:"2017-04-01 00:00:00"
            },
            {
                date:"2017-05-01 00:00:00"
            },
            {
                date:"2017-08-01 00:00:00"
            }
        ],
        risks: [
            {
                name:"Stress Test +/-200bp",
                info_5:"",
                info_4:"€ 466.9m",
                info_3:"- € 525m",
                info_2:"- € 559.4m",
                info_1:"- € 659.4m",
                limit:"-€700M",
                threshold:"",
                remarks:"Test de remarks un peu longue pour tester la boîte vvvvv vvvvv vvvvv vvvvv vvvvv vvvvv"
            }
        ],
        solvency: [
            {
                name:"CET 1 Ratio",
                info_5:"11.5%",
                info_4:"10.7%",
                info_3:"10.7%",
                info_2:"10.7%",
                info_1:"10.8%",
                limit:"10.5%",
                threshold:"9%",
                remarks:""
            },
            {
                name:"Stress Test +/-200bp",
                info_5:"14.7%",
                info_4:"15.7%",
                info_3:"16.7%",
                info_2:"13.7%",
                info_1:"15.7%",
                limit:"14%",
                threshold:"12.5",
                remarks:""
            },
            {
                name:"Stress Test +/-200bp",
                info_5:"€2.9bn",
                info_4:"€3.9bn",
                info_3:"€3.9bn",
                info_2:"€2.9bn",
                info_1:"",
                limit:"",
                threshold:"",
                remarks:""
            }
        ],
        insurance: [
            {
                name:"SCR Coverage ratio",
                info_5:"154.5%",
                info_4:"134.5%",
                info_3:"133.5%",
                info_2:"134.25%",
                info_1:"",
                limit:"110%",
                threshold:"90%",
                remarks:""
            },
            {
                name:"Natixis Assurance",
                info_5:"117%",
                info_4:"117%",
                info_3:"117%",
                info_2:"117%",
                info_1:"117%",
                limit:"",
                threshold:"",
                remarks:"Test de remarks un peu longue pour tester la boîte vvvvv vvvvv vvvvv vvvvv vvvvv vvvvv"
            },
            {
                name:"CEGC combined ratio",
                info_5:"-",
                info_4:"70%",
                info_3:"73%",
                info_2:"72%",
                info_1:"70%",
                limit:"",
                threshold:"",
                remarks:""
            },
        ],
        am: [
            {
                name:"Ratio incidents/GOI",
                info_5:"4.26%",
                info_4:"3.76%",
                info_3:"4.26%",
                info_2:"4.26%",
                info_1:"",
                limit:"5%",
                threshold:"10%",
                remarks:""
            },
        ],
        finan: [
            {
                name:"Private Equity",
                info_5:"€0.865bn",
                info_4:"0.722bn",
                info_3:"0.722bn",
                info_2:"0.722bn",
                info_1:"-€677.4bn",
                limit:"1.3bn",
                threshold:"1.5bn",
                remarks:""
            },
            {
                name:"Coface Combined ratio",
                info_5:"-",
                info_4:"86%",
                info_3:"86%",
                info_2:"86%",
                info_1:"-€677.4bn",
                limit:"95%",
                threshold:"130%",
                remarks:""
            },
        ]
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }
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
    left:16%;
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
