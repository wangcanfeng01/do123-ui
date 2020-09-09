<template>
  <div id="blog_index">
    <v-chart theme="macarons" :options="option"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'blog_index',
  data () {
    return {
      option: {
        title: {
          text: '近期文章指数',
          subtext: '文章各个维度的情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'center',
          data: ['文章指数']
        },
        // calculable: true,
        polar: [
          {
            indicator: [
              {text: '字数', max: 100},
              {text: '图片数', max: 100},
              {text: '点击数', max: 100},
              {text: '赞数', max: 100},
              {text: '评论数', max: 100}
            ],
            radius: 130
          }
        ],
        series: [{
          name: '文章指数',
          type: 'radar',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [{
            value: [30, 40, 50, 60, 70],
            name: '文章指数'
          }]
        }]
      }
    }
  },
  methods: {
    getBlogIndex () {
      this.$http.get('/ui/blog/statistic/blogIndex').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.option.series[0].data[0].value = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('文章指数信息查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getBlogIndex()
  }
}
</script>

<style scoped>

</style>
