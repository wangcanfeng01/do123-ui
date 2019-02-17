<template>
  <div id="blog_article">
    <p>{{info}}</p>
  </div>
</template>

<script>
export default {
  name: 'blog_article',
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    // 获取路径参数中的slug
    this.info = this.$route.query.slug
  }
}
</script>

<style scoped>

</style>
