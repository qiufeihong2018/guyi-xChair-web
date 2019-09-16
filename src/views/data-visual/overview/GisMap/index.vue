<template>
  <div id="anjiMap" style="width: 100%; height:85%; "></div>
</template>

<script type="text/ecmascript-6">
/**
 * 获取坐标 http://api.map.baidu.com/lbsapi/getpoint/index.html
 *
 * */

import echarts from 'echarts'
const chinaGeoCoordMap = {
  '中源家居股份有限公司': [119.616093, 30.62116],
  '永艺家具股份有限公司': [119.675803, 30.607438],
  '浙江恒林椅业股份有限公司': [119.681168, 30.661117],
  '安吉富和家具股份有限公司': [119.678959, 30.612794],
  '安吉隆博家具股份有限公司': [119.613253, 30.671319],
  '浙江盛信椅业股份有限公司': [119.619262, 30.622846]
}
const chinaDatas = [
  {
    id: '0',
    name: '杭电安吉研究院',
    alias: '数据中心',
    value: [119.703307, 30.657736, 0, '中心']
  },
  {
    id: '1',
    name: '云服务',
    alias: '云服务中心',
    value: [119.858748, 30.820739, 3, '中心']
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
]
const anjiData = require('./anji.json')
export default {
  name: 'zjmap',
  data() {
    return {
      chart: null,
      series: [],
      option: {
        tooltip: {
          trigger: 'item',
          formatter(params) {
            if (params.name === '杭电安吉研究院') return '数据中心'
            console.log(params)
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
                color: '#05C3F9',
                fontSize: 20
              }
            },
            emphasis: {
              textStyle: {
                color: '#05C3F9',
                fontSize: 21
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
        series: []
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
      this.initSeries()
      this.chart = echarts.init(document.getElementById('anjiMap'))
      this.option.series = this.series
      this.chart.setOption(this.option)
    },
    initSeries() {
      let convertData = function (data) {
        console.log(data)
        let res = []
        for (let i = 0; i < data.length; i += 1) {
          let dataItem = data[i]
          let fromCoord = chinaGeoCoordMap[dataItem.name]
          let toCoord = [119.858748, 30.820739]
          if (fromCoord && toCoord) {
            res.push([{
              coord: fromCoord,
              value: dataItem.value
            }, {
              coord: toCoord,
            }])
          }
        }
        return res
      }
      let series = [];
      [['数据中心', chinaDatas]].forEach((item, i) => {
        series.push({
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 5, // 图标大小
            color: '#00eaff'
          },
          lineStyle: {
            normal: {
              color: '#00eaff',
              width: 1, // 尾迹线条宽度
              opacity: 1, // 尾迹线条透明度
              curveness: 0.3 // 尾迹线条曲直度
            }
          },
          data: convertData(item[1])
        },
        // {
        //   type: 'lines',
        //   zlevel: 2,
        //   effect: {
        //     show: true,
        //     period: 4, // 箭头指向速度，值越小速度越快
        //     trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
        //     symbol: 'arrow', // 箭头图标
        //     symbolSize: 5, // 图标大小
        //     color: '#00eaff'
        //   },
        //   lineStyle: {
        //     normal: {
        //       color: '#fff852',
        //       width: 1, // 尾迹线条宽度
        //       opacity: 1, // 尾迹线条透明度
        //       curveness: 0.3 // 尾迹线条曲直度
        //     }
        //   },
        //   data: [{ coord: [119.858748, 30.820739], value: [119.858748, 30.820739, 3, '中心'] }, { coord: [119.858748, 30.820739] }]
        // },
        {
          name: '事件',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: chinaDatas,
          symbolSize: val => 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              formatter(params) { // 圆环显示文字
                if (params.data.id === '1' || params.data.id === '0') {
                  return params.data.alias
                }
                return ''
              },
              fontSize: 13
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color(params) {
                if (params.value[3] === '入驻') {
                  return 'green'
                }
                return 'yellow'
              }
            },
          }
        },)
      })
      this.series = series
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
