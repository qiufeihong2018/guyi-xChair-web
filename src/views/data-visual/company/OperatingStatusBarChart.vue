<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
import echarts from 'echarts'
import PipelineModel from '@/models/pipeline'
function renderItem(params, api) {
  let categoryIndex = api.value(0)
  let start = api.coord([api.value(1), categoryIndex])
  let end = api.coord([api.value(2), categoryIndex])
  let height = api.size([0, 1])[1] * 0.6

  return {
    type: 'rect',
    shape: echarts.graphic.clipRectByRect({
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height
    }, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }),
    style: api.style()
  }
}

// 补0
function formatBit(val) {
  val = +val
  return val > 9 ? val : `0${val}`
}
// 秒转时分秒，求模很重要，数字的下舍入
function formatSeconds(time) {
  let min = Math.floor(time % 3600)
  let val = `${formatBit(Math.floor(time / 3600))}时${formatBit(Math.floor(min / 60))}分${formatBit((time % 60).toFixed(0))}秒`
  return val
}
export default {
  name: 'OperatingStatusBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'OperatingStatusBarChart'
    },
  },
  data() {
    return {
      chart: null,
      chartData: [],
      state: {
        on: '运行',
        pending: '空转',
        off: '关机'
      },
      color: {
        on: 'green',
        pending: 'yellow',
        off: 'red'
      },
      startTime: 0,
      interval: null
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter(params) {
            return `${params.marker + params.name}: ${formatSeconds(params.value[3] / 1000)}`
          }
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'time',
          min: this.startTime,
          scale: true,
          axisLabel: {
            textStyle: {
              color: '#fff'
            },
            formatter(value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              let date = new Date(value)
              let texts = [formatBit(date.getHours()), formatBit(date.getMinutes()), formatBit(date.getSeconds())]
              return texts.join(':')
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['ALT01', '', '', ''],
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
        // color: ['#5bc49f', '#f9806D', '#feb64d'],
        series: [
          {
            name: '运行', type: 'bar', data: [], color: 'red'
          },
          {
            name: '关机', type: 'bar', data: [], color: 'green'
          },
          {
            name: '空转', type: 'bar', data: [], color: 'yellow'
          },

          {
            type: 'custom',
            renderItem,
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            encode: {
              x: [1, 2, 3],
              y: 0,
            },
            data: this.chartData
            // data: [
            //   // value 第一个参数: 设备 index;
            //   //       第二个参数: 状态的开始时间;
            //   //       第三个参数: 状态的结束时间;
            //   //       第四个参数: 状态的持续时间;
            //   { name: '运行', value: [0, 1525835791000, 1525835791000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            //   { name: '空转', value: [0, 1525836391000, 1525836391000 + 600000, 600000], itemStyle: { normal: { color: 'yellow' } } },
            //   { name: '运行', value: [0, 1525836991000, 1525836991000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            //   { name: '关机', value: [0, 1525837591000, 1525837591000 + 600000, 600000], itemStyle: { normal: { color: 'red' } } },
            //
            //   { name: '运行', value: [1, 1525835791000, 1525835791000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            //   { name: '运行', value: [1, 1525836391000, 1525836391000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            //   { name: '关机', value: [1, 1525836991000, 1525836991000 + 600000, 600000], itemStyle: { normal: { color: 'red' } } },
            //   { name: '运行', value: [1, 1525837591000, 1525837591000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            // ]
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
    this.getPipelineState()
    this.interval = setInterval(() => {
      this.getPipelineState()
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    async getPipelineState() {
      const params = {
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date(),
        pipelineId: '5d80706697d0ba7c7177fd9b'
      }
      const res = await PipelineModel.searchPipelineState(params)
      this.startTime = +new Date(res[0].startTime)
      this.chartData = res.map(item => ({
        name: this.state[item.state],
        value: [0, +new Date(item.startTime), +new Date(item.endTime), item.difTime],
        itemStyle: {
          normal: {
            color: this.color[item.state]
          }
        }
      }))
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
