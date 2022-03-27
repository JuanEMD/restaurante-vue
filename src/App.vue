<template>


  <div id="app">
    <div id="nav">
    <b-navbar  type="dark" variant="primary">
      <b-navbar-brand href="#">&nbsp;&nbsp;Baratie Restaurant</b-navbar-brand>
    </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
  body {
    height: 100vh !important;
    background-color: #e9ecef!important;
  }
</style>