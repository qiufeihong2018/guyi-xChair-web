<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'

export default {
  name: 'ProdlineCoefficientLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineCoefficientLineChart'
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
          // data: this.timeData,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
            '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
            '19:00', '20:00', '21:00', '22:00', '23:00'],
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
          name: '单位: 千瓦时/百把',
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
            name: '单位能耗系数',
            data: this.chartData,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            // markPoint: {
            //   symbolSize: 60,
            //   data: [
            //     { type: 'max', name: '最大值' },
            //   ]
            // },
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
      let powers = []
      const counter = {
        id: '5d834e6c0c8e9f276745ded0',
        dataType: 'counter',
        durationType: 'today'
      }
      const power = {
        id: '5d834e6c0c8e9f276745ded0',
        dataType: 'power',
        durationType: 'today'
      }
      const counterData = await PipelineModel.getPipelineState(counter)
      const powerData = await PipelineModel.getPipelineState(power)
      counterData.data.forEach((item, index) => {
        if (index > 0) {
          productionQuantity.push(item.out - counterData.data[index - 1].out)
        }
      })
      powerData.data.forEach((item, index) => {
        if (index > 0) {
          powers.push(((item.positive - powerData.data[index - 1].positive) * 2.5).toFixed(3))
        }
      })
      this.chartData = powers.map((item, index) => {
        if (item === '0.000' || productionQuantity[index] === 0) {
          return 0.00
        }
        return (item / (productionQuantity[index] / 100)).toFixed(2)
      })
      this.closeLoading()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
