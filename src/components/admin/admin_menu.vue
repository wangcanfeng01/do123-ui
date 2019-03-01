<template>
  <div id="admin_menu">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">菜单信息列表</span>
          </el-col>
          <el-col :span="4" :offset="8">
            <el-input placeholder="请输入菜单名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
            <el-button type="success" style="margin-left: 15px" @click="openAdd">新增菜单</el-button>
          </el-col>
        </div>
        <!--新增菜单弹出框-->
        <el-dialog title="新增菜单" :visible.sync="addFormVisible" width="400px">
          <el-form :model="menuForm">
            <el-form-item label="菜单名称" label-width="80px">
              <el-input v-model="menuForm.name" autocomplete="off" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单编码" label-width="80px">
              <el-input v-model="menuForm.code" autocomplete="off" placeholder="请输入菜单编码"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径" label-width="80px">
              <el-input v-model="menuForm.path" autocomplete="off" placeholder="请输入菜单路径"></el-input>
            </el-form-item>
            <el-form-item label="菜单层级" label-width="80px">
              <el-select v-model="menuForm.level" placeholder="请选择菜单层级">
                <el-option v-for="(o) in 4" :key="o" :label="o" :value="o"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单类型" label-width="80px">
              <el-switch v-model="menuForm.menuType" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="非空菜单" inactive-text="空菜单" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="权限限制" label-width="80px">
              <el-switch v-model="menuForm.needAuth" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="是" inactive-text="否" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="父菜单" label-width="80px">
              <el-select v-model="menuForm.parent" filterable placeholder="请选择父菜单">
                <el-option v-for="menu in simpleList" :key="menu.id" :label="menu.menuName"
                           :value="menu.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" label-width="80px">
              <el-input v-model="menuForm.mark" autocomplete="off" placeholder="写点什么..."
                        type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddMenu">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="menuName" label="菜单名称" width="120"></el-table-column>
          <el-table-column prop="menuLevel" label="菜单层级" width="80"></el-table-column>
          <el-table-column prop="parentName" label="父菜单" width="120"></el-table-column>
          <el-table-column prop="needAuth" label="权限要求" width="200">
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.needAuth === '是' ? 'success' : 'danger'"
                         @click="changeMenuAuth(scope.row.needAuth,scope.row.id)">{{scope.row.needAuth}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="menuType" label="菜单类型" width="200">
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.menuType === '非空' ? 'success' : 'danger'"
                         @click="changeMenuType(scope.row.menuType,scope.row.id)">{{scope.row.menuType}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="menuPath" label="菜单路径" width="200"></el-table-column>
          <el-table-column prop="mark" label="备注"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="showDetailMenu(scope.row)">详情</el-button>
              <!--菜单详情弹出框-->
              <el-dialog title="菜单详情" :visible.sync="detailFormVisible" width="400px">
                <el-form :model="detailForm">
                  <el-form-item label="菜单名称" label-width="80px">
                    <el-input v-model="detailForm.menuName" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="菜单编码" label-width="80px">
                    <el-input v-model="detailForm.menuCode" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="菜单层级" label-width="80px">
                    <el-input v-model="detailForm.menuLevel" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="创建用户" label-width="80px">
                    <el-input v-model="detailForm.creator" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="父菜单" label-width="80px">
                    <el-input v-model="detailForm.parentName" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="权限要求" label-width="80px">
                    <el-input v-model="detailForm.needAuth" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="菜单类型" label-width="80px">
                    <el-input v-model="detailForm.menuType" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="菜单路径" label-width="80px">
                    <el-input v-model="detailForm.menuPath" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="创建时间" label-width="80px">
                    <el-input v-model="detailForm.createTime" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="修改时间" label-width="80px">
                    <el-input v-model="detailForm.updateTime" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="备注" label-width="80px">
                    <el-input v-model="detailForm.mark" autocomplete="off" disabled></el-input>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button size="mini" type="warning" @click="openUpdateDialog(scope.row)">修改</el-button>
              <!--编辑菜单弹出框-->
              <el-dialog title="编辑菜单" :visible.sync="modifyFormVisible" width="400px">
                <el-form :model="menuForm">
                  <el-form-item label="菜单名称" label-width="80px">
                    <el-input v-model="menuForm.name" autocomplete="off" placeholder="请输入菜单名称"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单编码" label-width="80px">
                    <el-input v-model="menuForm.code" autocomplete="off" placeholder="请输入菜单编码"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单路径" label-width="80px">
                    <el-input v-model="menuForm.path" autocomplete="off" placeholder="请输入菜单路径"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单层级" label-width="80px">
                    <el-select v-model="menuForm.level" placeholder="请选择菜单层级">
                      <el-option v-for="(o) in 4" :key="o" :label="o" :value="o"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="父菜单" label-width="80px">
                    <el-select v-model="menuForm.parent" filterable placeholder="请选择父菜单">
                      <el-option v-for="menu in simpleList" :key="menu.id" :label="menu.menuName"
                                 :value="menu.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注" label-width="80px">
                    <el-input v-model="menuForm.mark" autocomplete="off" placeholder="写点什么..."
                              type="textarea" :rows="3"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="modifyFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateMenu">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="deleteMenu(scope.row.id)">删除</el-button>
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
  name: 'admin_menu',
  data () {
    return {
      tableData: [{
        id: '',
        menuName: '1',
        menuCode: '菜单编码',
        menuLevel: 2,
        creator: '3',
        parentName: '测试',
        menuPath: '4',
        menuType: '',
        needAuth: '',
        createTime: '5',
        updateTime: '6',
        mark: ''
      }],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      addFormVisible: false,
      modifyFormVisible: false,
      detailFormVisible: false,
      menuForm: {
        id: null,
        name: '',
        code: '',
        level: null,
        path: '',
        mark: '',
        parent: null,
        needAuth: 0,
        menuType: 0
      },
      simpleList: [{
        id: 1,
        menuName: '主页',
        menuPath: '/home'
      }, {
        id: 2,
        menuName: '管理中心',
        menuPath: '/admin/center'
      }],
      detailForm: {
        menuName: '1',
        menuCode: '菜单编码',
        menuLevel: 2,
        creator: '3',
        parentName: '测试',
        menuPath: '4',
        menuType: '',
        needAuth: '',
        createTime: '5',
        updateTime: '6',
        mark: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.menuForm.name = ''
      this.menuForm.code = ''
      this.menuForm.path = ''
      this.menuForm.level = null
      this.menuForm.mark = ''
      this.menuForm.parent = null
      this.menuForm.needAuth = 0
      this.menuForm.menuType = 0
    },
    openUpdateDialog (menu) {
      this.modifyFormVisible = true
      this.menuForm.id = menu.id
      this.menuForm.name = menu.menuName
      this.menuForm.code = menu.menuCode
      this.menuForm.path = menu.menuPath
      this.menuForm.level = menu.menuLevel
      this.menuForm.mark = menu.mark
      this.menuForm.parent = menu.parentNode
    },
    showDetailMenu (menu) {
      this.detailForm.menuName = menu.menuName
      this.detailForm.menuCode = menu.menuCode
      this.detailForm.menuLevel = menu.menuLevel
      this.detailForm.creator = menu.creator
      this.detailForm.menuPath = menu.menuPath
      this.detailForm.menuType = menu.menuType
      this.detailForm.needAuth = menu.needAuth
      this.detailForm.createTime = menu.createTime
      this.detailForm.updateTime = menu.updateTime
      this.detailForm.parentName = menu.parentName
      this.detailForm.mark = menu.mark
      this.detailFormVisible = true
    },
    handleAddMenu () {
      this.addFormVisible = false
      this.$http.post('/ui/menu/add', this.menuForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建菜单成功后刷新当前页面，进行重新展示列表
            this.$message.success('添加菜单成功')
            this.menuList(this.pageSize, this.currentPage)
            this.simpleMenuList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('添加菜单异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 初始化加载菜单列表信息
    menuList (pageSize, currentPage) {
      this.$http.get('/ui/menu/menuList?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.total = response.data.total
            this.tableData = response.data.data
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
    simpleMenuList () {
      this.$http.get('/ui/menu/menuList/simple').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.simpleList = response.data.data
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
    deleteMenu (menuId) {
      this.$http.delete('/ui/menu/delete/' + menuId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 删除菜单成功后刷新列表
            this.$message.success('删除菜单成功')
            this.menuList(this.pageSize, this.currentPage)
            this.simpleMenuList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('删除菜单异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateMenu () {
      this.modifyFormVisible = false
      this.$http.put('/ui/menu/modify', this.menuForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建菜单成功后刷新当前页面，进行重新展示列表
            this.menuList(this.pageSize, this.currentPage)
            this.simpleMenuList()
            this.$message.success('菜单编辑成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('菜单编辑异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeMenuAuth (needAuth, id) {
      let menuAuth
      if (needAuth === '是') {
        menuAuth = 0
      } else {
        menuAuth = 1
      }
      this.$http.put('/ui/menu/auth?id=' + id + '&auth=' + menuAuth).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 修改菜单后刷新列表
            this.menuList(this.pageSize, this.currentPage)
            this.$message.success('权限修改成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('权限修改异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeMenuType (type, id) {
      let menuType
      if (type === '非空') {
        menuType = 0
      } else {
        menuType = 1
      }
      this.$http.put('/ui/menu/type?id=' + id + '&type=' + menuType).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 修改菜单后刷新列表
            this.menuList(this.pageSize, this.currentPage)
            this.$message.success('菜单类型修改成功')
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('菜单类型修改异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改菜单查询的分页大小
    handleSizeChange (val) {
      this.pageSize = val
      // 重新查询菜单信息，刷新列表
      this.menuList(this.pageSize, this.currentPage)
    },
    // 更新当前页码
    handleCurrentChange (val) {
      this.currentPage = val
      // 重新查询菜单信息，刷新列表
      this.menuList(this.pageSize, this.currentPage)
    }
  },
  // 初始化加载菜单列表
  mounted () {
    this.menuList(this.pageSize, this.currentPage)
    this.simpleMenuList()
  }
}
</script>

<style scoped>

</style>
