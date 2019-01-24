<template>
  <div id="blog_keyword">
    <el-col :span="20" class="about_content">
      <el-col :span="10" :offset="1">
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
  name: 'blog_keyword'
}
</script>

<style scoped>

</style>
