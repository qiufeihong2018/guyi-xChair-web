<template>
  <div style="height: 100%">
    <time-switch :time-options="switchOptions" v-on:getTimeRange="handleOutputData"></time-switch>
    <div :id="id" style="height: 95%"></div>
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
      switchOptions: [
        {
          label: '本日',
          value: 'day'
        }, {
          label: '昨日',
          value: 'yester'
        }
      ],
      durationType: 'day'
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
            color: '#fff'
          },
          formatter(name) {
            return `${name}:${num[name]}`
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
    }
  },
  mounted() {
    this.openLoading()
    this.handleOutputData({
      start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
      end: +new Date()
    })
    // this.getPipelineData()
    this.intervalId = setInterval(() => {
      if (this.durationType === 'day') {
        this.handleOutputData({
          start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
          end: +new Date()
        })
      }
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async handleOutputData(timeData) {
      this.durationType = timeData.durationType || this.durationType
      let repeatedCounting = []
      let defectiveNumber = []
      let productionQuantity = []
      const params = {
        id: this.pipelineId,
        dataType: 'counter',
        start: timeData.start,
        end: timeData.end
      }
      const res = await PipelineModel.getPipelineState2(params)
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
