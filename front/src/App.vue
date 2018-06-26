<template>
  <div id="app">
    <router-view @auth="setAuth" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      auth: false
    }
  },
  created () {
    this.$bus.$on('auth', (status) => {
      this.$data.auth = status
    })
  },
  methods: {
    setAuth (status) {
      this.$data.auth = status
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Lato', sans-serif;
  color: #2c3e50;
  background-color: #f3f3f3;
}
a, a:hover, a:link, a:visited {
  color: inherit;
}
</style>