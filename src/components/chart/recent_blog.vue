<template>
  <div id="recent_blog">
    <v-chart theme="macarons" :options="option"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default {
  name: 'recent_blog',
  data () {
    return {
      option: {
        title: {
          text: '近期发布文章情况',
          subtext: '近六月'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['文章数量']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '文章数量',
            type: 'line',
            data: [1, 11, 15, 3, 12, 13, 10],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    getRecentArticles () {
      this.$http.get('/ui/blog/statistic/recentArticles').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.option.xAxis[0].data = response.data.data.axis
            this.option.series[0].data = response.data.data.value
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询近期文章信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getRecentArticles()
  }
}
</script>

<style scoped>

</style>
