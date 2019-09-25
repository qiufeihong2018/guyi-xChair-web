<template>
  <div style="height: 100%">
    <div :id="id" style="height: 95%"></div>
    <!--<div>-->
    <!--<p class="legend" style="top: 5px;color: #60acfc;">-->
    <!--入口总数: {{repeatedNum}}-->
    <!--</p>-->
    <!--<p class="legend" style="top: 25px;color: #45d3eb;">-->
    <!--次品总数: {{defectiveNum}}-->
    <!--</p>-->
    <!--<p class="legend" style="top: 45px;color: #5bc59f;">-->
    <!--出品总数: {{productionNum}}-->
    <!--</p>-->
    <!--</div>-->
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
    pipelineId() {
      return this.$route.query.id
    },
    option() {
      const { repeatedNum, defectiveNum, productionNum } = this
      const num = {
        '入口数量': this.repeatedNum,
        '次品数量': this.defectiveNum,
        '出品数量': this.productionNum
      }
      return {
        tooltip: {
          // formatter: '{a}: {c}'
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: {
            fontSize: 16,
            color: '#fff'
          },
          formatter(name) {
            return `${name.slice(0, 2)}: ${num[name]}`
          }
        },
        grid: {
          left: '10%',
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
          name: '单位: 把',
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
        id: this.pipelineId,
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
