<template>
  <div id="admin_role">
    <el-col :span="20" class="admin_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">角色信息列表</span>
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
            prop="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="roleType"
            label="角色类型">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="修改时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger" @click="deleteComment">修改
              </el-button>
              <el-button
                size="mini"
                type="danger" @click="deleteComment">删除
              </el-button>
            </template>
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
  name: 'admin_role',
  data () {
    return {
      tableData: [{
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
      }, {
        roleName: '王小虎',
        roleType: 'sssss',
        creator: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-04 00:00:00',
        updateTime: '2016-05-04 00:00:00',
        description: '博客'
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
