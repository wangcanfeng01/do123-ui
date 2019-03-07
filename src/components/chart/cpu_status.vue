<template>
  <div id="cpu_status">
    <v-chart :options="polar"/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'cpu_status',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      polar: {
        title: {
          text: '服务器运行状况',
          subtext: 'cpu-硬盘-内存'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['cpu', '内存', '硬盘']
        },
        calculable: true,
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
            name: 'cpu',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [10, 12, 21, 54, 260, 830, 710]
          },
          {
            name: '内存',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [30, 182, 434, 791, 390, 30, 10]
          },
          {
            name: '硬盘',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [1320, 1132, 601, 234, 120, 90, 20]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
