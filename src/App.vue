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

  html, body {
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
    border-spacing: 0;
  }

  table.mw-stack {
    border: none !important;
  }

  table tr:last-child td:first-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }

  table tr:last-child td:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .thumb {
    margin: 12px;
  }

  .tleft {
    float: left;
    clear: left;
  }

  .tright {
    float: right;
    clear: right;
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
    border: 1px solid #e5e5e5;
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

  .transparent {
    opacity: 0;
  }

  #toc {
    background: #f8f8f9;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    padding: 8px;
    width: 100%;
    max-width: 280px;
  }

  #toc h2 {
    margin: 0;
  }

  @-webkit-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-o-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  .fadeInFromNone {
    display: block;
    -webkit-animation: fadeInFromNone 0.5s ease-out;
    -moz-animation: fadeInFromNone 0.5s ease-out;
    -o-animation: fadeInFromNone 0.5s ease-out;
    animation: fadeInFromNone 0.5s ease-out;
  }

  .fadeOutToNone {
    display: none;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }

  .loader {
    margin: 80px auto;
    font-size: 20px;
    position: absolute;
    top: -8px;
    left: calc(50% - 28px);
    text-indent: -9999em;
    border-top: 2px solid rgba(155, 155, 155, 0.2);
    border-right: 2px solid rgba(155, 155, 155, 0.2);
    border-bottom: 2px solid rgba(155, 155, 155, 0.2);
    border-left: 2px solid #585858;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  #mp-upper {
    margin-top: 16px !important;
    border: 1px white !important;
  }

  #mp-left, #mp-right {
    border: none !important;
    border-radius: 2px !important;
  }

  #mp-left {
    width: 66.66% !important;
  }

  #mp-tfa-h2, #mp-dyk-h2 {
    background: transparent !important;
    border: 1px solid #e5e5e5 !important;
    border-bottom: none !important;
    color: #33691E !important;
    text-transform: uppercase;
    margin: 0 !important;
    text-align: left;
    font-weight: 500 !important;
    border-radius: 2px 2px 0 0 !important;
    line-height: 32px;
  }

  #mp-tfa {
    border: 1px solid #e5e5e5 !important;
    border-top: none !important;
    border-radius: 0 0 2px 2px !important;
    padding: 0 !important;
    margin-top: -16px !important;
  }

  #mp-tfa-img {
    margin-top: 0 !important;
    height: 256px !important;
    position: relative;
    margin-bottom: 0 !important;
  }

  #mp-tfa-img .mp-thumb {
    width: auto;
    height: 256px;
    max-width: 220px !important;
  }

  #mp-tfa-img img {
    width: 220px !important;
    height: auto !important;
  }

  #mp-tfa p {
    height: 240px;
    overflow: hidden;
    padding: 8px;
    margin-bottom: 0;
  }

  #mp-dyk-h2 {
    margin-top: 16px !important;
  }

  #mp-upper td, #mp-upper table {
    background: white !important;
    border-collapse: separate !important;
  }

  #mp-topbanner {
    border: 1px solid #e5e5e5 !important;
    border-radius: 2px !important;
    background: white !important;
  }

  #mp-tfa-img .thumbcaption {
    margin-top: -40px;
    color: white;
    height: 24px;
    padding: 8px 8px 0 8px !important;
    position: relative;
    z-index: 2000;
    margin-bottom: 0 !important;
  }

  #mp-tfa-img .thumbcaption-background {
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    height: 32px;
    background: #191919;
    opacity: 0.7;
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -o-filter: blur(3px);
    -ms-filter: blur(3px);
    filter: blur(3px);
  }

  #mp-left .tfa-recent {
    background: #33691E;
    color: white;
    width: 100%;
    text-align: left !important;
    padding: 0 8px;
    height: 32px;
    line-height: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 0 0 2px 2px;
  }

  #mp-left .tfa-footer {
    display: none;
  }

  #mp-left .tfa-recent .hlist {
    display: inline-block;
  }

  #mp-left .tfa-recent a {
    color: white;
  }

  #mp-left .tfa-recent  ul {
    list-style: none;
  }

  #mp-left .tfa-recent  ul li:after {
    content: " • ";
    color: white !important;
  }

  #mp-left .tfa-recent  li:last-child:after {
    content: " "
  }

  #mp-left .tfa-recent  ul  li {
    display: inline;
  }

  #mp-topbanner ul {
    list-style: none;
  }

  #mp-topbanner li::before {
    content: "• ";
    color: #4a90e2 !important;
  }

  #mp-itn-h2, #mp-otd-h2 {
    background: transparent !important;
    border: none !important;
    border-radius: 2px 2px 0 0 !important;
    margin: 0 !important;
    color: #01579B !important;
    text-transform: uppercase;
    margin-bottom: 0 0 8px 0 !important;
    text-align: center;
    font-weight: 500 !important;
  }

  #mp-upper td {
    min-width: 8px !important;
  }

</style>
