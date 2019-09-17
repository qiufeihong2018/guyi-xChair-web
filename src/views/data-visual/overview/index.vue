<template>
  <el-container class="overview">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />
    <el-header class="header" height="72px">
      <p>安吉椅艺大数据平台</p>
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="24" :lg="6" class="col-item">
          <GraphContainer title="工业总产值" class="graph-item xpanel-wrapper-2">
            <output-bar-chart></output-bar-chart>
          </GraphContainer>
          <GraphContainer title="销售收入与营业总收入" class="graph-item xpanel-wrapper-2">
            <income-bar-chart></income-bar-chart>
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item">
          <GraphContainer title="入驻企业分布" class="graph-item xpanel-wrapper-1">
            <CompanyListTable />
            <GisMap />
            <NotEnterCompany />
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" class="col-item">
          <GraphContainer title="缴税总额与税后收入" class="graph-item xpanel-wrapper-3">
            <tax-bar-chart></tax-bar-chart>
          </GraphContainer>
          <GraphContainer title="资产总额与固定资产" class="graph-item xpanel-wrapper-3">
            <asset-bar-chart></asset-bar-chart>
          </GraphContainer>
          <GraphContainer title="出口创汇" class="graph-item xpanel-wrapper-3">
            <export-bar-chart></export-bar-chart>
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
import OutputBarChart from './OutputBarChart'
import IncomeBarChart from './IncomeBarChart'
import TaxBarChart from './TaxBarChart'
import AssetBarChart from './AssetBarChart'
import ExportBarChart from './ExportBarChart'
import GisMap from './GisMap'
import CompanyListTable from './CompanyListTable'
import NotEnterCompany from './NotEnterCompany'

export default {
  name: 'DataVisualOverview',
  components: {
    Screenfull,
    GraphContainer,
    OutputBarChart,
    IncomeBarChart,
    TaxBarChart,
    AssetBarChart,
    ExportBarChart,
    GisMap,
    CompanyListTable,
    NotEnterCompany
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
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
</style>
