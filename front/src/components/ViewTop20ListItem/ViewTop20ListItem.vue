<template>

    <tr class="view-list-item">
        <td v-if="evolution > 0"  scope="row" class="text-success text-center text-uppercase" >+{{ evolution }}</td>
        <td v-else-if="evolution < 0" scope="row" class="text-danger text-center text-uppercase">{{ evolution }}</td>
        <td v-else scope="row" class="text-dark text-center text-uppercase equal"> = </td>
        <td class="text-uppercase">{{ name }}</td>
        <td class="text-center">{{ value }}</td>
        <td class="text-center">{{ limit }}</td>
        <td v-if="!rating" class="text-center">Not rated</td>
        <td v-else-if="rating == 'AAA' || rating == 'AA+' || rating == 'AA-' || rating == 'AA' || rating == 'A+' || rating == 'A' || rating == 'A-' || rating == 'BBB+' || rating == 'BBB' || rating == 'BBB-'" class="text-center">
            <span class="d-block text-center align-middle box-rating box-rating-green">{{ rating }}</span>
        </td>
        <td v-else class="text-center">
            <span class="d-block text-center align-middle box-rating box-rating-yellow">{{ rating }}</span>
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
    'name',
    'value',
    'limit',
    'rating'
  ],

  data () {
    return {
      evolution: null
    }
  },

  created() {
      this.$data.evolution = Math.floor(Math.random() * 3) - 1
  },
}
</script>

<style scoped>

.view-list-item {
  background: none;
  transition: 0.2s ease;
}

.view-list-item:hover {
  background-color: #dddddd;
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