<template>
  <div id="blog_keyword">
    <el-col :span="20" id="blog-content">
      <el-col :span="10" :offset="1" id="blog-right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分类列表</span>
          </div>
          <span v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </span>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>关键词列表</span>
          </div>
          <span v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </span>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_keyword',
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        var right = document.getElementById('blog-content')
        var rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    }
  }
}
</script>

<style scoped>

</style>
