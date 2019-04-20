<template>
  <div id="login">
    <el-col :span="5" :offset="formOffset" style="margin-top: 5em;min-width: 400px">
      <el-container v-loading="loading" element-loading-text="拼命登录中，就几秒钟"
                    element-loading-spinner="el-icon-loading">
        <el-header class="loginHeader" :style="loginHeader">账户登录</el-header>
        <el-main>
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
            <el-col :span="20" :offset="2">
              <el-form-item prop="username" class="loginInput" style="margin-top: 30px">
                <el-input type="username" placeholder="请输入用户名" v-model="loginForm.username" autocomplete="off">
                  <template slot="prepend">
                    <font-awesome-icon icon="user"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="password" class="loginInput" style="margin-top: 15px">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off">
                  <template slot="prepend">
                    <font-awesome-icon icon="lock"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-checkbox label="15天内免登录" name="type"></el-checkbox>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item style="margin-top: 25px">
                <el-row>
                  <el-col :span="16" :offset="4">
                    <el-button-group>
                      <el-button type="primary" @click="userLogin('loginForm')" class="loginButton">登录</el-button>
                      <el-button type="warning" @click="visitorLogin" class="visitorButton">游客</el-button>
                    </el-button-group>
                  </el-col>
                </el-row>
                <el-row>
                  <span><i class="el-icon-warning" style="color: #E6A23C"></i>
                    免账号
                    <a @click="visitorLogin" class="visitor-link">游客登录</a>
                    或者<router-link id="register" to="/register" class="register">注册新账号</router-link></span>
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
  name: 'login',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      formOffset: document.body.clientWidth > 450 ? 10 : 1,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{validator: checkName, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}]
      },
      loginHeader: {
        background: 'url(' + require('../../assets/bg/loginbg2.png') + ')',
        color: '#333',
        textAlign: 'left',
        lineHeight: '60px',
        borderTopLeftRadius: '9px',
        borderTopRightRadius: '9px',
        height: '6em'
      },
      isVisitor: false,
      loading: false
    }
  },
  methods: {
    userLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginRequest(this.loginForm.username, this.loginForm.password)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginRequest (name, pwd) {
      localStorage.removeItem('user')
      let username = encodeURIComponent(name)
      let password = encodeURIComponent(pwd)
      this.loading = true
      this.$http.post('/ui/user/login?username=' + username + '&password=' + password).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$emit('listenLogin', 'true')
            // // 跳转到登录成功的路径上
            localStorage.setItem('user', this.loginForm.username)
            if (this.$route.query.redirect) {
              let redirect = this.$route.query.redirect
              window.location.href = redirect
            } else {
              window.location.href = response.data.data
            }
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户名或密码输入错误')
        }
      })
    },
    visitorLogin () {
      this.loginRequest('游客', 'visitor')
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
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
  }

  .register {
    text-decoration: none;
    color: #2e87ff;
    margin-top: 5px;
  }

  .register:hover {
    text-decoration: underline;
  }

  .loginButton {
    width: 50%;
    margin: 0 auto;
    height: 45px;
    display: block;
    min-width: 100px;
  }

  .visitorButton {
    width: 50%;
    margin: 0 auto;
    height: 45px;
    isplay: block;
    min-width: 100px;
  }

  .visitor-link {
    color: #E6A23C;
  }

  .visitor-link:hover {
    color: coral;
    cursor: pointer;
  }
</style>
<style>
  .loginInput input.el-input__inner {
    height: 50px !important;
  }
  .el-loading-spinner {
    font-size: 3em;
  }
  .el-loading-spinner .el-loading-text {
    color: #409EFF;
    margin: 3px 0;
    font-size: 0.5em;
  }
</style>
