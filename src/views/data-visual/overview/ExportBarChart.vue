<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
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
              value: item.kpi[0].export,
              name: item.abbreviation
            })),
            labelLine: {
              normal: {
                show: false
              }
            },
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
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

<style scoped lang="stylus">

</style>
