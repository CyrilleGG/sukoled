<template>
    <div class="col-lg-12">

    <div class="row">
      
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th/>
                    <th
                        v-for="(date, index) in dates"
                        v-bind:key="index"
                        v-bind:date="date.date"
                    >
                        <div scope="col" class="text-uppercase"> {{ moment(date.date) }}</div>
                    </th>
                    <th/>
                </tr>
                <tr>
                    <th scope="col" class="text-center">Internal rating</th>
                    <th scope="col" class="text-center">Specialized Lending</th>
                    <th scope="col" class="text-center">Corporates</th>
                </tr>
            </thead>
            <tbody>
                <view-internal-rating-list-right-item
                    v-for="(rating, index) in ratings"
                    v-bind:key="index"
                    v-bind:title="rating.title"
                    v-bind:date_2="rating.date_2"
                    v-bind:date_1="rating.date_1"
                />
                <view-internal-rating-list-right-bottom-item
                    v-for="(result, index) in total"
                    v-bind:key="index"
                    v-bind:title="result.title"
                    v-bind:result_2="result.result_2"
                    v-bind:result_1="result.result_1"
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

import ViewInternalRatingListRightItem from '@/components/ViewInternalRatingListRightItem/ViewInternalRatingListRightItem'
import ViewInternalRatingListRightBottomItem from '@/components/ViewInternalRatingListRightBottomItem/ViewInternalRatingListRightBottomItem'

export default {
    name: 'ViewInternalRatingListRight',

    components: {
        ViewInternalRatingListRightItem,
        ViewInternalRatingListRightBottomItem
    },

    props: [
        'dates',
        'ratings',
        'total'
    ],

    data() {
        return {
            // c
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