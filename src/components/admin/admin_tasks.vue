<template>
  <div id="admin_tasks">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">后台任务状态列表</span>
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
            prop="taskName"
            label="任务名称">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="起始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="任务状态">
          </el-table-column>
          <el-table-column
            prop="costTime"
            label="耗费时间">
          </el-table-column>
          <el-table-column
            prop="taskType"
            label="任务类型">
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
  name: 'admin_tasks',
  data () {
    return {
      tableData: [{
        taskName: '测试',
        startTime: '2012-12-12 00:00:00',
        endTime: '2012-12-12 00:00:00',
        status: '完成',
        costTime: '12分',
        taskType: '统计'
      }, {
        taskName: '测试',
        startTime: '2012-12-12 00:00:00',
        endTime: '2012-12-12 00:00:00',
        status: '完成',
        costTime: '12分',
        taskType: '统计'
      }, {
        taskName: '测试',
        startTime: '2012-12-12 00:00:00',
        endTime: '2012-12-12 00:00:00',
        status: '完成',
        costTime: '12分',
        taskType: '统计'
      }, {
        taskName: '测试',
        startTime: '2012-12-12 00:00:00',
        endTime: '2012-12-12 00:00:00',
        status: '完成',
        costTime: '12分',
        taskType: '统计'
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
