<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'

// 补0
function formatBit(val) {
  val = +val
  return val > 9 ? val : `0${val}`
}
// 秒转时分秒，求模很重要，数字的下舍入
function formatSeconds(time) {
  let min = Math.floor(time % 3600)
  let val = `${formatBit(Math.floor(time / 3600))}时${formatBit(Math.floor(min / 60))}分${formatBit((time % 60).toFixed(0))}秒`
  return val
}

export default {
  name: 'ProdlineStatePieChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ProdlineStatePieChart'
    },
  },
  data() {
    return {
      chart: null,
      interval: null,
      timeData: [],
      chartData: [],
      states: {
        onTime: '运行',
        offTime: '关机',
        pendingTime: '空转'
      }
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter(params) {
            return `${params.marker + params.name}: ${formatSeconds(params.value / 1000)}`
          }
        },
        grid: {
          left: '15%'
        },
        color: ['#ff7c7c', '#5bc49f', '#feb64d'],
        series: [
          {
            name: '运行状态',
            data: this.chartData,
            type: 'pie',
            center: ['50%', '40%'],
            radius: [0, '60%']
          }]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    }
  },
  mounted() {
    this.getProdlineState()
  },
  methods: {
    async getProdlineState() {
      const params = {
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const res = await PipelineModel.getStateTime(params)
      this.chartData = Object.keys(res).map(item => ({
        name: this.states[item],
        value: res[item]
      }))
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
