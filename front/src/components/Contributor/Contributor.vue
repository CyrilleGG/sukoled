<template>
  <div id="Contributor" class="container-fluid">
    <Header :role="userInfo.role" />
    <h1>WELCOME CONTRIBUTOR !</h1>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'Contributor',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      userInfo: null
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    }
    this.$data.userInfo = this.$root.$data.userInfo
  }
}
</script>

<style scoped>

</style>
