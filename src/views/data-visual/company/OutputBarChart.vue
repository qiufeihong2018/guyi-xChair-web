<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'OutputBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'OutputBarChart'
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
          formatter: '{a}: {c}万元'
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
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
        color: color.category6,
        series: [
          {
            name: '入口数量',
            type: 'bar',
            barGap: 0,
            data: [320, 332, 301, 334, 390, 320]
          },
          {
            name: '次品数量',
            type: 'bar',
            data: [220, 182, 191, 234, 290, 332]
          },
          {
            name: '出品数量',
            type: 'bar',
            data: [150, 232, 201, 154, 190, 390]
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
