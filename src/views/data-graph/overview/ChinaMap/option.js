/* eslint-disable */
import { cityGeo } from 'assets/data/index'
let max = 480
let min = 9
let maxSize4Pin = 100
let minSize4Pin = 20

export default {
  // 提示框(鼠标划过后浮动)
  tooltip: {
    trigger: 'item',
    formatter: params => {
      if (params.value.length === 3) {
        return '<p>' + params.name + '</p><p>' + '院校数量:' + params.value[2] + '</p>'
      } 
      // else {
      //   return '<p>' + params.name + '</p><p>' + params.seriesName + ':' + params.value + '</p>'
      // }
    }
  },
  geo: {
    show: true,
    map: 'china',
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
          fontSize: 12,
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
    max: 65,
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
  series: [
    {
      name: '院校数量(省)',
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      aspectScale: 0.75, // 长宽比
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        }
      },
      roam: true,
      animation: false,
      data: [
        { name: '北京', value: 92 },
        { name: '天津', value: 57 },
        { name: '上海', value: 64 },
        { name: '重庆', value: 65 },
        { name: '河北', value: 121 },
        { name: '河南', value: 134 },
        { name: '云南', value: 77 },
        { name: '辽宁', value: 115 },
        { name: '黑龙江', value: 81 },
        { name: '湖南', value: 124 },
        { name: '安徽', value: 119 },
        { name: '山东', value: 145 },
        { name: '新疆', value: 47 },
        { name: '江苏', value: 167 },
        { name: '浙江', value: 107 },
        { name: '江西', value: 100 },
        { name: '湖北', value: 129 },
        { name: '广西', value: 74 },
        { name: '甘肃', value: 1 },
        { name: '山西', value: 80 },
        { name: '内蒙古', value: 53 },
        { name: '陕西', value: 93 },
        { name: '吉林', value: 62 },
        { name: '福建', value: 89 },
        { name: '贵州', value: 70 },
        { name: '广东', value: 123 },
        { name: '青海', value: 12 },
        { name: '西藏', value: 7 },
        { name: '四川', value: 125 },
        { name: '宁夏', value: 18 },
        { name: '海南', value: 14 },
        { name: '台湾', value: undefined },
        { name: '香港', value: undefined },
        { name: '澳门', value: undefined }
      ]
    },
    {
      name: '院校数量(市)',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin', // 气泡
      symbolSize: val => {
        let a = (maxSize4Pin - minSize4Pin) / (max - min)
        let b = minSize4Pin - a * min
        b = maxSize4Pin - a * max
        return a * val[2] + b
      },
      label: {
        normal: {
          show: true,
          formatter: param => {
            return param.value[2]
          },
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
      },
      itemStyle: {
        normal: {
          color: '#F62157'
        }
      },
      zlevel: 6,
      data: cityGeo
    }
  ]
}
