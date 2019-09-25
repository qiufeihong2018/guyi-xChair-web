<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'

export default {
  name: 'ProdlineTrendLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineTrendLineChart'
    },
    energyData: {
      type: Array,
      default: () => []
    },
    outputData: {
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
      intervalId: undefined,
    }
  },
  computed: {
    pipelineId() {
      return this.$route.query.id
    },
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
          // data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
          //   '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
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
          name: '单位: 把',
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
            name: '产量',
            data: this.chartData,
            type: 'line',
            showSymbol: false,
            areaStyle: {
              opacity: 0.1,
            },
            hoverAnimation: false,
            markPoint: {
              symbol: 'pin',
              symbolSize: 10,
              symbolOffset: [0, 0],
              label: {
                position: 'top',
                fontSize: 18,
                formatter(params) {
                  return params.value
                }
              },
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
      this.handleCoefficientData(prev)
    },
  },
  mounted() {
    this.openLoading()
    this.handleCoefficientData()
    // this.getPipelineData()
    this.intervalId = setInterval(() => {
      this.handleCoefficientData()
    }, 30000)
  },
  methods: {
    async handleCoefficientData(data) {
      let productionQuantity = []
      let time = []
      const todayStart = +new Date(new Date(new Date().toLocaleDateString()).getTime())
      const now = +new Date()
      const counter = {
        id: this.pipelineId,
        dataType: 'counter',
        start: todayStart,
        end: now
      }
      const counterData = await PipelineModel.getPipelineData(counter)
      counterData.data.forEach((item, index) => {
        if (index > 0) {
          productionQuantity.push(item.out - counterData.data[0].out)
          const date = new Date(item.time)
          time.push(
            `${this.formatBit(date.getHours())}:${this.formatBit(date.getMinutes())}:${this.formatBit(date.getSeconds())}`
          )
        }
      })
      this.timeData = time
      this.chartData = productionQuantity
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
