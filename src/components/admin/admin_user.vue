<template>
  <div id="admin_user">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">用户信息列表</span>
          </el-col>
          <el-col :span="4" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
            <el-button type="success" style="margin-left: 15px" @click="openAdd">新增用户</el-button>
          </el-col>
        </div>
        <!--新增用户弹出框-->
        <el-dialog title="新增用户" :visible.sync="addFormVisible" width="400px">
          <el-form :model="userForm" status-icon :rules="rules" ref="addUserForm">
            <el-form-item prop="username" label="用户名称" label-width="80px" required>
              <el-input v-model="userForm.username" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" label-width="80px">
              <el-select v-model="userForm.role" multiple collapse-tags filterable placeholder="请选择用户角色">
                <el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
                           :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="password" label="用户密码" label-width="80px" required>
              <el-input v-model="userForm.password" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="rePass" label="确认密码" label-width="80px" required>
              <el-input v-model="userForm.rePass" autocomplete="off" placeholder="请确认密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="签名档" label-width="80px">
              <el-input v-model="userForm.introduce" autocomplete="off" placeholder="写点什么..." type="textarea"
                        :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!--展示用户信息的表格-->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="用户名称" width="160"></el-table-column>
          <el-table-column prop="facePath" label="头像" width="160">
            <template slot-scope="scope">
              <img v-if="scope.row.facePath" :src="scope.row.facePath" class="img-circle"/>
              <img v-else :src="defaultFace" class="img-circle"/>
            </template>
          </el-table-column>
          <el-table-column label="用户等级" width="160">
            <template slot-scope="scope">
              <el-popover placement="right" width="230" trigger="hover">
                <el-table :data="scope.row.roleInfos">
                  <el-table-column width="100" property="roleName" label="角色名称"></el-table-column>
                  <el-table-column width="120" property="roleType" label="角色类型"></el-table-column>
                </el-table>
                <el-tag slot="reference">VIP-{{scope.row.userLevel}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="240"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="240"></el-table-column>
          <el-table-column label="是否启用" width="100">
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.isEnable === '已启用' ? 'success' : 'info'"
                         @click="userStatus(scope.row.isEnable,scope.row.id)">{{scope.row.isEnable}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="用户类型" width="100">
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.userType === '开发者' ? 'success' : 'info'"
                         @click="changeUserType(scope.row.userType,scope.row.id)">{{scope.row.userType}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="introduce" label="备注"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="openUpdate(scope.row)">修改</el-button>
              <!--编辑用户弹出框-->
              <el-dialog title="编辑用户信息" :visible.sync="updateFormVisible" width="400px">
                <el-form :model="userForm">
                  <el-form-item label="用户名称" label-width="80px">
                    <el-input v-model="userForm.username" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="用户头像" label-width="80px">
                    <img v-if="userForm.face" :src="userForm.face" class="img-circle"/>
                    <img v-else :src="defaultFace" class="img-circle"/>
                  </el-form-item>
                  <el-form-item label="用户角色" label-width="80px">
                    <el-select v-model="userForm.role" multiple collapse-tags filterable placeholder="请选择用户角色">
                      <el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
                                 :value="role.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述" label-width="80px">
                    <el-input v-model="userForm.introduce" autocomplete="off" disabled type="textarea"
                              :rows="3"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="updateFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateUser">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="resetPass(scope.row.id)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'admin_user',
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
    var validateRePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码'))
      } else if (value !== this.userForm.password) {
        return callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        username: [{validator: checkName, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        rePass: [{validator: validateRePass, trigger: 'blur'}]
      },
      defaultFace: require('../../assets/face/default.jpg'),
      tableData: [{
        id: 1,
        username: '王小虎',
        facePath: '',
        userAuth: [],
        roleInfos: [{
          id: 1,
          roleName: '王小虎',
          roleType: 'admin'
        }, {
          id: 2,
          roleName: '王大虎',
          roleType: 'guest'
        }],
        userLevel: 1,
        registerTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        introduce: '成功',
        isEnable: '已启用',
        userType: '开发者'
      }],
      addFormVisible: false,
      updateFormVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      roleList: [{
        id: 1,
        roleName: '王小虎',
        roleType: 'admin'
      }, {
        id: 2,
        roleName: '王大虎',
        roleType: 'guest'
      }],
      userForm: {
        id: 1,
        username: '',
        password: '',
        rePass: '',
        face: '',
        role: [],
        level: 1,
        introduce: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.userForm.username = ''
      this.userForm.face = ''
      this.userForm.role = []
      this.userForm.password = ''
      this.userForm.rePass = ''
      this.userForm.level = 0
      this.userForm.introduce = ''
    },
    // 编辑用户只能修改用户的基本信息，但是不能修改密码
    openUpdate (user) {
      this.updateFormVisible = true
      this.userForm.id = user.id
      this.userForm.username = user.username
      this.userForm.password = user.password
      this.userForm.face = user.face
      this.userForm.role = user.userAuth
      this.userForm.level = user.level
      this.userForm.introduce = user.introduce
    },
    userList (pageSize, currentPage) {
      this.$http.get('/ui/user/userList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.total = response.data.total
            this.tableData = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addUser (formName) {
      this.addFormVisible = false
      // 先校验表单参数
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/ui/user/add', this.userForm).then(response => {
            if (response && response.data) {
              if (response.data.code === '0') {
                // 创建用户成功后刷新当前页面，进行重新展示列表
                this.$message.success('添加用户成功')
                this.userList(this.pageSize, this.currentPage)
              } else {
                console.log(response)
                this.$message.error(response.data.msg)
              }
            } else {
              this.$message.error('添加用户异常')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$message.error('请输入正确的用户信息')
        }
        this.$refs[formName].clearValidate()
      })
    },
    updateUser () {
      this.updateFormVisible = false
      this.$http.put('/ui/user/modify/role', this.userForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建用户成功后刷新当前页面，进行重新展示列表
            this.$message.success('用户编辑成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户编辑异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 改变用户状态信息
    userStatus (status, id) {
      let isEnable = 1
      // 如果已经启用，则禁用
      if (status === '已启用') {
        isEnable = 0
      }
      this.$http.put('/ui/user/status/' + id + '/' + isEnable).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 启用用户成功后刷新列表
            this.$message.success('用户状态修改成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户状态修改异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 改变用户类型信息
    changeUserType (type, id) {
      let userType = 'user'
      // 如果已经启用，则禁用
      if (type === '开发者') {
        userType = 'user'
      } else {
        userType = 'programmer'
      }
      this.$http.put('/ui/user/type/' + id + '/' + userType).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 启用用户成功后刷新列表
            this.$message.success('用户状态修改成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户状态修改异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 重置用户密码
    resetPass (id) {
      console.log(id)
      this.$http.put('/ui/user/resetPass/' + id).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 启用用户成功后刷新列表
            this.$message.success('用户密码重置成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户密码重置异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 简单的角色信息列表
    simpleRoleList () {
      this.$http.get('/ui/role/roleList/simple').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.roleList = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('角色查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.userList(this.pageSize, this.currentPage)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.userList(this.pageSize, this.currentPage)
    }
  },
  mounted () {
    this.userList(this.pageSize, this.currentPage)
    this.simpleRoleList()
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 98px;
    width: 98px;
  }
</style>
<style>
  .upload-face .el-upload--picture-card {
    height: 100px;
    width: 100px;
    line-height: 100px;
    border-radius: 50%;
  }
</style>
