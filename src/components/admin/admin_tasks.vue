<template>
  <div id="admin_tasks">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">后台任务状态列表</span>
          </el-col>
          <el-col :span="4" :offset="8">
            <el-input></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="margin-left: 15px">查询</el-button>
            <el-button type="success" style="margin-left: 15px" @click="openAdd">创建任务</el-button>
          </el-col>
        </div>
        <!--新增任务弹出框-->
        <el-dialog title="新增任务" :visible.sync="addFormVisible" width="400px">
          <el-form :model="taskForm" status-icon ref="addTaskForm">
            <el-form-item prop="taskName" label="任务名称" label-width="80px" required>
              <el-input v-model="taskForm.taskName" autocomplete="off" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="任务组名" label-width="80px" required>
              <el-select v-model="taskForm.taskGroup" placeholder="请选择任务组">
                <el-option v-for="group in taskGroupList" :key="group.code" :label="group.name"
                           :value="group.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务类型" label-width="80px" required>
              <el-select v-model="taskForm.taskType" placeholder="请选择任务类型">
                <el-option v-for="type in taskTypeList" :key="type.code" :label="type.name"
                           :value="type.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="taskInterval" label="执行周期" label-width="80px" v-show="taskForm.taskType!=='single'">
              <el-select v-model="taskForm.taskInterval" placeholder="请选择执行周期">
                <el-option v-for="interval in taskIntervalList" :key="interval.code" :label="interval.name"
                           :value="interval.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="点火时间" label-width="80px" v-show="taskForm.taskType==='single'">
              <el-time-select v-model="taskForm.triggerTime" :picker-options="triggerRange"
                              placeholder="请选择点火时间"></el-time-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addJob('addUserForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="taskName" label="任务名称"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="taskStatus" label="任务状态" width="80"></el-table-column>
          <el-table-column prop="taskType" label="任务类型" width="80"></el-table-column>
          <el-table-column prop="taskCreator" label="任务创建者" width="100"></el-table-column>
          <el-table-column prop="taskResult" label="执行结果" width="80"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="taskPeriod" label="任务周期"></el-table-column>
          <el-table-column prop="taskGroup" label="任务组"></el-table-column>
          <el-table-column prop="triggerTime" label="点火时间"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="changeJobStatus(scope.row)">
                {{scope.row.taskStatus==='已暂停'?'启用':'暂停'}}
              </el-button>
              <el-button size="mini" type="danger" @click="deleteJob(scope.row.id)">删除</el-button>
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
  name: 'admin_tasks',
  data () {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let nowTime = hour + ':' + minutes
    return {
      tableData: [{
        id: 1,
        taskName: '测试',
        createTime: '2012-12-12 00:00:00',
        taskStatus: '已暂停',
        taskType: '完成',
        taskCreator: '12分',
        taskResult: '统计',
        updateTime: '',
        taskPeriod: '',
        taskGroup: '',
        triggerTime: ''
      }],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      addFormVisible: false,
      taskForm: {
        taskName: '',
        taskType: '',
        taskInterval: '',
        taskGroup: '',
        triggerTime: ''
      },
      taskTypeList: [{
        code: 'single',
        name: '单次任务'
      }, {
        code: 'multi',
        name: '周期性任务'
      }],
      taskIntervalList: [{
        code: '',
        name: ''
      }],
      taskGroupList: [{
        code: '',
        name: ''
      }],
      triggerRange: {
        start: nowTime,
        step: '00:15',
        end: '23:59'
      },
      triggerInput: false
    }
  },
  methods: {
    openAdd () {
      this.addFormVisible = true
      this.taskForm.taskName = ''
      this.taskForm.taskType = ''
      this.taskForm.taskResult = ''
      this.taskForm.taskInterval = ''
      this.taskForm.taskGroup = ''
      this.taskForm.triggerTime = ''
    },
    addJob (formName) {
      this.$http.post('/ui/task/addJob', this.taskForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 创建任务成功后刷新当前页面，进行重新展示列表
            this.$message.success('创建任务成功')
            this.getTaskList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('创建任务异常')
        }
      }).catch(error => {
        console.log(error)
      })
      this.addFormVisible = false
    },
    changeJobStatus (task) {
      if (task.taskStatus === '已暂停') {
        this.resumeJob(task.id)
      } else {
        this.pauseJob(task.id)
      }
    },
    pauseJob (taskId) {
      this.$http.put('/ui/task/pauseJob?taskId=' + taskId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 暂停任务成功后刷新当前页面，重新展示列表
            this.$message.success('暂停任务成功')
            this.getTaskList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('暂停任务异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    resumeJob (taskId) {
      this.$http.put('/ui/task/resumeJob?taskId=' + taskId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 恢复任务成功后刷新当前页面，重新展示列表
            this.$message.success('恢复任务成功')
            this.getTaskList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('恢复任务异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteJob (taskId) {
      this.$http.delete('/ui/task/deleteJob?taskId=' + taskId).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            // 删除任务成功后刷新当前页面，重新展示列表
            this.$message.success('删除任务成功')
            this.getTaskList()
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('删除任务异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getTaskList () {
      this.$http.get('/ui/task/taskList?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('任务信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getIntervalList () {
      this.$http.get('/ui/task/intervalList').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.taskIntervalList = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('执行周期查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getGroupList () {
      this.$http.get('/ui/task/groupList').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.taskGroupList = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('任务组查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getTaskList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTaskList()
    }
  },
  mounted () {
    this.getTaskList()
    this.getGroupList()
    this.getIntervalList()
  }
  // watch: {
  //   taskForm: {
  //     handler (val, oldVal) {
  //       console.log(val.taskInterval)
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>

</style>
