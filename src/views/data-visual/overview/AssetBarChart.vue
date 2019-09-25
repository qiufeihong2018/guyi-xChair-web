<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'AssetBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'AssetBarChart'
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
          // formatter: '{a}: {c}万元'
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: companies.map(item => item.abbreviation),
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
          name: '单位：万元',
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
              type: 'dotted'
            }
          }
        },
        series: [
          {
            name: '资产总额',
            data: companies.map(item => item.kpi[this.year].totalAsset),
            type: 'bar',
            label: {
              show: true,
              position: 'top',
            }
          },
          {
            name: '固定资产',
            data: companies.map(item => item.kpi[this.year].fixedAsset),
            type: 'bar',
            label: {
              show: true,
              position: 'top',
            }
          }]
      }
    }
  },
  mounted() {
    this.carousel(0, 5)
  },
}
</script>

<style scoped lang="stylus"></style>
