<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content basel-padding">
        <div class="col-lg-10 mx-auto">

            <div class="row mb-5">
            <h2 class="col-lg-12 pl-0 text-uppercase">Breakdown by Basel Segment</h2>
            <h4 class="col-lg-7 pl-0">Indicators in €m - (source : GCM/ Credit reporting)</h4>

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
                                <th/>
                                <th
                                    v-for="(date, index) in dates"
                                    v-bind:key="index"
                                    v-bind:date="date.date"
                                >
                                    <div scope="col" class="text-uppercase text-center"> {{ moment(date.date) }}</div>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col" class="basel-border"> Basel segment </th>
                                <th scope="col" class="basel-border">
                                    <div class="basel-col-double">
                                        <div> Exposure </div>
                                        <div> Weight </div>
                                    </div>
                                </th>
                                <th scope="col" class="basel-border">
                                    <div class="basel-col-double">
                                        <div> Exposure </div>
                                        <div> Weight </div>
                                    </div>
                                </th>
                                <th scope="col" class="basel-border">
                                    <div class="basel-col-double">
                                        <div> Exposure </div>
                                        <div> Weight </div>
                                    </div>
                                </th>
                                <th scope="col" class="basel-border">
                                    <div class="basel-col-double">
                                        <div> Exposure </div>
                                        <div> Weight </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <view-basel-segment-list 
                                v-for="(basel, index) in basel_segment"
                                v-bind:key="index"
                                v-bind:title="basel.title"
                                v-bind:infos="basel.infos"
                            />

                        </tbody>
                    </table>
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

    <div class="basel-bg-white graph col-lg-10 mx-auto border size-graph">
        <view-basel-segment-graph 
            v-for="(graph, index) in basel_graph"
            v-bind:key="index"
            v-bind:data="graph.data"
            v-bind:options="graph.options"
        class="row col-lg-12"/>
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
import ViewBaselSegmentList from '@/components/ViewBaselSegmentList/ViewBaselSegmentList'
import ViewComment from '@/components/ViewComment/ViewComment'
import ViewBaselSegmentGraph from '@/components/ViewBaselSegmentGraph/ViewBaselSegmentGraph'

export default {
  name: 'ViewBaselSegment',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewBaselSegmentList,
    ViewComment,
    ViewBaselSegmentGraph
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
                date:"2017-12-01 00:00:00"
            },
            {
                date:"2017-09-01 00:00:00"
            }
        ],
        basel_segment: [
            {
                title:"Corporates",
                infos:[
                    {
                    exposure:"138 136",
                    weight:"55,0%"
                    },
                    {
                    exposure:"134 756",
                    weight:"+2,7%"
                    },
                    {
                    exposure:"133 440",
                    weight:"+3,5%"
                    },
                    {
                    exposure:"131 192",
                    weight:"+5,3%"
                    }
                ]
            }, {
                title:"Specialized lending",
                infos:[
                    {
                    exposure:"22 485",
                    weight:"8,3%"
                    },
                    {
                    exposure:"22 456",
                    weight:"-0,0%"
                    },
                    {
                    exposure:"23 306",
                    weight:"-3,5%"
                    },
                    {
                    exposure:"22 198",
                    weight:"+1,3%"
                    }
                ]
            }, {
                title:"Total excluding BPCE",
                infos:[
                    {
                    exposure:"251 145",
                    weight:"100%"
                    },
                    {
                    exposure:"389 856",
                    weight:"-13%"
                    },
                    {
                    exposure:"258 675",
                    weight:"-2,9%"
                    },
                    {
                    exposure:"258 698",
                    weight:"-2,9%"
                    }
                ]
            }, {
                title:"Total including BPCE",
                infos:[
                    {
                    exposure:"314 486",
                    weight:""
                    },
                    {
                    exposure:"289 856",
                    weight:"-6,4%"
                    },
                    {
                    exposure:"303 908",
                    weight:"+3,6%"
                    },
                    {
                    exposure:"299 023",
                    weight:"+5,3%"
                    }
                ]
            },
        ],
        comments: [
            {
                title:"Comments",
                comment:"The 20 biggest corporates represent 16.5% in the total corporate exposure as of end of Mars 2018 (compared to 16.7% as of end of February 2018)."
            }
        ],
        basel_graph:[
            {
                data: {
                    labels: ['December-17', 'February-18', 'March-18', 'April-18', 'May-18', 'June-18', 'July-18', 'August-18'],
                    boxWidth:2,
                    datasets: [
                        {
                            label: 'Corporate',
                            backgroundColor: 'rgba(150,150,0,1)',
                            borderColor:'rgba(150,150,0,1)',
                            data:[40, 20, 3, 2, 3, , 40, 20],
                            spanGaps:true,
                            fill:false
                        }, {
                            label: 'Financial instructions',
                            backgroundColor: 'rgba(0,150,150,1)',
                            borderColor:'rgba(0,150,150,1)',
                            data:[40, 20, 3, 2, 30, 20, 40, 20],
                            spanGaps:true,
                            fill:false
                        }
                    ]
                },
                options :{
                    title: {
                        display:true,
                        text: 'Distribution of grades',
                        fontSize:'15'
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                offsetGridLines: false
                            },
                            stacked:false
                        }],
                        yAxes: [{
                            categoryPercentage: 0.5,
                            barPercentage: 0.8,
                            gridLines: {
                                offsetGridLines: true,
                                display:false
                            },
                            stacked:false
                        }]
                    },
                    cornerRadius:20,
                    responsive: true,
                    maintainAspectRatio: false,
                },
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
  /* min-height: 85vh; */
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
    background-color:#fff
}

tr:nth-last-child(2), tr:last-child{
    font-weight: bold;
}

td {
    text-align:right
}

.basel-border {
    border-top:none !important;
    border-bottom:none !important;
}

.basel-col-double {
    display:flex;
    justify-content:space-around;
}

.basel-text-left {
    text-align:left;
}

td.basel-border>div>div{
    text-align:center;
    width:50%;
}

.basel-bg-white{
    background-color:white;
}

.basel-margin{
    margin-bottom:15px !important
}

.graph{
    margin:15px;
}

.size-graph {
    max-width:85%;
    flex:0 0 85%;
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
