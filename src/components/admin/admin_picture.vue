<template>
  <div id="admin_picture">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">图片上传记录</span>
          </el-col>
          <el-col :span="8" :offset="5">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" style="margin-left: 15px" @click="selectLogByTime">查询</el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="uploader" label="上传者"></el-table-column>
          <el-table-column prop="picName" label="图片真实名称"></el-table-column>
          <el-table-column prop="uuid" label="图片uuid"></el-table-column>
          <el-table-column prop="uploadTime" label="图片上传时间"></el-table-column>
          <el-table-column prop="" label="图片大小">
            <template slot-scope="scope">{{scope.row.size+'kb'}}</template>
          </el-table-column>
          <el-table-column prop="path" label="图片路径"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="success">查看详情</el-button>
            </template>
          </el-table-column>
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
  name: 'admin_picture',
  data () {
    // 获取当前时间
    const time = new Date().toTimeString().split(' ')[0]
    return {
      tableData: [{
        id: 1,
        picName: '王小虎',
        uuid: 'sssss',
        path: '/test',
        uploader: 'wcf',
        uploadTime: '2016-05-04 00:00:00',
        picType: 1,
        typeName: '图片类型名称',
        size: 50,
        belongTo: 1
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

</style>
