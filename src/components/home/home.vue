<template>
  <div id="home">
    <el-carousel :interval="5000" height="900px">
      <el-carousel-item v-for="(img,item) in items" :key="item">
        <img class="home_img" v-bind:src="img.url"/>
        <h2>{{ img.title }}</h2>
      </el-carousel-item>
    </el-carousel>
    <el-container>
      <el-col :span="12">
        <el-aside width="50%">Aside</el-aside>
      </el-col>
      <el-col :span="12">
        <el-aside width="50%">Aside</el-aside>
      </el-col>
    </el-container>
    <el-container>
      <el-col :span="12">
        <el-aside width="50%">Aside</el-aside>
      </el-col>
      <el-col :span="12">
        <el-aside width="50%">Aside</el-aside>
      </el-col>
    </el-container>
    <my-footer style="margin-top: 0px"></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/common/common_footer'

export default {
  name: 'home',
  components: {
    'myFooter': myFooter
  },
  data () {
    return {
      items: [
        {
          title: '相信自己',
          url: require('../../assets/home/home.jpg')
        },
        {
          title: '尊重他人',
          url: require('../../assets/home/home.jpg')
        },
        {
          title: '心不在焉，虽学不成',
          url: require('../../assets/home/home.jpg')
        },
        {
          title: '宁静志远',
          url: require('../../assets/home/home.jpg')
        },
        {
          title: '巧言令色，鲜矣仁',
          url: require('../../assets/home/home.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h2 {
    color: #c74c38;
    opacity: 0.9;
    line-height: 100px;
    font-size: 45px;
    font-weight: bold;
    margin: 0;
    text-align: center;
    position: absolute;
    font-family: "微软雅黑 Light";
    top: 50%;
    width: 100%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .home_img {
    height: 900px;
  }
</style>
