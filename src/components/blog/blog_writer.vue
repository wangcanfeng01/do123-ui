<template>
  <div id="blog_writer">
    <el-col :span="20" id="blog-content">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入标题" v-model="article.title" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-select v-model="article.category" clearable placeholder="请选择文章分类">
            <el-option v-for="category in categories" :key="category.id"
                       :label="category.name" :value="category.name">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="18">
          <fieldset class="fieldset-border">
            <legend class="legend-font">关键字</legend>
            <el-tag :key="keyword" v-for="keyword in article.keywords" closable :disable-transitions="false"
                    @close="handleClose(keyword)">{{keyword}}
            </el-tag>
            <el-input class="input-new-tag" v-if="keywordInputVisible" v-model="keywordInputValue"
                      ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
          </fieldset>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="18">
          <mavon-editor ref="mdTestArea" @imgAdd="uploadPic" @imgDel="deletePic" @save="saveArticle"
                        :subfield="subfield"
                        :code_style="code_style"
                        :ishljs="true" :externalLink="externalLink" v-model="article.text">
          </mavon-editor>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="4" :offset="1">
          <el-switch v-model="article.allowComment" active-color="#13ce66" inactive-color="#ff4949"
                     active-text="允许评论" inactive-text="不可评论">
          </el-switch>
        </el-col>
        <el-col :span="4">
          <el-switch v-model="article.allowSee" active-color="#13ce66" inactive-color="#ff4949"
                     active-text="所有人可见" inactive-text="仅自己可见">
          </el-switch>
        </el-col>
        <el-col :span="5" :offset="5">
          <el-button @click="toBlogList">返回列表</el-button>
          <el-button type="success" @click="publishArticle('publish')">文章发布</el-button>
        </el-col>
        <div style="margin-bottom: 50px"></div>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_writer',
  data () {
    return {
      categories: [{
        id: 1,
        name: '选项1'
      }],
      article: {
        id: 1,
        title: '标题',
        slug: '',
        author: '',
        text: '文章内容',
        keywords: ['关键字1', '关键字2'],
        allowComment: true,
        allowSee: true,
        category: '随笔'
      },
      keywordInputVisible: true,
      keywordInputValue: '',
      subfield: false,
      code_style: 'solarized-dark',
      externalLink: {
        markdown_css: function () {
          // 这是markdown css文件路径
          return '/markdown/github-markdown.min.css'
        },
        hljs_js: function () {
          // 这是hljs文件路径
          return '/highlightjs/highlight.min.js'
        },
        hljs_css: function () {
          // 这是代码高亮配色文件路径
          return '/highlightjs/styles/solarized-dark.min.css'
        },
        hljs_lang: function (lang) {
          // 这是代码高亮语言解析路径
          return '/highlightjs/languages/' + lang + '.min.js'
        },
        katex_css: function () {
          // 这是katex配色方案路径路径
          return '/katex/katex.min.css'
        },
        katex_js: function () {
          // 这是katex.js路径
          return '/katex/katex.min.js'
        }
      }
    }
  },
  methods: {
    getCategories () {
      this.$http.get('/ui/blog/meta/categories/simple').then(response => {
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
    getArticleInfo (slug) {
      let url
      if (slug === undefined) {
        url = '/ui/blog/article/write'
      } else {
        url = '/ui/blog/article/write?slug=' + slug
      }
      this.$http.get(url).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.article = response.data.data
            this.$router.push({path: '/blog/writer', query: {slug: this.article.slug}})
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
    saveArticle () {
      this.publishArticle('save')
    },
    publishArticle (type) {
      this.$http.put('/ui/blog/article/modify/' + type, this.article).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            if (type === 'publish') {
              this.$message.success('文章发布成功')
            } else {
              this.$message.success('文章保存成功')
            }
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章提交异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    uploadPic (filename, $file) {
      let formData = new FormData()
      formData.append('image', $file)
      this.$http.post('/ui/blog/articlePic/upload/' + this.article.id, formData).then((response) => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('图片上传成功')
            this.$refs.mdTestArea.$img2Url(filename, response.data.data.path)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('图片上传异常')
        }
      })
    },
    deletePic (filename) {
      this.$http.delete('/ui/blog/articlePic/delete?path=' + filename[1]).then((response) => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('图片删除成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('图片上传异常')
        }
      })
    },
    // 删除关键字的标签
    handleClose (tag) {
      this.article.keywords.splice(this.article.keywords.indexOf(tag), 1)
    },
    // 增加新的关键字
    handleInputConfirm () {
      let inputValue = this.keywordInputValue
      if (inputValue) {
        this.article.keywords.push(inputValue)
      }
      this.keywordInputValue = ''
    },
    toBlogList () {
      this.$router.push('/blog/list')
    },
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        var right = document.getElementById('blog-content')
        var rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    this.getCategories()
    // 获取路径中的slug参数，并作为查询参数
    let slug = this.$route.query.slug
    this.getArticleInfo(slug)
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    margin-top: 10px;
    vertical-align: center;
  }

  .fieldset-border {
    border: 2px solid #c09992;
    border-radius: 5px;
    padding: 0px 20px 20px 20px;
  }

  .legend-font {
    border: 0;
    width: auto;
    margin-left: 20px;
    font-size: 1.2em;
  }
</style>
<style>
  .op-icon {
    /*font-size: 1.2em !important;*/
    /*margin-right: 0.5em !important;*/
  }

  .v-note-edit {
    min-height: 500px !important;
  }

  .v-show-content {
    white-space: normal;
    font-size: 1em;
    word-wrap: break-word;
    word-break: break-word;
  }

  .v-show-content pre {
    max-width: 100%;
  }
</style>
