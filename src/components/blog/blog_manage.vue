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
          <el-table-column prop="articleName" label="文章标题"></el-table-column>
          <el-table-column prop="coverPic" label="封面图片">
            <template slot-scope="scope">
              <el-upload
                class="upload-article-cover"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card">
                <img v-if="scope.row.coverPic" :src="scope.row.coverPic" class="img-circle">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="发布时间"></el-table-column>
          <el-table-column prop="hitTimes" label="浏览量"></el-table-column>
          <el-table-column prop="categories" label="所属分类"></el-table-column>
          <el-table-column prop="allowSee" label="是否公开">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowSee === '公开' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowSee}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="publishStatus" label="发布状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.publishStatus === '已发布' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.publishStatus}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="allowComment" label="允许评论">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowComment === '允许' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowComment}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modifyArticle">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteArticle">删除</el-button>
              <el-button size="mini" type="success" @click="readArticle">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 50, 100]"
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
        articleName: '王小虎',
        coverPic: '',
        publishTime: '上海市普陀区金沙江路 1518 弄',
        hitTimes: '33',
        categories: '2016-05-04 00:00:00',
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
    getArticleList (pageSize, currentPage) {
      this.$http.get('/ui/blog/articleList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
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
    deleteArticle (id) {
      this.$http.delete('/ui/blog/article/delete/' + id).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.getArticleList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章删除异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    readArticle (id) {
      console.log(id)
    },
    modifyArticle (id) {
      // 进入到编辑界面
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
      this.getArticleList(this.pageSize, this.currentPage)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleList(this.pageSize, this.currentPage)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 148px;
    width: 148px;
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
