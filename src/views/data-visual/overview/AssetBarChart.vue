<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
import echarts from 'echarts'
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
          formatter: '{a}: {c}万元'
        },
        grid: {
          left: '15%'
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
        },
        series: [
          {
            name: '资产总额',
            data: companies.map(item => item.kpi[0].totalAsset),
            type: 'bar',
          },
          {
            name: '固定资产',
            data: companies.map(item => item.kpi[0].fixedAsset),
            type: 'bar',
          }]
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
