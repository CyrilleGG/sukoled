<template>
    <div class="col-lg-12">

    <div class="row">
      
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th scope="col" class="text-center text-uppercase">Basel segment</th>
                    <th
                        v-for="(date, index) in dates"
                        v-bind:key="index"
                        v-bind:date="date.date"
                    >
                        <div scope="col" class="text-uppercase text-center"> {{ moment(date.date) }}</div>
                    </th>
                    <th scope="col" class="text-center text-uppercase">Evolution</th>
                </tr>
            </thead>
            <tbody>
                <view-internal-rating-list-item
                    v-for="(rating, A) in ratings"
                    v-bind:key="A"
                    v-bind:title="rating.title"
                    v-bind:date_3="rating.date_3"
                    v-bind:date_2="rating.date_2"
                    v-bind:date_1="rating.date_1"
                    v-bind:evolution="rating.evolution"
                />
                <view-internal-rating-list-bottom-item
                    v-for="(result, B) in total"
                    v-bind:key="B"
                    v-bind:name="result.name"
                    v-bind:result_3="result.result_3"
                    v-bind:result_2="result.result_2"
                    v-bind:result_1="result.result_1"
                    v-bind:evolutions="result.evolutions"
                />
            </tbody>
        </table>
    </div>

  </div> 
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import ViewInternalRatingListItem from '@/components/ViewInternalRatingListItem/ViewInternalRatingListItem'
import ViewInternalRatingListBottomItem from '@/components/ViewInternalRatingListBottomItem/ViewInternalRatingListBottomItem'

export default {
    name: 'ViewInternalRatingList',

    components: {
        ViewInternalRatingListItem,
        ViewInternalRatingListBottomItem
    },

    data() {
        return {
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
                    title: "BBB+/BB/BB-",
                    date_3: "25.5%",
                    date_2: "21.3%",
                    date_1: "24.7%",
                    evolution: "="
                },
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
    },

    methods: {
        moment (date) {
            return moment(date).format('MMMM-YY')
        }
    }
}
</script>

<style scoped>

#view-list {
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
}

#view-list #view-list-header {
  height: 60px;
  color: #999999;
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

.table {
    background-color:#FFF;
}

tbody tr:nth-last-child(2){
    border-top:2px solid #dee2e6 !important;
}
tbody tr:nth-last-child(2), tbody tr:last-child {
    background-color:#fff;
}

</style>