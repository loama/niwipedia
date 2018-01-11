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
      <div class="img" v-bind:style="{backgroundImage: 'url(' + '/static/article_preview.png' + ')' }">
      </div>
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
          src: ''
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
          router.push(e.target.attributes[0].value)
          it.loadArticle()
        }
      }
      this.loadArticle()
      window.addEventListener('scroll', this.handleScroll)
      setTimeout(function () {
        document.addEventListener('mouseover', function (e) {
          if (e.target.nodeName === 'A') {
            console.log('hover')
            console.log(e)
            it.hoverArticle.left = (e.layerX - 40) + 'px'
            it.hoverArticle.top = (e.layerY + 24) + 'px'
            it.hoverArticle.show = true
          } else {
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
    left: 50%;
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
    height: 200px;
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
    width: 40px;
    height: 40px;
  }

</style>
