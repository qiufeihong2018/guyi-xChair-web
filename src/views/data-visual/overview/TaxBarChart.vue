<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
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
            show: false,
            lineStyle: {
              type: 'dotted'
            }
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
        series: [
          {
            name: '缴税总额',
            data: companies.map(item => item.kpi[this.year].tax),
            type: 'bar',
            label: {
              show: true,
              position: 'top',
            }
          },
          {
            name: '税后收入',
            data: companies.map(item => item.kpi[this.year].profitAfterTax),
            type: 'bar',
            label: {
              show: true,
              position: 'top'
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
