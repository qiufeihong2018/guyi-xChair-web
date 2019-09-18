<template>
  <div style="height: 100%">
    <p class="legend" style="top: 5px;color: #60acfc;">
      入口总数: {{repeatedNum}}
    </p>
    <p class="legend" style="top: 25px;color: #45d3eb;">
      次品总数: {{defectiveNum}}
    </p>
    <p class="legend" style="top: 45px;color: #5bc59f;">
      出品总数: {{productionNum}}
    </p>
    <div :id="id" style="height: 95%"></div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'
export default {
  name: 'OutputInBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'OutputInBarChart'
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
          },
          {
            name: '次品数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.defectiveNumber
          },
          {
            name: '出品数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.productionQuantity
          }
        ]
      }
    },
    repeatedNum() {
      return this.repeatedCounting.reduce((prev, curr, idx, arr) => prev + curr)
    },
    defectiveNum() {
      return this.defectiveNumber.reduce((prev, curr, idx, arr) => prev + curr)
    },
    productionNum() {
      return this.productionQuantity.reduce((prev, curr, idx, arr) => prev + curr)
    },
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
.legend {
  position absolute
  right 40px
  width 200px
}
</style>
