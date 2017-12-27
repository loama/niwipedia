<template>
  <div class="wikiarticle">
    <span class="title">{{this.article.parsedTitle}}</span>
    <hr class="title">
    <span class="source">From Wikipedia, the free encyclopedia</span>

    <div class="article" v-html="this.article.rawContent">
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
          rawContent: ''
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
        })
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

</style>
