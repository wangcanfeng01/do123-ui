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
            <el-button type="success" style="margin-left: 15px" @click="openAdd">新增用户</el-button>
          </el-col>
        </div>
        <!--新增任务弹出框-->
        <el-dialog title="新增任务" :visible.sync="addFormVisible" width="400px">
          <el-form :model="taskForm" status-icon :rules="rules" ref="addTaskForm">
            <el-form-item prop="taskName" label="任务名称" label-width="80px" required>
              <el-input v-model="taskForm.taskName" autocomplete="off" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" label-width="80px">
              <el-select v-model="userForm.role" multiple collapse-tags filterable placeholder="请选择用户角色">
                <el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
                           :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="password" label="用户密码" label-width="80px" required>
              <el-input v-model="userForm.password" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="rePass" label="确认密码" label-width="80px" required>
              <el-input v-model="userForm.rePass" autocomplete="off" placeholder="请确认密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="签名档" label-width="80px">
              <el-input v-model="userForm.introduce" autocomplete="off" placeholder="写点什么..." type="textarea"
                        :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="taskName" label="任务名称"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="taskStatus" label="任务状态"></el-table-column>
          <el-table-column prop="taskType" label="任务类型"></el-table-column>
          <el-table-column prop="taskCreator" label="任务创建者"></el-table-column>
          <el-table-column prop="taskResult" label="执行结果"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="taskPeriod" label="任务周期"></el-table-column>
          <el-table-column prop="taskGroup" label="任务组"></el-table-column>
          <el-table-column prop="triggerTime" label="点火时间"></el-table-column>
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
    return {
      tableData: [{
        id: 1,
        taskName: '测试',
        createTime: '2012-12-12 00:00:00',
        taskStatus: '2012-12-12 00:00:00',
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
        taskResult: '',
        taskInterval: '',
        taskGroup: '',
        triggerTime: ''
      }
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
    getTaskList () {
      this.$http.get('/ui/task/taskList?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
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
  }
}
</script>

<style scoped>

</style>
