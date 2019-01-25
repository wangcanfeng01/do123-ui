<template>
  <div id="blog">
    <blog-left :left-height="leftHeight"></blog-left>
    <el-col :span="20" class="about_content">
      <div ref="about_right" id="about_right">
        <router-view></router-view>
      </div>
    </el-col>
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
</style>

<style>
  .about_content {
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
