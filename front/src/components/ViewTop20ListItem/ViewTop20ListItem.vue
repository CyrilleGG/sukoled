<template>

    <tr class="view-list-item">
        <td v-if="evolution > 0"  scope="row" class="text-success text-center text-uppercase" >{{ evolution }}</td>
        <td v-else-if="evolution < 0" scope="row" class="text-danger text-center text-uppercase">{{ evolution }}</td>
        <td v-else scope="row" class="text-dark text-center text-uppercase equal"> = </td>
        <td class="text-uppercase">{{ counterparty }}</td>
        <td class="text-center">{{ date_2 }}</td>
        <td class="text-center">{{ date_1 }}</td>
        <td class="text-center">{{ limit }}</td>
        <td v-if="internal_rating == 'AAA' || internal_rating == 'AA+' || internal_rating == 'AA-' || internal_rating == 'AA' || internal_rating == 'A+' || internal_rating == 'A' || internal_rating == 'A-' || internal_rating == 'BBB+' || internal_rating == 'BBB' || internal_rating == 'BBB-'" class="text-center">
            <span class="d-block text-center align-middle box-rating box-rating-green">{{ internal_rating }}</span>
        </td>
        <td v-else class="text-center">
            <span class="d-block text-center align-middle box-rating box-rating-yellow">{{ internal_rating }}</span>
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
    background-color:#2ecc71;
}

.box-rating-yellow {
    background-color:#fdad2a;
}

</style>