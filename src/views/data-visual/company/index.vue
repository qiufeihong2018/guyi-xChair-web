<template>
  <el-container class="overview">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />
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
                <OutputBarChart />
              </GraphContainer>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">
              <GraphContainer title="昨日单位能耗系数" class="graph-item xpanel-wrapper-1">
                <OutputBarChart />
              </GraphContainer>
            </el-col>
          </el-row>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" class="col-item">
          <GraphContainer title="运行状态图" class="graph-item xpanel-wrapper-3">
            <operating-status-bar-chart></operating-status-bar-chart>
          </GraphContainer>
          <GraphContainer title="本日设备能耗" class="graph-item xpanel-wrapper-3">
            <PowerLineChart />
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
import PowerLineChart from './PowerLineChart'
import OutputBarChart from './OutputBarChart'
import ProdlineListTable from './ProdlineListTable'
import ProdlineStatus from './ProdlineStatus'
import OperatingStatusBarChart from './OperatingStatusBarChart'
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
      title: '暂无'
    }
  },
  computed: {},
  created() {
    let { id } = this.$route.query
    let company = companies.find(item => item.id === id)
    if ((id && id.length !== 24) || !company) {
      // 返回到overview
      this.$router.push({ path: '/data-visual/overview' })
    }
    this.title = company.alias
  },
  mounted() { },
  methods: {},
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
