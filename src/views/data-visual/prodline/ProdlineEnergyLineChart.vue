<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'

export default {
  name: 'ProdlineEnergyLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineEnergyLineChart'
    },
    energyData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      interval: null,
      timeData: [],
      chartData: []
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
            smooth: true,
            markPoint: {
              symbolSize: 60,
              data: [
                { type: 'max', name: '最大值' },
              ]
            },
          }]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
    energyData(prev, next) {
      this.handleEnergyData(prev)
    },
  },
  mounted() {},
  methods: {
    handleEnergyData(data) {
      let energy = []
      let time = []
      data.forEach(item => {
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.positiveEnergy) {
          energy.push(item.value.positiveEnergy)
          // time.push(this.formDate(item.createdAt))
          const date = new Date(item.createdAt)
          time.push(
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          )
        }
      })
      this.timeData = time
      this.chartData = energy.map(item => ((item - energy[0]) * 2.5).toFixed(3))
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
