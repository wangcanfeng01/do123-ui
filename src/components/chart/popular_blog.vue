<template>
  <div id="popular_blog">
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
  name: 'popular_blog',
  data () {
    return {
      option: {
        title: {
          text: '最受欢迎的文章情况',
          subtext: '点赞数最多'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['赞个数']
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01]
          }
        ],
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 120
        },
        yAxis: [
          {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          }
        ],
        series: [
          {
            name: '赞个数',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],
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
    getPopularArticle () {
      this.$http.get('/ui/blog/statistic/popularArticle').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.option.yAxis[0].data = response.data.data.axis
            this.option.series[0].data = response.data.data.value
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询最受欢迎的文章信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getPopularArticle()
  }
}
</script>

<style scoped>

</style>
