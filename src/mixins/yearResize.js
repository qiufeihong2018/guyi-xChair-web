// Echart 详细参数信息： https://www.jianshu.com/p/3cf80b96a65d
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      carouselIntervalId: undefined,
    }
  },
  computed: {
    ...mapState({
      year: state => state.visual.year
    })
  },
  watch: {
    year() {
      this.updateChart()
    }
  },
  methods: {

    updateChart() {
      this.chart.setOption(this.option)
    }
  },
}
