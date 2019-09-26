<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import year from '@/mixins/yearResize'
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'ExportBarChart',
  mixins: [resize, year],
  props: {
    id: {
      type: String,
      default: 'ExportBarChart'
    },
  },
  data() {
    return {
      chart: null,
      highlightInterval: null
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}万美元'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'left',
          textStyle: {
            color: '#fff'
          }
        },
        color: color.category6,
        series: [
          {
            name: '出口创汇',
            type: 'pie',
            data: companies.map(item => ({
              value: item.kpi[this.year].export,
              name: item.abbreviation
            })),
            labelLine: {
              normal: {
                show: true
              }
            },
            center: ['50%', '40%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: true,
            label: {
              fontSize: 14,
              formatter(params) {
                return `${params.name}\n${params.value}万美元`
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              }
            }
          }]
      }
    }
  },
  mounted() {
    this.highlightChart()
  },
  destroyed() {
    clearInterval(this.highlightInterval)
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
        if (index > 6) index = 0
        // index += 1
        // if (index > 2) index = 0
        // chart.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: index
        // })
      }, 2000)
    }
  }
}
</script>

<style scoped lang="stylus"></style>
