<template>
  <div id="person_info">
    <el-upload
      class="upload-article-cover"
      :action="'/ui/blog/article/addCover?id='+scope.row.id+'&path='+scope.row.cover"
      :on-success="uploadFaceSuccessUrl"
      list-type="picture-card"
      :show-file-list="false">
      <img v-if="scope.row.cover" :src="scope.row.cover" class="img-circle">
      <i v-else class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'person_info',
  methods: {
    uploadFaceSuccessUrl (result) {
      if (result.code === '0') {
        this.$message.success('头像上传成功!')
        // 重新查询文章列表
        this.getArticleList(this.currentPage, this.pageSize)
      } else {
        this.$message.error(result.msg)
      }
    }
  }
}
</script>

<style scoped>

</style>
