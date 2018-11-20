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


            <table class="table border mr-5">
                <thead>
                    <tr>
                        <th/>
                        <th scope="col">Risk Type</th>
                        <th/>
                        <th
                            v-for="(date, dateindex) in dates"
                            v-bind:key="dateindex"
                            v-bind:date="date.date"
                            class="text-center"
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
                        <td rowspan="5" class="text-center table-title rotate">
                            <div>Market Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Global VaR</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, globalvindex) in columns"
                            v-bind:key="globalvindex"
                        >
                            <p v-if="typeof marketRisk.globalVar.values[globalvindex] !== 'undefined'" class="text-center">{{ marketRisk.globalVar.values[globalvindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: marketRisk.globalVar.pos + '%', backgroundColor: marketRisk.globalVar.color}"/>
                            <span class="limit-text">{{ marketRisk.globalVar.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ marketRisk.globalVar.threshold }}</span>
                        </td>
                        <td v-if="marketRisk.globalVar.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ marketRisk.globalVar.remark }}</td>
                    </tr>
                    <tr>
                        <td>Equity</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, equityindex) in columns"
                            v-bind:key="equityindex"
                        >
                            <p v-if="typeof marketRisk.equity.values[equityindex] !== 'undefined'" class="text-center">{{ marketRisk.equity.values[equityindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: marketRisk.equity.pos + '%', backgroundColor: marketRisk.equity.color}"/>
                            <span class="limit-text">{{ marketRisk.equity.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ marketRisk.equity.threshold }}</span>
                        </td>
                        <td v-if="marketRisk.equity.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ marketRisk.equity.remark }}</td>
                    </tr>
                    <tr>
                        <td>Forex</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, forexindex) in columns"
                            v-bind:key="forexindex"
                        >
                            <p v-if="typeof marketRisk.forex.values[forexindex] !== 'undefined'" class="text-center">{{ marketRisk.forex.values[forexindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: marketRisk.forex.pos + '%', backgroundColor: marketRisk.forex.color}"/>
                            <span class="limit-text">{{ marketRisk.forex.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ marketRisk.forex.threshold }}</span>
                        </td>
                        <td v-if="marketRisk.forex.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ marketRisk.forex.remark }}</td>
                    </tr>
                    <tr>
                        <td>Loss on the worst global stress test</td>
                        <td class="text-center"><!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, lossindex) in columns"
                            v-bind:key="lossindex"
                        >
                            <p v-if="typeof marketRisk.loss.values[lossindex] !== 'undefined'" class="text-center">{{ marketRisk.loss.values[lossindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: marketRisk.loss.pos + '%', backgroundColor: marketRisk.loss.color}"/>
                            <span class="limit-text">{{ marketRisk.loss.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ marketRisk.loss.threshold }}</span>
                        </td>
                        <td v-if="marketRisk.loss.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ marketRisk.loss.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="5" class="text-center table-title rotate">
                            <div>Credit Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Credit RWA</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, creditindex) in columns"
                            v-bind:key="creditindex"
                        >
                            <p v-if="typeof creditRisk.creditRwa.values[creditindex] !== 'undefined'" class="text-center">{{ creditRisk.creditRwa.values[creditindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: creditRisk.creditRwa.pos + '%', backgroundColor: creditRisk.creditRwa.color}"/>
                            <span class="limit-text">{{ creditRisk.creditRwa.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ creditRisk.creditRwa.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.creditRwa.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.creditRwa.remark }}</td>
                    </tr>
                    <tr>
                        <td>Cost of risk</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, costindex) in columns"
                            v-bind:key="costindex"
                        >
                            <p v-if="typeof creditRisk.costOfRisk.values[costindex] !== 'undefined'" class="text-center">{{ creditRisk.costOfRisk.values[costindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: creditRisk.costOfRisk.pos + '%', backgroundColor: creditRisk.costOfRisk.color}"/>
                            <span class="limit-text">{{ creditRisk.costOfRisk.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ creditRisk.costOfRisk.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.costOfRisk.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.costOfRisk.remark }}</td>
                    </tr>
                    <tr>
                        <!-- <td></td> -->
                        <td>NPL Rate</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, nplindex) in columns"
                            v-bind:key="nplindex"
                        >
                            <p v-if="typeof creditRisk.nplRate.values[nplindex] !== 'undefined'" class="text-center">{{ creditRisk.nplRate.values[nplindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: creditRisk.nplRate.pos + '%', backgroundColor: creditRisk.nplRate.color}"/>
                            <span class="limit-text">{{ creditRisk.nplRate.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ creditRisk.nplRate.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.nplRate.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.nplRate.remark }}</td>
                    </tr>
                    <tr>
                        <td>Watchlist exposures (excluding WL3)</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, wlindex) in columns"
                            v-bind:key="wlindex"
                        >
                            <p v-if="typeof creditRisk.wacthlistExposure.values[wlindex] !== 'undefined'" class="text-center">{{ creditRisk.wacthlistExposure.values[wlindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: creditRisk.wacthlistExposure.pos + '%', backgroundColor: creditRisk.wacthlistExposure.color}"/>
                            <span class="limit-text">{{ creditRisk.wacthlistExposure.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ creditRisk.wacthlistExposure.threshold }}</span>
                        </td>
                        <td v-if="creditRisk.wacthlistExposure.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ creditRisk.wacthlistExposure.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="3" class="text-center table-title rotate">
                            <div>Concentration Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Warehousing</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, warehousingindex) in columns"
                            v-bind:key="warehousingindex"
                        >
                            <p v-if="typeof concentrationRisk.warehousing.values[warehousingindex] !== 'undefined'" class="text-center">{{ concentrationRisk.warehousing.values[warehousingindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: concentrationRisk.warehousing.pos + '%', backgroundColor: concentrationRisk.warehousing.color}"/>
                            <span class="limit-text">{{ concentrationRisk.warehousing.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ concentrationRisk.warehousing.threshold }}</span>
                        </td>
                        <td v-if="concentrationRisk.warehousing.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ concentrationRisk.warehousing.remark }}</td>
                    </tr>
                    <tr>
                        <td>Emerging countries RWA
                            <p style="font-size: 0.8rem; font-style: italic">Consumption in %age of credit RWA</p>
                        </td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, emergingindex) in columns"
                            v-bind:key="emergingindex"
                        >
                            <p v-if="typeof concentrationRisk.emerging.values[emergingindex] !== 'undefined'" class="text-center">{{ concentrationRisk.emerging.values[emergingindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: concentrationRisk.emerging.pos + '%', backgroundColor: concentrationRisk.emerging.color}"/>
                            <span class="limit-text">{{ concentrationRisk.emerging.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ concentrationRisk.emerging.threshold }}</span>
                        </td>
                        <td v-if="concentrationRisk.emerging.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ concentrationRisk.emerging.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div>Liquidity Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Liquidity Risk</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, liquidityindex) in columns"
                            v-bind:key="liquidityindex"
                        >
                            <p v-if="typeof liquidityRisk.liquidityRisk.values[liquidityindex] !== 'undefined'" class="text-center">{{ liquidityRisk.liquidityRisk.values[liquidityindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: liquidityRisk.liquidityRisk.pos + '%', backgroundColor: liquidityRisk.liquidityRisk.color}"/>
                            <span class="limit-text">{{ liquidityRisk.liquidityRisk.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ liquidityRisk.liquidityRisk.threshold }}</span>
                        </td>
                        <td v-if="liquidityRisk.liquidityRisk.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ liquidityRisk.liquidityRisk.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="3" class="text-center table-title rotate">
                            <div>Operational Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Ratio incidents/GOI</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, ratiogindex) in columns"
                            v-bind:key="ratiogindex"
                        >
                            <p v-if="typeof operationalRisk.ratioIncidents.values[ratiogindex] !== 'undefined'" class="text-center">{{ operationalRisk.ratioIncidents.values[ratiogindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: operationalRisk.ratioIncidents.pos + '%', backgroundColor: operationalRisk.ratioIncidents.color}"/>
                            <span class="limit-text">{{ operationalRisk.ratioIncidents.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ operationalRisk.ratioIncidents.threshold }}</span>
                        </td>
                        <td v-if="operationalRisk.ratioIncidents.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ operationalRisk.ratioIncidents.remark }}</td>
                    </tr>
                    <tr>
                        <td>Natixis</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, natixisindex) in columns"
                            v-bind:key="natixisindex"
                        >
                            <p v-if="typeof operationalRisk.natixis.values[natixisindex] !== 'undefined'" class="text-center">{{ operationalRisk.natixis.values[natixisindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: operationalRisk.natixis.pos + '%', backgroundColor: operationalRisk.natixis.color}"/>
                            <span class="limit-text">{{ operationalRisk.natixis.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ operationalRisk.natixis.threshold }}</span>
                        </td>
                        <td v-if="operationalRisk.natixis.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ operationalRisk.natixis.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div>Insurance Risk</div>
                        </td>
                    </tr>
                    <tr>
                        <td>CEGC combined ratio</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, cegcindex) in columns"
                            v-bind:key="cegcindex"
                        >
                            <p v-if="typeof insuranceRisk.cegc.values[cegcindex] !== 'undefined'" class="text-center">{{ insuranceRisk.cegc.values[cegcindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: insuranceRisk.cegc.pos + '%', backgroundColor: insuranceRisk.cegc.color}"/>
                            <span class="limit-text">{{ insuranceRisk.cegc.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ insuranceRisk.cegc.threshold }}</span>
                        </td>
                        <td v-if="insuranceRisk.cegc.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ insuranceRisk.cegc.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div>Finan. Part.</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Private Equity</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, privateindex) in columns"
                            v-bind:key="privateindex"
                        >
                            <p v-if="typeof finanPart.privateEquity.values[privateindex] !== 'undefined'" class="text-center">{{ finanPart.privateEquity.values[privateindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: finanPart.privateEquity.pos + '%', backgroundColor: finanPart.privateEquity.color}"/>
                            <span class="limit-text">{{ finanPart.privateEquity.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ finanPart.privateEquity.threshold }}</span>
                        </td>
                        <td v-if="finanPart.privateEquity.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ finanPart.privateEquity.remark }}</td>
                    </tr>

                    <tr>
                        <td rowspan="2" class="text-center table-title rotate">
                            <div></div>
                        </td>
                    </tr>
                    <tr>
                        <td>Basis Risk</td>
                        <td class="text-center"> <!-- <span class="dot"/> --> </td>

                        <td
                            v-for="(value, basisindex) in columns"
                            v-bind:key="basisindex"
                        >
                            <p v-if="typeof basisRisk.values[basisindex] !== 'undefined'" class="text-center">{{ basisRisk.values[basisindex] }}</p>
                            <p v-else class="text-center">N/A</p>
                        </td>

                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/>
                            <span class="dot position" v-bind:style="{left: basisRisk.pos + '%', backgroundColor: basisRisk.color}"/>
                            <span class="limit-text">{{ basisRisk.limit }}</span>
                            <span class="line-red"/>
                            <span class="threshold-text">{{ basisRisk.threshold }}</span>
                        </td>
                        <td v-if="basisRisk.remark == ''" class="text-center remarks"></td>
                        <td v-else class="text-center remarks">{{ basisRisk.remark }}</td>
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
                limit: 16,
                threshold: 26,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            equity: {
                limit: 11,
                threshold: 15,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            forex: {
                limit: 7,
                threshold: 11,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            loss: {
                limit: -250,
                threshold: -450,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        creditRisk: {
            creditRwa: {
                limit: 95,
                threshold: 97,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            costOfRisk: {
                limit: 50,
                threshold: 70,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            nplRate: {
                limit: 6.5,
                threshold: 7.5,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            wacthlistExposure: {
                limit: 6,
                threshold: 8,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
        },
        concentrationRisk: {
            warehousing: {
                limit: 8,
                threshold: 10,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            emerging: {
                limit: 15,
                threshold: 20,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        liquidityRisk: {
            liquidityRisk: {
                limit: 70,
                threshold: 65,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        operationalRisk: {
            ratioIncidents: {
                limit: 5,
                threshold: 10,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            },
            natixis: {
                limit: 5,
                threshold: 10,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        insuranceRisk: {
            cegc: {
                limit: 100,
                threshold: 110,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        finanPart: {
            privateEquity: {
                limit: 1,
                threshold: 2,
                values: [],
                remark: '',
                pos: 0,
                color: '#00FF00'
            }
        },
        basisRisk: {
            limit: 70,
            threshold: 80,
            values: [],
            remark: '',
            pos: 0,
            color: '#00FF00'
        },
        columns: [1,2,3,4,5,6]
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }

    for (let i = 0; i < 6; i++) {
        this.$data.dates.push(moment().subtract(i, 'months').format('YYYY-MM-DDT00:00:00.000') + 'Z')
    }
    this.$data.dates = this.$data.dates.reverse()

    http.get('raf')
        .then(response => {
            response.data.data.forEach(raf => {
                if (raf.contribution_order == 1) {

                    this.$data.marketRisk.globalVar.values.push(raf.contribution_value)
                    this.$data.marketRisk.globalVar.limit = raf.contribution_limit
                    this.$data.marketRisk.globalVar.threshold = raf.contribution_threshold
                    this.$data.marketRisk.globalVar.remark = raf.version_comment_contributor
                    this.$data.marketRisk.globalVar.pos = raf.pos
                    this.$data.marketRisk.globalVar.color = raf.color

                } else if (raf.contribution_order == 2) {

                    this.$data.marketRisk.equity.values.push(raf.contribution_value)
                    this.$data.marketRisk.equity.limit = raf.contribution_limit
                    this.$data.marketRisk.equity.threshold = raf.contribution_threshold
                    this.$data.marketRisk.equity.remark = raf.version_comment_contributor
                    this.$data.marketRisk.equity.pos = raf.pos
                    this.$data.marketRisk.equity.color = raf.color

                } else if (raf.contribution_order == 3) {

                    this.$data.marketRisk.forex.values.push(raf.contribution_value)
                    this.$data.marketRisk.forex.limit = raf.contribution_limit
                    this.$data.marketRisk.forex.threshold = raf.contribution_threshold
                    this.$data.marketRisk.forex.remark = raf.version_comment_contributor
                    this.$data.marketRisk.forex.pos = raf.pos
                    this.$data.marketRisk.forex.color = raf.color

                } else if (raf.contribution_order == 7) {

                    this.$data.marketRisk.loss.values.push(raf.contribution_value)
                    this.$data.marketRisk.loss.limit = raf.contribution_limit
                    this.$data.marketRisk.loss.threshold = raf.contribution_threshold
                    this.$data.marketRisk.loss.remark = raf.version_comment_contributor
                    this.$data.marketRisk.loss.pos = raf.pos
                    this.$data.marketRisk.loss.color = raf.color

                } else if (raf.contribution_order == 8) {

                    this.$data.creditRisk.creditRwa.values.push(raf.contribution_value)
                    this.$data.creditRisk.creditRwa.limit = raf.contribution_limit
                    this.$data.creditRisk.creditRwa.threshold = raf.contribution_threshold
                    this.$data.creditRisk.creditRwa.remark = raf.version_comment_contributor
                    this.$data.creditRisk.creditRwa.pos = raf.pos
                    this.$data.creditRisk.creditRwa.color = raf.color

                } else if (raf.contribution_order == 9) {

                    this.$data.creditRisk.costOfRisk.values.push(raf.contribution_value)
                    this.$data.creditRisk.costOfRisk.limit = raf.contribution_limit
                    this.$data.creditRisk.costOfRisk.threshold = raf.contribution_threshold
                    this.$data.creditRisk.costOfRisk.remark = raf.version_comment_contributor
                    this.$data.creditRisk.costOfRisk.pos = raf.pos
                    this.$data.creditRisk.costOfRisk.color = raf.color

                } else if (raf.contribution_order == 10) {

                    this.$data.creditRisk.nplRate.values.push(raf.contribution_value)
                    this.$data.creditRisk.nplRate.limit = raf.contribution_limit
                    this.$data.creditRisk.nplRate.threshold = raf.contribution_threshold
                    this.$data.creditRisk.nplRate.remark = raf.version_comment_contributor
                    this.$data.creditRisk.nplRate.pos = raf.pos
                    this.$data.creditRisk.nplRate.color = raf.color

                } else if (raf.contribution_order == 11) {

                    this.$data.creditRisk.wacthlistExposure.values.push(raf.contribution_value)
                    this.$data.creditRisk.wacthlistExposure.limit = raf.contribution_limit
                    this.$data.creditRisk.wacthlistExposure.threshold = raf.contribution_threshold
                    this.$data.creditRisk.wacthlistExposure.remark = raf.version_comment_contributor
                    this.$data.creditRisk.wacthlistExposure.pos = raf.pos
                    this.$data.creditRisk.wacthlistExposure.color = raf.color

                } else if (raf.contribution_order == 14) {

                    this.$data.concentrationRisk.warehousing.values.push(raf.contribution_value)
                    this.$data.concentrationRisk.warehousing.limit = raf.contribution_limit
                    this.$data.concentrationRisk.warehousing.threshold = raf.contribution_threshold
                    this.$data.concentrationRisk.warehousing.remark = raf.version_comment_contributor
                    this.$data.concentrationRisk.warehousing.pos = raf.pos
                    this.$data.concentrationRisk.warehousing.color = raf.color

                } else if (raf.contribution_order == 15) {

                    this.$data.concentrationRisk.emerging.values.push(raf.contribution_value)
                    this.$data.concentrationRisk.emerging.limit = raf.contribution_limit
                    this.$data.concentrationRisk.emerging.threshold = raf.contribution_threshold
                    this.$data.concentrationRisk.emerging.remark = raf.version_comment_contributor
                    this.$data.concentrationRisk.emerging.pos = raf.pos
                    this.$data.concentrationRisk.emerging.color = raf.color

                } else if (raf.contribution_order == 20) {

                    this.$data.liquidityRisk.liquidityRisk.values.push(raf.contribution_value)
                    this.$data.liquidityRisk.liquidityRisk.limit = raf.contribution_limit
                    this.$data.liquidityRisk.liquidityRisk.threshold = raf.contribution_threshold
                    this.$data.liquidityRisk.liquidityRisk.remark = raf.version_comment_contributor
                    this.$data.liquidityRisk.liquidityRisk.pos = raf.pos
                    this.$data.liquidityRisk.liquidityRisk.color = raf.color

                } else if (raf.contribution_order == 22) {

                    this.$data.operationalRisk.ratioIncidents.values.push(raf.contribution_value)
                    this.$data.operationalRisk.ratioIncidents.limit = raf.contribution_limit
                    this.$data.operationalRisk.ratioIncidents.threshold = raf.contribution_threshold
                    this.$data.operationalRisk.ratioIncidents.remark = raf.version_comment_contributor
                    this.$data.operationalRisk.ratioIncidents.pos = raf.pos
                    this.$data.operationalRisk.ratioIncidents.color = raf.color

                } else if (raf.contribution_order == 23) {

                    this.$data.operationalRisk.natixis.values.push(raf.contribution_value)
                    this.$data.operationalRisk.natixis.limit = raf.contribution_limit
                    this.$data.operationalRisk.natixis.threshold = raf.contribution_threshold
                    this.$data.operationalRisk.natixis.remark = raf.version_comment_contributor
                    this.$data.operationalRisk.natixis.pos = raf.pos
                    this.$data.operationalRisk.natixis.color = raf.color

                } else if (raf.contribution_order == 40) {

                    this.$data.insuranceRisk.cegc.values.push(raf.contribution_value)
                    this.$data.insuranceRisk.cegc.limit = raf.contribution_limit
                    this.$data.insuranceRisk.cegc.threshold = raf.contribution_threshold
                    this.$data.insuranceRisk.cegc.remark = raf.version_comment_contributor
                    this.$data.insuranceRisk.cegc.pos = raf.pos
                    this.$data.insuranceRisk.cegc.color = raf.color

                } else if (raf.contribution_order == 42) {

                    this.$data.finanPart.privateEquity.values.push(raf.contribution_value)
                    this.$data.finanPart.privateEquity.limit = raf.contribution_limit
                    this.$data.finanPart.privateEquity.threshold = raf.contribution_threshold
                    this.$data.finanPart.privateEquity.remark = raf.version_comment_contributor
                    this.$data.finanPart.privateEquity.pos = raf.pos
                    this.$data.finanPart.privateEquity.color = raf.color

                } else if (raf.contribution_order == 44) {

                    this.$data.basisRisk.values.push(raf.contribution_value)
                    this.$data.basisRisk.limit = raf.contribution_limit
                    this.$data.basisRisk.threshold = raf.contribution_threshold
                    this.$data.basisRisk.remark = raf.version_comment_contributor
                    this.$data.basisRisk.pos = raf.pos
                    this.$data.basisRisk.color = raf.color

                }
            })
        })
        .catch(error => {
            console.log(error)
        })
  },

  methods: {
    moment (date) {
        return moment(date).format('MMMM')
    },

    addDate (date, offset) {
        return moment(date).add(offset, 'months').format('YYYY-MM-DDT22:00:00.000') + 'Z'
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

.dot.position{
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
    right:10%;
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
    left:30%;
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
