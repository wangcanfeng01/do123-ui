<template>
  <div id="home">
    <el-carousel :interval="5000" height="900px">
      <el-carousel-item v-for="(img,item) in items" :key="item">
        <img class="home_img" v-bind:src="img.url"/>
        <h2>{{ img.title }}</h2>
      </el-carousel-item>
    </el-carousel>
    <el-container>
      <el-aside width="50%">
        <div style="position: relative;width: 30%;height: 366px;left: 42%">
          <div style="position:absolute;">
            <img src="../../assets/home/blog.jpg"/>
          </div>
          <div style="position: absolute;font-size: 6em;z-index: 1;top:100px;left: 85%">
            <a href="/baidu.com" style="color: white;">
              <font-awesome-icon icon="book"/>
            </a>
          </div>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div style="text-align: left;height: 369px">
          <h3 style="margin-top: 0px">博客分享</h3>
          <p>（1）在网络上收获了无数知识，因此在自己获得帮助的同时，想到了回报社会</p>
          <p>（2）写博客可以记录自己当前所学，方便回顾 ，利人利己</p>
        </div>
      </el-aside>
    </el-container>
    <el-container>
      <el-aside width="50%">
        <div style="text-align: right;height: 366px;">
          <h3 style="margin-top: 0px">视频搜索</h3>
          <p>（1）通过机器学习算法，智能推荐用户平时浏览量最高的视频</p>
          <p>（2）提供智能搜索方法，方便中老年用户查找视频</p>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div style="position: relative;">
          <div style="position:absolute;width: 100%;">
            <img src="../../assets/home/video.jpg"/>
          </div>
          <div style="position: absolute;font-size: 6em;z-index: 1;top: 100px;left: 2em">
            <a href="/baidu.com" style="color: white">
              <font-awesome-icon icon="play-circle"/>
            </a>
          </div>
        </div>
      </el-aside>
    </el-container>
    <div class="clearfix"></div>
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

  .icon_left {
    color: #ffffff;
    font-size: 6em;
    height: 1em;
    line-height: 1em;
    /*margin: -2.5em 0 0 6.5em;*/
    left: 25%;
    position: absolute;
    text-align: center;
    width: 1em;
    z-index: 1;
    float: right;
  }

  .icon_right {
    transition: transform 0.1s ease-in-out, font-size 0.1s ease-in-out;
    color: #fff;
    font-size: 6em;
    height: 1em;
    line-height: 1em;
    margin: 1.75em 0 0 -3.5em;
    position: absolute;
    text-align: center;
    width: 1em;
    z-index: 1;
  }

  .clearfix:before,
  .clearfix:after {
    content: " ";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }
</style>
