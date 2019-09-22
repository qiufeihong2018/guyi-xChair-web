<template>
  <div style="height: 100%">
    <div :id="id" style="height: 95%"></div>
    <div>
      <p class="legend" style="top: 5px;color: #60acfc;">
        入口总数: {{repeatedNum}}
      </p>
      <p class="legend" style="top: 25px;color: #45d3eb;">
        次品总数: {{defectiveNum}}
      </p>
      <p class="legend" style="top: 45px;color: #5bc59f;">
        出品总数: {{productionNum}}
      </p>
    </div>
  </div>
</template>

<script>
import resize from '@/mixins/resize'
import color from 'assets/data/color'
import PipelineModel from '@/models/pipeline'
export default {
  name: 'CompanyOutputBarChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'CompanyOutputBarChart'
    },
    outputData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      interval: null,
      timeData: [],
      repeatedCounting: [],
      defectiveNumber: [],
      productionQuantity: [],
      repeatedNum: 0,
      defectiveNum: 0,
      productionNum: 0
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter: '{a}: {c}'
        },
        grid: {
          left: '15%',
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: this.timeData,
          // data: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00',
          //   '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
          //   '19:00', '20:00', '21:00', '22:00', '23:00'],
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            }
          }
        },
        color: color.category6,
        series: [
          {
            name: '入口数量',
            type: 'bar',
            barGap: 0,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.repeatedCounting
          },
          {
            name: '次品数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.defectiveNumber
          },
          {
            name: '出品数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.productionQuantity
          }
        ]
      }
    }
  },
  watch: {
    option(prev, next) {
      this.updateChart()
    },
    outputData(prev, next) {
      this.handleOutputData(prev)
    },
  },
  mounted() {
    this.getPipelineState()
  },
  methods: {
    async getPipelineState(data) {
      // const params = {
      //   id: '', // 生产线的ID
      //   dataType: 'counter', // 请求的数据类型（power 电量和counter 计数器）
      //   durationType: '' // 时间区间的类型(day, yester, week, month) 4类
      // }
      // const res = await PipelineModel.getPipelineData(params)
      let res = {
        value: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          5049,
          5094,
          5264,
          5386,
          null,
          null,
          null,
          null,
          null,
          5992,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        time: [
          '00:00-01:00',
          '01:00-02:00',
          '02:00-03:00',
          '03:00-04:00',
          '04:00-05:00',
          '05:00-06:00',
          '06:00-07:00',
          '07:00-08:00',
          '08:00-09:00',
          '09:00-10:00',
          '10:00-11:00',
          '11:00-12:00',
          '12:00-13:00',
          '13:00-14:00',
          '14:00-15:00',
          '15:00-16:00',
          '16:00-17:00',
          '17:00-18:00',
          '18:00-19:00',
          '19:00-20:00',
          '20:00-21:00',
          '21:00-22:00',
          '22:00-23:00',
          '23:00-24:00'
        ]
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .legend {
    position absolute
    right 40px
    width 200px
  }
</style>
