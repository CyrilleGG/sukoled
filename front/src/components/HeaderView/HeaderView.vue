<template>
  <div id="header-viewer" class="row fixed-top">

    <div class="col-lg-2 d-flex justify-content-center align-items-center">
    </div>

    <b-navbar toggleable='lg' class="col-lg-10 py-0 pl-5 pr-0" type="dark">
      <b-collapse is-nav id="nav-collapse">

        <b-navbar-nav id="second-nav" class="ml-3" type="cyan">
          <b-nav-item-dropdown id="header-viewer-burger-menu" size="lg" text="Global Exposure">
            <b-dropdown-item :to="{ name: 'viewer' }" replace>Top 20</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'view-internal-rating' }" replace>Internal Rating</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'view-economic-sector' }" replace>Economic sector</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'view-basel-segment' }" replace>Basel segment</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'view-business-line' }" replace>Business line</b-dropdown-item>
          </b-nav-item-dropdown>
          
          <b-nav-item class="mx-3" :to="{ name: 'view-highlight' }" replace>Highlights</b-nav-item>
          <b-nav-item class="mx-3" :to="{ name: 'view-lease' }" replace>Lease</b-nav-item>
        </b-navbar-nav>

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

  mounted () {
    let elements = document.getElementById('header-viewer-burger-menu').children
    elements[1].style.backgroundColor = '#1b2133'
  },

  methods: {
    //c
  },
}
</script>

<style scoped>

#header-viewer {
  max-width: 101%;
  top:70px;
  height:40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  background-color: #1b2133 !important;
}

#header-viewer .navbar-nav .nav-item:hover a,
#header-viewer .navbar-nav .active a,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #ffffff !important;
}

#header-viewer .navbar-nav .nav-item>.nav-link:hover::after,
#header-viewer .navbar-nav .nav-item>.active::after {
  position: relative;
  top: 8px;
  display: block;
  content: ' ';
  margin-top: -5px;
  margin-left: -5%;
  width: 110%;
  height: 5px;
  background-color: #8e44ad;
}

#header-viewer .dropdown-menu .dropdown-item {
  color: #ffffff;
  background-color: #1b2133;
}

#header-viewer .dropdown-menu .dropdown-item:hover {
  background-color: #8e44ad !important;
}

#header-viewer .dropdown-menu .dropdown-item.active {
  background-color: #8e44ad;
}

</style>