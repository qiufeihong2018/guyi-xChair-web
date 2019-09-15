<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'

export default {
  name: 'PowerLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'PowerLineChart'
    },
  },
  data() {
    return {
      chart: null,
      timeData: [],
      chartData: []
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '15%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: this.timeData,
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
          name: '单位: 千瓦时',
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
        series: [
          {
            name: '耗电量',
            data: this.chartData,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true
          }]
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
    // }, 1000)
  },
}
</script>

<style scoped lang="stylus">

</style>
