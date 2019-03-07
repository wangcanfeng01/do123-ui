<template>
  <div id="admin_ops_log">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">操作日志列表</span>
          </el-col>
          <el-col :span="8" :offset="5">
            <el-date-picker v-model="timeRange" type="datetimerange"
                            :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期"
                            :default-time="defaultTime" value-format="yyyy-MM-dd HH:mm:ss" align="right">
            </el-date-picker>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" style="margin-left: 15px" @click="selectLogByTime">查询</el-button>
            <el-button type="warning" style="margin-left: 15px"
                       @click="selectLogList(currentPage,pageSize)">重置
            </el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="authorName" label="操作人名"></el-table-column>
          <el-table-column prop="facePath" label="头像" width="160">
            <template slot-scope="scope">
              <img v-if="scope.row.facePath" :src="scope.row.facePath" class="img-circle"/>
              <img v-else :src="defaultFace" class="img-circle"/>
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="IP地址"></el-table-column>
          <el-table-column prop="createTime" label="操作时间"></el-table-column>
          <el-table-column prop="actionType" label="操作动作"></el-table-column>
          <el-table-column prop="actionObject" label="操作对象"></el-table-column>
          <el-table-column prop="actionResult" label="操作结果">
            <template slot-scope="scope">
              <el-tag :type="scope.row.actionResult === '成功' ? 'success' : 'danger'"
                      disable-transitions>{{scope.row.actionResult}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="actionInfo" label="操作内容"></el-table-column>
          <el-table-column prop="details" label="操作内容详情"></el-table-column>
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
  name: 'admin_ops_log',
  data () {
    // 获取当前时间
    const time = new Date().toTimeString().split(' ')[0]
    return {
      defaultFace: require('../../assets/face/default.jpg'),
      tableData: [{
        id: 1,
        authorName: '王小虎',
        facePath: 'sssss',
        ip: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        actionType: '删除',
        actionObject: '博客',
        actionResult: '成功',
        actionInfo: '操作内容',
        details: '无'
      }],
      currentPage: 1,
      total: 0,
      pageSize: 20,
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
    selectLogByTime () {
      if (this.timeRange && this.timeRange.length === 2) {
        const start = this.timeRange[0]
        const end = this.timeRange[1]
        this.$http.get('/ui/ops/logList/time', {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            start: start,
            end: end
          }
        }).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.tableData = response.data.data
              this.total = response.data.total
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('查询操作日志异常')
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message.error('请选择起始时间和结束时间')
      }
    },
    selectLogList (currentPage, pageSize) {
      this.$http.get('/ui/ops/logList?currentPage=' + currentPage + '&pageSize=' + pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询操作日志异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.selectLogList(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.selectLogList(this.currentPage, this.pageSize)
    }
  },
  mounted () {
    this.selectLogList(this.currentPage, this.pageSize)
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 98px;
    width: 98px;
  }
</style>
