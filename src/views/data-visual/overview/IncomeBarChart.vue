<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'IncomeBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'IncomeBarChart'
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
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
          splitLine: {
            show: false
          }
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
        series: [{
          name: '营业总收入',
          data: companies.map(item => item.kpi[this.year].operatingIncome),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold'
          }
        },
        {
          name: '销售收入',
          data: companies.map(item => item.kpi[this.year].sale),
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
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

<style scoped lang="stylus">

</style>
