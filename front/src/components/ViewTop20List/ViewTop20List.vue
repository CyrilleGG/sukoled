<template>
    <div class="col-lg-12">

    <div class="row">
      
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th scope="col" class="text-center text-uppercase">Evolution</th>
                    <th scope="col" class="text-uppercase">Counterparty</th>
                    <th v-if="top_companies !== null" scope="col" class="text-center">{{ currentMonth () }}</th>
                    <th scope="col" class="text-uppercase text-center">Limit</th>
                    <th scope="col" class="text-uppercase text-center">Internal Rating</th>
                </tr>
            </thead>
            <tbody>
                <view-top-20-list-item
                    v-for="(company, index) in top_companies"
                    v-bind:key="index"
                    v-bind:name="company.lb_raf_tet"
                    v-bind:value="company.sum_mt_expo_global"
                    v-bind:limit="company.max_mt_limite_tgr"
                    v-bind:rating="company.cd_note_int_like_sp_raf_tet"
                />
                <tr class="view-list-item">
                    <td></td>
                    <td>Total</td>
                    <td v-if="results !== null" class="text-center font-weight-bold">{{ results.current }}</td>
                    <td></td>
                    <td></td>
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

export default {
    name: 'ViewTop20List',

    components: {
        ViewTop20ListItem
    },

    props: [
        'top_companies',
        'results'
    ],

  methods: {
    currentMonth () {
      return moment().subtract(1, 'months').format('MMMM-YY')
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