<template>
  <div class="article">
    <span class="title">{{this.article}}</span>
    <hr class="title">
    <span class="source">From Wikipedia, the free encyclopedia</span>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data () {
      return {
        article: this.$route.params.article
      }
    }
  }
</script>

<style scoped>
  .article {
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
