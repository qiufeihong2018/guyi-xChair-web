<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'ExportBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ExportBarChart'
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
  }
}
</script>

<style scoped lang="stylus"></style>
