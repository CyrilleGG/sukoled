<template>
  <div id="header" class="row fixed-top">

    <div class="col-lg-2 d-flex justify-content-center align-items-center">
      <b-navbar-nav v-if="role == 'mod'">
        <b-nav-item id="viewer" class="mx-3" :to="{ name: 'admin' }">
          <img src="@/assets/logo.png" alt="Natixis logo">
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else-if="role == 'contrib'">
        <b-nav-item id="viewer" class="mx-3" :to="{ name: 'contributor' }">
          <img src="@/assets/logo.png" alt="Natixis logo">
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else-if="role == 'user'">
        <b-nav-item id="viewer" class="mx-3" :to="{ name: 'viewer' }">
          <img src="@/assets/logo.png" alt="Natixis logo">
        </b-nav-item>
      </b-navbar-nav>
    </div>

    <b-navbar toggleable='lg' class="col-lg-10 py-0 pl-5 pr-0">
      <b-collapse is-nav id="nav-collapse">

        <b-navbar-nav v-if="role == 'mod'" id="main-nav">
          <b-nav-item id="admin" class="mx-3 text-uppercase" :to="{ name: 'admin' }">Admin</b-nav-item>
          <b-nav-item id="contributor" class="mx-3 text-uppercase" :to="{ name: 'contributor' }">Contribute</b-nav-item>
          <b-nav-item id="viewer" class="mx-3 text-uppercase" :to="{ name: 'viewer' }">Dashboard</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="role == 'contrib'" id="main-nav">
          <b-nav-item id="home" class="mx-3 text-uppercase" :to="{ name: 'contributor' }">Home</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="role == 'user'" id="main-nav">
          <b-nav-item id="home" class="mx-3 text-uppercase" :to="{ name: 'viewer' }">Home</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="second-nav" class="ml-auto">
          <b-nav-item id="username" class="mr-5 p-0 text-lowercase" disabled>{{ this.$root.$data.userInfo.username }}</b-nav-item>
          <b-nav-item-dropdown id="burger-menu" class="border-left" size="lg" text="cc" right no-caret>
            <template slot="button-content">
              <img src="@/assets/icons/burger.png" alt="Menu">
            </template>
            <b-dropdown-item v-if="role == 'mod'" class="text-uppercase" :to="{ name: 'admin-manage-policies' }">Contribution Access</b-dropdown-item>
            <b-dropdown-item href="#" class="text-uppercase" v-on:click="logout ()">Log out</b-dropdown-item>
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

    if (role == 'mod') {
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
  max-height: 30px;
}

#header .navbar .nav-item a {
  color: #999999;
  transition: 0.3s ease;
}

#header .navbar-nav .nav-item:hover,
#header .navbar-nav .nav-item:hover a,
#header .navbar-nav .nav-item:hover,
#header .navbar-nav .active a  {
  color: #8e44ad;
}

#header .navbar .nav-item .disabled,
#header .navbar .nav-item .disabled:hover {
  color: #999999;
  cursor: default;
}

#header .navbar .nav-item a.active {
  color: #8e44ad;
  background-color: #ffffff;
}

#header #second-nav .nav-item .nav-link, #header #second-nav #burger-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
}

</style>