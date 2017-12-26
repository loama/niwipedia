<template>
  <div class="article">
    article
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
</style>
