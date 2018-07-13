<template>

        <th scope="col" class="text-uppercase">{{ moment (date) }}</th>
                        
</template>

<script>
import moment from 'moment'

export default {
  name: 'ViewTop20ListHeaderItem',

  components: {
    // c
  },

  props: [
    'date'
  ],

  data () {
    return {
      // c
    }
  },

  methods: {
    moment (date) {
      return moment(date).format('MMMM-YY')
    }
  }
}
</script>

<style scoped>

</style>