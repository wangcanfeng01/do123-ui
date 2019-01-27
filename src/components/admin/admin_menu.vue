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
            <el-button type="success" style="margin-left: 15px" @click="dialogFormVisible = true">新增菜单</el-button>
          </el-col>
        </div>
        <!--新增菜单弹出框-->
        <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" width="400px">
          <el-form :model="menuForm">
            <el-form-item label="菜单名称" label-width="80px">
              <el-input v-model="menuForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径" label-width="80px">
              <el-input v-model="menuForm.path" autocomplete="off" placeholder="请输入角色类型"></el-input>
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
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddMenu">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="menuName" label="菜单名称" width="120"></el-table-column>
          <el-table-column prop="menuLevel" label="菜单层级" width="100"></el-table-column>
          <el-table-column prop="menuPath" label="菜单路径" width="300"></el-table-column>
          <el-table-column prop="creator" label="创建用户"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column prop="mark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="deleteComment">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteComment">删除</el-button>
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
  name: 'admin_menu',
  data () {
    return {
      tableData: [{
        id: '',
        menuName: '王小虎',
        menuLevel: 'sssss',
        menuPath: '上海市普陀区金沙江路 1518 弄',
        creator: '',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        mark: '博客'
      }, {
        id: '',
        menuName: '王小虎',
        menuLevel: 'sssss',
        menuPath: '上海市普陀区金沙江路 1518 弄',
        creator: '',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        mark: '博客'
      }, {
        id: '',
        menuName: '王小虎',
        menuLevel: 'sssss',
        menuPath: '上海市普陀区金沙江路 1518 弄',
        creator: '',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        mark: '博客'
      }, {
        id: '',
        menuName: '王小虎',
        menuLevel: 'sssss',
        menuPath: '上海市普陀区金沙江路 1518 弄',
        creator: '',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        mark: '博客'
      }],
      currentPage: 1,
      dialogFormVisible: false,
      menuForm: {
        name: '',
        level: '',
        path: '',
        mark: ''
      }
    }
  },
  methods: {
    handleAddMenu () {
      this.dialogFormVisible = false
      this.$http.post('/ui/menu/add', this.menuForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建菜单成功后刷新当前页面，进行重新展示列表
            window.location.reload()
          } else {
            this.$message.error(response.data)
          }
        } else {
          this.$message.error('用户名或密码输入错误')
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    deleteComment () {
      console.log('ss')
    }
  }
}
</script>

<style scoped>

</style>
