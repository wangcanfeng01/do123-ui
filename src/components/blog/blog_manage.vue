<template>
  <div id="blog_manage">
    <el-col :span="20" class="about_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-col :span="5">
            <span style="line-height: 40px">文章管理</span>
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
          border
          style="width: 100%">
          <el-table-column
            prop="articleName"
            label="文章标题">
          </el-table-column>
          <el-table-column
            prop="coverPic"
            label="封面图片">
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="hitTimes"
            label="浏览量">
          </el-table-column>
          <el-table-column
            prop="categories"
            label="所属分类">
          </el-table-column>
          <el-table-column
            prop="allowSee"
            label="是否公开">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowSee === '公开' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowSee}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishStatus"
            label="发布状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.publishStatus === '已发布' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.publishStatus}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="allowComment"
            label="允许评论">
            <template slot-scope="scope">
              <el-tag :type="scope.row.allowComment === '允许' ? 'success' : 'primary'"
                      disable-transitions>{{scope.row.allowComment}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary" @click="deleteComment">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger" @click="deleteComment">删除
              </el-button>
              <el-button
                size="mini"
                type="success" @click="deleteComment">查看
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
  name: 'blog_manage',
  data () {
    return {
      tableData: [{
        articleName: '王小虎',
        coverPic: 'sssss',
        publishTime: '上海市普陀区金沙江路 1518 弄',
        hitTimes: '33',
        categories: '2016-05-04 00:00:00',
        allowSee: '公开',
        publishStatus: '已发布',
        allowComment: '允许'
      }, {
        articleName: '王小虎',
        coverPic: 'sssss',
        publishTime: '上海市普陀区金沙江路 1518 弄',
        hitTimes: '33',
        categories: '2016-05-04 00:00:00',
        allowSee: '公开',
        publishStatus: '发布',
        allowComment: '允许'
      }, {
        articleName: '王小虎',
        coverPic: 'sssss',
        publishTime: '上海市普陀区金沙江路 1518 弄',
        hitTimes: '33',
        categories: '2016-05-04 00:00:00',
        allowSee: '公开',
        publishStatus: '发布',
        allowComment: '允许'
      }, {
        articleName: '王小虎',
        coverPic: 'sssss',
        publishTime: '上海市普陀区金沙江路 1518 弄',
        hitTimes: '33',
        categories: '2016-05-04 00:00:00',
        allowSee: '公开',
        publishStatus: '发布',
        allowComment: '允许'
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
