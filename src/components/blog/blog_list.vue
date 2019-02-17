<template>
  <div id="blog_list">
    <el-col :span="20" id="blog-content">
      <el-row>
        <el-col :span="5" v-for="article in articles" :key="article.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-right: 20px;margin-bottom: 20px">
            <el-row class="item-thumb">
              <img v-if="article.cover" :src="article.cover" class="image">
              <img v-else src="../../assets/article/cover/default.jpg" class="image">
              <div class="item-slant reverse-slant" style="margin-top: -1.1em"></div>
              <div class="item-slant" style="margin-top: -6.5em"></div>
            </el-row>
            <div style="padding: 14px;margin-top: -3em">
              <el-row>
                <a :href="article.title" class="article-link">
                  <span class="article-title" :title="article.title">{{article.title}}</span>
                </a>
              </el-row>
              <el-row style="margin-top: 15px;white-space: nowrap;overflow: hidden">
                <i class="article-keyword" :title="article.keywords">{{article.keywords}}</i>
              </el-row>
              <div class="bottom clearfix">
                <el-row style="line-height: 2em">
                  <small style="font-size: 0.6em">{{article.author+' '+ article.updateTime }}</small>
                </el-row>
                <el-row style="text-align: right">
                  <a class="category-link" :href="'/ui/category/'+article.category">
                    <small class="category-text">{{article.category}}</small>
                  </a>
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
        slug: '文章缩略名',
        author: '作者',
        category: '分类',
        keywords: '关键词'
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
        let right = document.getElementById('blog-content')
        let rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    },
    getArticleList (pageSize, currentPage) {
      this.$http.get('/ui/blog/articleList/simple?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.articles = response.data.data
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
  .bottom {
    line-height: 12px;
  }

  .article-title {
    color: #5f5f5f;
    white-space: nowrap;
    overflow: hidden
  }

  .article-link {
    text-decoration: none;
  }

  .article-link:hover {
    text-decoration: underline #000000;
  }

  .category-link {
    text-decoration: none;
  }

  .category-link:hover {
    text-decoration: underline #000000;
  }

  .category-text {
    color: #5f5f5f;
  }

  .article-keyword {
    font-size: 0.5em;
  }

  .image {
    width: 100%;
    display: block;
  }

  .item-slant {
    bottom: 50px;
    left: 0;
    width: 110%;
    min-height: 100px;
    -webkit-transform: rotate(7deg) translate(-10px, 0);
    -ms-transform: rotate(7deg) translate(-10px, 0);
    transform: rotate(7deg) translate(-10px, 0);
    background-color: #fff
  }

  .item-slant.reverse-slant {
    -webkit-transform: rotate(-10deg) translate(10px, -10px);
    -ms-transform: rotate(-10deg) translate(10px, -10px);
    transform: rotate(-10deg) translate(10px, -10px);
    opacity: .7;
    background-color: rgba(86, 155, 189, 0.99);
    -webkit-box-shadow: none;
    box-shadow: none
  }

  .item-thumb {
    overflow: hidden;
    height: 270px;
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
