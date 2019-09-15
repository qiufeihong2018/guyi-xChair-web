<template>
  <div id="anjiMap" style="width: 100%; height:85%; "></div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts'
import { debounce } from '@/utils'
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
            return `${params.name} : ${params.value[2]}`
          }
        },
        geo: {
          roam: false,
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
              areaColor: '#2B91B7'
            }
          }
        },
        series: [
          {
            name: '事件',
            type: 'effectScatter', 
            coordinateSystem: 'geo',
            data: [
              { name: '浙江永艺家具股份有限公司', value: [119.675803, 30.607438, 10] },
              { name: '安吉联胜家具有限公司', value: [119.675287, 30.61134, 10] },
              { name: '大康控股集团有限公司', value: [119.632147, 30.649607, 10] },
              { name: '浙江恒林椅业股份有限公司', value: [119.681168, 30.661117, 11] },
              { name: '浙江强盛家具有限公司', value: [119.617488, 30.623658, 10] },
              { name: '浙江强龙椅业股份有限公司', value: [119.674146, 30.603053, 10] },
              { name: '浙江安吉铭成椅业有限责任公司', value: [119.610193, 30.668225, 11] },
              { name: '安吉伟誉家具有限公司', value: [119.626689, 30.655155, 10] },
              { name: '浙江五星家具有限公司', value: [119.684128, 30.663911, 10] },
              { name: '浙江中义家具有限公司', value: [119.681046, 30.624341, 10] },
            ],
            tooltip: {
              formatter(params) {
                return `${params.name}:${params.value[2]}`
              }
            },
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 4
            },
            itemStyle: {
              normal: {
                color(params) {
                  if (params.value[2] < 30) {
                    return 'green'
                  } if (params.value[2] >= 30 && params.value[2] <= 80) {
                    return 'yellow'
                  }
                  return 'red'
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 5)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    this.destroyChart()
  },
  methods: {
    initChart() {
      echarts.registerMap('zhejiang', anjiData)
      this.chart = echarts.init(document.getElementById('anjiMap'))
      this.chart.setOption(this.option)
    },
    convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i += 1) {
        const geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
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
