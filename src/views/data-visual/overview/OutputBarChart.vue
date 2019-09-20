<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/yearResize'
import { companies } from 'assets/data/company'
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
          radius: '60%',
          label: { // 标签的位置
            normal: {
              show: true,
              formatter(params) {
                return `${params.name}\n${params.value}万元`
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontWeight: 'bold',
                fontSize: 20
              }
            }
          },
          data: companies.map(item => ({
            value: item.kpi[this.year].output,
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
