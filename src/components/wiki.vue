<template>
  <div class="wiki">

    <div id="topbar"></div>

    <div id="navbar">
      <div class="logo" v-on:click="goTo('Main_Page')">
        <img src="../assets/logo.png">
        <span class="brand"> WikipediA </span>
        <span class="slogan"> The Free Encyclopedia </span>
      </div>

      <span class="sticky-title" v-bind:class="{ transparent: article.stickyTitleTransparent }">{{article.title}}</span>

      <input id="searchBox" :placeholder="this.search.placeholder"
        autocomplete="off"
        v-model="query"
        @focus="searching(true)"
        @blur="searching(false)">

      <img class="magnifying-glass" src="../assets/search.svg">

      <ul class="search-results hide" v-bind:class="{ show: search.show }">
        <div class="no-results hide" v-bind:class="{show: search.noResults}"> No hay resultados para tu búsqueda </div>
        <div class="start-typing" v-bind:class="{hide: !search.empty}"> Empieza a escribir para hacer una búsqueda </div>
        <li v-for="result in search.results"
            v-on:click="goTo(result.title)"
            v-bind:class="{active: result.index === search.active}"
            v-on:mouseover="searchActive(result.index)">
          <div class="img" v-bind:style="{backgroundImage: 'url(' + result.src + ')'}">
          </div>
          <div class="title">{{result.title}}</div>
          <div class="detail">{{result.description}}</div>
        </li>
      </ul>

    </div>
    <div id="tabs">
      <div class="main_tabs">
        <div class="tab location"
             v-on:click="tab('Article')"
             v-bind:class="{active: tabs.active === 'Article' }"> <span>Article</span>
        </div>

        <div class="tab talk"
             v-on:click="tab('Talk')"
             v-bind:class="{active: tabs.active === 'Talk'}"> <span>Talk</span>
        </div>
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
          placeholder: 'press S to search',
          src: 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=5&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&format=json&gpssearch=',
          searching: false,
          show: false,
          results: {},
          noResults: false,
          empty: true,
          active: 0
        },
        query: '',
        talk: false,
        tabs: {
          active: 'Article'
        },
        lang: {
          en: {
            search: {
              placeholder: {
                on: 'search ...',
                off: 'press S to search'
              }
            }
          },
          es: {
            search: {
              placeholder: {
                on: 'buscar ...',
                off: 'presiona S para buscar'
              }
            }
          }
        }
      }
    },
    methods: {
      goTo: function (where) {
        router.push(where)
        this.search.show = false
        window.scrollTo(0, 0)
      },
      searching: function (value) {
        var it = this
        setTimeout(function () {
          it.search.show = value
          if (!value) {
            it.search.placeholder = it.lang.en.search.placeholder.off
            it.search.active = 0
          } else {
            it.search.placeholder = it.lang.en.search.placeholder.on
          }
        }, 100)
      },
      tab: function (tab) {
        this.tabs.active = tab
        var url = this.$route.path.split('/wiki/')[1]
        if (tab === 'Article') {
          url = url.replace('talk:', '')
          router.push('/wiki/' + url)
        } else if (tab === 'Talk') {
          router.push('/wiki/talk:' + url)
        }
        console.log(tab)
      },
      searchActive: function (index) {
        this.search.active = index
      }
    },
    mounted () {
      var it = this
      // check if they are requesting the article or the talk tab
      var article = this.$route.path.replace('/wiki/', '').split('talk:')
      if (article[1] !== undefined) {
        this.tabs.active = 'Talk'
      } else {
        this.tabs.active = 'Article'
      }
      // redirect to main page if no article is provided in route
      if (article[0].replace('/wiki', '').length > 0) {
        // article exists
      } else {
        router.push('/wiki/Main_Page')
      }
      document.addEventListener('keypress', function (key) {
        if (it.search.show && it.search.results.length !== undefined) { // handle up and down arrows only if search is active
          var resultsLenght = it.search.results.length
          if (key.keyCode === 38) { // arrow up
            key.preventDefault()
            if (it.search.active > 0) {
              it.search.active = it.search.active - 1
            } else {
              it.search.active = resultsLenght - 1
            }
          }
          if (key.keyCode === 40) { // arrow down
            key.preventDefault()
            if (it.search.active < resultsLenght - 1) {
              it.search.active = it.search.active + 1
            } else {
              it.search.active = 0
            }
          }
        }
        if (key.key === 's') { // s
          document.getElementById('searchBox').focus()
        }
        if (key.key === 'Enter') { // enter
          it.goTo(it.search.results[it.search.active].title)
          document.getElementById('searchBox').blur()
        }
        if (key.key === 'Escape') {
          document.getElementById('searchBox').blur()
        }
      })
    },
    watch: {
      query: function (val) {
        if (val.length > 2) {
          // console.log(val)
          this.search.searching = true
          this.search.empty = false
          this.$jsonp(this.search.src + val).then(json => {
            if (json.query !== undefined) {
              var results = []
              var description, src
              for (var i = 0; i < json.query.pages.length; i++) {
                if (json.query.pages[i].thumbnail !== undefined) {
                  src = json.query.pages[i].thumbnail.source
                } else {
                  src = '/static/article_preview.png' // REVIEW //
                }
                if (json.query.pages[i].terms !== undefined) {
                  description = json.query.pages[i].terms.description[0]
                } else {
                  description = ''
                }
                results[i] = {index: i, title: json.query.pages[i].title, description: description, src: src}
              }
              this.search.results = results
              this.search.noResults = false
            } else {
              this.search.results = {}
              this.search.noResults = true
            }
            this.search.searching = false
          }).catch(err => {
            console.log(err)
            this.search.results = {}
            this.search.searching = false
            this.search.noResults = true
          })
        } else {
          this.search.results = {}
          if (val.length < 3) {
            this.search.empty = true
          }
        }
      }
    },
    computed: {
      article () {
        return this.$store.state.article
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
    position: relative;
    z-index: 9004;
  }

  #navbar .logo img {
    position: absolute;
    top: 6px;
    left: 6px;
    height: 40px;
  }

  #navbar .brand {
    position: absolute;
    top: 2px;
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

  span.sticky-title {
    font-family: 'AvenirNextRoundedPro-Med';
    font-size: 1.5rem;
    position: absolute;
    top: 8px;
    left: 0;
    z-index: 9001;
    width: calc(100% - 500px);
    max-width: calc(100% - 500px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    left: 250px;
    transition: all 0.3s;
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
    z-index: 9002;
  }

  #searchBox:focus {
    width: 400px;
    border: 1px solid #4a90e2;
  }

  .magnifying-glass {
    position: fixed;
    top: 48px;
    right: 20px;
    pointer-events: none;
    z-index: 9003;
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
    cursor: pointer;
    list-style: none;
    height: 56px;
    text-align: left;
    overflow: hidden;
  }

  .search-results li.active {
    background: #4a90e2;
    color: white;
  }

  .search-results li .title {
    font-family: 'AvenirNextRoundedPro-Med';
    color: #191919;
    padding: 8px 8px 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-results li.active .title {
    color: white;
  }

  .search-results li div.detail {
    padding-left: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 336px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-results li div.img {
    float: left;
    margin: 0;
    width: 56px;
    height: 56px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .search-results .no-results, .search-results .start-typing {
    margin: 8px;
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
    z-index: 1005;
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
    min-height: calc(100vh - 84px);
    background: white;
  }

</style>
