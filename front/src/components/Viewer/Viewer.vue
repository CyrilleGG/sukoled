<template>
  <div id="Viewer" class="container-fluid">
    <Header :role="userInfo.role" />
    <h1>WELCOME VIEWER !</h1>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'Viewer',

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
