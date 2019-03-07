<template>
  <div id="admin_visitor">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">访客记录表</span>
          </el-col>
          <el-col :span="8" :offset="5">
            <el-date-picker v-model="timeRange" type="datetimerange"
                            :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期"
                            :default-time="defaultTime" value-format="yyyy-MM-dd HH:mm:ss" align="right">
            </el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="margin-left: 15px" @click="selectVisitorListByTime">查询</el-button>
            <el-button type="warning" style="margin-left: 15px"
                       @click="selectVisitorList(currentPage,pageSize)">重置
            </el-button>
          </el-col>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="访客名称"></el-table-column>
          <el-table-column prop="facePath" label="访客头像">
            <template slot-scope="scope">
              <img v-if="scope.row.facePath" :src="scope.row.facePath" class="img-circle"/>
              <img v-else :src="defaultFace" class="img-circle"/>
            </template>
          </el-table-column>
          <el-table-column label="访客等级" width="160">
            <template slot-scope="scope">
              <el-popover placement="right" width="230" trigger="hover">
                <el-table :data="scope.row.roleInfos">
                  <el-table-column width="100" property="roleName" label="角色名称"></el-table-column>
                  <el-table-column width="120" property="roleType" label="角色类型"></el-table-column>
                </el-table>
                <el-tag slot="reference">VIP-{{scope.row.userLevel}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="loginTime" label="登录时间"></el-table-column>
          <el-table-column prop="logoutTime" label="登出时间"></el-table-column>
          <el-table-column prop="remoteIp" label="访客IP"></el-table-column>
          <el-table-column prop="remoteArea" label="访客地域"></el-table-column>
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
  name: 'admin_visitor',
  data () {
    // 获取当前时间
    const time = new Date().toTimeString().split(' ')[0]
    return {
      defaultFace: require('../../assets/face/default.jpg'),
      tableData: [{
        id: 1,
        username: '王小虎',
        facePath: '',
        roleInfos: [{
          id: 1,
          roleName: '王小虎',
          roleType: 'admin'
        }, {
          id: 2,
          roleName: '王大虎',
          roleType: 'guest'
        }],
        userLevel: '1',
        loginTime: '2016-05-04 00:00:00',
        logoutTime: '2016-05-04 00:00:00',
        remoteIp: '127.0.0.1',
        remoteArea: '绍兴'
      }],
      currentPage: 1,
      pageSize: 20,
      total: 0,
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
    selectVisitorList (currentPage, pageSize) {
      this.$http.get('/ui/visitor/select?currentPage=' + currentPage + '&pageSize=' + pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询访客信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    selectVisitorListByTime () {
      if (this.timeRange && this.timeRange.length === 2) {
        const start = this.timeRange[0]
        const end = this.timeRange[1]
        this.$http.get('/ui/visitor/select', {
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
            this.$message.error('查询访客信息异常')
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message.error('请选择起始时间和结束时间')
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.selectVisitorList(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.selectVisitorList(this.currentPage, this.pageSize)
    }
  },
  mounted () {
    this.selectVisitorList(this.currentPage, this.pageSize)
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
