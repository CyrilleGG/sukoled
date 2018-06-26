<template>
  <div id="Viewer" class="container-fluid">
    <Header :role="this.$root.$data.userInfo.role" />
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
      // cc
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }
  }
}
</script>

<style scoped>

</style>
