<template>
  <div id="header" class="row">

    <!-- === LOGO === -->
    <div class="col-lg-2 d-flex justify-content-center align-items-center">
      <img src="@/assets/logo.png" alt="Natixis logo">
    </div>
    <!-- === END OF LOGO === -->

    <!-- === NAVIGATION BAR === -->
    <b-navbar toggleable='lg' class="col-lg-10 pl-5 pr-0">
      <b-collapse is-nav id="nav-collapse">

        <!-- === ADMIN NAV === -->
        <b-navbar-nav v-if="role == 'mod'" id="main-nav">
          <b-nav-item class="mx-3" href="#">Dashboard</b-nav-item>
          <b-nav-item class="mx-3" href="#">Admin</b-nav-item>
          <b-nav-item class="mx-3" href="#">Contribute</b-nav-item>
        </b-navbar-nav>
        <!-- === END OF ADMIN NAV === -->

        <!-- === ADMIN NOTIFICATIONS + BURGER MENU === -->
        <b-navbar-nav id="second-nav" class="ml-auto">
          <b-nav-item v-if="role == 'mod'" id="notifications" class="border-left">
            <img src="@/assets/icons/bell.png" alt="Notifications">
          </b-nav-item>
          <b-nav-item-dropdown id="burger-menu" class="border-left" size="lg" text="cc" right no-caret>
            <template slot="button-content">
              <img src="@/assets/icons/burger.png" alt="Menu">
            </template>
            <b-dropdown-item href="#" v-on:click="logout()">Disconnect</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- === END OF ADMIN NOTIFICATIONS + BURGER MENU === -->

      </b-collapse>
    </b-navbar>
    <!-- === END OF NAVIGATION BAR -->
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
  height: 70px;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
}

#header img {
  max-height: 30px;
}

#header .navbar .nav-item a {
  color: #999999;
  text-transform: uppercase;
  transition: 0.3s ease;
}

#header .navbar-nav .nav-item:hover, #header .navbar-nav .nav-item:hover a {
  color: #8e44ad;
}

#header #second-nav .nav-item .nav-link, #header #second-nav #burger-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
}

</style>