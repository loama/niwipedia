<template>
  <div class="wikiarticle">
    <span class="title">{{this.article}}</span>
    <hr class="title">
    <span class="source">From Wikipedia, the free encyclopedia</span>
  </div>
</template>

<script>
  export default {
    name: 'wikiarticle',
    data () {
      return {
        article: this.$route.params.article
      }
    },
    mounted () {
      var wikiurl = 'https://en.wikipedia.org/w/api.php?action=query&titles='
      var wikiend = '&prop=revisions&rvprop=content&format=json&formatversion=2'
      this.$http.get(wikiurl + 'Amtrak' + wikiend).then(response => {
        // get body data
        console.log(response.body)
      }, response => {
        // error callback
        console.log('error')
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
</style>
