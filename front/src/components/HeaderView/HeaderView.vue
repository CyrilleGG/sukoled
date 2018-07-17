<template>
  <div id="header" class="row fixed-top">

    <div class="col-lg-2 d-flex justify-content-center align-items-center">
    </div>

    <b-navbar toggleable='lg' class="col-lg-10 py-0 pl-5 pr-0">
      <b-collapse is-nav id="nav-collapse">

        <b-navbar-nav id="second-nav" type="cyan">
          <b-nav-item-dropdown id="burger-menu" class="border-left" size="lg" text="cc">
            <template slot="button-content">
              eeeeee
            </template>
            <b-dropdown-item href="#" v-on:click="logout()">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-nav-item class="mx-3" :to="{ path: '../view/internal-rating' }" replace>Other Inputs</b-nav-item>
        <b-nav-item class="mx-3" :to="{ path: '../viewer' }" replace>Risk Appetite</b-nav-item>
        <b-nav-item class="mx-3" href="#">Highlights</b-nav-item>

      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  
  props: [
    'role'
  ],
  methods: {
    //c
  },
}
</script>

<style scoped>
#header {
  max-width: 101%;
  top:70px;
  height:40px;
  font-family: 'Poppins', sans-serif;
  background-color: #0c0303;
  z-index:1029;
}
#header img {
  max-height: 20px;
}
#header .navbar .nav-item a, .navbar-light .navbar-nav a.nav-link, #header a#burger-menu__BV_button_.nav-link.dropdown-toggle{
  color: rgba(255, 255, 255) !important;
  text-transform: uppercase;
  transition: 0.3s ease;
}
#header .navbar-nav .nav-item:hover, #header .navbar-nav .nav-item:hover a {
  color: #8e44ad;
}
#header #second-nav .nav-item .nav-link{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff !important;
}
.mx-3{
    list-style: none;
}
.col-lg-10{
  margin-left:-8px;
}
</style>