<template>
  <div id="category_distribution">
    <v-chart theme="macarons" :options="option"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default {
  name: 'category_distribution',
  data () {
    return {
      option: {
        title: {
          text: '文章专题分布情况',
          subtext: '专题内文章数量',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        calculable: true,
        series: [
          {
            name: '专题文章数目',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            x: '50%',
            max: 40,
            sort: 'ascending',
            data: [
              {value: 10, name: 'rose1'},
              {value: 5, name: 'rose2'},
              {value: 15, name: 'rose3'},
              {value: 25, name: 'rose4'},
              {value: 20, name: 'rose5'},
              {value: 35, name: 'rose6'},
              {value: 30, name: 'rose7'},
              {value: 40, name: 'rose8'}
            ]
          }
        ]
      }
    }
  },
  methods: {
    getDistribution () {
      this.$http.get('/ui/blog/statistic/categories').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.option.legend.data = response.data.data.itemName
            this.option.series[0].data = response.data.data.nameAndValues
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
    this.getDistribution()
  }
}
</script>

<style scoped>

</style>
