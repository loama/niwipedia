<template>
  <div class="wikiarticle">
    <span class="title">{{this.article.title}}</span>
    <hr class="title">
    <span class="source">From Wikipedia, the free encyclopedia</span>

    <div class="article" v-html="this.article.rawContent">
    </div>

  </div>
</template>

<script>
  export default {
    name: 'wikiarticle',
    data () {
      return {
        article: {
          title: this.$route.params.wikiarticle,
          rawContent: ''
        }
      }
    },
    mounted () {
      var wikiurl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page='
      this.$jsonp(wikiurl + 'Apple').then(json => {
        this.article.rawContent = json.parse.text['*']

        var rawContent = this.article.rawContent

        console.log(rawContent)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .wikiarticle {
    height: 2000px;
    text-align: left;
    padding: 80px 24px;
  }

  span.title {
    font-family: 'AvenirNextRoundedPro-Med';
    font-size: 1.5rem;
  }

  hr.title {
    height: 0;
    border: 1px solid #979797;
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
