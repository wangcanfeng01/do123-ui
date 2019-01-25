<template>
  <div id="blog_center">
    <el-col :span="15">
      <el-row v-for="(o) in 4" :key="o" style="margin-bottom: 30px">
        <el-card :body-style="{ padding: '20px' }">
          <a class="image featured big">
            <img src="../../assets/article/cover/default.jpg" class="image">
          </a>
          <div style="padding: 4px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="5" :offset="1">
      <el-row>
        <h3 style="text-align: center">WCF</h3>
        <small>前行路上，不能忘了自己的善良以及内心深处的理想</small>
        <div style="border-bottom: solid;color: beige;margin-bottom: 20px;margin-top: 20px"></div>
      </el-row>
      <el-row v-for="(o) in 4" :key="o" style="margin-bottom: 30px">
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 14px">
          <a class="image featured little">
            <img src="../../assets/article/cover/category/default.jpg" class="image">
          </a>
          <div style="padding: 4px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_center',
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>
  .image {
    border: 0;
    display: inline-block;
    position: relative;
  }

  .image img {
    display: block;
  }

  .image.featured img {
    width: 100%;
  }

  a.image.featured.big {
    overflow: hidden;
    width: 100%;
    height: 25em;
    border: 1px solid black;
    border-radius: 14px;
  }

  a.image.featured.little {
    overflow: hidden;
    width: 100%;
    border: 1px solid black;
    height: 10em;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }

  a.image.featured img {
    -moz-transition: -moz-transform 0.2s ease-out;
    -webkit-transition: -webkit-transform 0.2s ease-out;
    -ms-transition: -ms-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }

  a.image.featured:hover img {
    -moz-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }
</style>
