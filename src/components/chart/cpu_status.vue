<template>
  <div id="cpu_status">
    <v-chart theme="macarons" :options="polar"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'cpu_status',
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
          data: ['cpu(MB)', '堆内存(MB)', '非堆内存(MB)', '硬盘(GB)']
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
            name: 'cpu(MB)',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [10, 12, 21, 54, 260, 830, 710]
          },
          {
            name: '堆内存(MB)',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [30, 182, 434, 791, 390, 30, 10]
          },
          {
            name: '非堆内存(MB)',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [30, 333, 434, 791, 390, 30, 10]
          },
          {
            name: '硬盘(GB)',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [1320, 1132, 601, 234, 120, 90, 20]
          }
        ]
      }
    }
  },
  methods: {
    getServerInfo () {
      this.$http.get('/ui/server/24hours').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.polar.xAxis[0].data = response.data.data.xaxis
            this.polar.series[0].data = response.data.data.cpu
            this.polar.series[1].data = response.data.data.heap
            this.polar.series[2].data = response.data.data.noheap
            this.polar.series[3].data = response.data.data.disk
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询服务器信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getServerInfo()
  }
}
</script>

<style scoped>

</style>
