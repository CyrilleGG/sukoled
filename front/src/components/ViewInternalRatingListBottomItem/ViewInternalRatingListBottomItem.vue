<template>

    <tr class="view-list-item">

        <td>{{ name }}</td>
        <td class="text-center">{{ result_3 }}</td>
        <td class="text-center">{{ result_2 }}</td>
        <td class="text-center">{{ result_1 }}</td>
        <td v-if="evolutions == '+'" class="text-center">
            <div class="arrow-up">&rarr;</div>
        </td>
        <td v-else-if="evolutions == '-'" class="text-center">
            <div class="arrow-down">&rarr;</div>
        </td>
        <td v-else class="text-center">
            &rarr;
        </td>

    </tr> 

</template>

<script>

export default {
  name: 'ViewInternalRatingListBottomItem',

  components: {
    // c
  },

  props: [
    'name',
    'result_3',
    'result_2',
    'result_1',
    'evolutions'
  ],

  data () {
    return {
      // c
    }
  }
}
</script>

<style scoped>

.arrow-up {
    transform:rotate(-30deg);
}

.arrow-down {
    transform:rotate(30deg);
}

/* tr.view-list-item{
    border-top:2px solid black !important;
} */

</style>