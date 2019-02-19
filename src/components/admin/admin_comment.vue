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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="authorName" label="评论人名" width="140"></el-table-column>
          <el-table-column prop="face" label="头像" width="100">
            <template slot-scope="scope">
              <img v-if="scope.row.authorFace" :src="scope.row.authorFace" class="img-circle"/>
              <img v-else src="../../assets/face/face1.jpg" class="img-circle"/>
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="IP地址" width="140"></el-table-column>
          <el-table-column prop="updateTime" label="评论时间" width="180"></el-table-column>
          <el-table-column prop="type" label="评论类型" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.type === '评论' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.type}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="articleTitle" label="文章标题" width="200"></el-table-column>
          <el-table-column prop="text" label="评论内容" min-width="240"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteComment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
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
  name: 'admin_comment',
  data () {
    return {
      tableData: [{
        id: 1,
        updateTime: '2016-05-04 00:00:00',
        authorName: '评论人名称',
        authorId: 2,
        authorFace: '',
        articleId: 1,
        ip: '127.0.0.1',
        text: 'dsdadadadadad',
        type: '评论',
        isRead: '已读',
        parent: 1,
        articleTitle: ''
      }],
      currentPage: 1,
      pageSize: 10,
      total: 50
    }
  },
  methods: {
    getCommentList (currentPage, pageSize) {
      this.$http.get('/ui/blog/commentLogs?currentPage=' + currentPage + '&pageSize=' + pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.tableData = response.data.data
            this.total = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('评论记录查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteComment (id) {
      this.$http.delete('/ui/blog/comment/delete/' + id).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('评论删除成功')
            this.getCommentList(this.currentPage, this.pageSize)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('评论记录删除异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getCommentList(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCommentList(this.currentPage, this.pageSize)
    }
  },
  mounted () {
    this.getCommentList(this.currentPage, this.pageSize)
  }
}
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
</style>
