<template>
  <div id="register">
    <el-col :span="5" :offset="10" style="margin-top: 5em">
      <el-container>
        <el-header class="registerHeader" :style="registerHeader">账户注册</el-header>
        <el-main>
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm">
            <el-col :span="20" :offset="2">
              <el-form-item prop="username" class="registerInput" style="margin-top: 30px">
                <el-input type="username" placeholder="请输入用户名" v-model="registerForm.username" autocomplete="off">
                  <template slot="prepend">
                    <font-awesome-icon icon="user"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="password" class="registerInput" style="margin-top: 15px">
                <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" autocomplete="off">
                  <template slot="prepend">
                    <font-awesome-icon icon="lock"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="repassword" class="registerInput" style="margin-top: 15px">
                <el-input type="password" placeholder="确认密码" v-model="registerForm.repassword" autocomplete="off">
                  <template slot="prepend">
                    <font-awesome-icon icon="lock"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item style="margin-top: 25px">
                <el-row>
                  <el-button type="primary" @click="submitForm('registerForm')" class="registerButton">完成注册</el-button>
                </el-row>
              </el-form-item>
            </el-col>
          </el-form>
        </el-main>
      </el-container>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      callback()
    }
    var rePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码'))
      } else if (value !== this.registerForm.password) {
        return callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [{validator: checkName, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        repassword: [{validator: rePass, trigger: 'blur'}]
      },
      registerHeader: {
        background: 'url(' + require('../../assets/bg/loginbg2.png') + ')',
        color: '#333',
        textAlign: 'left',
        lineHeight: '60px',
        borderTopLeftRadius: '9px',
        borderTopRightRadius: '9px',
        height: '6em'
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let username = encodeURIComponent(this.registerForm.username)
          let password = encodeURIComponent(this.registerForm.password)
          this.$http.post('ui/user/register?username=' + username + '&password=' + password).then(response => {
            if (response && response.data) {
              if (response.data.code === '0') {
                // 注册成功跳转到登陆页面
                setTimeout(function () {
                  window.location.href = '/login'
                }, 1000)
                this.$message.success('注册成功')
              } else {
                this.$message.error(response.data.msg)
              }
            } else {
              this.$message.error('注册失败，请联系管理员')
            }
          })
        } else {
          this.$message.error('请输入正确的信息后再进行注册')
          return false
        }
      })
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
  .el-main {
    background-color: #fefefe;
    color: #333;
    text-align: center;
    line-height: 60px;
    line-height: 60px;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
  }

  .registerButton {
    width: 80%;
    margin: auto;
    height: 45px;
    display: block;
    margin: 0 auto;
  }

  .el-input__inner {
    height: 100px !important;
  }
</style>

<style>
  .registerInput input.el-input__inner {
    height: 50px !important;
  }
</style>
<style>
  .registerInput input.el-input__inner {
    height: 50px !important;
  }
</style>
