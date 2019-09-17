<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import MonitorModel from '@/models/monitor'
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
      chart: null,
      interval: null,
      timeData: [],
      repeatedCounting: [],
      defectiveNumber: [],
      productionQuantity: []
    }
  },
  computed: {
    companyId() {
      return this.$route.query.id
    },
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}'
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
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
          minInterval: 1,
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
        color: color.category6,
        series: [
          {
            name: '入口数量',
            type: 'bar',
            barGap: 0,
            data: this.repeatedCounting
          },
          {
            name: '次品数量',
            type: 'bar',
            data: this.defectiveNumber
          },
          {
            name: '出品数量',
            type: 'bar',
            data: this.productionQuantity
          }
        ]
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
    //
    this.interval = setInterval(() => {
      this.getMonitorData()
    }, 5000)
  },
  beforeDestroy() {
    this.interval = null
  },
  methods: {
    async getMonitorData() {
      let repeatedCounting = []
      let defectiveNumber = []
      let productionQuantity = []
      let time = []
      const params = {
        companyId: this.companyId,
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const res = await MonitorModel.searchMonitor(params)
      res.forEach(item => {
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.productionQuantity) {
          repeatedCounting.push(item.value.repeatedCounting)
          defectiveNumber.push(item.value.defectiveNumber)
          productionQuantity.push(item.value.productionQuantity)
          time.push(this.formDate(item.createdAt))
        }
      })
      this.$nextTick(() => {
        this.timeData = time
        this.repeatedCounting = repeatedCounting.map(item => (item - repeatedCounting[0]))
        this.defectiveNumber = defectiveNumber.map(item => (item - defectiveNumber[0]))
        this.productionQuantity = productionQuantity.map(item => (item - productionQuantity[0]))
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
