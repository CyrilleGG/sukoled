<template>

    <tr class="view-list-item">
        <td> {{ title }} </td>
        <td>{{ date_2 }}</td>
        <td>{{ date_1 }}</td>
    </tr>
            
</template>

<script>
import moment from 'moment'

export default {
  name: 'ViewInternalRatingListRightItem',

  components: {
    // c
  },

  props: [
    'title',
    'date_2',
    'date_1'
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

.arrow-up {
    transform:rotate(-30deg);
}

.arrow-down {
    transform:rotate(30deg);
}

</style>