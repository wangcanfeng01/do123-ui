<template>
  <div id="home">
    <el-carousel :interval="4000" height="700px" :type="isCard">
      <el-carousel-item v-for="(img,item) in items" :key="item">
        <img class="home_img" v-bind:src="img.url"/>
        <h2>{{ img.title }}</h2>
      </el-carousel-item>
    </el-carousel>
    <div class="home_line" style="width: 70%;left: 15%">
      <h1 class="line_font">非常有趣的小站</h1>
    </div>
    <el-col :span="16" :offset="4">
      <el-container>
        <el-aside width="40%">
          <div style="position: relative;width: 430px;float: right">
            <div style="position:absolute;">
              <img src="../../assets/home/blog.jpg" style="width: 350px;height: 350px;margin-left: 5em"/>
            </div>
            <div class="left_icon">
              <router-link to="/blog" class="icon_link">
                <font-awesome-icon icon="book"/>
              </router-link>
            </div>
          </div>
        </el-aside>
        <el-aside width="60%">
          <div class="font_right">
            <h3>博客分享</h3>
            <p>（1）在网络上收获了无数知识，因此在自己获得帮助的同时，反馈社会</p>
            <p>（2）写博客可以记录自己当前所学，方便回顾 ，利人利己</p>
          </div>
        </el-aside>
      </el-container>
      <el-container>
        <el-aside width="60%">
          <div class="font_left">
            <h3>视频搜索</h3>
            <p>（1）通过机器学习算法，智能推荐用户平时浏览量最高的视频</p>
            <p>（2）提供智能搜索方法，方便中老年用户查找视频</p>
          </div>
        </el-aside>
        <el-aside width="40%">
          <div style="position: relative;">
            <div style="position:absolute;">
              <img src="../../assets/home/video.jpg" style="width: 350px;height: 350px"/>
            </div>
            <div class="right_icon">
              <router-link to="/video" class="icon_link">
                <font-awesome-icon icon="play-circle"/>
              </router-link>
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-col>
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
        return callback(new Error('请输入邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      isCard: document.body.clientWidth > 450 ? 'card' : '',
      items: [
        {
          title: '写好代码才能玩好游戏',
          url: require('../../assets/home/home.jpg')
        },
        {
          title: '这个网站没有访问量？',
          url: require('../../assets/home/girl.jpg')
        },
        {
          title: '我的代码就是没有bug',
          url: require('../../assets/home/lion.jpg')
        },
        {
          title: '上回买的手柄都有灰了，还不拿出来用用？',
          url: require('../../assets/home/night.jpg')
        },
        {
          title: '每天都要进步一点点，咸鱼也能翻身的',
          url: require('../../assets/home/mount.jpg')
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
          this.$http.post('ui/messages/leave', this.messageForm).then(response => {
            if (response && response.data) {
              if (response.data.code === '0') {
                this.$message.success('留言成功')
                this.messageForm.address = ''
                this.messageForm.username = ''
                this.messageForm.info = ''
              } else {
                this.$message.error(response.data.msg)
              }
            } else {
              this.$message.error('请输入用户名和邮箱信息')
            }
          })
        } else {
          this.$message.error('请输入用户名和邮箱信息')
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
    height: 750px;
    width: 100%;
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
    height: 256px;
    margin-top: 100px;
    margin-left: 20px;
  }

  .font_left {
    text-align: right;
    height: 256px;
    margin-top: 100px;
    margin-right: 20px;
  }

  .left_icon {
    position: absolute;
    font-size: 6em;
    z-index: 1;
    margin-top: 1.1em;
    left: 2.3em
  }

  .right_icon {
    position: absolute;
    font-size: 6em;
    z-index: 1;
    margin-top: 1.1em;
    left: 1.3em
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
