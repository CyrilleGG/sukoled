<template>

    <tr>
        <td scope="row" class="text-right">{{ moment (date) }} :</td>
        <td class="text-left">{{ number }}</td>
    </tr>

</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment'

export default {
    name: 'ViewResult',

    components: {
        // c
    },

    methods: {
        moment (date) {
            return moment(date).format('MMMM-YY')
        }
    },

    props: [
        'date',
        'number'
    ]
}
</script>

<style scoped>

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

</style>