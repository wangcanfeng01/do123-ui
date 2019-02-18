<template>
  <div id="blog_article">
    <el-col :span="10" :offset="7">
      <h1 style="text-align: center">{{article.title}}</h1>
      <el-row>
        <el-col :span="12">
          <div>
            <img v-if="article.face" :src="article.face" class="img-circle"/>
            <img v-else src="../../assets/face/face0.jpg" class="img-circle">
          </div>
          <div style="margin-left: 80px;margin-top: -50px;min-width: 300px">
            <small>{{'最后一次更新 '+article.updateTime}}</small>
          </div>
          <div style="margin-left: 80px;min-width: 300px">
            <small>{{'字数 '+article.wordsCount}}</small>
            <small>{{'评论 '+article.commentNum}}</small>
            <small>{{'阅读 '+article.hits}}</small>
          </div>
        </el-col>
        <el-col :span="6" :offset="4" style="margin-top: 30px">
          <el-button type="danger" plain class="thumb-button">
            <span class="thumb-font"><font-awesome-icon icon="thumbs-up"/>&nbsp;&nbsp;赞一个</span>
            <span class="thumb-number">{{article.stars}}</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <pre>{{article.text}}</pre>
      </el-row>
      <el-row>
        <p>本站文章均为原创或翻译，转载必须标明出处</p>
      </el-row>
      <el-row>
        <el-col :span="1" :offset="2" style="margin-top: 10px;min-width: 40px">
          <img v-if="article.face" :src="article.face" class="img-circle-small"/>
          <img v-else src="../../assets/face/face0.jpg" class="img-circle-small">
        </el-col>
        <el-col :span="18">
          <textarea :rows="4" placeholder="说些什么吧..." v-model="commentText"
                    class="comment-area"></textarea>
        </el-col>
        <el-col :span="4" :offset="19" style="margin-top: 20px">
          <el-button type="success" round>评论</el-button>
        </el-col>
      </el-row>
      <el-row v-for="comment in comments" :key="comment.id" style="margin-top: 30px">
        <div>
          <img v-if="comment.face" :src="comment.face" class="img-circle"/>
          <img v-else src="../../assets/face/face1.jpg" class="img-circle">
        </div>
        <div style="margin-left: 80px;margin-top: -50px;min-width: 300px">
          <small>{{comment.author}}</small>
        </div>
        <div style="margin-left: 80px;min-width: 300px">
          <small>{{comment.updateTime}}</small>
        </div>
        <div>
          <pre class="comment-info">{{comment.content}}</pre>
        </div>
      </el-row>
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
        title: '标题',
        face: '',
        text: '文章内容',
        wordsCount: 14,
        hits: 111,
        stars: 23123,
        commentNum: 33,
        keywords: '关键字',
        updateTime: '2018-12-12 12:00:00'
      },
      comments: [{
        id: 1,
        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容' +
          '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容' +
          '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容' +
          '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
        author: '评论者',
        face: '',
        updateTime: '2018-12-12 12:00:00'
      }],
      commentText: ''
    }
  },
  mounted () {
    // 获取路径参数中的slug
    this.slug = this.$route.query.slug
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
    border-right: solid 1px;
    font-family: SansSerif;
  }

  .thumb-number {
    font-size: 16px;
    font-family: "Times New Roman";
  }

  .thumb-button {
    border-radius: 40px !important;
    height: 60px;
    width: 200px;
  }

  .comment-area {
    padding-top: 5px;
    padding-left: 30px;
    font-size: 15px;
    border-radius: 40px;
    width: 95%;
    resize: none;
    height: 80px;
    border: 1px solid #dcdcdc;
    background-color: hsla(0, 0%, 71%, .1);
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }

  .comment-info {
    word-break: break-word !important;
    white-space: normal;
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
