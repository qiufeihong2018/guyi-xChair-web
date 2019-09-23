<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
import { mapState } from 'vuex'
export default {
  name: 'CompanyOutputBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'CompanyOutputBarChart'
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  computed: {
    ...mapState({
      seriesData: state => state.company.companyAllPipelineCounterStat
    }),
    nameList() {
      let list = this.seriesData.map(item => item.pipelineName)
      const len = 8 - list.length
      Array.from({ length: len }).forEach(_ => list.push(''))
      return list
    },
    dataList() {
      return this.seriesData.map(item => item.out)
    },
    yAxisMax() {
      // Y轴的高度
      let max = Math.max(...(this.dataList)) * 1.2
      if (max <= 1000) return 1000
      return Math.ceil(max / 1000) * 1000
    },
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}件'
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
          name: '单位: 件',
          max: this.yAxisMax,
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
            show: true,
            lineStyle: {
              color: 'white',
              type: 'dashed',
            }
          },
        },
        series: [
          {
            name: '产量',
            data: this.seriesData.map(item => item.out),
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter(params) { // 圆环显示文字
                  const value = Math.ceil(params.value * 100) / 100
                  return value
                },
              }
            },
          },
          {
            name: '失误次数',
            data: this.seriesData.map(item => item.failed),
            type: 'bar',
          }
        ]
      }
    }
  },
}
</script>

<style scoped lang="stylus"></style>
