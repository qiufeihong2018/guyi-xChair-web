<template>
  <el-container class="overview">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />
    <div style="margin-right: 15px;position: absolute; top: 10px; right: 40px;z-index:99" @click="goOverviewPage">
      <fa-icon icon-name="home" />
    </div>
      <el-header class="header" height="72px">
      <p>{{this.title}}·详情</p>
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" class="col-item">

          <GraphContainer title="运行状态" class="graph-item xpanel-wrapper-6">
            <ProdlineStatus />
            <ProdlineListTable />
          </GraphContainer>

          <el-row class="xpanel-wrapper-3">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">
              <GraphContainer title="本日产量统计图" class="graph-item xpanel-wrapper-1">
                <p style="position: absolute;right: 40px;top: 5px;color: #60acfc;width: 150px">
                  本日入口总数: {{repeatedNum}}
                </p>
                <p style="position: absolute;right: 40px;top: 25px;color: #45d3eb;width: 150px">
                  本日次品总数: {{defectiveNum}}
                </p>
                <p style="position: absolute;right: 40px;top: 45px;color: #5bc59f;width: 150px">
                  本日出品总数: {{productionNum}}
                </p>
                <OutputBarChart />
              </GraphContainer>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">
              <GraphContainer title="昨日单位能耗系数" class="graph-item xpanel-wrapper-1">
                <OutputBarChart :time-data="outputTimeData" :repeated-counting="repeatedCounting"
                :defective-number="defectiveNumber" :production-quantity="productionQuantity"/>
              </GraphContainer>
            </el-col>
          </el-row>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" class="col-item">
          <GraphContainer title="运行状态图" class="graph-item xpanel-wrapper-3">
            <OperatingStatusBarChart />
          </GraphContainer>
          <GraphContainer title="本日设备能耗" class="graph-item xpanel-wrapper-3">
            <PowerLineChart :time-data="powerTimeData" :chart-data="powerData"/>
          </GraphContainer>
          <GraphContainer title="本月设备有效利用率" class="graph-item xpanel-wrapper-3">
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
// 业务组件
import PowerLineChart from './PowerLineChart'
import OutputBarChart from './OutputBarChart'
import ProdlineListTable from './ProdlineListTable'
import ProdlineStatus from './ProdlineStatus'
import OperatingStatusBarChart from './OperatingStatusBarChart'
import MonitorModel from '@/models/monitor'
export default {
  name: 'DataVisualOverview',
  components: {
    Screenfull,
    GraphContainer,
    PowerLineChart,
    OutputBarChart,
    ProdlineListTable,
    ProdlineStatus,
    OperatingStatusBarChart
  },
  data() {
    return {
      title: '暂无',
      intervalId: undefined,
      powerTimeData: [],
      powerData: [],
      outputTimeData: [],
      repeatedCounting: [],
      defectiveNumber: [],
      productionQuantity: [],
      repeatedNum: 0,
      defectiveNum: 0,
      productionNum: 0
    }
  },
  computed: {
    companyId() {
      return this.$route.query.id
    },
  },
  created() {
    let { id } = this.$route.query
    let company = companies.find(item => item.id === id)
    if ((id && id.length !== 24) || !company) {
      // 返回到overview
      this.$router.push({ path: '/data-visual/overview' })
    }
    this.title = company.alias
  },
  mounted() {
    this.getMonitorData()
    this.intervalId = setInterval(() => {
      this.getMonitorData()
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    goOverviewPage() {
      this.$router.push('/data-visual/overview')
    },
    async getMonitorData() {
      let time = []
      let energy = []
      let repeatedCounting = {}
      let defectiveNumber = {}
      let productionQuantity = {}
      let outputTime = []
      const params = {
        companyId: this.companyId,
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const res = await MonitorModel.searchMonitor(params)
      res.forEach(item => {
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.positiveEnergy) {
          energy.push(item.value.positiveEnergy)
          time.push(this.formDate(item.createdAt))
        }
        if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.productionQuantity) {
          const hour = new Date(item.createdAt).getHours()
          if ((outputTime.find(n => `${hour}:00` === n)) === undefined) {
            outputTime.push(`${hour}:00`)
            repeatedCounting[hour] = repeatedCounting[hour] || 0
            defectiveNumber[hour] = defectiveNumber[hour] || 0
            productionQuantity[hour] = productionQuantity[hour] || 0
          }
          repeatedCounting[hour] = item.value.repeatedCounting > repeatedCounting[hour]
            ? item.value.repeatedCounting : repeatedCounting[hour]
          defectiveNumber[hour] = item.value.defectiveNumber > defectiveNumber[hour]
            ? item.value.defectiveNumber : defectiveNumber[hour]
          productionQuantity[hour] = item.value.productionQuantity > productionQuantity[hour]
            ? item.value.productionQuantity : productionQuantity[hour]
        }
      })
      this.powerTimeData = time
      this.powerData = energy.map(item => ((item - energy[0]) * 2.5).toFixed(3))
      this.outputTimeData = outputTime
      const arr1 = Object.keys(repeatedCounting).map(item => repeatedCounting[item])
      const arr2 = Object.keys(productionQuantity).map(item => defectiveNumber[item])
      const arr3 = Object.keys(productionQuantity).map(item => productionQuantity[item])
      this.repeatedCounting = arr1.map((item, index) => {
        if (index === 0) return 0
        return item - arr1[index - 1]
      })
      this.defectiveNumber = arr2.map((item, index) => {
        if (index === 0) return 0
        return item - arr2[index - 1]
      })
      this.productionQuantity = arr3.map((item, index) => {
        if (index === 0) return 0
        return item - arr3[index - 1]
      })
      this.repeatedNum = this.repeatedCounting.reduce((prev, curr, idx, arr) => prev + curr)
      this.defectiveNum = this.defectiveNumber.reduce((prev, curr, idx, arr) => prev + curr)
      this.productionNum = this.productionQuantity.reduce((prev, curr, idx, arr) => prev + curr)
    },
    formDate(dateForm) {
      if (dateForm === '') { // 解决deteForm为空传1970-01-01 00:00:00
        return ''
      }
      let dateee = new Date(dateForm).toJSON()
      let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .overview {
    height 100%
    background url('../_common/bg.png') center no-repeat
    background-size 100% 100%
    .header {
      margin-bottom 10px
      background url('../_common/header.png') center no-repeat
      line-height 65px
      text-align center
      color #5dc2fe
      font-size 28px
      font-weight 600
    }
    .main {
      .col-item {
        height 100%
        padding 0 5px
        .graph-item {
          padding-bottom 10px
          box-sizing border-box
        }
      }
    }
  }
  .xpanel-wrapper-1 {
    height 100%
  }
  .xpanel-wrapper-2 {
    height 50%
  }
  .xpanel-wrapper-3 {
    height 33.33333%
  }
  .xpanel-wrapper-6 {
    height 66.66666%
  }
</style>
