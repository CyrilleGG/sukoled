<template>
  <div id="ContributorPreviewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <contributor-preview-raf v-if="inputs.department_slug == 'raf'" v-bind:inputs="inputs" />
      <contributor-preview-lease v-if="inputs.department_slug == 'subsidaries'" v-bind:inputs="inputs" />
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ContributorPreviewLease from '@/components/ContributorPreviewLease/ContributorPreviewLease'
import ContributorPreviewRaf from '@/components/ContributorPreviewRaf/ContributorPreviewRaf'

export default {
  name: 'ContributorPreviewContribution',

  components: {
    Header,
    Footer,
    ContributorPreviewLease,
    ContributorPreviewRaf
  },

  data () {
    return {
      inputs: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }

    this.$data.inputs = this.$root.$data.formInput
  },

  methods: {
    // c
  }
}
</script>

<style scoped>

#ContributorPreviewContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

</style>