<template>
  <div id="admin_comment">
    <el-col :span="20" id="admin-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">评论记录列表</span>
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
            prop="username"
            label="评论人名">
          </el-table-column>
          <el-table-column
            prop="face"
            label="头像">
          </el-table-column>
          <el-table-column
            prop="address"
            label="IP地址">
          </el-table-column>
          <el-table-column
            prop="commentTime"
            label="评论时间">
          </el-table-column>
          <el-table-column
            prop="commentType"
            label="评论类型">
            <template slot-scope="scope">
              <el-tag :type="scope.row.commentType === '评论' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.commentType}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="commentFather"
            label="父评论">
          </el-table-column>
          <el-table-column
            prop="commentInfo"
            label="评论内容">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger" @click="deleteComment">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange(11)"
            @current-change="handleCurrentChange(11)"
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
  name: 'admin_comment',
  data () {
    return {
      tableData: [{
        username: '王小虎',
        face: 'sssss',
        level: 'VIP1',
        address: '127.0.0.1',
        commentTime: '2016-05-04 00:00:00',
        commentType: '评论',
        commentFather: '1',
        commentInfo: 'sssssss'
      }, {
        username: '王小虎',
        face: 'sssss',
        level: 'VIP1',
        address: '127.0.0.1',
        commentTime: '2016-05-04 00:00:00',
        commentType: '评论',
        commentFather: '1',
        commentInfo: 'sssssss'
      }, {
        username: '王小虎',
        face: 'sssss',
        level: 'VIP1',
        address: '127.0.0.1',
        commentTime: '2016-05-04 00:00:00',
        commentType: '评论',
        commentFather: '1',
        commentInfo: 'sssssss'
      }, {
        username: '王小虎',
        face: 'sssss',
        level: 'VIP1',
        address: '127.0.0.1',
        commentTime: '2016-05-04 00:00:00',
        commentType: '评论',
        commentFather: '1',
        commentInfo: 'sssssss'
      }],
      currentPage: 1
    }
  },
  methods: {
    deleteComment () {
      console.log('sss')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
