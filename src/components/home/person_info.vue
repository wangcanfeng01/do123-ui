<template>
  <div id="person_info">
    <div style="margin-top: 30px"></div>
    <el-col :span="12" :offset="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col :offset="6" :span="12">
            <el-upload
              class="upload-person-face"
              :action="'/ui/personal/uploadFace?id='+personBaseInfo.id+'&path='+personBaseInfo.facePath"
              :on-success="uploadFaceSuccessUrl"
              list-type="picture-card"
              :show-file-list="false">
              <img v-if="personBaseInfo.facePath" :src="personBaseInfo.facePath" class="img-circle">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 账户名称：</span>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="请输入账户名称" v-model="personBaseInfo.username" disabled></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 角色等级：</span></el-col>
          <el-col :span="12">
            <el-popover placement="right" width="230" trigger="hover">
              <el-table :data="personBaseInfo.roleInfos">
                <el-table-column width="100" property="roleName" label="角色名称"></el-table-column>
                <el-table-column width="120" property="roleType" label="角色类型"></el-table-column>
              </el-table>
              <el-tag slot="reference">VIP-{{personBaseInfo.userLevel}}</el-tag>
            </el-popover>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 账户密码：</span></el-col>
          <el-col :span="12">
            <el-button type="danger" @click="openPasswordForm">修改密码</el-button>
            <!--修改密码弹出框-->
            <el-dialog title="修改密码" :visible.sync="passwordFormVisible" width="400px">
              <el-form :model="passwordForm" status-icon :rules="rules" ref="changePassForm">
                <el-form-item prop="sourcePass" label="原密码" label-width="80px" required>
                  <el-input v-model="passwordForm.sourcePass" autocomplete="off" placeholder="输入原密码"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="用户密码" label-width="80px" required>
                  <el-input v-model="passwordForm.password" autocomplete="off" placeholder="请输入密码"
                            type="password"></el-input>
                </el-form-item>
                <el-form-item prop="rePass" label="确认密码" label-width="80px" required>
                  <el-input v-model="passwordForm.rePass" autocomplete="off" placeholder="请确认密码"
                            type="password"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUserPassword('changePassForm')">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 个人简介：</span></el-col>
          <el-col :span="12">
            <el-input placeholder="这个人很懒什么也没有..." type="textarea"
                      :rows="4" v-model="personBaseInfo.introduce"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 注册时间：</span></el-col>
          <el-col :span="12">
            <el-tag>{{personBaseInfo.registerTime}}</el-tag>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 个人积分：</span></el-col>
          <el-col :span="12">
            <el-tag>{{personBaseInfo.score}}</el-tag>
          </el-col>
          <el-col :offset="2" :span="5">
            <el-button type="danger" @click="updateUserBase">保存修改</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div style="margin-top: 25px"></div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>详细信息</span>
        </div>
        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 真实姓名：</span></el-col>
          <el-col :span="12">
            <el-input placeholder="请输入真实名称" v-model="personDetail.personName"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 个人标签：</span></el-col>
          <el-col :span="12">
            <el-tag :key="tag.name" v-for="tag in personDetail.tags" closable :disable-transitions="false"
                    @close="handleClose(tag.name)" :type="tag.type" style="margin-right: 5px;margin-bottom: 5px">
              {{tag.name}}
            </el-tag>
            <div style="margin-top: 10px"></div>
            <el-input class="input-new-tag" v-if="tagInputVisible" v-model="tagInputValue" placeholder="添加个人标签..."
                      ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 邮箱地址：</span></el-col>
          <el-col :span="12">
            <el-input placeholder="如12345@qq.com" v-model="personDetail.email"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 工作地区：</span></el-col>
          <el-col :span="12">
            <el-input placeholder="请输入工作地区..." v-model="personDetail.workArea"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 联系电话：</span></el-col>
          <el-col :span="12">
            <el-input placeholder="请输入联系电话..." v-model="personDetail.telephone"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 个人简历：</span></el-col>
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              drag
              :action="'/ui/personal/uploadResume?resume='+personDetail.resume"
              :show-file-list="false"
              :on-success="onUploadFileSuccess">
              <i class="el-icon-upload"></i>
              <i v-if="personDetail.resume">{{personDetail.resume}}</i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;margin-bottom: 50px">
          <el-col :span="3" :offset="2" style="min-width: 90px;line-height: 40px"><span> 思维导图：</span></el-col>
          <el-col :span="12">
            <el-upload
              :action="'/ui/personal/uploadMind?mind='+personDetail.mind"
              :on-success="onUploadMindSuccess"
              list-type="picture-card"
              :show-file-list="false">
              <img v-if="personDetail.mind" :src="personDetail.mind" class="img-mind">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-col>
          <el-col :offset="2" :span="5" style="margin-top: 80px">
            <el-button type="danger" @click="updatePersonDetails">保存修改</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div style="margin-bottom: 50px"></div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'person_info',
  data () {
    var checkSource = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateRePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码'))
      } else if (value !== this.passwordForm.password) {
        return callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      personBaseInfo: {
        id: 50,
        facePath: '',
        userLevel: 1,
        roleInfos: [{
          id: 1,
          roleName: '王小虎',
          roleType: 'admin'
        }, {
          id: 2,
          roleName: '王大虎',
          roleType: 'guest'
        }],
        introduce: '',
        score: 0,
        registerTime: '2018-01-01 12:12:12',
        username: ''
      },
      personDetail: {
        personName: '',
        email: '',
        workArea: '',
        telephone: '',
        mind: '',
        tags: [
          {name: 'jdk源码', type: 'success'},
          {name: 'spring相关', type: 'success'},
          {name: 'JNA', type: 'success'},
          {name: 'scala', type: 'waring'},
          {name: 'spark', type: 'waring'},
          {name: 'hadoop', type: 'waring'},
          {name: 'HBase', type: 'waring'},
          {name: 'vue', type: 'danger'}
        ],
        resume: ''
      },
      passwordForm: {
        sourcePass: '',
        password: '',
        rePass: '',
        id: 1
      },
      tagInputVisible: true,
      tagInputValue: '',
      passwordFormVisible: false,
      rules: {
        sourcePass: [{validator: checkSource, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        rePass: [{validator: validateRePass, trigger: 'blur'}]
      },
      tagTypes: [
        'danger',
        'success',
        'warning',
        'info',
        'primary'
      ]
    }
  },
  methods: {
    openPasswordForm () {
      this.passwordFormVisible = true
      this.passwordForm.id = this.personBaseInfo.id
      this.passwordForm.sourcePass = ''
      this.passwordForm.password = ''
      this.passwordForm.rePass = ''
    },
    uploadFaceSuccessUrl (result) {
      if (result.code === '0') {
        this.$message.success('头像上传成功!')
        // 重新查询人员基础信息
        this.selectPersonBaseInfo(this.personBaseInfo.username)
      } else {
        this.$message.error(result.msg)
      }
    },
    onUploadFileSuccess (result) {
      if (result.code === '0') {
        this.$message.success('简历上传成功!')
        // 重新查询人员基础信息
        this.selectPersonDetailsInfo(this.personBaseInfo.username)
      } else {
        this.$message.error(result.msg)
      }
    },
    onUploadMindSuccess (result) {
      if (result.code === '0') {
        this.$message.success('思维导图上传成功!')
        // 重新查询人员基础信息
        this.selectPersonDetailsInfo(this.personBaseInfo.username)
      } else {
        this.$message.error(result.msg)
      }
    },
    // 删除关键字的标签
    handleClose (tag) {
      this.personDetail.tags.splice(this.personDetail.tags.indexOf(tag), 1)
    },
    // 增加新的关键字
    handleInputConfirm () {
      let inputValue = this.tagInputValue
      let index = Math.floor(Math.random() * 3)
      if (inputValue) {
        let tag = {name: inputValue, type: this.tagTypes[index]}
        this.personDetail.tags.push(tag)
      }
      this.tagInputValue = ''
    },
    selectPersonBaseInfo (username) {
      this.$http.get('/ui/user/userBaseInfo?username=' + username).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.personBaseInfo = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('账户信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateUserBase () {
      this.$http.put('/ui/user/update/userBase', this.personBaseInfo).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('账户信息保存成功')
            this.selectPersonBaseInfo(this.personBaseInfo.username)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('账户信息保存异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateUserPassword (formName) {
      this.passwordFormVisible = false
      // 先校验表单参数
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('/ui/user/updatePass', this.passwordForm).then(response => {
            if (response && response.data) {
              if (response.data.code === '0') {
                this.$message.success('账户密码修改成功')
                this.logout()
              } else {
                this.$message.error(response.data.msg)
              }
            } else {
              this.$message.error('账户密码修改异常')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$message.error('请输入正确账户密码')
        }
        this.$refs[formName].clearValidate()
      })
    },
    logout () {
      this.$http.post('/ui/user/logout').then(response => {
        if (response && response.data && response.data.code === '0') {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    selectPersonDetailsInfo (username) {
      this.$http.get('/ui/personal/details?username=' + username).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.personDetail = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户详情查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updatePersonDetails () {
      this.$http.put('/ui/personal/update/personDetails', this.personDetail).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('用户详情保存成功')
            this.selectPersonDetailsInfo(this.personBaseInfo.username)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户详情保存异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    // 获取路径中的slug参数，并作为查询参数
    let username = this.$route.query.username
    this.selectPersonBaseInfo(username)
    this.selectPersonDetailsInfo(username)
  }
}
</script>

<style scoped>
  .img-circle {
    height: 148px;
    width: 148px;
    border-radius: 50%;
  }
  .img-mind{
    height: 148px;
    width: 148px;
  }
</style>
<style>
  .upload-person-face .el-upload--picture-card {
    height: 148px;
    width: 148px;
    line-height: 148px;
    border-radius: 50%;
  }
</style>
