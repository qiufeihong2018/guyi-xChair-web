/* eslint-disable */
let max = 480
let min = 9
let maxSize4Pin = 100
let minSize4Pin = 20

const anjiData = require('./anji.json')
export default {
  // 提示框(鼠标划过后浮动)
  tooltip: {
    trigger: 'item',
    formatter: params => {
      if (params.value.length === 3) {
        return '<p>' + params.name + '</p><p>' + params.seriesName + ':' + params.value[2] + '</p>'
      } else {
        return '<p>' + params.name + '</p><p>' + params.seriesName + ':' + params.value + '</p>'
      }
    }
  },
  geo: {
    show: true,
    map: 'anji',
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 28,
        },
      }
    },
    zoom: 1.2, // 当前视角的缩放比例
    roam: true, // 是否缩放
    itemStyle: {
      normal: { areaColor: '#00457E', borderColor: '#fff' },
      emphasis: { areaColor: '#2B91B6' }
    },
    // 在地图中对特定的区域配置样式
    // regions: [{
    //   name: '浙江',
    //   itemStyle: {
    //     areaColor: 'green',
    //     color: 'red'
    //   }
    // }]
  },
  visualMap: {
    show: true,
    min: 0,
    max: 200,
    left: 5,
    text: ['多', '少'],
    calculable: true,
    seriesIndex: [1],
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    },
    textStyle: {
      color: '#fff',
      fontSize: '16',
    },
  },
  series: []
}
