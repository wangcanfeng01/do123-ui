<template>
  <div id="search">
    <div v-if="searchKey!==''|| initialization===false" style="margin-top: 50px;margin-top: 50px">
      <el-row>
        <el-col :span="5" :offset="1">
          <el-input placeholder="请输入内容" v-model="searchKey" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="getInfo">搜索一下</el-button>
        </el-col>
      </el-row>
      <el-row style="min-height: 400px">
        <el-col :span="6" :offset="1" style="margin-bottom: 40px">
          <div v-for="blog in blogs" :key="blog.title">
            <el-card :body-style="{ padding: '0px' }" class="video-card">
              <el-col :span="11">
                <img :src="blog.image" style="width: 100%">
              </el-col>
              <el-col :span="11">
                <img :src="blog.image" style="width: 100%">
              </el-col>
              <!--<a :href="blog.url" target="_blank">-->
                <!--<div class="video-box">-->
                  <!--<img :src="blog.image" style="width: 100%">-->
                  <!--&lt;!&ndash;遮罩层&ndash;&gt;-->
                  <!--<div class="mask-box">-->
                    <!--<p>{{blog.director}}</p>-->
                    <!--<p>{{blog.summary}}</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</a>-->
              <!--<div style="padding: 14px;min-height: 3em">-->
                <!--<a :href="blog.url" target="_blank"-->
                   <!--style="text-decoration: none;color: black"><span>{{blog.title+'-'+blog.type}}</span></a>-->
                <!--<el-button type="warning" icon="el-icon-star-off" circle style="float: right" title="收藏"></el-button>-->
              <!--</div>-->
            </el-card>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div v-for="video in videos" :key="video.title">
            <h1>{{video.title+'-'+video.type}}</h1>
            <span>{{video.director}}</span>
            <img :src="video.image" style="width: 180px;height: 240px">
            <span>{{video.summary}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="searchBackground" v-else>
      <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 160px">
          <p class="title_font">DO123</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8" style="margin-bottom: 250px;">
          <el-input placeholder="请输入内容" v-model="searchKey" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button>搜索一下</el-button>
        </el-col>
      </el-row>
    </div>
    <my-footer style="margin-top: 0px;margin-bottom: 0px"></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/common/common_footer'

export default {
  name: 'search',
  components: {
    'myFooter': myFooter
  },
  data () {
    return {
      searchKey: '',
      searchBackground: {
        background: 'url(' + require('../../assets/bg/seed.jpg') + ')',
        backgroundSize: 'cover'
      },
      blogs: [{
        title: '标题',
        summary: '简介',
        image: 'http://p2.123.sogoucdn.com/imgu/2016/12/20161214151633_795.jpg',
        type: '3231',
        director: 'sss'
      }],
      videos: [{}],
      initialization: true
    }
  },
  methods: {
    getInfo () {
      this.getVideos(this.searchKey)
      this.getBlogs(this.searchKey)
      this.initialization = false
    },
    getBlogs (keyword) {
      this.$http.get('/ui/search/blogs?keyword=' + keyword).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.blogs = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('博客信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getVideos (keyword) {
      this.$http.get('/ui/search/videos?keyword=' + keyword).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.videos = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('视频信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.searchKey = this.$route.query.searchKey
    if (this.searchKey !== undefined && this.searchKey !== '') {
      this.initialization = false
      this.getVideos(this.searchKey)
      this.getBlogs(this.searchKey)
    } else {
      this.searchKey = ''
    }
  }
}
</script>

<style scoped>
  .title_font {
    font-size: 3em;
    letter-spacing: 13px;
    font-family: 'Arvo';
    font-weight: 700;
    color: #ed786a;
    text-shadow: 0.05em 0.075em 0 rgba(0, 0, 0, 0.1);
    border: 0;
    text-align: center;
  }

  .video-card {
    transition: all 0.3s;
  }

  .video-card:hover {
    transform: scale(1.1);
  }

  .video-box {
    position: relative;
  }

  .mask-box {
    position: absolute;
    top: 180px;
    left: 0;
    bottom: 4px;
    overflow: hidden;
    background: rgba(101, 101, 101, 0.6);
    color: #ffffff;
    font-size: 0.5em;
    opacity: 0;
    width: 100%;
  }

  .video-box:hover .mask-box {
    opacity: 0.8;
  }
</style>
