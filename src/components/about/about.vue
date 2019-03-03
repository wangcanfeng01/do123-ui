<template>
  <div id="about">
    <el-container>
      <el-header class="about_header">
        <span>开发人员与版本信息</span>
      </el-header>
      <el-container>
        <el-main class="about_main">
          <el-tabs :tab-position="tabPosition" class="tab_all">
            <el-tab-pane label="王灿锋">
              <el-container>
                <el-aside width="20%" class="tab_left">
                  <img src="../../assets/face/wcf.jpg" class="person_img"/>
                  <el-card style="width: 80%;margin-left: 10%">
                    <div slot="header" class="clearfix" style="text-align: center">
                      <span>基本信息</span>
                    </div>
                    <div><span>姓名：{{personInfo.username}}</span></div>
                    <div><span>邮箱：{{personInfo.email}}</span></div>
                    <div><span>工作区域：{{personInfo.workArea}}</span></div>
                    <div><span>联系方式：{{personInfo.telephone}}</span></div>
                    <div>
                      <router-link :to="personInfo.mind">思维导图</router-link>
                    </div>
                  </el-card>
                  <el-card style="width: 80%;margin-left: 10%;margin-top: 20px">
                    <div slot="header" class="clearfix" style="text-align: center">
                      <span>技能</span>
                    </div>
                    <el-tag v-for="tag in personInfo.tags" :key="tag.name" :type="tag.type">{{tag.name}}</el-tag>
                  </el-card>
                </el-aside>
                <el-aside width="80%" class="tab_main">
                  <div style="margin-left: 20px;margin-top: 20px">
                    <div style="text-align: right;margin-right: 40px">
                      <el-button icon="el-icon-plus" circle title="增加版本信息" type="success"
                                 @click="addVersionInfo"></el-button>
                      <el-button icon="el-icon-sort" circle :title="versionOrder" @click="changeOrder"></el-button>
                    </div>
                    <el-col :offset="1" :span="18">
                      <el-card v-for="version in versionList" :key="version.id"
                               style="border-radius: 12px;margin-bottom: 20px">
                        <h4>{{'版本'+version.version}}</h4>
                        <pre class="version-info">{{version.description}}</pre>
                        <div style="text-align: right;margin-right: 40px">
                          <span class="version-time">{{ '发布时间：'+version.publishTime }}</span>
                          <el-button type="primary" icon="el-icon-edit" circle style="margin-left: 40px"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </div>
                      </el-card>
                    </el-col>
                  </div>
                </el-aside>
              </el-container>
            </el-tab-pane>
            <el-tab-pane label="。。。">
              <el-container>待加入</el-container>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-footer class="about_footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      activeIndex: 'first',
      tabPosition: 'left',
      personInfo: {
        username: '王灿锋',
        email: '373811598@qq.com',
        workArea: '杭州',
        telephone: '18768147151',
        mind: '/about/mind',
        tags: [
          {name: 'jdk源码', type: 'success'},
          {name: 'spring相关', type: 'success'},
          {name: 'JNA', type: 'success'},
          {name: 'scala', type: 'waring'},
          {name: 'spark', type: 'waring'},
          {name: 'hadoop', type: 'waring'},
          {name: 'HBase', type: 'waring'},
          {name: 'scala', type: 'waring'},
          {name: 'vue', type: 'danger'}
        ]
      },
      versionOrder: '正序',
      versionList: [{
        id: 1,
        version: '1.0.0',
        publishTime: '2019-01-01 12:12:12',
        description: '（1）修改版本信息展示模块\n' +
          '（2）增加版本信息描述表\n' +
          '（3）删除文章漏洞修补\n' +
          '（4）开放博客的后台监控中心\n' +
          '（5）增加博客中的文字统计，点击数统计，评论统计，分类信息， 以及展示日志信息和各类文章排行信息',
        author: 'ssss',
        modifyTime: '2019-01-01 12:12:12'
      }],
      addFormVisible: false,
      modifyFormVisible: false,
      versionForm: {
        id: 1,
        version: '',
        description: ''
      }
    }
  },
  methods: {
    // 改变版本信息的排序方式
    changeOrder () {
      if (this.versionOrder === '正序') {
        this.versionOrder = '倒序'
        this.selectVersionList(-1)
      } else {
        this.versionOrder = '正序'
        this.selectVersionList(1)
      }
    },
    openAddForm (version) {
      this.versionForm.id = null
      this.versionForm.version = ''
      this.versionForm.description = ''
      this.addFormVisible = true
    },
    addVersionInfo () {
    },
    selectVersionList (order) {
    }
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background:url(' + require('../../assets/bg/loginbg.png') + ');background-size: cover;')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style scoped>
  .about_header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .tab_all {
    min-height: 700px;
  }

  .tab_left {
    background-color: #D3DCE6;
    color: #333;
    height: 750px;
  }

  .tab_main {
    background-color: #FFFFFF;
    padding-left: 0px;
    height: 750px;
    overflow: auto;
  }

  .person_img {
    margin-top: 20px;
    width: 50%;
    /*height: 200px;*/
    margin-left: 25%;
    margin-bottom: 20px;
  }

  .about_main {
    background-color: #E9EEF3;
    color: #333;
    min-height: 700px;
  }

  .version-info {
    background-color: hsla(0, 0%, 71%, .1);
    border-radius: 10px;
    padding: 15px;
    font-family: "Arial";
  }

  .version-time {
    color: #5e5d60;
    font-family: "Arial";
    font-size: 13px;
    margin-right: 4px;
    padding-right: 12px;
  }

  .about_footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .tab_main::-webkit-scrollbar { /*滚动条整体样式*/
    width: 15px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .tab_main::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%,
    transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%,
    rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  }

  .tab_main::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
</style>
