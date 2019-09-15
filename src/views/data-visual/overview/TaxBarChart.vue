<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'TaxBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'TaxBarChart'
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
            name: '缴税总额',
            data: companies.map(item => item.kpi[0].tax),
            type: 'bar',
          },
          {
            name: '税后收入',
            data: companies.map(item => item.kpi[0].profitAfterTax),
            type: 'bar',
          }]
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
