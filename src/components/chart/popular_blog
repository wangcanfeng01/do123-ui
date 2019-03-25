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
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
