// Echart 详细参数信息： https://www.jianshu.com/p/3cf80b96a65d
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      carouselIntervalId: undefined,
    }
  },
  mounted() {
    this.drawChart()
    // 监听窗口的变化
    window.addEventListener('resize', this.__resizeHanlder)
  },
  computed: {
    ...mapState({
      year: state => state.visual.year
    })
  },
  beforeDestroy() {
    this.destroyChart()
    clearInterval(this.carouselIntervalId)
  },
  watch: {
    year() {
      this.updateChart()
    }
  },
  methods: {
    __resizeHanlder() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    drawChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
    },
    updateChart() {
      this.chart.setOption(this.option)
    },
    destroyChart() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    carousel(startIndex, endIndex, intervalTime = 2000) {
      let { chart } = this
      let index = startIndex // 播放所在下标
      let len = endIndex + 1
      this.carouselIntervalId = setInterval(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: index
        })
        index += 1
        if (index > len) index = 0
      }, intervalTime)
    }
  },
}
