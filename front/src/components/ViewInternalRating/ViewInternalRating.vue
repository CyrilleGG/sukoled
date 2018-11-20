<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Breakdown Internal Rating</h2>
          <h4 class="col-lg-7 pl-0">Indicators internal rating</h4>

          <div class="col-lg-2 ml-auto pr-0 text-right">
              <b-button id="print" class="purple" v-on:click="printPage ()" size="small">Print</b-button>
          </div>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <p id="loada" class="col-lg-12">Loading...</p>

          <div id="list" class="col-lg-7 pl-0 none">
            <view-internal-rating-list 
              v-for="(internal, index) in internal_rating"
              v-bind:key="index"
              v-bind:ratings="internal.ratings"
              v-bind:dates="internal.dates"
              v-bind:total="internal.total"
            />
          </div>
          
          <div id="list-r" class="col-lg-5 none">
            <view-internal-rating-list-right 
              v-for="(internal, index) in internal_rating_right"
              v-bind:key="index"
              v-bind:ratings="internal.ratings"
              v-bind:dates="internal.dates"
              v-bind:total="internal.total"
            />

          </div>
        </div>

        <div class="row graph-row">
          <div class="col-lg-12 graph border">
            <view-internal-rating-graph
              v-for="(graph, index) in internal_graph"
              v-bind:key="index"
              v-bind:data="graph.data"
              v-bind:options="graph.options"
            />
          </div>  
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewInternalRatingList from '@/components/ViewInternalRatingList/ViewInternalRatingList'
import ViewInternalRatingListRight from '@/components/ViewInternalRatingListRight/ViewInternalRatingListRight'
import ViewInternalRatingGraph from '@/components/ViewInternalRatingGraph/ViewInternalRatingGraph'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'
import moment from 'moment'

export default {
  name: 'ViewInternalRating',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewInternalRatingList,
    ViewInternalRatingListRight,
    ViewInternalRatingGraph
  },

  data () {
    return {
        internal_rating: [
          {
            ratings: [
              {
                title: "AAA/AA+/AA-",
                date_3: "21.0%",
                date_2: "35.1%",
                date_1: "26.2%",
                evolution: "-"
              }, {
                title: "A+/A/A-",
                date_3: "26.1%",
                date_2: "20.5%",
                date_1: "22.4%",
                evolution: "+"
              }, {
                title: "BBB+/BBB/BBB-",
                date_3: "25.5%",
                date_2: "21.3%",
                date_1: "24.7%",
                evolution: "="
              },
            ],
            dates: [
                {
                  date:"2018-05-01T00:00:00.000Z"
                },
                {
                  date:"2018-04-01T00:00:00.000Z"
                },
                {
                  date:"2017-12-01T00:00:00.000Z"
                }
            ],
            total: [
              {
                name:"Total",
                result_3:"100%",
                result_2:"100%",
                result_1:"100%",
                evolutions:"+"
              }, {
                name:"Weighted average",
                result_3:"BBB+",
                result_2:"A-",
                result_1:"BBB+",
                evolutions:"-"
              }
            ]
        }
      ],
      internal_rating_right: [
        {
          ratings: [
            {
              title: "AAA/AA+/AA-",
              date_2: "21.0%",
              date_1: "35.1%"
            }, {
              title: "A+/A/A-",
              date_2: "20.5%",
              date_1: "22.4%"
            }, {
              title: "BBB+/BBB/BBB-",
              date_2: "21.3%",
              date_1: "24.7%"
            },
          ],
          dates: [
              {
                date:"2018-05-01T00:00:00.000Z"
              }
          ],
          total: [
            {
              title:"Total",
              result_2:"100%",
              result_1:"100%",
            }, {
              title:"Weighted average",
              result_2:"BB+",
              result_1:"BBB",
            }
          ]
        }
      ],
      internal_graph: [
        {
          data: {
            labels: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-', 'CCC', 'CC+', 'CC', 'CC-', 'C+', 'C', 'C-', 'Default'],
            boxWidth:2,
            datasets: [
              {
                  label: 'May-18',
                  backgroundColor: '#FF8B94',
                  data:[0, 2, 4, 100, 20, 30, 50, 25, 30, 27, 20, 12, 5, 2, 2, 0, 0, 0, 0, 0, 0, 8]
              },
              {
                  label: 'April-18',
                  backgroundColor:'#FFD3B6',
                  data:[0, 1, 3, 200, 17, 24, 42, 21, 26, 23, 16, 9, 3, 1, 1, 1, 0, 0, 0, 0, 0, 5]
              },
              {
                  label: 'December-17',
                  backgroundColor:'#DCEDC1',
                  data:[0, 1, 4, 130, 18, 27, 46, 25, 28, 24, 18, 10, 4, 1, 1, 1, 0, 0, 0, 0, 0, 7]
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
                  offsetGridLines: true,
                  display:false
                }
              }]
            },
            cornerRadius:20,
            responsive: true,
            maintainAspectRatio: false
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

    setTimeout(() => {
      document.getElementById('loada').classList.add('none')
      document.getElementById('list').classList.remove('none')
      document.getElementById('list-r').classList.remove('none')
      document.getElementById('lol').classList.remove('none')
    }, 5000);
  },

  methods: {
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

.graph-row {
  margin-right:0;
  margin-top:15px;
}

.graph{
  background-color:#fff;
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

.none {
  display: none;
}

</style>
