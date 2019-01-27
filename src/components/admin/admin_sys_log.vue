<template>
  <div id="admin_sys_log">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">系统日志列表</span>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="errorCode"
            width="150"
            label="状态码">
          </el-table-column>
          <el-table-column
            prop="errorInfo"
            label="日志内容">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange(20)"
            @current-change="handleCurrentChange(20)"
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
  name: 'admin_sys_log',
  data () {
    return {
      tableData: [{
        errorCode: '王小虎',
        errorInfo: 'sssss',
        createTime: '2016-05-04 00:00:00'
      }, {
        errorCode: '王小虎',
        errorInfo: 'sssss',
        createTime: '2016-05-04 00:00:00'
      }, {
        errorCode: '王小虎',
        errorInfo: 'sssss',
        createTime: '2016-05-04 00:00:00'
      }, {
        errorCode: '王小虎',
        errorInfo: 'sssss',
        createTime: '2016-05-04 00:00:00'
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
