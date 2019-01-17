<template>
  <div id="home">
    <el-carousel :interval="5000" height="900px">
      <el-carousel-item v-for="(img,item) in items" :key="item">
        <img class="home_img" v-bind:src="img.url"/>
        <h2>{{ img.title }}</h2>
      </el-carousel-item>
    </el-carousel>
    <div class="home_line">
      <h1 class="line_font">非常有趣的小站</h1>
    </div>
    <el-container>
      <el-aside width="50%">
        <div class="left_img_content">
          <div style="position:absolute;">
            <img src="../../assets/home/blog.jpg"/>
          </div>
          <div class="left_icon">
            <a href="/baidu.com" class="icon_link">
              <font-awesome-icon icon="book"/>
            </a>
          </div>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div class="font_right">
          <h3>博客分享</h3>
          <p>（1）在网络上收获了无数知识，因此在自己获得帮助的同时，反馈社会</p>
          <p>（2）写博客可以记录自己当前所学，方便回顾 ，利人利己</p>
        </div>
      </el-aside>
    </el-container>
    <el-container>
      <el-aside width="50%">
        <div class="font_left">
          <h3>视频搜索</h3>
          <p>（1）通过机器学习算法，智能推荐用户平时浏览量最高的视频</p>
          <p>（2）提供智能搜索方法，方便中老年用户查找视频</p>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div style="position: relative;">
          <div style="position:absolute;width: 100%;">
            <img src="../../assets/home/video.jpg" style="width: 547px;height: 365px"/>
          </div>
          <div class="right_icon">
            <a href="/baidu.com" class="icon_link">
              <font-awesome-icon icon="play-circle"/>
            </a>
          </div>
        </div>
      </el-aside>
    </el-container>
    <div class="clearfix"></div>
    <div class="home_line">
      <h1 class="line_font">有事留言</h1>
      <p style="text-align: center">申请权限/关于本站的疑问</p>
    </div>
    <el-form :model="messageForm" status-icon :rules="rules" ref="messageForm" label-width="100px"
             class="demo-ruleForm">
      <el-row>
        <el-col :span="6" :offset="5">
          <el-form-item prop="username">
            <el-input type="username" placeholder="用户名" v-model="messageForm.username" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="address">
            <el-input type="address" placeholder="邮箱" v-model="messageForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="5">
          <el-form-item prop="info">
            <el-input type="textarea" :rows="12"
                      placeholder="请输入内容"
                      v-model="messageForm.info">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="10">
          <el-button type="success" @click="submitForm('messageForm')" class="messageButton">
            <font-awesome-icon icon="envelope"/>
            发送留言
          </el-button>
        </el-col>
      </el-row>
    </el-form>
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
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入地址'))
      } else {
        callback()
      }
    }
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
      ],
      messageForm: {
        username: '',
        address: '',
        info: ''
      },
      rules: {
        username: [{validator: checkName, trigger: 'blur'}],
        address: [{validator: checkAddress, trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(' submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

  .home_line {
    margin-top: 3em;
    margin-bottom: 2em;
    position: relative;
    border-bottom: solid 2px #e5e5e5;
    box-shadow: inset 0px -8px 0px 0px #fff, inset 0px -10px 0px 0px #e5e5e5;
  }

  .line_font {
    font-size: 4em;
    letter-spacing: 13px;
    font-family: 'Arvo';
    font-weight: 700;
    color: #ed786a;
    text-shadow: 0.05em 0.075em 0 rgba(0, 0, 0, 0.1);
    border: 0;
    text-align: center;
  }

  .font_right {
    text-align: left;
    height: 269px;
    margin-left: 20px;
    margin-top: 100px;
  }

  .font_left {
    text-align: right;
    height: 269px;
    margin-top: 100px;
    margin-right: 20px;
  }

  .left_img_content {
    position: relative;
    width: 30%;
    height: 366px;
    left: 42%
  }

  .left_icon {
    position: absolute;
    font-size: 6em;
    z-index: 1;
    top: 100px;
    left: 85%
  }

  .right_icon {
    position: absolute;
    font-size: 6em;
    z-index: 1;
    top: 100px;
    left: 23%
  }

  .icon_link {
    color: white;
  }

  .icon_link:hover {
    font-size: 1.2em;
  }

  .messageButton {
    margin-bottom: 2em;
    height: 80px;
    font-size: 2em;
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
