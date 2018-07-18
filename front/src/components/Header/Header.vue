<template>
  <div id="header" class="row fixed-top">

    <div class="col-lg-2 d-flex justify-content-center align-items-center">
      <img src="@/assets/logo.png" alt="Natixis logo">
    </div>

    <b-navbar toggleable='lg' class="col-lg-10 py-0 pl-5 pr-0">
      <b-collapse is-nav id="nav-collapse">

        <b-navbar-nav v-if="role == 'mod'" id="main-nav">
          <b-nav-item id="viewer" class="mx-3" :to="{ name: 'viewer' }">Dashboard</b-nav-item>
          <b-nav-item id="admin" class="mx-3" :to="{ name: 'admin' }">Admin</b-nav-item>
          <b-nav-item id="contributor" class="mx-3" :to="{ name: 'contributor' }">Contribute</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="second-nav" class="ml-auto">
          <b-nav-item-dropdown id="burger-menu" class="border-left" size="lg" text="cc" right no-caret>
            <template slot="button-content">
              <img src="@/assets/icons/burger.png" alt="Menu">
            </template>
            <b-dropdown-item v-if="role == 'mod'" :to="{ name: 'admin-manage-policies' }">Management</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="logout()">Log out</b-dropdown-item>
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

  mounted () {
    const role = this.$root.$data.userInfo.role
    const letter = this.$route.path[1]

    if (role == 'admin') {
      if (letter == 'a') {
        document.getElementById('admin').classList.add('active')
      } else if (letter == 'c') {
        document.getElementById('contributor').classList.add('active')
      } else {
        document.getElementById('viewer').classList.add('active')
      }
    }
  },

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

#header .navbar-nav .nav-item:hover, #header .navbar-nav .nav-item:hover a, #header .navbar-nav .nav-item:hover, #header .navbar-nav .active a  {
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