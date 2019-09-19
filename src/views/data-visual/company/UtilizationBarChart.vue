<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'

export default {
  name: 'UtilizationBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'UtilizationBarChart'
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
        },
        grid: {
          left: '15%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: ['ALT01', '', '', ''],
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
          name: '利用率: %',
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
            name: '利用率',
            data: this.chartData,
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
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
