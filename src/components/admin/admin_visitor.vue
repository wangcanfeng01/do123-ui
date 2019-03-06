<template>
    <div id="admin_visitor">
      <el-col :span="20" id="admin-content">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-col :span="5">
              <span style="line-height: 40px">访客记录表</span>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-input></el-input>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" style="margin-left: 15px">查询</el-button>
            </el-col>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="访客名称"></el-table-column>
            <el-table-column prop="face" label="访客头像"></el-table-column>
            <el-table-column prop="role" label="访客角色"></el-table-column>
            <el-table-column prop="level" label="访客等级"></el-table-column>
            <el-table-column prop="visitTime" label="访问时间"></el-table-column>
            <el-table-column prop="address" label="访客IP"></el-table-column>
            <el-table-column prop="area" label="访客地域"></el-table-column>
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
  name: 'admin_visitor',
  data () {
    return {
      tableData: [{
        username: '王小虎',
        face: 'sssss',
        role: '上海市普陀区金沙江路 1518 弄',
        level: '1',
        visitTime: '2016-05-04 00:00:00',
        address: '127.0.0.1',
        area: '绍兴'
      }, {
        username: '王小虎',
        face: 'sssss',
        role: '上海市普陀区金沙江路 1518 弄',
        level: '1',
        visitTime: '2016-05-04 00:00:00',
        address: '127.0.0.1',
        area: '绍兴'
      }, {
        username: '王小虎',
        face: 'sssss',
        role: '上海市普陀区金沙江路 1518 弄',
        level: '1',
        visitTime: '2016-05-04 00:00:00',
        address: '127.0.0.1',
        area: '绍兴'
      }, {
        username: '王小虎',
        face: 'sssss',
        role: '上海市普陀区金沙江路 1518 弄',
        level: '1',
        visitTime: '2016-05-04 00:00:00',
        address: '127.0.0.1',
        area: '绍兴'
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
