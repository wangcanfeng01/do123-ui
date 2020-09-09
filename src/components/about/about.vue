<template>
  <div id="about_center">
    <el-container>
      <el-header class="about_header">
        <span>开发人员与版本信息</span>
      </el-header>
      <el-container>
        <el-main class="about_main">
          <el-tabs :tab-position="tabPosition" class="tab_all" @tab-click="tabChange">
            <el-tab-pane :key="programmer.id" v-for="programmer in programmers" :label="programmer.personName">
              <el-container>
                <el-aside width="20%" class="tab_left">
                  <img :src="programmer.facePath" class="person_img"/>
                  <el-card style="width: 80%;margin-left: 10%">
                    <div slot="header" class="clearfix" style="text-align: center">
                      <span>基本信息</span>
                    </div>
                    <div><span>姓名：{{programmer.personName}}</span></div>
                    <div style="margin-top: 10px"><span>邮箱：{{programmer.email}}</span></div>
                    <div style="margin-top: 10px"><span>工作区域：{{programmer.workArea}}</span></div>
                    <div style="margin-top: 10px"><span>联系方式：{{programmer.telephone}}</span></div>
                    <div style="margin-top: 10px">
                      <el-button v-if="programmer.mind" @click="openPic(programmer.mind)"
                                 size="middle" type="text">{{'思维导图:'+programmer.mind}}
                      </el-button>
                    </div>
                    <div style="margin-top: -5px">
                      <el-button v-if="programmer.resume" @click="readResume(programmer.resume)"
                                 size="middle" type="text">{{'个人简历:'+programmer.resume}}
                      </el-button>
                    </div>
                  </el-card>
                  <el-card style="width: 80%;margin-left: 10%;margin-top: 20px">
                    <div slot="header" class="clearfix" style="text-align: center">
                      <span>技能</span>
                    </div>
                    <div v-if="programmer.tags.length!==0">
                      <el-tag v-for="tag in programmer.tags" :key="tag.name"
                              :type="tag.type" style="margin-right: 5px;margin-bottom: 5px">
                        {{tag.name}}
                      </el-tag>
                    </div>
                    <div v-else>
                      <el-tag type="danger">暂无标签</el-tag>
                    </div>
                  </el-card>
                </el-aside>
                <el-aside width="80%" class="tab_main">
                  <div style="margin-left: 20px;margin-top: 20px">
                    <div style="text-align: right;margin-right: 40px">
                      <el-button icon="el-icon-plus" circle title="增加版本信息" type="success"
                                 @click="openAddForm"></el-button>
                      <el-button icon="el-icon-sort" circle :title="versionOrder" @click="changeOrder"></el-button>
                    </div>
                    <el-col :offset="1" :span="20">
                      <el-card v-for="version in versionList" :key="version.id"
                               style="border-radius: 12px;margin-bottom: 20px">
                        <h4>{{'版本'+version.version}}</h4>
                        <pre class="version-info">{{version.description}}</pre>
                        <div style="text-align: right;margin-right: 40px">
                          <span class="version-time">{{ '发布时间：'+version.publishTime }}</span>
                          <el-button type="primary" icon="el-icon-edit" circle style="margin-left: 40px"
                                     title="修改版本信息" @click="openModifyForm(version)"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle title="删除版本信息"
                                     @click="deleteVersionInfo(version.id)"></el-button>
                        </div>
                      </el-card>
                    </el-col>
                    <!--修改版本信息弹出框-->
                    <el-dialog title="编辑版本信息" :visible.sync="modifyFormVisible" width="500px">
                      <el-form :model="versionForm">
                        <el-form-item label="专题名称" label-width="80px">
                          <el-input v-model="versionForm.version" autocomplete="off" placeholder="请输入版本号"></el-input>
                        </el-form-item>
                        <el-form-item label="版本内容" label-width="80px">
                          <el-input v-model="versionForm.description" autocomplete="off" placeholder="写点什么..."
                                    type="textarea" :rows="5"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="modifyFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="modifyVersionInfo">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </el-aside>
              </el-container>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-footer class="about_footer">Footer</el-footer>
      </el-container>
      <!--增加版本信息弹出框-->
      <el-dialog title="添加版本信息" :visible.sync="addFormVisible" width="500px">
        <el-form :model="versionForm">
          <el-form-item label="专题名称" label-width="80px">
            <el-input v-model="versionForm.version" autocomplete="off" placeholder="请输入版本号"></el-input>
          </el-form-item>
          <el-form-item label="版本内容" label-width="80px">
            <el-input v-model="versionForm.description" autocomplete="off" placeholder="写点什么..."
                      type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addVersionInfo">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'about_center',
  data () {
    return {
      tabPosition: 'left',
      currentUsername: '',
      programmers: [{
        id: 1,
        facePath: '',
        personName: '王灿锋',
        username: 'wcf',
        email: '373811598@qq.com',
        workArea: '杭州',
        telephone: '18768147151',
        mind: '/about/mind',
        tags: [
          {name: 'jdk源码', type: 'success'},
          {name: 'spring相关', type: 'success'},
          {name: 'JNA', type: 'success'},
          {name: 'spark', type: 'waring'},
          {name: 'hadoop', type: 'waring'},
          {name: 'HBase', type: 'waring'},
          {name: 'scala', type: 'waring'},
          {name: 'vue', type: 'danger'}
        ],
        resume: ''
      }],
      versionOrder: '正序',
      orderType: -1,
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
    tabChange (tab, event) {
      let personName = tab.label
      this.programmers.forEach((item) => {
        if (personName === item.personName) {
          this.currentUsername = item.username
        }
      })
      this.selectVersionList(this.orderType)
    },
    // 改变版本信息的排序方式
    changeOrder () {
      if (this.versionOrder === '正序') {
        this.versionOrder = '倒序'
        this.orderType = -1
        this.selectVersionList(this.orderType)
      } else {
        this.orderType = 1
        this.versionOrder = '正序'
        this.selectVersionList(this.orderType)
      }
    },
    openAddForm () {
      this.addFormVisible = true
      this.versionForm.id = null
      this.versionForm.version = ''
      this.versionForm.description = ''
    },
    openModifyForm (version) {
      this.versionForm.id = version.id
      this.versionForm.version = version.version
      this.versionForm.description = version.description
      this.modifyFormVisible = true
    },
    selectPersonDetails () {
      this.$http.get('/ui/about/personDetails').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.programmers = response.data.data
            this.currentUsername = this.programmers[0].username
            this.selectVersionList(this.orderType)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('开发者信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addVersionInfo () {
      this.$http.post('/ui/about/add/version', this.versionForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('添加版本信息成功')
            this.selectVersionList(this.orderType)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('版本信息插入异常')
        }
      }).catch(error => {
        console.log(error)
      })
      this.addFormVisible = false
    },
    modifyVersionInfo () {
      this.$http.put('/ui/about/modify/version', this.versionForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('版本信息修改成功')
            this.selectVersionList(this.orderType)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('版本信息修改异常')
        }
      }).catch(error => {
        console.log(error)
      })
      this.modifyFormVisible = false
    },
    selectVersionList (order) {
      let username = encodeURIComponent(this.currentUsername)
      this.$http.get('/ui/about/versionList?order=' + order + '&author=' + username).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.versionList = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('版本信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    readResume (resume) {
      let data = this.$router.resolve({path: '/readPDF', query: {'fileName': resume}})
      window.open(data.href, '_blank')
    },
    openPic (mind) {
      let data = this.$router.resolve({path: '/upload/files/' + mind})
      window.open(data.href, '_blank')
    },
    deleteVersionInfo (id) {
      this.$confirm('确认删除该版本信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$http.delete('/ui/about/version/delete/' + id).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.selectVersionList(this.orderType)
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('删除版本信息异常')
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background:url(' + require('../../assets/bg/loginbg.png') + ');background-size: cover;')
    this.selectPersonDetails()
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
    border-radius: 50%;
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
