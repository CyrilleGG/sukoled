<template>
  <div id="Admin" class="container-fluid">
    <Header :role="userInfo.role" />
    <h1>WELCOME ADMIN !</h1>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default {
  name: 'Admin',

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
