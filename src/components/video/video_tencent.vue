<template>
  <div id="video_tencent">
    <!--跑马灯-->
    <el-col :span="19" :offset="1">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="carousel in videos.carousels" :key="carousel.value">
          <a :href="carousel.value" target="_blank"> <img :src="carousel.image"></a>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <!--电视剧-->
    <el-col :span="19" :offset="1" style="margin-bottom: 50px">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热剧精选</span>
            <el-button style="float: right; padding: 3px 0" type="text">换一批</el-button>
          </div>
          <el-col :span="4" v-for="(tvHot,index) in videos.tvHots" :key="tvHot.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }">
              <a :href="tvHot.value" target="_blank"><img :src="tvHot.image" style="width: 100%"></a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="tvHot.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{tvHot.title}}</span></a>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </el-col>
    <!--综艺-->
    <el-col :span="19" :offset="1" style="margin-bottom: 50px">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热剧精选</span>
            <el-button style="float: right; padding: 3px 0" type="text">换一批</el-button>
          </div>
          <el-col :span="4" v-for="(varietyShow,index) in videos.varietyShows" :key="varietyShow.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }">
              <a :href="varietyShow.value" target="_blank"><img :src="varietyShow.image" style="width: 100%"></a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="varietyShow.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{varietyShow.title}}</span></a>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </el-col>
    <!--电影-->
    <el-col :span="19" :offset="1" style="margin-bottom: 50px">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>院线热映</span>
            <el-button style="float: right; padding: 3px 0" type="text">换一批</el-button>
          </div>
          <el-col :span="4" v-for="(movie,index) in videos.movies" :key="movie.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }">
              <a :href="movie.value" target="_blank"><img :src="movie.image" style="width: 100%"></a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="movie.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{movie.title}}</span></a>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </el-col>
    <!--动漫-->
    <el-col :span="19" :offset="1" style="margin-bottom: 50px">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>动漫精选</span>
            <el-button style="float: right; padding: 3px 0" type="text">换一批</el-button>
          </div>
          <el-col :span="4" v-for="(cartoon,index) in videos.cartoons" :key="cartoon.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }">
              <a :href="cartoon.value" target="_blank"><img :src="cartoon.image" style="width: 100%"></a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="cartoon.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{cartoon.title}}</span></a>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'video_tencent',
  data () {
    return {
      videos: {
        carousels: [{}],
        varietyShows: [{}],
        tvHots: [{}],
        cartoons: [{}],
        movies: [{}]
      }
    }
  },
  methods: {
    getHomeVideos () {
      this.$http.get('/ui/video/tencent/home').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.videos = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('腾讯视频信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getHomeVideos()
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
