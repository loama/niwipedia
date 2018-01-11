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
    color: #4a4a4a;
  }

  body {
    padding: 0;
    margin: 0;
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
  }

  b {
    font-family: 'AvenirNextRoundedPro-Med';
    font-weight: 400;
    color: #191919;
  }

  table {
    border: 1px solid #e5e5e5 !important;
    border-radius: 2px;
    background: #f8f8f9;
  }

  table.mw-stack {
    border: none !important;
  }

  .thumb {
    margin: 12px;
  }

  .tleft {
    float: left;
  }

  .tright {
    float: right;
  }

  table.infobox {
    float: right;
    margin: 0 0 0 24px;
  }

  .mw-editsection {
    display: none;
  }

  input {
    outline: none;
  }

  .quotebox {
    border-radius: 2px;
    border: 1px solid #e5e5e5 !important;
    background: #f8f8f9;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  th {
    background-color: transparent !important;
    color: #191919;
  }

  tr th, tr td {
    padding: 4px;
  }

  table th a {
    font-weight: 200;
  }

  table tr td ul {
    margin-left: -12px;
  }

  #Container {
    border: 1px solid #e5e5e5 !important;
    border-radius: 2px;
  }
</style>
