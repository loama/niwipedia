<template>
  <div class="wikiarticle">
    <span class="title">{{this.article.parsedTitle}}</span>
    <span class="sticky-title" v-bind:class="{ transparent: article.stickyTitleTransparent }">{{this.article.parsedTitle}}</span>
    <hr class="title">
    <span class="source">From Wikipedia, the free encyclopedia</span>

    <div class="article" v-html="this.article.rawContent">
    </div>

    <div class="hover-article"
      v-bind:style="{left: hoverArticle.left, top: hoverArticle.top}"
      v-bind:class="{fadeInFromNone: hoverArticle.show, fadeOutToNone: !hoverArticle.show}">
      <div class="loading-screen" v-bind:class="{hide: !hoverArticle.loading}">
        <div class="loader"></div>
      </div>
      <div class="img" v-bind:style="{backgroundImage: 'url(' + hoverArticle.src + ')' }">
      </div>

      <div class="title">{{hoverArticle.title}}</div>
      <div class="description">{{hoverArticle.description}}</div>
    </div>

  </div>
</template>

<script>
  import router from '../../router'
  export default {
    name: 'wikiarticle',
    data () {
      return {
        article: {
          rawTitle: this.$route.params.wikiarticle,
          parsedTitle: '',
          rawContent: '',
          stickyTitleTransparent: true
        },
        hoverArticle: {
          left: 0,
          top: 0,
          show: false,
          title: '',
          description: '',
          src: '/static/article_preview.png',
          loading: true
        }
      }
    },
    methods: {
      loadArticle () {
        this.article.parsedTitle = this.$route.params.wikiarticle.charAt(0).toUpperCase() + this.$route.params.wikiarticle.replace(/_/g, ' ').slice(1)
        var wikiurl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page='
        this.$jsonp(wikiurl + this.$route.params.wikiarticle).then(json => {
          this.article.rawContent = json.parse.text['*']
        }).catch(err => {
          console.log(err)
          this.article.parsedTitle = 'we couldn´t find that article :('
        })
      },
      loadHoverArticle (title, link) {
        this.hoverArticle.loading = true
        this.hoverArticle.title = title
        var wikiurl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro&explaintext&titles='
        this.$jsonp(wikiurl + link).then(json => {
          console.log(wikiurl + link)
          this.hoverArticle.title = json.query.pages[Object.keys(json.query.pages)[0]].title
          this.hoverArticle.description = json.query.pages[Object.keys(json.query.pages)[0]].extract
          if (json.query.pages[Object.keys(json.query.pages)[0]].thumbnail !== undefined) {
            this.hoverArticle.src = json.query.pages[Object.keys(json.query.pages)[0]].thumbnail.source
          } else {
            this.hoverArticle.src = '/static/article_preview.png'
          }
          this.hoverArticle.loading = false
          // remove title from anchors to not get the anoying tag
          var anchors = document.getElementsByTagName('a')
          var i
          for (i = 0; i < anchors.length; i++) {
            anchors[i].removeAttribute('title')
          }
        }).catch(err => {
          console.log(err)
          this.article.parsedTitle = 'we couldn´t find that article :('
        })
      },
      handleScroll: function (e) {
        if (e.pageY > 180) {
          this.article.stickyTitleTransparent = false
        } else {
          this.article.stickyTitleTransparent = true
        }
      }
    },
    mounted () {
      var it = this
      window.onclick = function (e) {
        if (e.target.tagName === 'A') {
          e.preventDefault()
          if (e.target.className.includes('external')) {
            window.open(e.target.href,'_blank')
          } else {
            router.push(e.target.attributes[0].value)
            it.loadArticle()
          }
        }
      }
      this.loadArticle()
      window.addEventListener('scroll', this.handleScroll)
      setTimeout(function () {
        document.addEventListener('mouseover', function (e) {
          if (e.target.nodeName === 'A') {
            var title = e.target.title
            var link = e.target.pathname.split('/wiki/')[1]
            it.loadHoverArticle(title, link)
            it.hoverArticle.left = (e.layerX - 40) + 'px'
            it.hoverArticle.top = (e.layerY + 24) + 'px'
            it.hoverArticle.show = true
          } else {
            it.hoverArticle.title = ''
            it.hoverArticle.description = ''
            it.hoverArticle.src = '/static/article_preview.png'
            it.hoverArticle.show = false
          }
        })
      }, 1000)
    },
    watch: {
      '$route' (to, from) {
        router.push(to.path)
        this.loadArticle()
        console.log(this.$route.params.wikiarticle)
      }
    }
  }
</script>

<style scoped>
  .wikiarticle {
    text-align: left;
    padding: 80px 24px;
  }

  span.title {
    font-family: 'AvenirNextRoundedPro-Med';
    font-size: 1.5rem;
  }

  span.sticky-title {
    font-family: 'AvenirNextRoundedPro-Med';
    font-size: 1.5rem;
    position: fixed;
    top: 42px;
    z-index: 9003;
    width: calc(100% - 500px);
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    left: 250px;
    transition: all 0.3s;
  }

  hr.title {
    height: 0;
    border-top: 1px solid #aaa;
    margin: 0;
  }

  span.source {
    font-size: 0.875rem;
    color: #4a4a4a;
  }

  div.article {
    margin-top: 16px;
    font-size: 0.875rem;
  }

  div.hover-article {
    width: 400px;
    height: auto;
    max-height: 208px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    background: white;
    position: absolute;
    z-index: 1000;
  }

  div.hover-article:after {
      content: '';
      display: block;
      position: absolute;
      top: -8px;
      left: 40px;
      width: 16px;
      height: 16px;
      background: #FFFFFF;
      border-right:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      -moz-transform:rotate(-135deg);
      -webkit-transform:rotate(-135deg);
  }

  div.hover-article div.img {
    min-width: 56px;
    max-width: 80px;
    min-height: 56px;
    height: auto;
    float: right;
    background-size: contain;
    background-position: top left;
    margin: 48px 8px 8px 8px;
    position: relative;
    z-index: 2000;
    background-repeat: no-repeat;
  }

  div.hover-article div.title {
    font-family: 'AvenirNextRoundedPro-Med';
    color: #191919;
    padding: 8px;
    border-bottom: 1px solid #e5e5e5;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
  }

  div.hover-article div.description {
    padding: 8px 8px 10px 8px;
    max-height: 140px;
    overflow: hidden;
  }

  div.hover-article div.loading-screen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3003;
    width: 400px;
    height: 200px;
    background: white;
    border-radius: 2px;
  }

</style>
