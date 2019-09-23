<template>
  <div style="height: 100%">
    <div :id="id" style="height: 95%"></div>
    <div>
      <p class="legend" style="top: 5px;color: #60acfc;">
        入口数量: {{repeatedNum}}
      </p>
      <p class="legend" style="top: 25px;color: #45d3eb;">
        不合格数: {{defectiveNum}}
      </p>
      <p class="legend" style="top: 45px;color: #5bc59f;">
        成品数量: {{productionNum}}
      </p>
    </div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'
export default {
  name: 'ProdlineOutputBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineOutputBarChart'
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
      productionNum: 0,
      intervalId: undefined,
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
          // formatter: '{a}: {c}' // 与 冲突
        },
        // legend: {
        //   data: ['入口数量', '出口数量', '不合格数']
        // },
        grid: {
          left: '15%',
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            type: 'inside',
            maxValueSpan: 12,
            start: 30,
            end: 80
          },
        ],
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          // data: this.timeData,
          data: [
            '0~1时', '1~2时', '2~3时', '3~4时', '4~5时', '5~6时',
            '6~7时', '7~8时', '8~9时', '9~10时', '10~11时', '11~12时',
            '12~13时', '13~14时', '14~15时', '15~16时', '16~17时', '17~18时',
            '18~19时', '19~20时', '20~21时', '21~22时', '22~23时', '23~24时'
          ],
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
            // barGap: 0,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.repeatedCounting,
          },
          {
            name: '不合格数',
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
            name: '成品数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.productionQuantity,
            markLine: {
              data: [
                { type: 'average', name: '生产平均值' }
              ]
            }
          }
        ],
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
    this.openLoading()
    this.handleOutputData()
    // this.getPipelineData()
    this.intervalId = setInterval(() => {
      this.handleOutputData()
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async handleOutputData() {
      let repeatedCounting = []
      let defectiveNumber = []
      let productionQuantity = []
      const params = {
        id: '5d834e6c0c8e9f276745ded0',
        dataType: 'counter',
        durationType: 'today'
      }
      const res = await PipelineModel.getPipelineState(params)
      res.data.forEach((item, index) => {
        if (index > 0) {
          repeatedCounting.push(item.in - res.data[index - 1].in)
          defectiveNumber.push(item.failed - res.data[index - 1].failed)
          productionQuantity.push(item.out - res.data[index - 1].out)
        }
      })
      this.repeatedCounting = repeatedCounting
      this.defectiveNumber = defectiveNumber
      this.productionQuantity = productionQuantity
      this.repeatedNum = this.repeatedCounting.reduce((prev, curr, idx, arr) => prev + curr, 0)
      this.defectiveNum = this.defectiveNumber.reduce((prev, curr, idx, arr) => prev + curr, 0)
      this.productionNum = this.productionQuantity.reduce((prev, curr, idx, arr) => prev + curr, 0)
      this.closeLoading()
    }
    // handleOutputData(data) {
    //   let repeatedCounting = {}
    //   let defectiveNumber = {}
    //   let productionQuantity = {}
    //   let outputTime = []
    //   data.forEach(item => {
    //     const hour = new Date(item.createdAt).getHours()
    //     if ((outputTime.find(n => `${hour}:00` === n)) === undefined) {
    //       outputTime.push(`${hour}:00`)
    //       repeatedCounting[hour] = repeatedCounting[hour] || 0
    //       defectiveNumber[hour] = defectiveNumber[hour] || 0
    //       productionQuantity[hour] = productionQuantity[hour] || 0
    //     }
    //     repeatedCounting[hour] = item.value.repeatedCounting > repeatedCounting[hour]
    //       ? item.value.repeatedCounting : repeatedCounting[hour]
    //     defectiveNumber[hour] = item.value.defectiveNumber > defectiveNumber[hour]
    //       ? item.value.defectiveNumber : defectiveNumber[hour]
    //     productionQuantity[hour] = item.value.productionQuantity > productionQuantity[hour]
    //       ? item.value.productionQuantity : productionQuantity[hour]
    //   })
    //
    //   this.timeData = outputTime
    //   const arr1 = Object.keys(repeatedCounting).map(item => repeatedCounting[item])
    //   const arr2 = Object.keys(defectiveNumber).map(item => defectiveNumber[item])
    //   const arr3 = Object.keys(productionQuantity).map(item => productionQuantity[item])
    //
    //   this.repeatedCounting = arr1.map((item, index) => {
    //     if (index === 0) return item - data[0].value.repeatedCounting
    //     return item - arr1[index - 1]
    //   })
    //   this.defectiveNumber = arr2.map((item, index) => {
    //     if (index === 0) return item - data[0].value.defectiveNumber
    //     return item - arr2[index - 1]
    //   })
    //   this.productionQuantity = arr3.map((item, index) => {
    //     if (index === 0) return item - data[0].value.productionQuantity
    //     return item - arr3[index - 1]
    //   })
    //
    //   this.repeatedNum = this.repeatedCounting.reduce((prev, curr, idx, arr) => prev + curr, 0)
    //   this.defectiveNum = this.defectiveNumber.reduce((prev, curr, idx, arr) => prev + curr, 0)
    //   this.productionNum = this.productionQuantity.reduce((prev, curr, idx, arr) => prev + curr, 0)
    // }
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
