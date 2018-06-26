<template>
  <div id="header" class="row fixed-top">

    <div class="col-lg-2 py-2">
      <img class="my-auto" src="../../assets/logo.png" alt="Natixis logo">
    </div>

    <b-navbar toggleable='lg' class="col-lg-10 py-0 pl-5 pr-0">
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item href="#">Dashboard</b-nav-item>
          <b-nav-item href="#">Admin</b-nav-item>
          <b-nav-item href="#">Contribute</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item>cc</b-nav-item>
          <b-nav-item-dropdown text="cc" right>
            <b-dropdown-item href="#">Disconnect</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>

export default {
  name: 'Header',
  
  props: [
    'role'
  ],

  methods: {
    logout () {
      this.$bus.$emit('auth', false)
      this.$root.$data.userInfo = {}
      this.$router.replace( {name: 'login'} )
    }
  }
}
</script>

<style scoped>

#header {
  max-width: 101%;
  height: 70px;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
}

#header img {
  max-height: 20px;
}

#header .navbar .nav-item a {
  color: #999999;
  text-transform: uppercase;
  transition: 0.3s ease;
}

#header .navbar-nav .nav-item:hover a {
  color: #8e44ad;
}

/* #header #second-nav .nav-link {
  width: 60px;
  height: 60px;
} */

</style>