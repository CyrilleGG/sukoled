<template>
  <b-list-group-item class="contributors-list-item col-lg-12" >
    <div class="row h-100">

      <div class="col-lg-1 d-flex justify-content-center align-items-center">
        <b-form-checkbox class="mr-0" v-bind:checked="checked" v-on:change="updateCheck ($event)"></b-form-checkbox>
      </div>

      <p class="col-lg-1 my-auto text-center">
        {{ order }}
      </p>

      <p class="col-lg-3 my-auto">
        {{ name }}
      </p>

      <p class="col-lg-2 my-auto text-center">
        {{ created_at }}
      </p>

      <p class="col-lg-2 my-auto text-center">
        {{ modified_at }}
      </p>

      <status v-bind:status_admin="status_admin" />

      <admin-action v-bind:status_admin="status_admin"></admin-action>
            
    </div>
  </b-list-group-item>
</template>

<script>
import Status from '@/components/Status/Status'
import AdminAction from '@/components/AdminAction/AdminAction'

export default {
  name: 'ContributorsListItem',

  components: {
    Status,
    AdminAction
  },

  props: [
    'checked',
    'order',
    'name',
    'created_at',
    'modified_at',
    'status_admin'
  ],

  data () {
    return {
      check: false
    }
  },

  methods: {
    updateCheck (value) {
      this.$data.check = value
      this.$emit('check-state', [this.$data.check, this.$props])
    }
  }
}
</script>

<style scoped>

.contributors-list-item {
  border-top: none;
  height: 60px;
  background: none;
  transition: 0.2s ease;
}

.contributors-list-item:hover {
  background-color: #eeeeee;
}

</style>