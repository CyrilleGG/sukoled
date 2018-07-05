<template>
  <div id="ContributorModifyContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <contributor-form-lease v-if="this.department == 'lease'" />
      <contributor-form-raf v-if="this.department == 'raf'" />
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ContributorFormLease from '@/components/ContributorFormLease/ContributorFormLease'
import ContributorFormRaf from '@/components/ContributorFormRaf/ContributorFormRaf'

export default {
  name: 'ContributorModifyContribution',

  components: {
    Header,
    Footer,
    ContributorFormLease,
    ContributorFormRaf
  },

  data () {
    return {
      department: 'raf',
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }
  },

  methods: {
    uploadExcel () {
      this.$data.input.excel = this.$refs.excel.files[0]
      console.log(this.$data.input.excel.name)
      document.getElementById('upload-img').style.background = 'linear-gradient(#2ecc71, #29b362)'
      document.getElementById('upload-text').style.background = '#2ecc71'
    },

    uploadFile () {
      this.$data.input.additionalFiles.push(this.$refs.additionalFiles.files[0])
    },

    closeModal () {
      this.$refs.confirm.hide()
    }
  }
}
</script>

<style scoped>

#ContributorModifyContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

</style>