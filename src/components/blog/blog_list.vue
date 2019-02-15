<template>
  <div id="blog_list">
    <el-col :span="20" id="blog-content">
      <el-row>
        <el-col :span="5" v-for="article in articles" :key="article.id">
          <el-card :body-style="{ padding: '0px' }" style="margin-right: 20px;margin-bottom: 20px">
            <img v-if="article.cover" :src="article.cover" class="image">
            <img v-else src="../../assets/article/cover/default.jpg" class="image">
            <div style="padding: 14px;">
              <el-row>
                <el-col :span="20">
                  <span>{{article.title}}</span>
                </el-col>
                <el-col :span="4">
                  <small>{{article.category}}</small>
                </el-col>
              </el-row>
              <div class="bottom clearfix">
                <el-row style="line-height: 2em">
                  <el-col :span="18">
                    <small style="font-size: 0.6em">{{'更新时间：'+ article.updateTime }}</small>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="danger" plain size="mini">点击阅读</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total" class="list-pagination">
        </el-pagination>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_list',
  data () {
    return {
      articles: [{
        id: 1,
        title: '文章标题',
        updateTime: '2018-12-12 12:00:00',
        cover: '',
        category: '分类'
      }],
      total: 40,
      pageSize: 10,
      currentPage: 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    this.getArticleList(this.pageSize, this.currentPage)
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        var right = document.getElementById('blog-content')
        var rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    },
    getArticleList (pageSize, currentPage) {
      this.$http.get('/ui/blog/articleList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.articles = response.data.data
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
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticleList(this.pageSize, this.currentPage)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleList(this.pageSize, this.currentPage)
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
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
<style>
  .list-pagination .btn-prev {
    background-color: transparent !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    border-radius: 4px !important;
    border: solid 1px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    color: #777777 !important;
  }

  .list-pagination .btn-prev:hover {
    background-color: #ff5d5d !important;
    color: #ffffff !important;
  }

  .list-pagination .btn-next {
    background-color: transparent !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    border-radius: 4px !important;
    border: solid 1px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    color: #777777 !important;
  }

  .list-pagination .btn-next:hover {
    background-color: #ff5d5d !important;
    color: #ffffff !important;
  }

  .list-pagination .active {
    background-color: #ff5d5d !important;
    color: #f3eaf5 !important;
  }

  .list-pagination li {
    background-color: transparent !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    border-radius: 4px !important;
    border: solid 1px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    color: #777777 !important;
  }

  .list-pagination li:hover {
    background-color: #ff5d5d !important;
    color: #f3eaf5 !important;
  }
</style>
