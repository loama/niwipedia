<template>
  <div class="wiki">

    <div id="topbar"></div>

    <div id="navbar">
      <div class="logo">
        <img src="../assets/logo.png">
        <span class="brand"> WikipediA </span>
        <span class="slogan"> The Free Encyclopedia </span>
      </div>

      <input id="searchBox" :placeholder="this.search.placeholder">
      </input>

    </div>
    <div id="tabs">
      <div class="main_tabs">
        <div class="tab location active"> <span>{{this.location}}</span> </div>
        <div class="tab talk"> <span>Talk</span> </div>
      </div>

      <div class="secondary_tabs">
        <div class="tab read"> <span>Read</span> </div>
        <div class="tab edit"> <span>Edit</span> </div>
        <div class="tab view-history"> <span>View history</span> </div>
      </div>

    </div>

    <div id="sidebar"></div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wiki',
    data () {
      return {
        location: 'Article',
        search: {
          placeholder: 'Search wikipedia'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .wiki {
    background: #111;
  }

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

  #navbar .logo img {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 72px;
  }

  #navbar .brand {
    position: absolute;
    top: 12px;
    left: 96px;
    color: #111;
    font-size: 1.5rem;
  }

  #navbar .slogan {
    position: absolute;
    top: 40px;
    left: 96px;
    font-size: 0.6875rem;
  }

  #searchBox {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 189px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    padding-left: 8px;
    transition: width 0.2s;
    font-size: 0.75rem;
  }

  #searchBox:focus {
    width: 400px;
    border: 1px solid #4a90e2;
  }

  #tabs {
    position: absolute;
    top: 104px;
    left: 160px;
    width: calc(100% - 160px);
    background: red;
  }

  #tabs .tab {
    line-height: 40px;
    height: 40px;
    padding: 0 16px;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    float: left;
    font-size: 0.875rem;
    background: white;
    background: #f0f0f0;
  }

  #tabs .tab:hover {
    color: #4a90e2;
  }

  #tabs .main_tabs {
    position: absolute;
    left: 0;
    display: inline;
  }

  #tabs .secondary_tabs {
    position: absolute;
    right: 212px;
  }

  #tabs .tab.active {
    border-bottom: none;
    background: white;
  }

  #tabs .tab.active:hover {
    color: #111;
  }

  #sidebar {
    position: absolute;
    top: 104px;
    left: 0;
    width: 160px;
    min-height: calc(100vh - 104px);
    min-height: calc(100% - 104px);
  }

  #content {
    margin-top:106px;
    margin-left: 160px;
    width: calc(100% - 160px);
    min-height: calc(100vh - 106px);
    background: white;
  }
</style>
