<template>
  <div id="blog_article">
    <el-col :span="10" :offset="7">
      <h1 style="text-align: center">{{article.title}}</h1>
      <el-row>
        <el-col :span="12">
          <div>
            <img v-if="article.authorFace" :src="article.authorFace" class="img-circle"/>
            <img v-else src="../../assets/face/face0.jpg" class="img-circle">
          </div>
          <div style="margin-left: 80px;margin-top: -50px;min-width: 300px">
            <small>{{article.author+'&nbsp;&nbsp;最后一次更新 '+article.updateTime}}</small>
          </div>
          <div style="margin-left: 80px;min-width: 300px">
            <small>{{'字数&nbsp;'+article.wordCount}}</small>
            <small>{{'&nbsp;&nbsp;评论&nbsp;'+article.commentsNum}}</small>
            <small>{{'&nbsp;&nbsp;阅读&nbsp;'+article.hits}}</small>
          </div>
        </el-col>
        <el-col :span="6" :offset="4" style="margin-top: 30px">
          <el-button type="danger" plain class="thumb-button" @click="addStars(article.id)">
            <span class="thumb-font"><font-awesome-icon icon="thumbs-up"/>&nbsp;&nbsp;赞一个</span>
            <span class="thumb-number">{{article.stars}}</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <div v-html="article.text"></div>
      </el-row>
      <el-row>
        <p class="reshipment">本站文章均为原创或翻译，转载必须标明出处</p>
      </el-row>
      <el-row>
        <el-col :span="1" :offset="1" style="margin-top: 10px;min-width: 40px">
          <img v-if="loginUser.facePath" :src="loginUser.facePath" class="img-circle-small"/>
          <img v-else src="../../assets/face/face0.jpg" class="img-circle-small">
        </el-col>
        <el-col :span="18" style="margin-left: 5px">
          <textarea :rows="4" placeholder="说些什么吧..." v-model="commentForm.commentText"
                    class="comment-area" ref="commentArea"></textarea>
        </el-col>
        <el-col :span="8" :offset="15" style="margin-top: 20px">
          <el-button round @click="clearComment">清空</el-button>
          <el-button type="success" round @click="addComment">评论</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 30px;margin-bottom: 20px">
        <span class="comment-title">{{'精彩评论('+commentTotal+')'}}</span>
      </div>
      <el-row v-for="comment in comments" :key="comment.id"
              style="border-top: 1px solid #f0f0f0;;padding-top: 15px;margin-bottom: 10px">
        <div>
          <img v-if="comment.face" :src="comment.face" class="img-circle-small"/>
          <img v-else src="../../assets/face/face1.jpg" class="img-circle-small">
        </div>
        <div style="margin-left: 45px;margin-top: -45px;min-width: 300px">
          <small>{{comment.author}}</small>
        </div>
        <div style="margin-left: 45px;min-width: 300px">
          <small>{{comment.updateTime}}</small>
        </div>
        <div>
          <pre class="comment-info">{{comment.content}}</pre>
        </div>
        <div>
          <el-button type="text" style="color: rgba(174,174,174,0.87);">
            <font-awesome-icon icon="thumbs-up"/>&nbsp;&nbsp;{{comment.stars}}人赞
          </el-button>
          <el-button type="text" style="color: rgba(174,174,174,0.87);">
            <font-awesome-icon icon="comment"/>&nbsp;&nbsp;回复
          </el-button>
        </div>
      </el-row>
      <div v-if="commentTotal>0">
        <el-col :span="4" :offset="8">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="commentTotal">
          </el-pagination>
        </el-col>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_article',
  data () {
    return {
      slug: '',
      article: {
        id: 1,
        title: '标题',
        author: '作者',
        authorFace: '',
        text: '文章内容',
        wordCount: 14,
        hits: 111,
        stars: 23123,
        commentsNum: 33,
        keywords: '关键字',
        updateTime: '2018-12-12 12:00:00'
      },
      commentTotal: 0,
      commentCurrentPage: 1,
      comments: [{
        id: 1,
        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容' +
          '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容 评论内容评论内容评论内容评论内容评论' +
          '内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容' +
          '评论内容评论内容评论内容评论内容评论内容评论内容',
        author: '评论者',
        face: '',
        updateTime: '2018-12-12 12:00:00',
        stars: 13
      }],
      commentForm: {
        commentText: '',
        parentId: null
      },
      loginUser: {
        username: '',
        facePath: ''
      }
    }
  },
  methods: {
    getArticleInfo (slug) {
      this.$http.get('/ui/blog/article/' + slug).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.article = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询文章对应的评论列表
    getCommentList (commentCurrentPage, articleId) {
      this.$http.get('/ui/blog/article/commentList?currentPage=' + commentCurrentPage + '&articleId=' + articleId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.comments = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章评论列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addStars (articleId) {
      this.$http.put('/ui/blog/article/addStars?articleId=' + articleId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.article.stars++
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章点赞异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addComment (parent) {
      this.commentForm.parentId = parent
      this.$http.post('/ui/blog/article/addComment', this.commentForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.article.stars++
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章点赞异常')
        }
      }).catch(error => {
        console.log(error)
      })
      // 评论完清除上一次评论内容
      this.clearComment()
    },
    clearComment () {
      this.commentForm.parentId = null
      this.commentForm.commentText = ''
      this.$refs.commentArea.value = ''
    },
    handleCurrentChange (val) {
      this.commentCurrentPage = val
      this.getCommentList(this.commentCurrentPage, this.article.id)
    }
  },
  mounted () {
    // 获取路径参数中的slug
    this.slug = this.$route.query.slug
    console.log(this.slug)
    this.loginUser = localStorage.getItem('user')
    this.getArticleInfo(this.slug)
    this.getCommentList(this.commentCurrentPage, this.article.id)
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 60px;
    width: 60px;
  }

  .img-circle-small {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }

  .thumb-font {
    padding-right: 8px;
    margin-right: 8px;
    font-size: 16px;
    border-right: solid 1px #aaa1a4;
    font-family: SansSerif;
  }

  .thumb-number {
    font-size: 16px;
    font-family: "Times New Roman";
  }

  .thumb-button {
    border-radius: 30px !important;
    height: 60px;
    width: 200px;
  }

  .comment-area {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    border-radius: 20px;
    width: 100%;
    resize: none;
    height: 80px;
    border: 1px solid #dcdcdc;
    background-color: hsla(0, 0%, 71%, .1);
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }

  .comment-area:focus {
    background-color: hsla(0, 0%, 95%, 0.1);
  }

  .reshipment {
    padding: 0 30px;
    margin-bottom: 20px;
    min-height: 24px;
    font-size: 15px;
    text-align: center;
    font-weight: 700;
    color: #969696;
  }

  .comment-title {
    color: #333;
    font-size: 17px;
    font-weight: 700;
  }

  .comment-info {
    word-break: break-word !important;
    white-space: normal;
    background-color: hsla(0, 0%, 71%, .1);
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
