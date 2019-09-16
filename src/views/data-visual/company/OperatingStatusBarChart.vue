<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
import echarts from 'echarts'
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
      chart: null
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter(params) {
            console.log(params)
            return `${params.marker + params.name}: ${params.value[3] / 1000} s`
          }
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'time',
          min: 1525835791000,
          scale: true,
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
          type: 'category',
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
            data: [
              // value 第一个参数: 设备 index;
              //       第二个参数: 状态的开始时间;
              //       第三个参数: 状态的结束时间;
              //       第四个参数: 状态的持续时间;
              { name: '运行', value: [0, 1525835791000, 1525835791000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
              { name: '空转', value: [0, 1525836391000, 1525836391000 + 600000, 600000], itemStyle: { normal: { color: 'yellow' } } },
              { name: '运行', value: [0, 1525836991000, 1525836991000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
              { name: '关机', value: [0, 1525837591000, 1525837591000 + 600000, 600000], itemStyle: { normal: { color: 'red' } } },

              { name: '运行', value: [1, 1525835791000, 1525835791000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
              { name: '运行', value: [1, 1525836391000, 1525836391000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
              { name: '关机', value: [1, 1525836991000, 1525836991000 + 600000, 600000], itemStyle: { normal: { color: 'red' } } },
              { name: '运行', value: [1, 1525837591000, 1525837591000 + 600000, 600000], itemStyle: { normal: { color: 'green' } } },
            ]
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
    // setInterval(() => {
    //   let now = new Date()
    //   this.timeData.push(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
    //   this.chartData.push(Math.round(Math.random() * 10))
    // }, 1000 * 60 *60)
  },
}
</script>

<style scoped lang="stylus">

</style>
