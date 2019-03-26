<template>
  <div id="admin_blog">
    <el-col :span="20" id="admin-content">
      <!--总体统计信息-->
      <el-row>
        <el-col :span="6">
          <el-card shadow="always" class="title_count_first">
            <el-row>
              <font-awesome-icon icon="file"/>
              <span>文章</span></el-row>
            <el-row><span>{{totalStatistic.articles+ ' 篇'}}</span></el-row>
            <!--<el-row>-->
            <!--<span>月<i class="el-icon-caret-top"> 4%</i></span>-->
            <!--</el-row>-->
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always" class="title_count">
            <el-row>
              <font-awesome-icon icon="font"/>
              <span>字数</span></el-row>
            <el-row><span>{{totalStatistic.words+ ' 字'}}</span></el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always" class="title_count">
            <el-row>
              <font-awesome-icon icon="eye"/>
              <span>浏览</span></el-row>
            <el-row><span>{{totalStatistic.hits+' 次'}}</span></el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always" class="title_count">
            <el-row>
              <font-awesome-icon icon="comment"/>
              <span>留言</span></el-row>
            <el-row><span>{{totalStatistic.comments+' 条'}}</span></el-row>
          </el-card>
        </el-col>
      </el-row>
      <!--图表类信息-->
      <el-row style="margin-top: 20px">
        <el-col :span="11">
          <el-card class="box-card">
            <recent-blog></recent-blog>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-card>
            <category-distribution></category-distribution>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="11">
          <el-card class="box-card">
            <popular-blog class="popular"></popular-blog>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-card>
            <recent-category></recent-category>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="11" :offset="5">
          <el-card class="box-card">
            <blog-index></blog-index>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import recentBlog from '@/components/chart/recent_blog'
import categoryDistribution from '@/components/chart/category_distribution'
import popularBlog from '@/components/chart/popular_blog'
import recentCategory from '@/components/chart/recent_category'
import blogIndex from '@/components/chart/blog_index'

export default {
  name: 'admin_blog',
  components: {
    'recentBlog': recentBlog,
    'categoryDistribution': categoryDistribution,
    'popularBlog': popularBlog,
    'recentCategory': recentCategory,
    'blogIndex': blogIndex
  },
  data () {
    return {
      totalStatistic: {
        articles: 13,
        hits: 1233,
        comments: 2,
        words: 2
      }
    }
  },
  methods: {
    getArticleStatistic () {
      this.$http.get('/ui/blog/statistic/article').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.totalStatistic = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章统计信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getArticleStatistic()
  }
}
</script>

<style scoped>
  .title_count_first {
    margin-left: 0px;
    padding: 20px 0px;
  }

  .title_count {
    margin-left: 20px;
    padding: 20px 0px;
  }
</style>
