<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
        <div class="col-lg-10 mx-auto">

            <div class="row mb-5">
            <h2 class="col-lg-12 pl-0">Lease</h2>
            <h4 class="col-lg-7 pl-0">Credit Risk indicators €m - (source : Natixis Lease)</h4>

            <div class="w-100"></div>
            <div class="col-lg-12 mt-3 pt-1 divider"></div>
            </div>
            
            <div class="row">
                <div class="col-lg-9 pl-0">
                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase">Exposure</th>
                                <th
                                    v-for="(date, index) in dates"
                                    v-bind:key="index"
                                    v-bind:date="date.date"
                                >
                                    <div scope="col" class="text-uppercase text-center"> {{ moment(date.date) }} </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr
                                v-for="(exposure, index) in exposures"
                                v-bind:key="index"
                                v-bind:business_name="exposure.business_name"
                                v-bind:info_7="exposure.info_7"
                                v-bind:info_6="exposure.info_6"
                                v-bind:info_5="exposure.info_5"
                                v-bind:info_4="exposure.info_4"
                                v-bind:info_3="exposure.info_3"
                                v-bind:info_2="exposure.info_2"
                                v-bind:info_1="exposure.info_1"
                            >
                                <td class="text-left"> {{ exposure.business_name }} </td>
                                <td class="text-center"> {{ exposure.info_7 }} </td>
                                <td class="text-center"> {{ exposure.info_6 }} </td>
                                <td class="text-center"> {{ exposure.info_5 }} </td>
                                <td class="text-center"> {{ exposure.info_4 }} </td>
                                <td class="text-center"> {{ exposure.info_3 }} </td>
                                <td class="text-center"> {{ exposure.info_2 }} </td>
                                <td class="text-center"> {{ exposure.info_1 }} </td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase" colspan="3">Business line</th>
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>


                            <tr
                                v-for="(rwa, index) in rwas"
                                v-bind:key="index"
                                v-bind:business_name="rwa.business_name"
                                v-bind:info_7="rwa.info_7"
                                v-bind:info_6="rwa.info_6"
                                v-bind:info_5="rwa.info_5"
                                v-bind:info_4="rwa.info_4"
                                v-bind:info_3="rwa.info_3"
                                v-bind:info_2="rwa.info_2"
                                v-bind:info_1="rwa.info_1"
                            >
                                <td class="text-left title-size"> {{ rwa.business_name }} </td>
                                <td class="text-center"> {{ rwa.info_7 }} </td>
                                <td class="text-center"> {{ rwa.info_6 }} </td>
                                <td class="text-center"> {{ rwa.info_5 }} </td>
                                <td class="text-center"> {{ rwa.info_4 }} </td>
                                <td class="text-center"> {{ rwa.info_3 }} </td>
                                <td class="text-center"> {{ rwa.info_2 }} </td>
                                <td class="text-center"> {{ rwa.info_1 }} </td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase" colspan="3">Default</th>
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>


                            <tr
                                v-for="(def, index) in defaults"
                                v-bind:key="index"
                                v-bind:business_name="def.business_name"
                                v-bind:info_7="def.info_7"
                                v-bind:info_6="def.info_6"
                                v-bind:info_5="def.info_5"
                                v-bind:info_4="def.info_4"
                                v-bind:info_3="def.info_3"
                                v-bind:info_2="def.info_2"
                                v-bind:info_1="def.info_1"
                            >
                                <td class="text-left title-size"> {{ def.business_name }} </td>
                                <td class="text-center"> {{ def.info_7 }} </td>
                                <td class="text-center"> {{ def.info_6 }} </td>
                                <td class="text-center"> {{ def.info_5 }} </td>
                                <td class="text-center"> {{ def.info_4 }} </td>
                                <td class="text-center"> {{ def.info_3 }} </td>
                                <td class="text-center"> {{ def.info_2 }} </td>
                                <td class="text-center"> {{ def.info_1 }} </td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase" colspan="3">Cost of risk</th>
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>


                            <tr
                                v-for="(risk, index) in risks"
                                v-bind:key="index"
                                v-bind:business_name="risk.business_name"
                                v-bind:info_7="risk.info_7"
                                v-bind:info_6="risk.info_6"
                                v-bind:info_5="risk.info_5"
                                v-bind:info_4="risk.info_4"
                                v-bind:info_3="risk.info_3"
                                v-bind:info_2="risk.info_2"
                                v-bind:info_1="risk.info_1"
                            >
                                <td class="text-left title-size"> {{ risk.business_name }} </td>
                                <td class="text-center"> {{ risk.info_7 }} </td>
                                <td class="text-center"> {{ risk.info_6 }} </td>
                                <td class="text-center"> {{ risk.info_5 }} </td>
                                <td class="text-center"> {{ risk.info_4 }} </td>
                                <td class="text-center"> {{ risk.info_3 }} </td>
                                <td class="text-center"> {{ risk.info_2 }} </td>
                                <td class="text-center"> {{ risk.info_1 }} </td>
                            </tr>


                        </tbody>
                    </table>

                    <div class="row other-element-container">
                        <div class="col-lg-5 other-element mx-auto border"
                            v-for="(doc, index) in documents"
                            v-bind:key="index"
                            v-bind:doc="doc.url"
                            v-bind:text="doc.text"
                        >
                            <div v-if="doc.url !== ''">
                                <img v-bind:src="doc.url" class="border">
                            </div>
                            <div v-else>
                                <p class="other-element-text"> {{ doc.text }} </p>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="col-lg-3">
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
import momentfquarter from 'moment-fquarter'

import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewComment from '@/components/ViewComment/ViewComment'

export default {
  name: 'ViewLease',

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
                date:"2017-04-01 00:00:00"
            },
            {
                date:"2017-05-01 00:00:00"
            },
            {
                date:"2017-08-01 00:00:00"
            },
            {
                date:"2017-09-01 00:00:00"
            },
            {
                date:"2017-12-01 00:00:00"
            }
        ],
        exposures: [
            {
                business_name:"Grass EAD",
                info_7:"12 568",
                info_6:"12 745",
                info_5:"12 815",
                info_4:"13 815",
                info_3:"12 815",
                info_2:"13 005",
                info_1:"13 024"             
            }
        ],
        rwas : [
            {
                business_name:"Grass EAD",
                info_7:"12 568",
                info_6:"12 745",
                info_5:"12 815",
                info_4:"13 815",
                info_3:"12 815",
                info_2:"13 005",
                info_1:"13 024"  
            }
        ],
        defaults : [
            {
                business_name:"Grass EAD",
                info_7:"12 568",
                info_6:"12 745",
                info_5:"12 815",
                info_4:"13 815",
                info_3:"12 815",
                info_2:"13 005",
                info_1:"13 024"  
            }
        ],
        risks : [
            {
                business_name:"Grass EAD",
                info_7:"12 568",
                info_6:"12 745",
                info_5:"12 815",
                info_4:"13 815",
                info_3:"12 815",
                info_2:"13 005",
                info_1:"13 024"  
            }
        ],
        documents : [
            {
                url:"https://support.content.office.net/fr-fr/media/5f8252c4-09fd-40a1-ae03-1d498f9dedfd.png",
                text:""
            },
            {
                url:"",
                text:"Ceci est un commentaire explicatif. Ou pas."
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
        var value = moment(date).fquarter(1);
        var value_second = moment(date).format('YYYY') ;
        return value_second + "-Q" +value.quarter
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
    margin-bottom:15px;
    background-color:#fff;
}

thead {
    color: #B5BBC9;
}

.table-title {
    background:#000;
    color:white;
}

.title-size {
    width:14.5%;
}

.other-element-container {
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width:100%;
}

.other-element {
    background-color:white;
    margin-left:15px !important;
    margin-right:15px !important;
    margin-bottom:15px;
    padding:15px;
    max-width:100%;
    height:100%;
}

.other-element:nth-child(n+2) {
    margin-right:-15px !important;
}

.other-element img {
    max-width:100%;
}

.other-element-text {
    margin-bottom:0px;
}

</style>
