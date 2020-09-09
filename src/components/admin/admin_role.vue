<template>
  <div id="admin_role">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="6">
            <span style="line-height: 40px">角色信息列表</span>
          </el-col>
          <el-col :span="4" :offset="8">
            <el-input placeholder="角色名..."></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
            <el-button type="success" style="margin-left: 15px" @click="openAdd">新增角色</el-button>
          </el-col>
        </div>
        <!--新增角色弹出框-->
        <el-dialog title="新增角色" :visible.sync="addFormVisible" width="400px">
          <el-form :model="roleForm">
            <el-form-item label="角色名称" label-width="80px">
              <el-input v-model="roleForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色类型" label-width="80px">
              <el-input v-model="roleForm.type" autocomplete="off" placeholder="请输入角色类型"></el-input>
            </el-form-item>
            <el-form-item label="权限菜单" label-width="80px">
              <el-select v-model="roleForm.auth" multiple collapse-tags filterable placeholder="请选择有权限的菜单">
                <el-option v-for="menu in menuList" :key="menu.id" :label="menu.menuName"
                           :value="menu.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" label-width="80px">
              <el-input v-model="roleForm.desc" autocomplete="off" placeholder="写点什么..."
                        type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="roleName" label="角色名称" width="160"></el-table-column>
          <el-table-column prop="roleType" label="角色类型" width="160">
            <template slot-scope="scope">
              <el-popover placement="right" width="260" trigger="hover">
                <el-table :data="scope.row.menuInfos">
                  <el-table-column width="100" property="menuName" label="菜单名称"></el-table-column>
                  <el-table-column width="120" property="menuPath" label="菜单路径"></el-table-column>
                </el-table>
                <el-tag slot="reference">{{scope.row.roleType}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="创建用户" width="180"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="240"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="240"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="openUpdate(scope.row)">修改</el-button>
              <!--新增角色弹出框-->
              <el-dialog title="编辑角色" :visible.sync="updateFormVisible" width="400px">
                <el-form :model="roleForm">
                  <el-form-item label="角色名称" label-width="80px">
                    <el-input v-model="roleForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
                  </el-form-item>
                  <el-form-item label="角色类型" label-width="80px">
                    <el-input v-model="roleForm.type" autocomplete="off" placeholder="请输入角色类型"></el-input>
                  </el-form-item>
                  <el-form-item label="权限菜单" label-width="80px">
                    <el-select v-model="roleForm.auth" multiple collapse-tags filterable placeholder="请选择有权限的菜单">
                      <el-option v-for="menu in menuList" :key="menu.id" :label="menu.menuName"
                                 :value="menu.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述" label-width="80px">
                    <el-input v-model="roleForm.desc" autocomplete="off" placeholder="写点什么..."
                              type="textarea" :rows="3"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateRole">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
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
  name: 'admin_role',
  data () {
    return {
      tableData: [{
        id: 1,
        roleName: '王小虎',
        roleType: 'sssss',
        roleAuth: [],
        menuInfos: [{
          id: 1,
          menuName: '主页',
          menuPath: '/home'
        }, {
          id: 2,
          menuName: '管理中心',
          menuPath: '/admin/center'
        }],
        description: '博客',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00'
      }],
      menuList: [{
        id: 1,
        menuName: '主页',
        menuPath: '/home'
      }, {
        id: 2,
        menuName: '管理中心',
        menuPath: '/admin/center'
      }],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      addFormVisible: false,
      updateFormVisible: false,
      roleForm: {
        id: 0,
        name: '',
        type: '',
        auth: [],
        desc: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.roleForm.name = ''
      this.roleForm.type = ''
      this.roleForm.desc = ''
      this.roleForm.auth = []
    },
    openUpdate (role) {
      this.updateFormVisible = true
      this.roleForm.id = role.id
      this.roleForm.name = role.roleName
      this.roleForm.type = role.roleType
      this.roleForm.auth = role.roleAuth
      this.roleForm.desc = role.description
    },
    addRole () {
      this.addFormVisible = false
      this.$http.post('/ui/role/add', this.roleForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建角色成功后刷新当前页面，进行重新展示列表
            this.$message.success('添加角色成功')
            this.roleList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('添加角色异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateRole () {
      this.updateFormVisible = false
      this.$http.put('/ui/role/modify', this.roleForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建角色成功后刷新当前页面，进行重新展示列表
            this.$message.success('角色编辑成功')
            this.roleList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('角色编辑异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteRole (roleId) {
      this.$http.delete('/ui/role/delete/' + roleId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 删除角色成功后刷新列表
            this.$message.success('删除角色成功')
            this.roleList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('删除角色异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    roleList (pageSize, currentPage) {
      this.$http.get('/ui/role/roleList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.total = response.data.total
            this.tableData = response.data.data
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
    // 查询需要配置权限的菜单
    simpleMenuList () {
      this.$http.get('/ui/menu/menuList/auth').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.menuList = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('菜单查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改角色列表的单页大小
    handleSizeChange (val) {
      this.pageSize = val
      // 重新查询菜单信息，刷新列表
      this.roleList(this.pageSize, this.currentPage)
    },
    // 修改当前页码
    handleCurrentChange (val) {
      this.currentPage = val
      // 重新查询菜单信息，刷新列表
      this.roleList(this.pageSize, this.currentPage)
    }
  },
  mounted () {
    this.roleList(this.pageSize, this.currentPage)
    this.simpleMenuList()
  }
}
</script>

<style scoped>
</style>
<style>
  .menuInfos.el-popover.el-popper {
    height: 250px;
    overflow: auto;
  }
</style>
