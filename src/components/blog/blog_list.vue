<template>
  <div id="blog_list">
    <el-col :span="20" class="about_content">
      <el-col :span="5" v-for="(o) in 6" :key="o" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
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
