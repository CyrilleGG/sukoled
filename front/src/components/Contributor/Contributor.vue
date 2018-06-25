<template>
  <div id="Contributor" class="container-fluid">
    <Header :role="this.$root.$data.userInfo.role" />
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
      // c
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
    }
  }
}
</script>

<style scoped>

</style>
