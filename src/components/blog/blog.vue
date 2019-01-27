<template>
  <div id="blog">
    <!--// 插入左侧导航-->
    <blog-left :left-height="leftHeight"></blog-left>
    <!--//载入右侧数据-->
    <router-view v-on:listenHeight="changeHeight"></router-view>
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
        minHeight: '900px',
        height: ''
      }
    }
  },
  methods: {
    // 监听右侧数据的真实高度，从而改变左侧导航栏的高度
    changeHeight (height) {
      this.leftHeight.height = height + 'px'
    }
  }
}
</script>

<style scoped>
</style>

<style>
  #blog-content {
    margin-left: 20px;
    margin-top: 20px;
    min-height: 800px;
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
