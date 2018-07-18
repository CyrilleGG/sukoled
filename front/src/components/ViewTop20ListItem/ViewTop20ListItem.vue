<template>

    <tr class="view-list-item">
        <td v-if="evolution > 0"  scope="row" class="text-success text-center text-uppercase" > {{ evolution }} </td>
        <td v-else-if="evolution < 0" scope="row" class="text-danger text-center text-uppercase"> {{ evolution }} </td>
        <td v-else scope="row" class="text-dark text-center text-uppercase equal"> = </td>
        <td class="text-uppercase">{{ counterparty }}</td>
        <td>{{ date_2 }}</td>
        <td>{{ date_1 }}</td>
        <td>{{ limit }}</td>
        <td v-if="internal_rating == 'A+' || internal_rating == 'AA+' || internal_rating == 'AAA+' || internal_rating == 'A' || internal_rating == 'AA' || internal_rating == 'AAA' || internal_rating == 'A-' || internal_rating == 'AA-' || internal_rating == 'AAA-'" class="text-center">
            <div class="box-rating box-rating-green">{{ internal_rating }}</div>
        </td>
        <td v-else-if="internal_rating == 'B+' || internal_rating == 'BB+' || internal_rating == 'BBB+' || internal_rating == 'B' || internal_rating == 'BB' || internal_rating == 'BBB' || internal_rating == 'B-' || internal_rating == 'BB-' || internal_rating == 'BBB-'" class="text-center">
            <div class="box-rating box-rating-yellow">{{ internal_rating }}</div>
        </td>
        <td v-else>
            {{ internal_rating }}
        </td>
    </tr>
            
</template>

<script>
import moment from 'moment'

export default {
  name: 'ViewTop20ListItem',

  components: {
    // c
  },

  props: [
    'evolution',
    'counterparty',
    'date_2',
    'date_1',
    'limit',
    'internal_rating'
  ],

  data () {
    return {
      // c
    }
  }
}
</script>

<style scoped>

.view-list-item {
  background: none;
  transition: 0.2s ease;
}

.view-list-item:hover {
  background-color: #8e44ad;
  color:white;
}

.table td {
    border-top:none;
}

.equal {
    font-weight:bold;
}

.box-rating {
    border-radius:5px;
    width:50px;
    height:1.7em;
    margin-left:auto;
    margin-right:auto;
    color:white;
}

.box-rating-green {
    background-color:rgb(12, 165, 12);
}

.box-rating-yellow {
    background-color:rgb(228, 175, 29);
}

</style>