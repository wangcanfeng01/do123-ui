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
            <el-button type="success" style="margin-left: 15px" @click="addFormVisible = true">新增角色</el-button>
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
              <el-select v-model="roleForm.auth" placeholder="请选择有权限的菜单">
                <el-option label="菜单1" value="shanghai"></el-option>
                <el-option label="菜单2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" label-width="80px">
              <el-input v-model="roleForm.desc" autocomplete="off" placeholder="写点什么..."
                        type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
          <el-table-column prop="roleType" label="角色类型" width="120">
            <template slot-scope="scope">
              <el-popover placement="right" width="230" trigger="hover">
                <el-table :data="scope.row.roleAuth">
                  <el-table-column width="100" property="menuName" label="菜单名称"></el-table-column>
                  <el-table-column width="120" property="menuPath" label="菜单路径"></el-table-column>
                </el-table>
                <el-tag slot="reference">{{scope.row.roleType}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="创建用户" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning" @click="updateComment">修改
              </el-button>
              <el-button
                size="mini"
                type="danger" @click="deleteComment">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100">
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
        roleName: '王小虎',
        roleType: 'sssss',
        roleAuth: [{
          menuName: '1',
          menuPath: '323'
        }, {
          menuName: '2',
          menuPath: '424'
        }],
        description: '博客',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00'

      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }],
      currentPage: 1,
      addFormVisible: false,
      roleForm: {
        id: '',
        name: '',
        type: '',
        auth: '',
        desc: ''
      }
    }
  },
  methods: {
    menuList (pageSize, currentPage) {
      console.log(pageSize)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    updateComment (role) {
      this.roleForm.id = role.id
      this.roleForm.name = role.id
      this.roleForm.id = role.id
      this.roleForm.id = role.id
      this.roleForm.id = role.id
    },
    deleteComment () {
      console.log('ss')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
