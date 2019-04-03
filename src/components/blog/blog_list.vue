<template>
  <div id="blog_list">
    <el-col :span="contentWidth" id="blog-content">
      <el-row style="border-bottom: 1px solid #ebeef5;margin-bottom: 20px;padding-bottom: 20px">
        <el-col :span="categoryCol.width" :offset="categoryCol.offset">
          <el-select v-model="currentCategory" filterable placeholder="文章分类" @change="queryArticles">
            <el-option v-for="category in categories" :key="category.id"
                       :label="category.name" :value="category.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="titleSelect.input">
          <el-input v-model="queryTitle" placeholder="文章标题..."></el-input>
        </el-col>
        <el-col :span="titleSelect.button">
          <el-button type="primary" style="margin-left: 15px" @click="queryArticles">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" v-for="article in articles" :key="article.id" style="min-width: 230px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-right: 20px;margin-bottom: 20px">
            <el-row class="item-thumb">
              <img v-if="article.cover" :src="article.cover" class="image">
              <img v-else src="../../assets/article/cover/default.jpg" class="image">
              <div class="item-slant reverse-slant" style="margin-top: -1.1em"></div>
              <div class="item-slant" style="margin-top: -6.5em"></div>
            </el-row>
            <div style="padding: 14px;margin-top: -3em">
              <el-row>
                <a class="article-link" :href="'/blog/article?slug='+article.slug" target="_blank">
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
                  <el-button type="text" style="height: 20px" @click="toArticleCategory(article.category)">
                    {{article.category}}
                  </el-button>
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
      contentWidth: document.body.clientWidth > 450 ? 18 : 13,
      categoryCol: {
        width: document.body.clientWidth > 450 ? 4 : 11,
        offset: document.body.clientWidth > 450 ? 10 : 0
      },
      titleSelect: {
        input: document.body.clientWidth > 450 ? 4 : 11,
        button: document.body.clientWidth > 450 ? 2 : 2
      },
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
      currentPage: 1,
      currentCategory: '全部',
      queryTitle: '',
      categories: [{
        id: 0,
        name: '全部'
      }, {
        id: 1,
        name: 'test'
      }]
    }
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
    toArticleCategory (category) {
      let req = {
        params: {
          'pageSize': this.pageSize,
          'currentPage': this.currentPage,
          'category': category
        }
      }
      this.getArticleList(req)
    },
    getArticleByPage (pageSize, currentPage) {
      let req = {
        params: {
          'pageSize': pageSize,
          'currentPage': currentPage
        }
      }
      this.getArticleList(req)
    },
    getArticleList (req) {
      this.$http.get('/ui/blog/articleList/simple', req).then(response => {
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
    getCategories () {
      this.$http.get('/ui/blog/meta/categories/simple').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.categories = response.data.data
            this.categories.push({
              id: 0,
              name: '全部'
            })
            // 倒置一下，把全部这个标签放到最前面
            this.categories.reverse()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('专题列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    queryArticles () {
      let req = {
        params: {
          'pageSize': this.pageSize,
          'currentPage': this.currentPage,
          'category': this.currentCategory,
          'title': this.queryTitle
        }
      }
      this.getArticleList(req)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticleByPage(this.pageSize, this.currentPage)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleByPage(this.pageSize, this.currentPage)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    if (this.$route.query.category) {
      this.currentCategory = this.$route.query.category
    }
    this.toArticleCategory(this.currentCategory)
    this.getCategories()
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
    height: 230px;
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
