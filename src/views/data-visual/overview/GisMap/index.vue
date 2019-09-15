<template>
  <div id="anjiMap" style="width: 100%; height:85%; "></div>
</template>

<script type="text/ecmascript-6">
/**
 * 获取坐标 http://api.map.baidu.com/lbsapi/getpoint/index.html
 * 
 * */ 
import echarts from 'echarts'
const anjiData = require('./anji.json')
export default {
  name: 'zjmap',
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'item',
          formatter(params) {
            if (params.name === '杭电安吉研究院') return '数据中心'
            return `${params.name} <br> 生产线: ${params.value[2]} 条`
          }
        },
        geo: {
          roam: true,
          map: 'zhejiang',
          geoIndex: 0,
          aspectScale: 0.75,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#05C3F9'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(63, 218, 255, 0.1)',
              borderColor: 'rgba(63, 218, 255, 0.8)',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)'
            },
            emphasis: {
              // areaColor: '#2B91B7'
              areaColor: 'rgba(63, 218, 255, 0.1)',
              borderColor: 'rgba(63, 218, 255, 0.8)',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)'
            }
          }
        },
        series: [
          {
            name: '事件',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [
              {
                id: '0',
                name: '杭电安吉研究院',
                alias: '数据中心',
                value: [119.703307, 30.657736, 0, '中心']
              },
              {
                id: '5d7e63c1ba35562fe1084626',
                name: '中源家居股份有限公司',
                alias: '中源家居',
                value: [119.616093, 30.62116, 1, '入驻']
              },
              {
                id: '5d7e642d201b65318803e39f',
                name: '永艺家具股份有限公司',
                alias: '永艺家具',
                value: [119.675803, 30.607438, 1, '入驻'],
              },
              {
                id: '5d7e6443201b65318803e3a0',
                name: '浙江恒林椅业股份有限公司',
                alias: '恒林椅业',
                value: [119.681168, 30.661117, 1, '入驻'],
              },
              {
                id: '5d7e6450201b65318803e3a1',
                name: '安吉富和家具股份有限公司',
                alias: '富和家具',
                value: [119.678959, 30.612794, 1, '入驻']
              },
              {
                id: '5d7e6459201b65318803e3a2',
                name: '安吉隆博家具股份有限公司',
                alias: '隆博家具',
                value: [119.613253, 30.671319, 1, '入驻']
              },
              {
                id: '5d7e6467201b65318803e3a3',
                name: '浙江盛信椅业股份有限公司',
                alias: '盛信椅业',
                value: [119.619262, 30.622846, 1, '入驻']
              },
            ],
            symbolSize: val => 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 4
            },
            itemStyle: {
              normal: {
                color(params) {
                  if (params.value[3] === '入驻') {
                    return 'green'
                  }
                  return 'blue'
                }
              },
            }
          },
        ]
      }
    }
  },
  mounted() {
    echarts.registerMap('zhejiang', anjiData)
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
          path: '/data-visual/company-detail',
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
