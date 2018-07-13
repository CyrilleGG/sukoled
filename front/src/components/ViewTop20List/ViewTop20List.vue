<template>
    <div class="col-lg-12">

    <div class="row">
      
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th scope="col" class="text-center text-uppercase">Evolution</th>
                    <th scope="col" class="text-uppercase">Counterparty</th>
                    <view-top-20-list-header-item
                        v-for="(date, index) in dates"
                        v-bind:key="index"
                        v-bind:date="date.date"
                    />
                    <th scope="col" class="text-uppercase">Limit</th>
                    <th scope="col" class="text-center text-uppercase">Internal Rating</th>
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

import ViewTop20ListItem from '@/components/ViewTop20ListItem/ViewTop20ListItem'
import ViewTop20ListHeaderItem from '@/components/ViewTop20ListHeaderItem/ViewTop20ListHeaderItem'
import ViewTop20ListBottomItem from '@/components/ViewTop20ListBottomItem/ViewTop20ListBottomItem'

export default {
    name: 'ViewTop20List',

    components: {
        ViewTop20ListItem,
        ViewTop20ListHeaderItem,
        ViewTop20ListBottomItem
    },

    data() {
        return {
            top20s: [
                {
                    evolution: "0",
                    counterparty: "Groupe Arnault",
                    date_2: "3 201",
                    date_1: "3 253",
                    limit: "3 598",
                    internal_rating: "A-"
                },
                {
                    evolution: "+1",
                    counterparty: "Axa S.A",
                    date_2: "1 808",
                    date_1: "1 228",
                    limit: "2 631",
                    internal_rating: "AA-"
                },
                {
                    evolution: "-1",
                    counterparty: "Total SA",
                    date_2: "1 563",
                    date_1: "1 228",
                    limit: "2 689",
                    internal_rating: "AA-"
                },
                {
                    evolution: "0",
                    counterparty: "Trafigura",
                    date_2: "1 494",
                    date_1: "1 525",
                    limit: "1 768",
                    internal_rating: "BBB-"
                }
            ],
            dates: [
                {
                    date:"2018-03-01 00:00:00"
                },
                {
                    date:"2018-02-01 00:00:00"
                }
            ],
            total: [
                {
                    result:"222"
                },
                {
                    result:"333"
                },
                {
                    result:"444"
                }
            ]
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