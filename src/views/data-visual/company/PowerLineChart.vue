<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'

export default {
  name: 'PowerLineChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'PowerLineChart'
    },
  },
  data() {
    return {
      chart: null,
      timeData: [],
      chartData: [],
      interval: null,
    }
  },
  computed: {
    companyId() {
      return this.$route.query.id
    },
    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '15%'
        },
        color: color.category6,
        xAxis: {
          type: 'category',
          data: this.timeData,
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
          name: '单位: 千瓦时',
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
            name: '耗电量',
            data: this.chartData,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true
          }]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
  },
  async mounted() {
    this.getMonitorData()

    this.interval = setInterval(() => {
      this.getMonitorData()
    }, 5000)
  },
  beforeDestroy() {
    this.interval = null
  },
  methods: {
    async getMonitorData() {
      let time = []
      let energy = []
      const params = {
        companyId: this.companyId,
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const res = await MonitorModel.searchMonitor(params)
      res.forEach(item => {
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.positiveEnergy) {
          energy.push(item.value.positiveEnergy)
          time.push(this.formDate(item.createdAt))
        }
      })
      this.$nextTick(() => {
        this.timeData = time
        this.chartData = energy.map(item => (item - energy[0]) * 2.5)
      })
    },
    formDate(dateForm) {
      if (dateForm === '') { // 解决deteForm为空传1970-01-01 00:00:00
        return ''
      }
      let dateee = new Date(dateForm).toJSON()
      let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
