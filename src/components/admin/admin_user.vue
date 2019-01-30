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
          <el-form :model="userForm">
            <el-form-item label="用户名称" label-width="80px">
              <el-input v-model="userForm.username" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="用户头像" label-width="80px">
              <el-upload
                class="upload-face"
                action="/ui/user/uploadFace"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="userForm.face" :src="userForm.face" class="img-circle">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户角色" label-width="80px">
              <el-select v-model="userForm.role" multiple collapse-tags filterable placeholder="请选择用户角色">
                <el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
                           :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" label-width="80px">
              <el-input v-model="userForm.mark" autocomplete="off" placeholder="写点什么..." type="textarea"
                        :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
        <!--展示用户信息的表格-->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="用户名称" width="160"></el-table-column>
          <el-table-column prop="face" label="头像" width="160">
            <template slot-scope="scope"><img :src="scope.row.face" class="img-circle"/></template>
          </el-table-column>
          <el-table-column label="用户等级" width="160">
            <template slot-scope="scope">
              <el-popover placement="right" width="230" trigger="hover">
                <el-table :data="scope.row.role">
                  <el-table-column width="100" property="roleName" label="角色名称"></el-table-column>
                  <el-table-column width="120" property="roleType" label="角色类型"></el-table-column>
                </el-table>
                <el-tag slot="reference">VIP-{{scope.row.level}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="创建用户" width="180"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="240"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="240"></el-table-column>
          <el-table-column prop="mark" label="备注"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="openUpdate(scope.row)">修改</el-button>
              <!--编辑用户弹出框-->
              <el-dialog title="新增用户" :visible.sync="updateFormVisible" width="400px">
                <el-form :model="userForm">
                  <el-form-item label="用户名称" label-width="80px">
                    <el-input v-model="userForm.username" autocomplete="off" placeholder="请输入角色名称"></el-input>
                  </el-form-item>
                  <el-form-item label="用户头像" label-width="80px">
                    <el-upload
                      class="upload-face"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-remove="handleRemove"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="userForm.face" :src="userForm.face" class="img-circle">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="用户角色" label-width="80px">
                    <el-select v-model="userForm.role" multiple collapse-tags filterable placeholder="请选择用户角色">
                      <el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
                                 :value="role.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述" label-width="80px">
                    <el-input v-model="userForm.mark" autocomplete="off" placeholder="写点什么..." type="textarea"
                              :rows="3"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="updateFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateUser">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
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
    return {
      tableData: [{
        id: 1,
        username: '王小虎',
        face: require('../../assets/face/face1.jpg'),
        role: [{
          id: 1,
          roleName: '王小虎',
          roleType: 'admin'
        }, {
          id: 2,
          roleName: '王大虎',
          roleType: 'guest'
        }],
        level: 1,
        creator: '我自己',
        registerTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        mark: '成功'
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
        face: '',
        role: [],
        level: 1,
        mark: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.userForm.username = ''
      this.userForm.face = ''
      this.userForm.role = ''
      this.userForm.level = 1
      this.userForm.mark = ''
    },
    openUpdate (user) {
      this.updateFormVisible = true
      this.userForm.id = user.id
      this.userForm.username = user.username
      this.userForm.face = user.face
      this.userForm.role = user.role
      this.userForm.level = user.level
      this.userForm.mark = user.mark
    },
    userList (pageSize, currentPage) {
      this.$http.get('/ui/user/userList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.total = response.data.total
            this.tableData = response.data.data
          } else {
            this.$message.error(response.data)
          }
        } else {
          this.$message.error('用户查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addUser () {
      this.addFormVisible = false
      this.$http.post('/ui/user/add', this.userForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建角色成功后刷新当前页面，进行重新展示列表
            this.$message.success('添加用户成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data)
          }
        } else {
          this.$message.error('添加用户异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateUser () {
      this.updateFormVisible = false
      this.$http.post('/ui/user/modify', this.userForm).then(response => {
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
    deleteUser (userId) {
      this.$http.delete('/ui/user/delete/' + userId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 删除用户成功后刷新列表
            this.$message.success('删除用户成功')
            this.userList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data)
          }
        } else {
          this.$message.error('删除用户异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    simpleRoleList () {
      this.$http.get('/ui/role/roleList/simple').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.roleList = response.data.data
          } else {
            this.$message.error(response.data)
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
    },
    handleAvatarSuccess (res, file) {
      this.userForm.face = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
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
    height: 148px;
    width: 148px;
  }
</style>
<style>
  .upload-face .el-upload--picture-card {
    height: 148px;
    width: 148px;
    line-height: 148px;
    border-radius: 50%;
  }
</style>
