<template>
    <td scope="col" class="basel-border">
      <div class="basel-col-double">

        <div class="data text-center"> {{ exposure }} </div>
        <div class="data text-center"> {{ weight }} </div>

      </div>
    </td>
</template>

<script>

export default {
  name: 'ViewBaselSegmentListItem',

  props: [
    'exposure',
    'weight'
  ]
}
</script>

<style scoped>

td .basel-col-double .data{
  width:50%;
}

.basel-col-double {
  display:flex;
  justify-content:space-around;
}

</style>