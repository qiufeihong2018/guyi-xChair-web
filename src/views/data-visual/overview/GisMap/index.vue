<template>
  <div id="anjiMap" style="width: 100%; height:85%; "></div>
</template>

<script type="text/ecmascript-6">
/**
 * 获取坐标 http://api.map.baidu.com/lbsapi/getpoint/index.html
 *
 * */

import echarts from 'echarts'
import option from './option'
export default {
  name: 'zjmap',
  data() {
    return {
      chart: null,
      series: [],
      option
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
    window.addEventListener('resize', this.__resizeHanlder)

    this.chart.on('click', 'series', data => {
      const { alias, id, name } = data.data
      if (id.length === 24) {
        let newRouter = this.$router.resolve({
          path: '/data-visual/company',
          query: {
            id
          }
        })
        window.open(newRouter.href, '_blank')
      }
    })
  },
  beforeDestroy() {
    this.destroyChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('anjiMap'))
      this.chart.setOption(this.option)
      let { chart } = this
      let index = 2 // 播放所在下标
      let mTime = setInterval(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: index
        })
        index += 1
        if (index > 8) {
          index = 2
        }
      }, 3000)
    },
    destroyChart() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    }
  }
}
</script>

<style scoped lang="stylus"></style>
