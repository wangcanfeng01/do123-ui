<template>
  <div id="blog_list">
    <el-col :span="20" id="blog-content">
      <el-row>
        <el-col :span="5" v-for="(o) in 6" :key="o">
          <el-card :body-style="{ padding: '0px' }" style="margin-right: 20px;margin-bottom: 20px">
            <img src="../../assets/article/cover/default.jpg" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-pagination
          :background="true"
          layout="prev, pager, next"
          :total="50"
          class="pagination">
        </el-pagination>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_list',
  data () {
    return {
      currentDate: new Date()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        var right = document.getElementById('blog-content')
        var rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
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
  .pagination li {
    background-color: transparent !important;
    border-radius: 4px !important;
    border: solid 1px;
    color: #0f0f0f !important;
  }

  .pagination li:active {
    background-color: #ff5d5d !important;
    border-radius: 4px !important;
    border: solid 1px;
  }

  .pagination li:active {
    background-color: #ff5d5d !important;
    border-radius: 4px !important;
    border: solid 1px !important;
    color: #fdffff !important;
  }
</style>
