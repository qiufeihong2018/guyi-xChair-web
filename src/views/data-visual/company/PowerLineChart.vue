<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'

export default {
  name: 'PowerLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'PowerLineChart'
    },
    timeData: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      interval: null,
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '15%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: this.timeData,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
        },
        yAxis: {
          type: 'value',
          name: '单位: 千瓦时',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            }
          }
        },
        series: [
          {
            name: '耗电量',
            data: this.chartData,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true
          }]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="stylus">

</style>
