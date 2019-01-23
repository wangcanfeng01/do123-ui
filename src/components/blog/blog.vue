<template>
  <div id="blog">
    <blog-left :left-height="leftHeight"></blog-left>
    <div ref="about_right" id="about_right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import left from '@/components/blog/blog_left'

export default {
  name: 'blog',
  components: {
    'blogLeft': left
  },
  data () {
    return {
      leftHeight: {
        minHeight: '800px',
        height: ''
      }
    }
  },
  mounted () {
    // 获取到右侧内容的真实高度
    var right = document.getElementById('about_right')
    var rightHeight = right.offsetHeight
    this.leftHeight.height = rightHeight + 'px'
  }
}
</script>

<style scoped>
  #about_right {
    min-height: 800px;
  }
</style>

<style>
  .about_content {
    margin-left: 20px;
    margin-top: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
