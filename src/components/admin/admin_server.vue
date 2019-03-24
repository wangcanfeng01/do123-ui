<template>
  <div id="admin_server">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">服务器信息</span>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="createTime" label="统计时间" min-width="120"></el-table-column>
          <el-table-column label="堆内存使用量" min-width="80">
            <template slot-scope="scope">{{scope.row.heapUsed+'MB'}}</template>
          </el-table-column>
          <el-table-column label="非堆内存使用量" min-width="80">
            <template slot-scope="scope">{{scope.row.noHeapUsed+'MB'}}</template>
          </el-table-column>
          <el-table-column label="硬盘使用率" min-width="80">
            <template slot-scope="scope">{{scope.row.diskUsed+'%'}}</template>
          </el-table-column>
          <el-table-column label="cpu使用率" min-width="80">
            <template slot-scope="scope">{{scope.row.cpuUsed+'%'}}</template>
          </el-table-column>
          <el-table-column prop="statisticType" label="统计类型" min-width="80"></el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 50, 100]"
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
  name: 'admin_server',
  data () {
    return {
      tableData: [{
        id: 1,
        createTime: '2016-05-04 00:00:00',
        heapUsed: '123',
        noHeapUsed: '22',
        diskUsed: '1',
        cpuUsed: '4',
        statisticType: ''
      }],
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  methods: {
    getServerInfoList () {
      this.$http.get('/ui/server/list?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('系统信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getServerInfoList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getServerInfoList()
    }
  },
  mounted () {
    this.getServerInfoList()
  }
}
</script>

<style scoped>

</style>
