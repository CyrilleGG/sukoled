<template>
  <b-list-group-item class="contributors-list-item col-lg-12" >
    <div class="row h-100">

      <div class="col-lg-1 d-flex justify-content-center align-items-center">
        <b-form-checkbox class="mr-0" v-bind:checked="checked" v-on:change="updateCheck ($event)"></b-form-checkbox>
      </div>

      <p class="col-lg-1 my-auto">
        {{ department_name }}
      </p>

      <p class="col-lg-1 my-auto text-center">
        {{ order }}
      </p>

      <p class="col-lg-2 my-auto">
        {{ name }}
      </p>

      <p class="col-lg-2 my-auto text-center">
        {{ moment (ends_at) }}
      </p>

      <p class="col-lg-2 my-auto text-center">
        {{ moment (modified_at) }}
      </p>

      <status v-bind:status="status_admin" />

      <action 
        v-bind:status="status_admin" 
        v-bind:contribution_id="contribution_id"
        v-bind:version_id="version_id"
        v-bind:parent_version_id="parent_version_id"
        v-bind:department_slug="department_slug"
      />
            
    </div>
  </b-list-group-item>
</template>

<script>
import moment from 'moment'

import Status from '@/components/Status/Status'
import Action from '@/components/Action/Action'

export default {
  name: 'AdminContributorsListItem',

  components: {
    Status,
    Action
  },

  props: [
    'checked',
    'order',
    'name',
    'ends_at',
    'modified_at',
    'status_admin',
    'contribution_id',
    'version_id',
    'parent_version_id',
    'department_name',
    'department_slug'
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
    },

    moment (date) {
      return moment(date).format('MMMM DD, YYYY')
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