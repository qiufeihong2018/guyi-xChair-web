<template>
  <div style="height: 95%">
    <time-switch :time-options="switchOptions" v-on:getTimeRange="handleEnergyData"></time-switch>
    <div :id="id" style="height: 100%"></div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'

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
      chartData: [],
      switchOptions: [
        {
          label: '本日',
          value: 'day'
        }, {
          label: '昨日',
          value: 'yester'
        }
      ]
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '10%'
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
              symbol: 'arrow',
              symbolSize: 16,
              data: [
                { type: 'max', name: '最大值' },
              ]
            },
          }
        ]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
    energyData(prev, next) {
      // this.handleEnergyData(prev)
    },
  },
  mounted() {
    this.openLoading()
    // this.handleEnergyData({
    //   start: range.start,
    //   end: range.end
    // })
  },
  methods: {
    async handleEnergyData(range) {
      let energy = []
      let time = []
      const params = {
        id: '5d834e6c0c8e9f276745ded0',
        dataType: 'power',
        start: range.start,
        end: range.end
      }
      const res = await PipelineModel.getPipelineData(params)
      res.data.forEach(item => {
        energy.push(item.positive)
        // time.push(this.formDate(item.createdAt))
        const date = new Date(item.time)
        time.push(
          `${this.formatBit(date.getHours())}:${this.formatBit(date.getMinutes())}:${this.formatBit(date.getSeconds())}`
        )
      })
      // let energy = []
      // let time = []
      // data.forEach(item => {
      //   energy.push(item.value.positiveEnergy)
      //   // time.push(this.formDate(item.createdAt))
      //   const date = new Date(item.createdAt)
      //   time.push(
      //     `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      //   )
      // })
      this.timeData = time
      this.chartData = energy.map(item => ((item - energy[0]) * 2.5).toFixed(3))
      this.closeLoading()
    },
    // 补0
    formatBit(val) {
      val = +val
      return val > 9 ? val : `0${val}`
    }
  }
}
</script>

<style scoped lang="stylus"></style>
