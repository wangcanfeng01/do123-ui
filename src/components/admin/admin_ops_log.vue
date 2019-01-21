<template>
  <div id="admin_ops_log">
    <el-col :span="20" class="admin_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">操作日志列表</span>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
          </el-col>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="username"
            label="操作人名">
          </el-table-column>
          <el-table-column
            prop="face"
            label="头像">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="actionTime"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作动作">
          </el-table-column>
          <el-table-column
            prop="actionObject"
            label="操作对象">
          </el-table-column>
          <el-table-column
            prop="actionResult"
            label="操作结果">
            <template slot-scope="scope">
              <el-tag :type="scope.row.actionResult === '成功' ? 'success' : 'danger'"
                      disable-transitions>{{scope.row.actionResult}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="details"
            label="操作内容详情">
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 50, 100]"
            :page-size="20"
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
  name: 'admin_ops_log',
  data () {
    return {
      tableData: [{
        username: '王小虎',
        face: 'sssss',
        address: '上海市普陀区金沙江路 1518 弄',
        actionTime: '2016-05-04 00:00:00',
        action: '删除',
        actionObject: '博客',
        actionResult: '成功',
        details: '无'
      }, {
        username: '王小虎',
        face: 'sssss',
        address: '上海市普陀区金沙江路 1518 弄',
        actionTime: '2016-05-04 00:00:00',
        action: '删除',
        actionObject: '博客',
        actionResult: '失败',
        details: '无'
      }, {
        username: '王小虎',
        face: 'sssss',
        address: '上海市普陀区金沙江路 1518 弄',
        actionTime: '2016-05-04 00:00:00',
        action: '删除',
        actionObject: '博客',
        actionResult: '成功',
        details: '无'
      }, {
        username: '王小虎',
        face: 'sssss',
        address: '上海市普陀区金沙江路 1518 弄',
        actionTime: '2016-05-04 00:00:00',
        action: '删除',
        actionObject: '博客',
        actionResult: '成功',
        details: '无'
      }],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
