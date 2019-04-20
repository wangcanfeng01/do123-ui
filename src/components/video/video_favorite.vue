<template>
  <div id="video_favorite">
    <el-col :span="19" :offset="1" id="video-content">
      <el-row style="border-bottom: 1px solid #ebeef5;margin-bottom: 20px;padding-bottom: 20px">
        <el-col :span="4" :offset="10">
          <el-select v-model="currentType" filterable placeholder="视频类型" @change="getFavorites">
            <el-option v-for="videoType in videoTypes" :key="videoType.code"
                       :label="videoType.name" :value="videoType.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="queryTitle" placeholder="视频名称..."></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" style="margin-left: 15px" @click="getFavorites">查询</el-button>
        </el-col>
      </el-row>
      <el-row v-if="total===0">
        <p style="text-align: center">收藏夹空空如也</p>
      </el-row>
      <el-row>
        <el-col :span="4" v-for="favorite in favorites" :key="favorite.id"
                :offset="index%5===0?0:1" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px' }" class="video-card">
            <a :href="favorite.value" target="_blank">
              <div class="video-box">
                <img :src="favorite.image" style="width: 100%">
                <!--遮罩层-->
                <div class="mask-box">
                  <p>{{favorite.director}}</p>
                  <p>{{favorite.summary}}</p>
                </div>
              </div>
            </a>
            <div style="padding: 14px;min-height: 3em">
              <a :href="favorite.value" target="_blank"
                 style="text-decoration: none;color: black"><span>{{favorite.title}}</span></a>
              <el-button type="danger" icon="el-icon-delete" circle style="float: right" title="取消收藏"
                         @click="cancelFavorites(favorite.id)"></el-button>
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
  name: 'video_favorite',
  data () {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      queryTitle: '',
      videoTypes: [{}],
      currentType: '',
      favorites: [{}]
    }
  },
  methods: {
    getFavorites () {
      let req = {
        params: {
          'pageSize': this.pageSize,
          'currentPage': this.currentPage,
          'type': this.currentType,
          'queryTitle': this.queryTitle
        }
      }
      this.$http.get('/ui/video/action/favorite/list', req).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.favorites = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('收藏类型查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    cancelFavorites (id) {
      this.$http.post('/ui/video/action/cancel/collection?videoId=' + id).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('取消成功')
            // 重新查询收藏夹信息
            this.getFavorites()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('取消异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getTypeList () {
      this.$http.get('/ui/video/action/video/types').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.videoTypes = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('视频类型查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getFavorites()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getFavorites()
    }
  },
  mounted () {
    this.getFavorites()
    this.getTypeList()
  }
}
</script>

<style scoped>
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
