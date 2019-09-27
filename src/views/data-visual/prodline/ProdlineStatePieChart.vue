<template>
  <div style="height: 95%">
    <time-switch :time-options="switchOptions" v-on:getTimeRange="getProdlineState"></time-switch>
    <div :id="id" style="height: 100%"></div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'

// 补0
function formatBit(val) {
  val = +val
  return val > 9 ? val : `0${val}`
}
// 秒转时分秒，求模很重要，数字的下舍入
function formatSeconds(time) {
  let min = Math.floor(time % 3600)
  let val = `${formatBit(Math.floor(time / 3600))}时${formatBit(Math.floor(min / 60))}分`
  return val
}
function formatTime(msTime) {
  let time = msTime / 1000

  let day = Math.floor(time / 60 / 60 / 24)

  let hour = Math.floor(time / 60 / 60) % 24

  let minute = Math.floor(time / 60) % 60

  let second = Math.floor(time) % 60

  return `${hour}时${minute}分`
}

export default {
  name: 'ProdlineStatePieChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineStatePieChart'
    },
  },
  data() {
    return {
      chart: null,
      interval: null,
      timeData: [],
      chartData: [],
      states: {
        onTime: '运行',
        offTime: '关机',
        pendingTime: '空转'
      },
      switchOptions: [
        {
          label: '本日',
          value: 'day'
        }, {
          label: '昨日',
          value: 'yester'
        }
      ],
      highlightInterval: undefined,
      durationType: 'day',
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
          formatter(params) {
            return `${params.marker + params.name}: ${formatTime(params.value)}`
          }
        },
        grid: {
          left: '10%'
        },
        color: ['#ff7c7c', '#5bc49f', '#feb64d'],
        series: [
          {
            name: '运行状态',
            data: this.chartData,
            type: 'pie',
            center: ['50%', '40%'],
            radius: [0, '60%'],
            label: {
              normal: {
                show: true,
                formatter(params) {
                  return `${params.name} \n ${formatSeconds(params.value / 1000)}`
                },
                textStyle: {
                  fontSize: 15
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontWeight: 'bold',
                  fontSize: 20
                }
              }
            }
          }]
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
    this.highlightChart()
    this.getProdlineState({
      start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
      end: +new Date()
    })
    // this.getPipelineData()
    this.intervalId = setInterval(() => {
      if (this.durationType === 'day') {
        this.getProdlineState({
          start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
          end: +new Date()
        })
      }
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.highlightInterval)
    clearInterval(this.intervalId)
  },
  methods: {
    highlightChart() {
      let { chart } = this
      let index = 0 // 播放所在下标
      this.highlightInterval = setInterval(() => {
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index === 0 ? 2 : index - 1
        })
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        index += 1
        if (index > 2) index = 0
        // index += 1
        // if (index > 2) index = 0
        // chart.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: index
        // })
      }, 2000)
    },
    async getProdlineState(range) {
      this.durationType = range.durationType || this.durationType
      const params = {
        id: this.pipelineId,
        dataType: 'counter',
        start: range.start,
        end: range.end
      }
      let res = await PipelineModel.getStateTime(params)
      if (this.durationType === 'yester') {
        res.data.offTime = 1000 * 60 * 60 * 24 - res.data.onTime - res.data.pendingTime
      }
      this.chartData = Object.keys(res.data).map(item => ({
        name: this.states[item],
        value: res.data[item]
      }))
      this.closeLoading()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
