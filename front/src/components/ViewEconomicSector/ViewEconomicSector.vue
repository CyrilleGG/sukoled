<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-4">
          <h2 class="col-lg-12 pl-0 text-uppercase">Breakdown by economic sector</h2>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>

        <div class="row graph-row">
          <div class="col-lg-12 graph border">
            <view-economic-sector-graph v-if="data !== null"
              v-for="(graph, index) in economic_graph"
              v-bind:key="index"
              v-bind:data="graph.data"
              v-bind:options="graph.options"
            />
          </div>  
        </div>

        <div class="row graph-row">
          <div class="col-lg-12 graph border">
            <view-comment
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
import ViewEconomicSectorGraph from '@/components/ViewEconomicSectorGraph/ViewEconomicSectorGraph'
import ViewComment from '@/components/ViewComment/ViewComment'

export default {
  name: 'ViewEconomicSector',

  components: {
      Header,
      HeaderView,
      Footer,
      ViewEconomicSectorGraph,
      ViewComment
  },

  data () {
    return {
      data: null,
      comments: [
        {
          title:"Comments",
          comment:"The 20 biggest corporates represent 16.5% in the total corporate exposure as of end of Mars 2018 (compared to 16.7% as of end of February 2018)."
        }
      ],
      economic_graph: [
        {
          data: {
            labels: [],
            boxWidth:2,
            datasets: [
              {
                label: 'March-18',
                backgroundColor: '#f87979',
                data:[]
              }, {
                label: 'February-18',
                backgroundColor:'orange',
                data:[]
              }, {
                label: 'December-17',
                backgroundColor:'lightgreen',
                data:[]
              }
            ]
          },
          options: {
            title: {
              display:true,
              text: 'Distribution of grades',
              fontSize:'15'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  offsetGridLines: true
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
                // barThickness:7,
                stacked:false
              }]
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.xLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' million euros'
                }
              }
            },
            cornerRadius:20,
            responsive: true,
            maintainAspectRatio: true,
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

    http.get('dtm/breakdown/sector/'+ moment().year() +'/'+ moment().subtract(1, 'months').month())
      .then(response => {
        const sectors = response.data.data
        sectors.forEach(sector => {
          this.$data.economic_graph[0].data.labels.push(sector.lb_regrp_act_eco_int)
          this.$data.economic_graph[0].data.datasets[0].label = moment().subtract(2, 'months').format('MMMM-YY')
          this.$data.economic_graph[0].data.datasets[0].data.push(sector.mt_expo_global)
        });
      })
      .catch(error => {
        console.log(error)
      })
    
    http.get('dtm/breakdown/sector/'+ moment().year() +'/'+ moment().subtract(2, 'months').month())
      .then(response => {
        const sectors = response.data.data
        sectors.forEach(sector => {
          this.$data.economic_graph[0].data.datasets[1].label = moment().subtract(3, 'months').format('MMMM-YY')
          this.$data.economic_graph[0].data.datasets[1].data.push(sector.mt_expo_global)
        });
      })
      .catch(error => {
        console.log(error)
      })
    
    http.get('dtm/breakdown/sector/'+ moment().subtract(1, 'years').year() +'/'+ moment().month(11).format('MM'))
      .then(response => {
        const sectors = response.data.data
        sectors.forEach(sector => {
          this.$data.economic_graph[0].data.datasets[2].label = moment().subtract(1, 'years').month(11).format('MMMM-YY')
          this.$data.economic_graph[0].data.datasets[2].data.push(sector.mt_expo_global)
        });
        this.$data.data = response.data.data[0].lb_regrp_act_eco_int
      })
      .catch(error => {
        console.log(error)
      })
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

</style>
