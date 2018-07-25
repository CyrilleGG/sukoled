<template>

    <tr class="view-list-item">
        <td>{{ title }}</td>
        <td class="text-center">{{ date_3 }}</td>
        <td class="text-center">{{ date_2 }}</td>
        <td class="text-center">{{ date_1 }}</td>
        <td v-if="evolution == '+'" class="text-center">
            <div class="arrow">
                <span class="arrow-up">&rarr;</span>
            </div>
        </td>
        <td v-else-if="evolution == '-'" class="text-center">
            <div class="arrow">
                <span class="arrow-down">&rarr;</span>
            </div>
        </td>
        <td v-else class="text-center">
            <div class="arrow">&rarr;</div>
        </td>
    </tr>
            
</template>

<script>
import moment from 'moment'

export default {
  name: 'ViewInternalRatingListItem',

  components: {
    // c
  },

  props: [
    'title',
    'date_3',
    'date_2',
    'date_1',
    'evolution'
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

.arrow span {
    display: inline-block;
}

.arrow-up {
    transform:rotate(-30deg);
}

.arrow-down {
    transform:rotate(30deg);
}

</style>