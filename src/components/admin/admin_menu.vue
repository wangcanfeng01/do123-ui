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
            <el-form-item label="菜单路径" label-width="80px">
              <el-input v-model="menuForm.path" autocomplete="off" placeholder="请输入菜单路径"></el-input>
            </el-form-item>
            <el-form-item label="菜单层级" label-width="80px">
              <el-select v-model="menuForm.level" placeholder="请选择菜单层级">
                <el-option v-for="(o) in 4" :key="o" :label="o" :value="o"></el-option>
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
          <el-table-column prop="menuLevel" label="菜单层级" width="100"></el-table-column>
          <el-table-column prop="creator" label="创建用户" width="120"></el-table-column>
          <el-table-column prop="menuPath" label="菜单路径" width="200"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
          <el-table-column prop="mark" label="备注"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="openUpdateDialog(scope.row)">修改</el-button>
              <!--编辑菜单弹出框-->
              <el-dialog title="编辑菜单" :visible.sync="modifyFormVisible" width="400px">
                <el-form :model="menuForm">
                  <el-form-item label="菜单名称" label-width="80px">
                    <el-input v-model="menuForm.name" autocomplete="off" placeholder="请输入菜单名称"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单路径" label-width="80px">
                    <el-input v-model="menuForm.path" autocomplete="off" placeholder="请输入菜单路径"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单层级" label-width="80px">
                    <el-select v-model="menuForm.level" placeholder="请选择菜单层级">
                      <el-option v-for="(o) in 4" :key="o" :label="o" :value="o"></el-option>
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
        menuLevel: 2,
        creator: '3',
        menuPath: '4',
        createTime: '5',
        updateTime: '6',
        mark: ''
      }],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      addFormVisible: false,
      modifyFormVisible: false,
      menuForm: {
        id: '',
        name: '',
        level: '',
        path: '',
        mark: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.menuForm.name = ''
      this.menuForm.path = ''
      this.menuForm.level = null
      this.menuForm.mark = ''
    },
    handleAddMenu () {
      this.addFormVisible = false
      this.$http.post('/ui/menu/add', this.menuForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建菜单成功后刷新当前页面，进行重新展示列表
            this.$message({
              message: '添加菜单成功',
              type: 'success'
            })
            this.menuList(this.pageSize, this.currentPage)
          } else {
            this.$message.error(response.data)
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
            this.$message.error(response.data)
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
          } else {
            this.$message.error(response.data)
          }
        } else {
          this.$message.error('删除菜单异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    openUpdateDialog (menu) {
      this.modifyFormVisible = true
      this.menuForm.id = menu.id
      this.menuForm.name = menu.menuName
      this.menuForm.path = menu.menuPath
      this.menuForm.level = menu.menuLevel
      this.menuForm.mark = menu.mark
    },
    updateMenu () {
      this.modifyFormVisible = false
      this.$http.post('/ui/menu/modify', this.menuForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建菜单成功后刷新当前页面，进行重新展示列表
            this.menuList(this.pageSize, this.currentPage)
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
  }
}
</script>

<style scoped>

</style>
