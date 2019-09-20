<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
import { companies } from 'assets/data/company'
import color from 'assets/data/color'
export default {
  name: 'CompanyOutputInBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'CompanyOutputInBarChart'
    }
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
            value: item.kpi[this.year].output,
            name: item.abbreviation
          })),
        }]
      }
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.legend {
}
</style>
