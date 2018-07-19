<template>

    <tr class="view-list-item">

        <td>{{ title }}</td>
        <td class="text-center">{{ result_2 }}</td>
        <td class="text-center">{{ result_1 }}</td>

    </tr> 

</template>

<script>

export default {
  name: 'ViewInternalRatingListRightBottomItem',

  components: {
    // c
  },

  props: [
    'title',
    'result_2',
    'result_1'
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