<template>
  <div class="col-lg-1 my-auto pl-0 text-right">

    <b-button v-if="status == 'done'" class="py-1 px-3" :to="{ path: 'view', query: { contribution_id: contribution_id, version_id: version_id, department_slug: department_slug } }" append size="sm" variant="outline-primary">View</b-button>

    <b-button v-else-if="status == 'delivered' || status == 'invalid' || status == 'pending'" class="py-1 px-3" :to="{ path: 'review', query: { contribution_id: contribution_id, version_id: version_id, department_slug: department_slug } }" append size="sm" variant="outline-primary">Review</b-button>

    <b-button v-if="status == 'unreceived'" class="py-1 px-3" v-b-modal.confirm size="sm" variant="outline-primary">Resend</b-button>

    <b-button v-if="status == 'not sent'" class="py-1 px-3" :to="{ path: 'send-contribution', query: { contribution_id: contribution_id, version_id: version_id } }" append size="sm" variant="outline-primary">Add</b-button>

    <b-button v-if="status == 'in progress'" class="py-1 px-3" :to="{ path: 'review', query: { contribution_id: contribution_id, version_id: version_id, department_slug: department_slug } }" append size="sm" variant="outline-primary">Review</b-button>

  </div>
</template>

<script>

export default {
  name: 'Action',

  props: [
    'status',
    'contribution_id',
    'version_id',
    'department_slug'
  ]
}
</script>

<style scoped>

.btn-outline-primary {
  color: #914eb7;
  border-color: #914eb7;
  border-radius: 15px;
  font-size: 0.8rem;
}

.btn-outline-primary:hover {
  color: #ffffff;
  background-color: #914eb7;
}

.btn-outline-primary.disabled {
  color: #bbbbbb;
  border-color: #bbbbbb;
  border-radius: 15px;
  font-size: 0.8rem;
}

.btn-outline-primary.disabled:hover {
  color: #bbbbbb;
  background-color: #eeeeee;
}

</style>
