// Echart 详细参数信息： https://www.jianshu.com/p/3cf80b96a65d
import echarts from 'echarts'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      loadingInstance: '',
      loadingOptions: {
        background: 'rgba(0, 0, 0, 0.2)',
        spinner: 'el-icon-loading'
      },
      carouselIntervalId: undefined
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    }
  },
  mounted() {
    this.drawChart()
    // 监听窗口的变化
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    this.destroyChart()
    clearInterval(this.carouselIntervalId)
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
    openLoading() {
      this.loadingOptions.target = document.getElementById(this.id).parentNode
      this.loadingOptions.fullscreen = true
      this.loadingOptions.text = '数据加载中'
      this.loadingInstance = Loading.service(this.loadingOptions)
    },
    closeLoading() {
      this.loadingInstance.close()
    },
    carousel(startIndex, endIndex) {
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
      }, 2000)
    }
  },
}
