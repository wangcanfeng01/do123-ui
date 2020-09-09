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
      <el-row style="min-height: 400px;margin-top: 30px">
        <el-col :span="6" :offset="1" style="margin-bottom: 40px">
          <div v-if="videos.length===0">
            <h2 class="no-info">搜索到0条相关博客信息</h2>
          </div>
          <div v-else>
            <h2 class="no-info">{{'搜索到条'+blogs.length+'相关博客信息'}}</h2>
            <div v-for="blog in blogs" :key="blog.title">
              <el-card :body-style="{ padding: '0px' }" class="video-card">
                <el-col :span="10">
                  <a :href="blog.url" target="_blank"> <img :src="blog.image" style="width: 180px;height: 240px"
                                                            alt="很糟糕，图片加载失败"></a>
                </el-col>
                <el-col :span="14" style="max-height: 240px">
                  <el-row>
                    <a :href="blog.url" target="_blank"
                       style="text-decoration: none;color: black"><h2>{{blog.title}}</h2></a>
                  </el-row>
                  <el-row>
                    <small>{{blog.director}}</small>
                  </el-row>
                  <el-row>
                    <small>{{blog.summary}}</small>
                  </el-row>
                </el-col>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div v-if="videos.length===0">
            <h2 class="no-info">搜索到0条相关视频信息</h2>
          </div>
          <div v-else>
            <h2 class="no-info">{{'搜索到条'+videos.length+'相关视频信息'}}</h2>
            <div v-for="video in videos" :key="video.title">
              <el-card :body-style="{ padding: '0px' }" class="video-card">
                <el-col :span="10">
                  <a :href="video.url" target="_blank"> <img :src="video.image" style="width: 180px;height: 240px"
                                                             alt="很糟糕，图片加载失败"></a>
                </el-col>
                <el-col :span="14" style="max-height: 240px">
                  <el-row>
                    <a :href="video.url" target="_blank"
                       style="text-decoration: none;color: black"><h2>{{video.title}}</h2></a>
                  </el-row>
                  <el-row>
                    <small>{{video.director}}</small>
                  </el-row>
                  <el-row>
                    <small>{{video.summary}}</small>
                  </el-row>
                </el-col>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div>
            <h2 class="no-info">暂无相关的文件信息</h2>
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
          <el-button @click="getInfo">搜索一下</el-button>
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
      this.$router.push({path: '/global/search', query: {'searchKey': this.searchKey}})
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
  },
  watch: {
    searchKey (curVal, oldVal) {
      if (curVal !== '') {
        this.initialization = false
      }
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
    margin-bottom: 20px;
  }

  .video-card:hover {
    transform: scale(1.1);
  }

  .no-info {
    font-size: 1.5em;
    letter-spacing: 13px;
    font-family: 'Arvo';
    font-weight: 700;
    color: #ed786a;
    text-shadow: 0.05em 0.075em 0 rgba(0, 0, 0, 0.1);
    border: 0;
    text-align: center;
  }
</style>
