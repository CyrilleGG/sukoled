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
                        <td class="text-left rotate row-name"><div> I.R Risk </div></td>
                        <td class="text-center"> Stress Test +/- 200 bp </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td class="text-center"> - </td>
                        <td class="text-center"> € 466.9m </td>
                        <td class="text-center"> -€ 525m </td>
                        <td class="text-center"> -€ 559.4m </td>
                        <td class="text-center"> -€ 659.4m </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/>
                            <span class="dot position-3"/>
                            <span class="limit-text"> -€700M </span>
                            <span class="line-red"/> 
                            <span class="threshold-text"> 9% </span>
                        </td>
                        <td class="text-center remarks"> Remarks longue pour tester la place que ça pourra prendre </td>
                    </tr>

                    <tr>
                        <td rowspan="3" class="text-left rotate row-name row-name-second"><div> Solvency </div></td>
                        <td class="text-center"> Stress Test +/- 200 bp </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td class="text-center"> - </td>
                        <td class="text-center"> € 466.9m </td>
                        <td class="text-center"> -€ 525m </td>
                        <td class="text-center"> -€ 559.4m </td>
                        <td class="text-center"> -€ 659.4m </td>
                        <td colspan="2" class="raf-gradient"> 
                            <span class="line-orange"/> 
                            <span class="line-red"/>
                        </td>
                        <td class="text-center"> Remarks </td>
                    </tr>

                    <tr>
                        <td class="text-center"> Stress Test +/- 200 bp </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td class="text-center"> - </td>
                        <td class="text-center"> € 466.9m </td>
                        <td class="text-center"> -€ 525m </td>
                        <td class="text-center"> -€ 559.4m </td>
                        <td class="text-center"> -€ 659.4m </td>
                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/> 
                            <span class="line-red"/> 
                        </td>
                        <td class="text-center"> Remarks </td>
                    </tr>

                    <tr>
                        <td class="text-center"> Stress Test +/- 200 bp </td>
                        <td class="text-center"> <span class="dot"/> </td>
                        <td class="text-center"> - </td>
                        <td class="text-center"> € 466.9m </td>
                        <td class="text-center"> -€ 525m </td>
                        <td class="text-center"> -€ 559.4m </td>
                        <td class="text-center"> -€ 659.4m </td>
                        <td colspan="2" class="raf-gradient">
                            <span class="line-orange"/> 
                            <span class="line-red"/>
                        </td>
                        <td class="text-center"> Remarks </td>
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
    background:#464b5a;
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

</style>
