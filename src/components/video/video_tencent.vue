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
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeVideos('HOME_VIDEO_TV')">换一批
            </el-button>
          </div>
          <el-col :span="4" v-for="(tvHot,index) in videos.tvHots" :key="tvHot.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }" class="video-card">
              <a :href="tvHot.value" target="_blank">
                <div class="video-box">
                  <img :src="tvHot.image" style="width: 100%">
                  <!--遮罩层-->
                  <div class="mask-box">
                    <p>{{tvHot.director}}</p>
                    <p>{{tvHot.summary}}</p>
                  </div>
                </div>
              </a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="tvHot.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{tvHot.title}}</span></a>
                <el-button type="warning" icon="el-icon-star-off" circle style="float: right" title="收藏"
                           @click="collectVideo(tvHot)"></el-button>
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
            <span>综艺节目</span>
            <el-button style="float: right; padding: 3px 0" type="text"
                       @click="changeVideos('HOME_VIDEO_VARIETY_SHOW')">换一批
            </el-button>
          </div>
          <el-col :span="4" v-for="(varietyShow,index) in videos.varietyShows" :key="varietyShow.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }" class="video-card">
              <a :href="varietyShow.value" target="_blank">
                <div class="video-box">
                  <img :src="varietyShow.image" style="width: 100%">
                  <!--遮罩层-->
                  <div class="mask-box">
                    <p>{{varietyShow.director}}</p>
                    <p>{{varietyShow.summary}}</p>
                  </div>
                </div>
              </a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="varietyShow.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{varietyShow.title}}</span></a>
                <el-button type="warning" icon="el-icon-star-off" circle style="float: right" title="收藏"></el-button>
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
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeVideos('HOME_VIDEO_MOVIE')">换一批
            </el-button>
          </div>
          <el-col :span="4" v-for="(movie,index) in videos.movies" :key="movie.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }" class="video-card">
              <a :href="movie.value" target="_blank">
                <div class="video-box">
                  <img :src="movie.image" style="width: 100%">
                  <!--遮罩层-->
                  <div class="mask-box">
                    <p>{{movie.director}}</p>
                    <p>{{movie.summary}}</p>
                  </div>
                </div>
              </a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="movie.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{movie.title}}</span></a>
                <el-button type="warning" icon="el-icon-star-off" circle style="float: right" title="收藏"></el-button>
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
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeVideos('HOME_VIDEO_CARTOON')">
              换一批
            </el-button>
          </div>
          <el-col :span="4" v-for="(cartoon,index) in videos.cartoons" :key="cartoon.value"
                  :offset="(index===0||index===5)?0:1" style="margin-bottom: 20px">
            <el-card :body-style="{ padding: '0px' }" class="video-card">
              <a :href="cartoon.value" target="_blank">
                <div class="video-box">
                  <img :src="cartoon.image" style="width: 100%">
                  <!--遮罩层-->
                  <div class="mask-box">
                    <p>{{cartoon.director}}</p>
                    <p>{{cartoon.summary}}</p>
                  </div>
                </div>
              </a>
              <div style="padding: 14px;min-height: 3em">
                <a :href="cartoon.value" target="_blank"
                   style="text-decoration: none;color: black"><span>{{cartoon.title}}</span></a>
                <el-button type="warning" icon="el-icon-star-off" circle style="float: right" title="收藏"></el-button>
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
      },
      varietyShowsIndex: 1,
      tvHotsIndex: 1,
      cartoonsIndex: 1,
      moviesIndex: 1
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
    },
    collectVideo (video) {
      this.$http.post('/ui/video/action/collection', video).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('视频收藏成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('视频收藏异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeVideos (key) {
      let index
      switch (key) {
        case 'HOME_VIDEO_VARIETY_SHOW': {
          index = this.varietyShowsIndex
          break
        }
        case 'HOME_VIDEO_TV': {
          index = this.tvHotsIndex
          break
        }
        case 'HOME_VIDEO_MOVIE': {
          index = this.moviesIndex
          break
        }
        case 'HOME_VIDEO_CARTOON': {
          index = this.cartoonsIndex
          break
        }
      }
      this.$http.get('/ui/video/tencent/change?key=' + key + '&index=' + index).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            switch (key) {
              case 'HOME_VIDEO_VARIETY_SHOW': {
                this.videos.varietyShows = response.data.data
                this.varietyShowsIndex++
                break
              }
              case 'HOME_VIDEO_TV': {
                this.videos.tvHots = response.data.data
                this.tvHotsIndex++
                break
              }
              case 'HOME_VIDEO_MOVIE': {
                this.videos.movies = response.data.data
                this.moviesIndex++
                break
              }
              case 'HOME_VIDEO_CARTOON': {
                this.videos.cartoons = response.data.data
                this.cartoonsIndex++
                break
              }
            }
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('切换视频信息异常')
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
