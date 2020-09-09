<template>
  <div id="blog_article">
    <el-col :span="4" :offset="1" style="margin-top: 20px;">
      <el-button @click="getNav">显示导航</el-button>
      <div ref="nav-info" class="wcf-nav" v-show="navVisible"></div>
    </el-col>
    <el-col :span="12" :offset="1">
      <h1 style="text-align: center">{{article.title}}</h1>
      <el-row>
        <el-col :span="12" :offset="2">
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
        <el-col :span="4" :offset="2" style="margin-top: 30px">
          <el-button type="danger" plain class="thumb-button" @click="addStars(article.id,article.stars)">
            <span class="thumb-font"><font-awesome-icon icon="thumbs-up"/>&nbsp;&nbsp;赞一个</span>
            <span class="thumb-number">{{article.stars}}</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <div v-html="article.text" class="text-info" ref="text_info" v-highlight></div>
      </el-row>
      <transition name="fade">
        <div @click="closePic" class="v-note-img-wrapper" v-show="showPic">
          <img :src="previewPictureSrc" alt="none">
        </div>
      </transition>
      <el-row>
        <p class="reshipment">本站文章均为原创或翻译，转载必须标明出处</p>
      </el-row>
      <el-row v-show="loginUser.userId!=null">
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
      <el-row v-show="loginUser.userId===null">
        <p class="reshipment">空空如也的，不妨登录一下，说点什么</p>
        <el-col :span="3" :offset="11">
          <el-button type="success" @click="toLogin">登录</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 30px;margin-bottom: 20px">
        <span class="comment-title">{{'精彩评论('+commentTotal+')'}}</span>
      </div>
      <el-row v-for="comment in comments" :key="comment.id"
              style="border-top: 1px solid #f0f0f0;;padding-top: 15px;margin-bottom: 10px">
        <div>
          <img v-if="comment.authorFace" :src="comment.authorFace" class="img-circle-small"/>
          <img v-else src="../../assets/face/face1.jpg" class="img-circle-small">
        </div>
        <div style="margin-left: 45px;margin-top: -45px;min-width: 300px">
          <small>{{comment.authorName}}</small>
        </div>
        <div style="margin-left: 45px;min-width: 300px">
          <small>{{comment.updateTime}}</small>
        </div>
        <div>
          <pre class="comment-info">{{comment.text}}</pre>
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
      <div style="margin-bottom: 50px"></div>
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
        content: '评论内容评论内容评论内容评论内容评论内容评论内',
        author: '评论者',
        face: '',
        updateTime: '2018-12-12 12:00:00',
        stars: 13
      }],
      commentForm: {
        articleId: null,
        authorName: '',
        authorId: null,
        commentText: '',
        parentId: null
      },
      loginUser: {
        userId: null,
        username: '',
        facePath: ''
      },
      showPic: false,
      previewPictureSrc: '',
      navVisible: false,
      indexes: []
    }
  },
  methods: {
    closePic () {
      this.showPic = false
      this.previewPictureSrc = ''
    },
    preview (event) {
      let ele = event.srcElement
      if (ele.tagName === 'IMG') {
        this.previewPictureSrc = ele.src
        this.showPic = true
      }
    },
    toLogin () {
      this.$router.push('/login')
    },
    getArticleInfo (slug) {
      this.$http.get('/ui/blog/article/' + slug).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.article = response.data.data
            this.getCommentList(this.commentCurrentPage, this.article.id)
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
            this.commentTotal = response.data.total
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
    addStars (articleId, stars) {
      this.$http.put('/ui/blog/article/addStars?articleId=' + articleId + '&stars=' + stars).then(response => {
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
      this.commentForm.articleId = this.article.id
      this.commentForm.authorId = this.loginUser.userId
      this.commentForm.authorName = this.loginUser.username
      this.$http.post('/ui/blog/article/addComment', this.commentForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 评论完清除上一次评论内容
            this.clearComment()
            this.getCommentList(this.commentCurrentPage, this.article.id)
            this.$message.success('评论成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('添加评论异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    clearComment () {
      this.commentForm.parentId = null
      this.commentForm.commentText = ''
      this.commentForm.articleId = null
      this.commentForm.authorId = null
      this.commentForm.authorName = ''
      this.$refs.commentArea.value = ''
    },
    handleCurrentChange (val) {
      this.commentCurrentPage = val
      this.getCommentList(this.commentCurrentPage, this.article.id)
    },
    getLogin () {
      this.$http.get('/ui/user/get/login').then(response => {
        if (response && response.data && response.data.code === '0') {
          if (response.data.data) {
            this.loginUser = response.data.data
          } else {
            this.loginUser.userId = null
            this.loginUser.facePath = ''
          }
        } else {
          this.loginUser.userId = null
          this.loginUser.facePath = ''
        }
      }).catch(error => {
        this.loginUser.userId = null
        this.loginUser.facePath = ''
        console.log(error)
      })
    },
    getNav () {
      this.navVisible = true
      let text = this.$refs['text_info']
      this.$refs['nav-info'].innerHTML = text.innerHTML
      let nodes = this.$refs['nav-info'].children
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          this.createNav(nodes[i], i)
        }
      }
      // 插入导航锚点
      this.insertIndexElement(text)
      // 创建导航头
      this.createTitle(nodes[0])
    },
    // 制作导航函数，整个方法的核心
    createNav (node, i) {
      // 设置正则表达式
      let reg = /^H[1-6]{1}$/
      if (!reg.exec(node.tagName)) {
        // 如果不是标题信息，不展示
        node.style.display = 'none'
      } else {
        // 存入索引数组，等会用于生成锚点
        this.indexes.push(i)
        // 生成导航元素
        let ele = document.createElement('a')
        ele.innerText = node.innerText
        // 删除原来标题中的信息
        node.innerText = ''
        ele.href = '#wcf_blog_' + i
        // 插入导航元素
        node.appendChild(ele)
      }
    },
    // 插入锚点的函数
    insertIndexElement (info) {
      let len = this.indexes.length
      if (len > 0) {
        // 从后往前插入，从前往后插入会导致index位移
        for (let i = len - 1; i >= 0; i--) {
          let ele = document.createElement('a')
          ele.setAttribute('id', 'wcf_blog_' + this.indexes[i])
          info.insertBefore(ele, info.children[this.indexes[i]])
        }
      }
    },
    // 生成导航头
    createTitle (first) {
      let title = document.createElement('h1')
      title.innerText = '导航'
      title.style.fontSize = '2em'
      title.style.fontFamily = 'Arial,sans-serif'
      title.style.paddingBottom = '15px'
      title.style.borderBottom = 'solid black 1px'
      title.style.marginRight = '20px'
      this.$refs['nav-info'].insertBefore(title, first)
    }
  },
  mounted () {
    // 获取路径参数中的slug
    this.slug = this.$route.query.slug
    this.getArticleInfo(this.slug)
    this.getLogin()
    this.$nextTick(() => {
      this.$refs.text_info.addEventListener('click', (event) => {
        this.preview(event)
      })
    })
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

  .v-note-img-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1600;
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
  .text-info {
    white-space: normal;
    font-size: 1em;
    word-wrap: break-word;
    word-break: break-word;
  }

  .text-info p {
    font-size: 14px;
    word-wrap: break-word;
    word-break: break-word
  }

  .text-info h1, .text-info h2, .text-info h3, .text-info h4, .text-info h5, .text-info h6 {
    position: relative;
    margin: 20px 0;
  }

  .text-info h1::before, .text-info h2::before, .text-info h3::before, .text-info h4::before, .text-info h5::before, .text-info h6::before {
    position: absolute;
    top: 0;
    left: -15px;
    /*content: '#';*/
    color: #6fa3ef
  }

  .text-info p a {
    color: #313131;
    border-bottom: 1px solid #ccc
  }

  .text-info p a:hover {
    color: #6fa3ef;
    border-bottom: 1px solid #6fa3ef
  }

  .text-info img {
    position: relative;
    display: block;
    overflow: hidden;
    max-width: 80%;
    height: auto;
    margin: 0 auto
  }

  .text-info input.text {
    display: inline-block;
    padding: 5px 10px;
    color: #5f5f5f;
    border: 1px solid #5f5f5f;
    border-radius: 3px;
    outline: 0;
    background-color: #fff
  }

  .text-info input.submit {
    display: inline-block;
    padding: 5px 15px;
    color: #fff;
    border: 1px solid #5f5f5f;
    border-radius: 3px;
    outline: 0;
    background-color: #5f5f5f
  }

  .text-info .flinks {
    padding: 0
  }

  .text-info .flinks li {
    display: inline-block;
    overflow: hidden;
    width: 32%;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .wcf-nav {
    border: solid #d8d8d8 1px;
    padding-left: 20px;
    border-radius: 15px;
    min-height: 750px;
    color: #0f0f0f
  }

  .wcf-nav h1 {
    font-size: 1.4em;
  }

  .wcf-nav h2 {
    font-size: 1.0em;
    margin-left: 20px;
  }

  .wcf-nav h3 {
    font-size: 0.7em;
    margin-left: 35px;
  }

  .wcf-nav h4 {
    font-size: 0.5em;
    margin-left: 45px;
  }

  .wcf-nav h5 {
    font-size: 0.3em;
    margin-left: 55px;
  }

  .wcf-nav h1 a, .wcf-nav h2 a, .wcf-nav h3 a, .wcf-nav h4 a, .wcf-nav h5 a {
    color: #1c469b;
    text-decoration: none;
  }
</style>
