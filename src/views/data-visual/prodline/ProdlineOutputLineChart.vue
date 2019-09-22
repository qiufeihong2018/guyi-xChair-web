<template>
  <div style="height: 100%">
    <div :id="id" style="height: 95%"></div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'
export default {
  name: 'ProdlineOutputLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineOutputLineChart'
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
      repeatedCounting: [],
      defectiveNumber: [],
      productionQuantity: [],
      repeatedNum: 0,
      defectiveNum: 0,
      productionNum: 0
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
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
    outputData(prev, next) {
      this.handleOutputData(prev)
    },
  },
  mounted() {
  },
  methods: {
    handleOutputData(data) {
      let repeatedCounting = {}
      let defectiveNumber = {}
      let productionQuantity = {}
      let outputTime = []
      data.forEach(item => {
        const hour = new Date(item.createdAt).getHours()
        if ((outputTime.find(n => `${hour}:00` === n)) === undefined) {
          outputTime.push(`${hour}:00`)
          repeatedCounting[hour] = repeatedCounting[hour] || 0
          defectiveNumber[hour] = defectiveNumber[hour] || 0
          productionQuantity[hour] = productionQuantity[hour] || 0
        }
        repeatedCounting[hour] = item.value.repeatedCounting > repeatedCounting[hour]
          ? item.value.repeatedCounting : repeatedCounting[hour]
        defectiveNumber[hour] = item.value.defectiveNumber > defectiveNumber[hour]
          ? item.value.defectiveNumber : defectiveNumber[hour]
        productionQuantity[hour] = item.value.productionQuantity > productionQuantity[hour]
          ? item.value.productionQuantity : productionQuantity[hour]
      })

      this.timeData = outputTime
      const arr1 = Object.keys(repeatedCounting).map(item => repeatedCounting[item])
      const arr2 = Object.keys(defectiveNumber).map(item => defectiveNumber[item])
      const arr3 = Object.keys(productionQuantity).map(item => productionQuantity[item])

      this.repeatedCounting = arr1.map((item, index) => {
        if (index === 0) return item - data[0].value.repeatedCounting
        return item - arr1[index - 1]
      })
      this.defectiveNumber = arr2.map((item, index) => {
        if (index === 0) return item - data[0].value.defectiveNumber
        return item - arr2[index - 1]
      })
      this.productionQuantity = arr3.map((item, index) => {
        if (index === 0) return item - data[0].value.productionQuantity
        return item - arr3[index - 1]
      })

      this.repeatedNum = this.repeatedCounting.reduce((prev, curr, idx, arr) => prev + curr, 0)
      this.defectiveNum = this.defectiveNumber.reduce((prev, curr, idx, arr) => prev + curr, 0)
      this.productionNum = this.productionQuantity.reduce((prev, curr, idx, arr) => prev + curr, 0)
    }
  }
}
</script>

<style scoped lang="stylus">
  .legend {
    position absolute
    right 40px
    width 200px
  }
</style>
