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
    }
  },
  data() {
    return {
      chart: null,
      interval: null,
      productionQuantity: [],
      EnergyConsumption: [],
    }
  },
  computed: {
    companyId() {
      return this.$route.query.id
    },
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
          data: ['ALT01', '', '', '', '', '', '', '', ''],
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
          name: '单位: 千瓦时/千件',
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
            name: '能耗系数',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.EnergyConsumption
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
    this.openLoading()
    this.getYesterdayData()
  },
  methods: {
    async getYesterdayData() {
      const params = {
        companyId: this.companyId,
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()) - 1000 * 60 * 60 * 24,
        end: +new Date(new Date(new Date().toLocaleDateString()).getTime())
      }
      const res = await MonitorModel.searchMonitor(params)
      const productionData = []
      const energyData = []
      res.forEach(item => {
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.productionQuantity) {
          productionData.push(item.value.productionQuantity)
        }
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.positiveEnergy) {
          energyData.push(item.value.positiveEnergy)
        }
      })
      this.EnergyConsumption.push(
        ((energyData[energyData.length - 1] - energyData[0]) / ((productionData[productionData.length - 1] - productionData[0]) / 1000))
          .toFixed(3)
      )
      this.closeLoading()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
