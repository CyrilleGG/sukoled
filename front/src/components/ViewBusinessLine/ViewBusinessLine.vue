<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Breakdown BY Business line</h2>
          <h4 class="col-lg-7 pl-0">Indicators in €m - (source : GCM/ Credit reporting)</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-7 pl-0">
                <table class="table table-striped border">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" class="text-uppercase text-center">Business line</th>
                            <th
                                v-for="(date, index) in dates"
                                v-bind:key="index"
                                v-bind:date="date.date"
                            >
                                <div scope="col" class="text-uppercase text-center"> {{ moment(date.date) }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr>
                            <td rowspan="10" class="text-center table-title rotate"> <div>CIB</div> </td>
                        </tr>
                        <tr
                            v-for="(cib, index) in cibs"
                            v-bind:key="index"
                            v-bind:business_name="cib.business_name"
                            v-bind:info_3="cib.info_3"
                            v-bind:info_2="cib.info_2"
                            v-bind:info_1="cib.info_1"
                        >
                            <td class="text-left"> {{ cib.business_name }} </td>
                            <td class="text-center"> {{ cib.info_3 }} </td>
                            <td class="text-center"> {{ cib.info_2 }} </td>
                            <td class="text-center"> {{ cib.info_1 }} </td>
                        </tr>
                        <tr>
                            <td rowspan="4" class="text-center table-title rotate"> <div>SFS</div> </td>
                        </tr>


                        <tr
                            v-for="(sfs, index) in sfss"
                            v-bind:key="index"
                            v-bind:business_name="sfs.business_name"
                            v-bind:info_3="sfs.info_3"
                            v-bind:info_2="sfs.info_2"
                            v-bind:info_1="sfs.info_1"
                        >
                            <td class="text-left"> {{ sfs.business_name }} </td>
                            <td class="text-center"> {{ sfs.info_3 }} </td>
                            <td class="text-center"> {{ sfs.info_2 }} </td>
                            <td class="text-center"> {{ sfs.info_1 }} </td>
                        </tr>


                        <tr
                            v-for="(insurance, index) in insurances"
                            v-bind:key="index"
                            v-bind:info_3="insurance.info_3"
                            v-bind:info_2="insurance.info_2"
                            v-bind:info_1="insurance.info_1"
                        >
                            <td colspan="2" class="table-title text-left"> Insurance </td>                            
                            <td class="text-center"> {{ insurance.info_3 }} </td>
                            <td class="text-center"> {{ insurance.info_2 }} </td>
                            <td class="text-center"> {{ insurance.info_1 }} </td>
                        </tr>
                        

                        <tr
                            v-for="(awm, index) in awms"
                            v-bind:key="index"
                            v-bind:info_3="awm.info_3"
                            v-bind:info_2="awm.info_2"
                            v-bind:info_1="awm.info_1"
                        >
                            <td colspan="2" class="table-title text-left"> AWM </td>                            
                            <td class="text-center"> {{ awm.info_3 }} </td>
                            <td class="text-center"> {{ awm.info_2 }} </td>
                            <td class="text-center"> {{ awm.info_1 }} </td>
                        </tr>


                        <tr
                            v-for="(coface, index) in cofaces"
                            v-bind:key="index"
                            v-bind:info_3="coface.info_3"
                            v-bind:info_2="coface.info_2"
                            v-bind:info_1="coface.info_1"
                        >
                            <td colspan="2" class="table-title text-left"> Coface </td>                            
                            <td class="text-center"> {{ coface.info_3 }} </td>
                            <td class="text-center"> {{ coface.info_2 }} </td>
                            <td class="text-center"> {{ coface.info_1 }} </td>
                        </tr>
                        
                        
                        <tr
                            v-for="(act, index) in other_activities"
                            v-bind:key="index"
                            v-bind:info_3="act.info_3"
                            v-bind:info_2="act.info_2"
                            v-bind:info_1="act.info_1"
                        >
                            <td colspan="2" class="table-title text-left"> Other Activities </td>                            
                            <td class="text-center"> {{ act.info_3 }} </td>
                            <td class="text-center"> {{ act.info_2 }} </td>
                            <td class="text-center"> {{ act.info_1 }} </td>
                        </tr>


                        <tr
                            v-for="(tot, index) in total"
                            v-bind:key="index"
                            v-bind:business_name="tot.business_name"
                            v-bind:info_3="tot.info_3"
                            v-bind:info_2="tot.info_2"
                            v-bind:info_1="tot.info_1"
                        >
                            <td class="text-center"></td>
                            <td class="text-center"> {{ tot.business_name }} </td>
                            <td class="text-center"> {{ tot.info_3 }} </td>
                            <td class="text-center"> {{ tot.info_2 }} </td>
                            <td class="text-center"> {{ tot.info_1 }} </td>
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
            {
                date:"2018-03-01 00:00:00"
            },
            {
                date:"2018-02-01 00:00:00"
            },
            {
                date:"2017-12-01 00:00:00"
            }
        ],
        cibs: [
            {
                business_name:"Global Market",
                info_3:"68 014",
                info_2:"69 014",
                info_1:"69 014"             
            },
            {
                business_name:"Investment Banking",
                info_3:"26,1%",
                info_2:"20,5%",
                info_1:"22,4%"             
            },
            {
                business_name:"Energy & Natural Resource",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            },
            {
                business_name:"Insurance",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            },
            {
                business_name:"AWM",
                info_3:"15,1%",
                info_2:"12,4%",
                info_1:"14,5%"             
            },{
                business_name:"Global Market",
                info_3:"68 014",
                info_2:"69 014",
                info_1:"69 014"             
            },
            {
                business_name:"Investment Banking",
                info_3:"26,1%",
                info_2:"20,5%",
                info_1:"22,4%"             
            },
            {
                business_name:"Energy & Natural Resource",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            },
            {
                business_name:"Insurance",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            }
        ],
        sfss:[
            {
                business_name:"Insurance",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"    
            },
            {
                business_name:"Insurance",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            },
            {
                business_name:"Insurance",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"             
            }
        ],
        insurances:[
            {
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"
            }
        ],
        awms:[
            {
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"
            }
        ],
        cofaces:[
            {
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"
            }
        ],
        other_activities:[
            {
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"
            }
        ],
        total:[
            {
                business_name:"Total",
                info_3:"25,5%",
                info_2:"21,3%",
                info_1:"24,7%"
            }
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
      return moment(date).format('MMMM-YY')
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
    background-color:#fff;
}

.table-title {
    background:#000;
    color:white;
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


</style>
