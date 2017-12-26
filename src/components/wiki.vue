<template>
  <div class="wiki">
    <div id="topbar"></div>
    <div id="navbar"></div>
    <div id="sidebar"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'wiki',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #topbar {
    position: fixed;
    z-index: 9001;
    top: 0;
    left: 0;
    height: 40px;
    width: 100vw;
    width: 100%;
    border-bottom: solid 1px #e5e5e5;
    background: white;
  }

  #navbar {
    position: fixed;
    z-index: 9000;
    top: 40px;
    left: 0;
    width: 100vw;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #e5e5e5;
    background: white;
  }

  #sidebar {
    position: absolute;
    top: 104px;
    left: 0;
    width: 160px;
    min-height: calc(100vh - 104px);
    min-height: calc(100% - 104px);
    background: #111111;
  }
</style>
