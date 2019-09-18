<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'
export default {
  name: 'EnergyConsumptionBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'EnergyConsumptionBarChart'
    },
    timeData: {
      type: Array,
      default: () => []
    },
    repeatedCounting: {
      type: Array,
      default: () => []
    },
    defectiveNumber: {
      type: Array,
      default: () => []
    },
    productionQuantity: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      interval: null
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}'
        },
        grid: {
          left: '15%',
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: this.timeData,
          // data: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00',
          //   '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
          //   '19:00', '20:00', '21:00', '22:00', '23:00'],
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
          minInterval: 1,
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
        color: color.category6,
        series: [
          {
            name: '入口数量',
            type: 'bar',
            barGap: 0,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.repeatedCounting
          }
        ]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="stylus">

</style>
