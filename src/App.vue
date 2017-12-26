<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

  @font-face {
    font-family: 'AvenirNextRoundedPro-Med';
    src: url('assets/font/avenir-next-rounded-pro-medium.otf');
  }

  @font-face {
    font-family: 'AvenirNextRoundedPro-Reg';
    src: url('assets/font/avenir-next-rounded-pro-regular.otf');
  }

  #app {
    font-family: 'AvenirNextRoundedPro-Reg', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
</style>
