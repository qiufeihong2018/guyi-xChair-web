<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { mapState } from 'vuex'
import color from 'assets/data/color'
export default {
  name: 'BarChartOfEnergyCostFacter',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'BarChartOfEnergyCostFacter'
    },
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    ...mapState({
      companyAllPipelinePowerStat: state => state.company.companyAllPipelinePowerStat,
      companyAllPipelineCounterStat: state => state.company.companyAllPipelineCounterStat
    }),
    nameList() {
      let list = this.companyAllPipelinePowerStat.map(item => item.pipelineName)
      const len = 8 - list.length
      Array.from({ length: len }).forEach(_ => list.push(''))
      return list
    },
    seriesData() {
      let list = []
      this.companyAllPipelineCounterStat.forEach((item, index) => {
        let value = (this.companyAllPipelinePowerStat[index].power * 1000) / (item.out)
        if (!value) value = 0
        list.push({ value, name: item.pipelineName })
      })
      return list
    },
    dataList() {
      return this.seriesData.map(item => item.value)
    },
    yAxisMax() {
      // Y轴的高度
      console.log('dataList', this.dataList)
      let max = Math.max(...(this.dataList)) * 1.2
      if (max <= 20) return 20
      return Math.ceil(max / 10) * 10
    },
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}'
        },
        grid: {
          left: '10%'
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
          name: '单位: 千瓦·时/千把',
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
            name: '能耗系数',
            data: this.dataList,
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
          }]
      }
    }
  }
}
</script>

<style scoped lang="stylus"></style>
