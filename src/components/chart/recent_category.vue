<template>
  <div id="recent_category">
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
  name: 'recent_category',
  data () {
    return {
      option: {
        title: {
          text: '近期文章分类情况',
          subtext: '近期有文章发布的专题'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['文章数']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '文章数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
    getRecentCategory () {
      this.$http.get('/ui/blog/statistic/recentCategory').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.option.xAxis[0].data = response.data.data.axis
            this.option.series[0].data = response.data.data.value
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询专题分布信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getRecentCategory()
  }
}
</script>

<style scoped>

</style>
