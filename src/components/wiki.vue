<template>
  <div class="wiki">

    <div id="topbar"></div>

    <div id="navbar">
      <div class="logo" v-on:click="goTo('Main_Page')">
        <img src="../assets/logo.png">
        <span class="brand"> WikipediA </span>
        <span class="slogan"> The Free Encyclopedia </span>
      </div>

      <input id="searchBox" :placeholder="this.search.placeholder"
        autocomplete="off"
        v-model="query"
        @focus="searching(true)"
        @blur="searching(false)">

      <ul class="search-results hide" v-bind:class="{ show: search.show }">
        <span class="no-results"> No hay resultados </span>
        <li v-for="result in search.results" v-on:click="goTo(result.title)">
          <span class="title">{{result.title}}</span>
          <span class="detail">{{result.description}}</span>
          <img :src="result.src">
        </li>
      </ul>

    </div>
    <div id="tabs">
      <div class="main_tabs">
        <div class="tab location active"> <span>Article</span> </div>
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
  import router from '../router'

  export default {
    name: 'wiki',
    data () {
      return {
        search: {
          placeholder: 'Search wikipedia',
          src: 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=5&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&format=json&gpssearch=',
          searching: false,
          show: false,
          results: {}
        },
        query: ''
      }
    },
    methods: {
      goTo: function (where) {
        router.push(where)
        this.search.show = false
      },
      searching: function (value) {
        var it = this
        setTimeout(function () {
          it.search.show = value
        }, 200)
      }
    },
    watch: {
      query: function (val) {
        if (val.length > 2 && !this.search.searching) {
          // console.log(val)
          this.search.searching = true
          this.$jsonp(this.search.src + val).then(json => {
            if (json.query !== undefined) {
              var results = []
              var description, src
              for (var i = 0; i < json.query.pages.length; i++) {
                if (json.query.pages[i].thumbnail !== undefined) {
                  src = json.query.pages[i].thumbnail.source
                } else {
                  src = '' // REVIEW //
                }
                if (json.query.pages[i].terms !== undefined) {
                  description = json.query.pages[i].terms.description[0]
                } else {
                  description = ''
                }
                results[i] = {title: json.query.pages[i].title, description: description, src: src}
              }
              this.search.results = results
            } else {
              console.log('no results')
              this.search.results = {}
            }
            this.search.searching = false
          }).catch(err => {
            console.log(err)
            this.search.results = {}
            this.search.searching = false
          })
        } else {
          this.search.results = {}
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
    height: 31px;
    width: 100vw;
    width: 100%;
    border-bottom: solid 1px #e5e5e5;
    background: white;
  }

  #navbar {
    position: fixed;
    z-index: 9000;
    top: 32px;
    left: 0;
    width: 100vw;
    width: 100%;
    height: 51px;
    border-bottom: 1px solid #e5e5e5;
    background: white;
  }

  .logo {
    cursor: pointer;
  }

  #navbar .logo img {
    position: absolute;
    top: 6px;
    left: 6px;
    height: 40px;
  }

  #navbar .brand {
    position: absolute;
    top: 0;
    left: 76px;
    color: #111;
    font-size: 1.5rem;
  }

  #navbar .slogan {
    position: absolute;
    top: 32px;
    left: 76px;
    font-size: 0.6875rem;
  }

  #searchBox {
    position: absolute;
    top: 6px;
    right: 12px;
    width: 189px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    padding: 0 8px;
    transition: width 0.2s;
    font-size: 0.75rem;
    text-overflow: ellipsis;
  }

  #searchBox:focus {
    width: 400px;
    border: 1px solid #4a90e2;
  }

  .search-results {
    width: 416px;
    position: fixed;
    top: 64px;
    right: 12px;
    border: 1px solid #e5e5e5;
    background: white;
    padding: 0;
  }

  .search-results li {
    border-bottom: 1px solid #e5e5e5;
    padding: 8px;
    cursor: pointer;
    list-style: none;
  }

  .search-results li:hover {
    background: #4a90e2;
    color: white;
  }

  #tabs {
    position: absolute;
    top: 84px;
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
    margin-top: 84px;
    margin-left: 160px;
    width: calc(100% - 160px);
    min-height: calc(100vh - 106px);
    background: white;
  }

</style>
