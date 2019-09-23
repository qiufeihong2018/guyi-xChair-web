<template>
  <div style="height: 95%">
    <time-switch v-on:getTimeRange="getStateTime"></time-switch>
    <div :id="id" style="height: 95%"></div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'
import { mapState } from 'vuex'
export default {
  name: 'UtilizationBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'UtilizationBarChart'
    },
    timeData: {
      type: Array,
      default: () => []
    },
    // chartData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      chart: null,
      interval: null,
      chartData: []
    }
  },
  computed: {
    ...mapState({
      prodlineList: state => state.company.prodlineList,
    }),
    nameList() {
      let list = this.prodlineList.map(item => item.pipelineName)
      const len = 8 - list.length
      if (len > 0) Array.from({ length: len }).forEach(_ => list.push(''))
      return list
    },
    option() {
      return {
        tooltip: {
        },
        grid: {
          left: '15%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: this.nameList,
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
          name: '利用率: %',
          max: 100,
          min: 0,
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
        series: [
          {
            name: '利用率',
            data: this.chartData,
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
          }]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
    prodlineList(prev, next) {
      if (prev.length > 0) {
        this.getStateTime(
          {
            start: +new Date(new Date(new Date().toLocaleDateString()).getTime()) - 1000 * 60 * 60 * 24 * 7,
            end: +new Date()
          }
        )
      }
    }
  },
  mounted() {
    console.log('list', this.nameList)
  },
  methods: {
    getStateTime(range) {
      this.prodlineList.forEach(async (item, index) => {
        const params = {
          id: item.id,
          dataType: 'counter',
          start: range.start,
          end: range.end
        }
        const res = await PipelineModel.getStateTime(params)
        if (res.data.onTime === 0) this.$set(this.chartData, index, 0)
        else this.$set(this.chartData, index, ((res.data.onTime / (res.data.onTime + res.data.pendingTime)) * 100).toFixed(2))
      })
    }
  }
}
</script>

<style scoped lang="stylus"></style>
