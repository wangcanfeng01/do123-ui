<template>
  <div id="blog_center">
    <el-col :span="20" id="blog-content">
      <el-col :span="18">
        <el-row v-for="simpleArticle in simpleArticles" :key="simpleArticle.id" style="margin-bottom: 30px">
          <el-card :body-style="{ padding: '20px'}" style="border-radius: 20px">
            <a class="image featured big" target="_blank" :href="'/blog/article?slug='+simpleArticle.slug">
              <img v-if="simpleArticle.cover" :src="simpleArticle.cover" class="image">
              <img v-else src="../../assets/article/cover/default.jpg" class="image">
            </a>
            <div style="padding: 4px;">
              <h2 class="article-title"><a :href="simpleArticle.slug">{{simpleArticle.title}}</a></h2>
              <p class="article-content">{{simpleArticle.text}}</p>
              <div class="bottom clearfix">
                <el-row>
                  <el-col :span="4">
                    <el-button type="danger" plain>阅读全文</el-button>
                  </el-col>
                  <el-col :span="8" :offset="12">
                    <span class="article-stat"><font-awesome-icon icon="user"/>{{' '+simpleArticle.author}}</span>
                    <span class="article-stat">
                      <font-awesome-icon icon="clock"/>
                      {{simpleArticle.updateTime}}
                    </span>
                    <span class="article-stat"> <font-awesome-icon icon="eye"/>{{' '+simpleArticle.hits}}</span>
                    <span class="article-stat"> <font-awesome-icon icon="heart"/>{{' '+simpleArticle.stars}}</span>
                    <span class="article-stat-last"> <font-awesome-icon
                      icon="comment"/>{{' '+simpleArticle.commentsNum}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-row>
          <h3 class="person-name">小红花</h3>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <img src="../../assets/face/default.jpg" style="border-radius: 50%;width: 100%;">
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <small>前行路上，不能忘了自己的善良以及内心深处的理想</small>
        </el-row>
        <div style="border-bottom: solid 1px;color: #868686;margin-bottom: 20px;margin-top: 40px;"></div>
        <h2 class="category-header">热门专栏</h2>
        <el-row style="margin-bottom: 30px">
          <el-card v-for="category in categories" :key="category.id" :body-style="{ padding: '0px' }"
                   style="border-radius: 14px;margin-bottom: 15px">
            <a class="image featured little" :href="'/blog/list?category='+category.name">
              <img v-if="category.cover" :src="category.cover" class="image">
              <img v-else src="../../assets/article/cover/category/default.jpg" class="image">
            </a>
            <div style="padding: 4px;">
              <h3 class="category-title"><a :href="category.link">{{category.name}}</a></h3>
              <div class="bottom clearfix">
                <time class="category-text">{{'创建于 '+category.createTime}}</time>
              </div>
            </div>
          </el-card>
        </el-row>
        <div style="border-bottom: solid 1px;color: #868686;margin-bottom: 20px;margin-top: 40px;"></div>
        <h2 class="comment-header">最近评论</h2>
        <el-row style="margin-bottom: 30px">
          <el-card v-for="comment in comments" :key="comment.id" :body-style="{ padding: '0px' }"
                   style="border-radius: 14px;margin-bottom: 15px">
            <el-row>
              <el-col :span="4" style="margin-top: 15px;margin-left: 15px">
                <img v-if="comment.authorFace" :src="comment.authorFace" class="img-face">
                <img v-else src="../../assets/face/default.jpg" style="border-radius: 50%;width: 100%;"
                     class="img-face">
              </el-col>
              <el-col :span="16" style="margin-top: 15px">
                <span class="comment-title">{{comment.authorName+' 评论：'}}<i>{{comment.articleTitle}}</i></span>
              </el-col>
            </el-row>
            <p class="comment-content">{{comment.text}}</p>
            <div style="padding: 4px;">
              <div class="bottom clearfix">
                <time class="category-text">{{'时间'+comment.updateTime}}</time>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_center',
  data () {
    return {
      simpleArticles: [{
        id: 1,
        title: '标题',
        slug: '123',
        cover: '',
        updateTime: '2018-12-12 12:00:00',
        author: '作者',
        text: '文章内容......',
        hits: 12,
        stars: 14,
        commentsNum: 23
      }],
      categories: [{
        id: 1,
        name: '分类',
        cover: '',
        createTime: '2018-12-12 12:00:00'
      }],
      comments: [{
        id: 1,
        authorName: '评论人名',
        text: '评论内容',
        authorFace: '',
        articleTitle: '文章标题',
        updateTime: '2018-12-12 12:00:00'
      }]
    }
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
    getRecentArticles () {
      this.$http.get('/ui/blog/recentArticles').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.simpleArticles = response.data.data
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
    getHotCategories () {
      this.$http.get('/ui/blog/meta/hot/categories').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.categories = response.data.data
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
    getRecentComments () {
      this.$http.get('/ui/blog/recentComments').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.comments = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('专题列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    this.getRecentArticles()
    this.getHotCategories()
    this.getRecentComments()
  }
}
</script>

<style scoped>
  .image {
    border: 0;
    display: inline-block;
    position: relative;
  }

  .image img {
    display: block;
  }

  .image.featured img {
    width: 100%;
  }

  a.image.featured.big {
    overflow: hidden;
    width: 100%;
    height: 30em;
    border: 1px solid black;
    border-radius: 14px;
  }

  a.image.featured.little {
    overflow: hidden;
    width: 100%;
    border: 1px solid black;
    height: 10em;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }

  a.image.featured img {
    -moz-transition: -moz-transform 0.2s ease-out;
    -webkit-transition: -webkit-transform 0.2s ease-out;
    -ms-transition: -ms-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }

  a.image.featured:hover img {
    -moz-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }

  .article-title {
    text-align: center;
    margin-top: 10px;
  }

  .article-title a {
    text-transform: uppercase;
    font-family: "Raleway", Helvetica, sans-serif;
    text-align: center;
    font-size: 1.8em;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #3b3b3e;
    text-decoration: none;
  }

  .article-title a:hover {
    color: #002850;
  }

  .article-stat {
    color: #5e5d60;
    font-family: "Arial";
    font-size: 13px;
    margin-right: 4px;
    padding-right: 12px;
    border-right: solid 1px #d8d8d8;
  }

  .article-stat-last {
    color: #5e5d60;
    font-family: "Arial";
    font-size: 13px;
    margin-right: 4px;
    padding-right: 12px;
  }

  .article-content {
    display: block;
    font-family: "Arial";
    color: #333;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    margin-bottom: 20px;
  }

  .person-name {
    text-transform: uppercase;
    font-family: "Raleway", Helvetica, sans-serif;
    text-align: center;
    font-size: 1.8em;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #3b3b3e;
    text-decoration: none;
  }

  .category-header {
    font-size: 0.9em;
    color: #6e6d6d;
    font-family: "Raleway", Helvetica, sans-serif;
    font-weight: 800;
    letter-spacing: 0.25em;
    line-height: 1.65;
    margin: 0 0 2em 0;
    text-transform: uppercase;
  }

  .category-title {
    margin-top: 2px;
  }

  .category-title a {
    text-decoration: none;
    color: #3c3b3b;
    font-family: "Raleway", Helvetica, sans-serif;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  .category-text {
    display: block;
    font-family: "Raleway", Helvetica, sans-serif;
    font-size: 0.6em;
    font-weight: 400;
    letter-spacing: 0.25em;
    margin: -0.625em 0 1em 1em;
    text-transform: uppercase;
  }

  .comment-header {
    font-size: 0.9em;
    color: #6e6d6d;
    font-family: "Raleway", Helvetica, sans-serif;
    font-weight: 800;
    letter-spacing: 0.25em;
    line-height: 1.65;
    margin: 0 0 2em 0;
    text-transform: uppercase;
  }

  .comment-title {
    line-height: 1em;
    vertical-align: center;
    font-size: 0.9em
  }

  .comment-content {
    font-size: 1.0em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 12px;
    padding: 0.3em 0.5em;
    margin-top: 0.5em;
    margin-left: 0.3em;
    width: 90%;
    background-color: #f9f9f9;
  }

  .img-face {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
