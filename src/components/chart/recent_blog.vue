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
  }
}
</script>

<style scoped>

</style>
