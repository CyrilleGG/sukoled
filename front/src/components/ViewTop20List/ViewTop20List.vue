<template>
    <div class="col-lg-12">

    <div class="row">
      
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th scope="col" class="text-center text-uppercase">Evolution</th>
                    <th scope="col" class="text-uppercase">Counterparty</th>
                    <th
                        v-for="(date, index) in dates"
                        v-bind:key="index"
                        v-bind:date="date.date"
                    >
                        <div scope="col" class="text-uppercase text-center"> {{ moment(date.date) }}</div>
                    </th>
                    <th scope="col" class="text-uppercase text-center">Limit</th>
                    <th scope="col" class="text-uppercase text-center">Internal Rating</th>
                </tr>
            </thead>
            <tbody>
                <view-top-20-list-item
                    v-for="(top20, index) in top20s"
                    v-bind:key="index"
                    v-bind:evolution="top20.evolution"
                    v-bind:counterparty="top20.counterparty"
                    v-bind:date_2="top20.date_2"
                    v-bind:date_1="top20.date_1"
                    v-bind:limit="top20.limit"
                    v-bind:internal_rating="top20.internal_rating"
                />
                <tr class="view-list-item">
                    <td/>
                    <td>Total</td>
                    <view-top-20-list-bottom-item
                        v-for="(result, index) in total"
                        v-bind:key="index"
                        v-bind:result="result.result"
                    />
                    <td/>
                </tr>

            </tbody>
        </table>
    </div>

  </div> 
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'
import moment from 'moment'

import ViewTop20ListItem from '@/components/ViewTop20ListItem/ViewTop20ListItem'
import ViewTop20ListBottomItem from '@/components/ViewTop20ListBottomItem/ViewTop20ListBottomItem'

export default {
    name: 'ViewTop20List',

    components: {
        ViewTop20ListItem,
        ViewTop20ListBottomItem
    },

    props: [
        'dates',
        'top20s',
        'total'
    ],

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

</style>