<template>
  <div id="admin_db">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">数据库状态列表<small>每天</small></span>
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
            prop="statisticTime"
            label="统计时间">
          </el-table-column>
          <el-table-column
            prop="tableSum"
            label="表总数量">
          </el-table-column>
          <el-table-column
            prop="openLink"
            label="连接打开数">
          </el-table-column>
          <el-table-column
            prop="availableLink"
            label="最大可用连接">
          </el-table-column>
          <el-table-column
            prop="queryTimes"
            label="查询次数">
          </el-table-column>
          <el-table-column
            prop="updateTimes"
            label="请求更新数">
          </el-table-column>
          <el-table-column
            prop="insertTimes"
            label="请求插入数">
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
  name: 'admin_db',
  data () {
    return {
      tableData: [{
        statisticTime: '2016-05-04 00:00:00',
        tableSum: '123',
        openLink: '22',
        availableLink: '1',
        queryTimes: '4',
        updateTimes: '3',
        insertTimes: '1'
      }, {
        statisticTime: '2016-05-04 00:00:00',
        tableSum: '123',
        openLink: '22',
        availableLink: '1',
        queryTimes: '4',
        updateTimes: '3',
        insertTimes: '1'
      }, {
        statisticTime: '2016-05-04 00:00:00',
        tableSum: '123',
        openLink: '22',
        availableLink: '1',
        queryTimes: '4',
        updateTimes: '3',
        insertTimes: '1'
      }, {
        statisticTime: '2016-05-04 00:00:00',
        tableSum: '123',
        openLink: '22',
        availableLink: '1',
        queryTimes: '4',
        updateTimes: '3',
        insertTimes: '1'
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
    },
    deleteComment () {
      console.log('ss')
    }
  }
}
</script>

<style scoped>

</style>
