<template>
  <div class="article">
    {{this.article}}
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
  }
</style>
