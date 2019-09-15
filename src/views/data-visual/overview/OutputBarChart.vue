<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import { companies } from 'assets/data/company'
import echarts from 'echarts'
import color from 'assets/data/color'
export default {
  name: 'OutputBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'OutputBarChart'
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
        legend: {
          type: 'scroll',
          textStyle: {
            color: '#fff'
          }
        },
        color: color.category6,
        series: [{
          name: '工业总产值',
          type: 'pie',
          data: companies.map(item => ({
            value: item.kpi[0].output,
            name: item.abbreviation
          })),
        }]
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
