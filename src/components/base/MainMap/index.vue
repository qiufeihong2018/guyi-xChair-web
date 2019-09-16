<template>
  <div>
    <div id="mapContainer" style="width:100%;height: 95%"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as api from '@/utils/request'
import mapData from '@/assets/data/anjiMap'
import company from '@/assets/data/company'
const { TMap } = window
export default {
  name: 'MapChart',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let map = new TMap.Map('mapContainer', {
        center: new TMap.LatLng(30.6003898649, 119.5540173328), // 地图显示中心点
        pitch: 30,
        mapStyleId: 'style1',
        scrollable: false,
        draggable: false,
        zoomControl: false
      })
      let data = company
      let coords = []
      data.forEach(item => {
        coords.push(new TMap.LatLng(item.from.lat, item.from.lng))
      })
      let latlngBounds = new TMap.LatLngBounds()
      for (let i = 0; i < coords.length; i += 1) {
        latlngBounds.extend(coords[i])
      }
      map.fitBounds(latlngBounds)
      console.log(coords)
      let path = mapData
      path = path.map(p => new TMap.LatLng(p[0], p[1]))
      let polygon = new TMap.MultiPolygon({
        id: 'polygon-layer', // 图层id
        map, // 设置多边形图层显示到哪个地图实例中
        // 多边形样式
        styles: {
          'polygon': new TMap.PolygonStyle({
            'showBorder': true, // 是否显示拔起面的边线
            'borderColor': '#00FFFF' // 边线颜色
          })
        },
        // 多边形数据
        geometries: [
          {
            'id': 'p1', // 该多边形在图层中的唯一标识（删除、更新数据时需要）
            'styleId': 'polygon', // 绑定样式名
            'paths': path, // 多边形轮廓
          }
        ]
      })

      let arc = new TMap.visualization.Arc({
        pickStyle: e => ({
          color: '#0037C2',
          animateColor: '#35D4FF'
        }),
        animatable: true,
        opacity: 0.7, // 设置弧线透明度
        width: 3, // 设置弧线宽度
        mode: 'vertical' // 弧线平面与地平面垂直

      }).addTo(map)
      arc.setData(data)// 设置数据
      let s = document.getElementsByClassName('zoom-control')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .zoom-control{
    display none
  }
</style>
