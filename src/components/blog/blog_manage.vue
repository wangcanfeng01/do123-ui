<template>
  <div id="blog_manage">
    <el-col :span="20" id="blog-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5"><span style="line-height: 40px">文章管理</span></el-col>
          <el-col :span="8" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
          </el-col>
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="title" label="文章标题"></el-table-column>
          <el-table-column label="封面图片">
            <template slot-scope="scope">
              <el-upload
                class="upload-article-cover"
                :action="'/ui/blog/article/addCover?id='+scope.row.id+'&path='+scope.row.cover"
                :on-success="getFileSuccessUrl"
                list-type="picture-card"
                :show-file-list="false">
                <img v-if="scope.row.cover" :src="scope.row.cover" class="img-circle">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="hits" label="浏览量"></el-table-column>
          <el-table-column prop="category" label="所属分类"></el-table-column>
          <el-table-column label="是否公开">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowSee === '公开' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowSee}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.publishStatus === '已发布' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.publishStatus}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="允许评论">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowComment === '允许' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowComment}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modifyArticle(scope.row.slug)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteArticle(scope.row.id)">删除</el-button>
              <el-button size="mini" type="success" @click="readArticle(scope.row.slug)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_manage',
  data () {
    return {
      tableData: [{
        id: 1,
        title: '王小虎',
        slug: '',
        cover: '',
        updateTime: '2016-05-04 00:00:00',
        author: '',
        hits: 33,
        category: '分类',
        allowSee: '公开',
        publishStatus: '已发布',
        allowComment: '允许'
      }],
      currentPage: 1,
      total: 40,
      pageSize: 10,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    getArticleList (currentPage, pageSize) {
      this.$http.get('/ui/blog/management/list?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getFileSuccessUrl (result) {
      if (result.code === '0') {
        this.$message.success('封面上传成功!')
        // 重新查询文章列表
        this.getArticleList(this.currentPage, this.pageSize)
      } else {
        this.$message.error(result.msg)
      }
    },
    deleteArticle (id) {
      this.$confirm('确认删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$http.delete('/ui/blog/article/delete/' + id).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.getArticleList(this.currentPage, this.pageSize)
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('文章删除异常')
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    readArticle (slug) {
      let data = this.$router.resolve({path: '/blog/article', query: {'slug': slug}})
      window.open(data.href, '_blank')
    },
    modifyArticle (slug) {
      // 进入到编辑界面
      this.$router.push({
        path: '/blog/writer', query: {slug: slug}
      })
    },
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        var right = document.getElementById('blog-content')
        var rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticleList(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleList(this.currentPage, this.pageSize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    this.getArticleList(this.currentPage, this.pageSize)
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 100px;
    width: 100px;
  }
</style>
<style>
  .upload-article-cover .el-upload--picture-card {
    height: 100px;
    width: 100px;
    line-height: 100px;
    border-radius: 50%;
  }
</style>
