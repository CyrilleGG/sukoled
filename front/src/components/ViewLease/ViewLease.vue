<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
        <div class="col-lg-10 mx-auto">

            <div class="row mb-5">
            <h2 class="col-lg-12 pl-0">Lease</h2>
            <h4 class="col-lg-7 pl-0">Credit Risk indicators €m - (source : Natixis Lease)</h4>

            <div class="col-lg-2 ml-auto pr-0 text-right">
                <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
            </div>

            <div class="w-100"></div>
            <div class="col-lg-12 mt-3 pt-1 divider"></div>
            </div>
            
            <div class="row">
                <div class="col-lg-9 pl-0">
                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase">Exposure</th>
                                <th v-for="(date, dateindex) in dates" :key="dateindex" class="text-center">{{ date }}</th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td class="text-left font-weight-bold">Gross EAD*</td>
                                <td v-for="(item, grossindex) in exposure.grossEAD" :key="grossindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-weight-bold">Net EAD*</td>
                                <td v-for="(item, exposurenetindex) in exposure.netEAD" :key="exposurenetindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-italic">out of which Real Estate Leasing net EAD</td>
                                <td v-for="(item, realEstateindex) in exposure.realEstate" :key="realEstateindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-italic">out of which Equipment Leasing net EAD</td>
                                <td v-for="(item, equipmentindex) in exposure.equipment" :key="equipmentindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-italic">out of which Renewable Energy net EAD</td>
                                <td v-for="(item, renewableindex) in exposure.renewable" :key="renewableindex" class="text-center">{{ item }}</td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase">RWA</th>
                                <th class="text-center">   </th>
                                <th class="text-center">   </th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td class="text-left font-weight-bold">RWA Credit</td>
                                <td v-for="(item, creditindex) in rwa.rwaCredit" :key="creditindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-weight-bold">RWA Operational</td>
                                <td v-for="(item, operationalindex) in rwa.rwaOperational" :key="operationalindex" class="text-center">{{ item }}</td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase">Default</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td class="text-left font-weight-bold">Defaulted Exposure</td>
                                <td v-for="(item, exposureindex) in defaulted.exposure" :key="exposureindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-weight-bold">% of defaulted net EAD</td>
                                <td v-for="(item, defaultednetindex) in defaulted.netEAD" :key="defaultednetindex" class="text-center">{{ item }}</td>
                            </tr>


                        </tbody>
                    </table>


                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-uppercase">Cost of risk</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td class="text-left font-weight-bold">Cost of risk</td>
                                <td v-for="(item, costindex) in costOfRisk.costOfRisk" :key="costindex" class="text-center">{{ item }}</td>
                            </tr>
                            <tr>
                                <td class="text-left font-weight-bold">Cost of risk in % of net EAD</td>
                                <td v-for="(item, costnetindex) in costOfRisk.netEAD" :key="costnetindex" class="text-center">{{ item }}</td>
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
                            <div>
                                <p class="other-element-text"> {{ doc.text }} </p>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="col-lg-3">
                    <view-comment class="border right-column" v-bind:title="'Comments'" v-bind:comment="comments[comments.length - 1]" />
                    <view-comment class="border right-column" v-bind:title="'Highlights'" v-bind:comment="highlights[comments.length - 1]" />

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
  name: 'ViewLease',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewComment
  },

  data () {
    return {
        dates: [],
        exposure: {
            grossEAD: [],
            netEAD: [],
            realEstate: [],
            equipment: [],
            renewable: []
        },
        rwa: {
            rwaCredit: [],
            rwaOperational: [],
            total: []
        },
        defaulted: {
            exposure: [],
            netEAD: []
        },
        costOfRisk: {
            costOfRisk: [],
            netEAD: []
        },
        comments: [],
        highlights: [],
        documents : [
            {
                url:"https://support.content.office.net/fr-fr/media/5f8252c4-09fd-40a1-ae03-1d498f9dedfd.png",
                text:""
            },
            {
                url:"",
                text:"Ceci est un commentaire explicatif."
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

    http.get('subsidaries/Lease')
        .then(response => {
            var json
            response.data.data.forEach((subsidary, index) => {
                if (index < 6) {
                    this.$data.dates.push('Q' + moment(subsidary.ends_at).subtract(1, 'months').format('Q YYYY'))
                    this.$data.comments.push(subsidary.comment_contributor)
                    this.$data.highlights.push(subsidary.highlight)
                    json = JSON.parse(subsidary.file_json)
                    this.$data.exposure.grossEAD.push(json['Gross EAD*'])
                    this.$data.exposure.netEAD.push(json['Net EAD*'])
                    this.$data.exposure.realEstate.push(json['out of which Real Estate Leasing net EAD'])
                    this.$data.exposure.equipment.push(json['out of which Equipment Leasing net EAD'])
                    this.$data.exposure.renewable.push(json['out of which Renewable Energy net EAD'])
                    this.$data.rwa.rwaCredit.push(json['RWA Credit'])
                    this.$data.rwa.rwaOperational.push(json['RWA Operational'])
                    this.$data.rwa.total.push(json['Total RWA'])
                    this.$data.defaulted.exposure.push(json['Defaulted exposure'])
                    this.$data.defaulted.netEAD.push(json['% of defaulted net EAD'])
                    this.$data.costOfRisk.costOfRisk.push(json['Cost of risk'])
                    this.$data.costOfRisk.netEAD.push(json['Cost of risk in % of net EAD'])
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
  },

  methods: {
    moment (date) {
        return moment(date).format('Q YYYY')
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

tr>td:first-child {
    width: 200px;
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
