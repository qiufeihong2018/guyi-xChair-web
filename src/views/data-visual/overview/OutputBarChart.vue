<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import year from '@/mixins/yearResize'
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'OutputBarChart',
  mixins: [resize, year],
  props: {
    id: {
      type: String,
      default: 'OutputBarChart'
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
          formatter: '{a}: {c}万元'
        },
        grid: {
          left: '10%'
        },
        legend: {
          type: 'scroll',
          textStyle: {
            color: '#fff'
          }
        },
        color: color.category6,
        series: [{
          name: '工业总产值',
          type: 'pie',
          radius: '60%',
          label: { // 标签的位置
            normal: {
              show: true,
              formatter(params) {
                return `${params.name}\n${params.value}万元`
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontWeight: 'bold',
                fontSize: 20
              }
            }
          },
          data: companies.map(item => ({
            value: item.kpi[this.year].output,
            name: item.abbreviation
          })),
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

<style scoped lang="stylus">

</style>
