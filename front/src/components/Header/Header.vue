<template>
  <div id="header" class="row">
    <div class="col-lg-2 py-1">
      <img class="my-auto" src="../../assets/logo.png" alt="Natixis logo">
    </div>
    <nav class="col-lg-8 navbar navbar-expand-lg">
      <ul id="main-nav" class="navbar-nav pl-2">
        <li class="nav-item mx-3"><a href="#" class="nav-link">Dashboard</a></li>
        <li class="nav-item mx-3"><a href="#" class="nav-link">Admin</a></li>
        <li class="nav-item mx-3"><a href="#" class="nav-link">Contribute</a></li>
      </ul>
    </nav>
    <div class="col-lg-2 navbar navbar-expand-lg justify-content-end pr-0">
      <ul id="second-nav" class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">cc</a>
        </li>
        <li class="nav-item dropdown">
          <a href="#" class="nav-link">cc</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: [
    'role'
  ]
}
</script>

<style scoped>

#header {
  height: 60px;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
}

#header img {
  max-height: 50px;
}

#header .navbar .nav-item {
  color: #999999;
  text-transform: uppercase;
  transition: 0.3s ease;
}

#header .navbar .nav-item:hover {
  color: #8e44ad;
}

#header #second-nav .nav-link {
  width: 60px;
  height: 60px;
}

</style>