<template>
  <div id="admin_sys_log">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">系统日志列表</span>
          </el-col>
          <el-col :span="8" :offset="5">
            <el-date-picker v-model="timeRange" type="datetimerange"
                            :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期"
                            :default-time="defaultTime" value-format="yyyy-MM-dd HH:mm:ss" align="right">
            </el-date-picker>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" style="margin-left: 15px" @click="selectSysLogList">查询</el-button>
            <el-button type="warning" style="margin-left: 15px" @click="selectSysLogs">重置</el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" min-width="180" label="日志名称"></el-table-column>
          <el-table-column prop="" label="图片大小" min-width="180">
            <template slot-scope="scope">{{scope.row.size+'kb'}}</template>
          </el-table-column>
          <el-table-column prop="lastModifyTime" label="最后修改时间" min-width="180"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="downloadLog(scope.row.path)">下载</el-button>
              <el-button size="mini" type="danger" @click="deleteSysLog(scope.row.path)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'admin_sys_log',
  data () {
    // 获取当前时间
    const time = new Date().toTimeString().split(' ')[0]
    return {
      tableData: [{
        name: '王小虎',
        size: 'sssss',
        lastModifyTime: '2016-05-04 00:00:00',
        path: ''
      }],
      timeRange: [],
      defaultTime: [time, time],
      pickerOptions: {
        shortcuts: [{
          text: '最近一天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    downloadLog (path) {
      let data = this.$router.resolve({path: '/ui/sysLog/download', query: {'path': path}})
      window.open(data.href, '_blank')
    },
    selectSysLogs (startTime, endTime) {
      let url
      if (startTime && endTime) {
        url = '/ui/sysLog/select?startTime=' + startTime + '&endTime=' + endTime
      } else {
        url = '/ui/sysLog/select'
      }
      this.$http.get(url).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('日志信息列表获取异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    selectSysLogList () {
      if (this.timeRange && this.timeRange.length === 2) {
        const start = this.timeRange[0]
        const end = this.timeRange[1]
        this.selectSysLogs(start, end)
      } else {
        this.$message.error('请选择起始时间和结束时间')
      }
    },
    deleteSysLog (path) {
      this.$confirm('确认删除该日志?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$http.get('/ui/sysLog/delete', {params: {path: path}}).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.$message.success('日志删除成功')
              // 重新查询日志列表
              this.selectSysLogs()
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('日志文件删除异常')
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    this.selectSysLogs()
  }
}
</script>

<style scoped>

</style>
