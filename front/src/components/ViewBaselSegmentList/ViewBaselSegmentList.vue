<template>
    <tr>

        <td scope="col" class="basel-border basel-text-left"> {{ title }} </td>
        
        <view-basel-segment-list-item
        v-for="(info, index) in infos"
        v-bind:key="index"
        v-bind:exposure="info.exposure"
        v-bind:weight="info.weight"/>

    </tr>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'

import ViewBaselSegmentListItem from '@/components/ViewBaselSegmentListItem/ViewBaselSegmentListItem'

export default {
  name: 'ViewBaselSegmentList',

  components: {
    ViewBaselSegmentListItem
  },

  props: [
    'title',
    'infos'
  ]
}
</script>

<style scoped>

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

.basel-text-left {
    text-align:left;
}

</style>