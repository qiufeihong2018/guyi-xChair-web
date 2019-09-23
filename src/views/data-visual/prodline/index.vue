<template>
  <el-container class="prodline">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />

    <div style="margin-right: 15px;position: absolute; top: 10px; right: 40px;z-index:99"  @click="goOverviewPage">
      <fa-icon icon-name="home" />
    </div>
    <el-header class="header" height="72px">
      <p>生产线·详情</p>
      <DigitalClock/>
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" class="col-item">

          <GraphContainer title="当日生产详情" class="graph-item xpanel-wrapper-6">
            <ProdlineTableOfProductList />
          </GraphContainer>

          <el-row class="xpanel-wrapper-3">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">

              <GraphContainer title="本日产量统计图" class="graph-item xpanel-wrapper-1">
                <ProdlineOutputBarChart :output-data="prodlineOutput"></ProdlineOutputBarChart>
              </GraphContainer>

            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">

              <GraphContainer title="单位能耗系数" class="graph-item xpanel-wrapper-1">
                <ProdlineCoefficientLineChart
                  :energy-data="prodlineEnergy" :output-data="prodlineOutput">
                </ProdlineCoefficientLineChart>
              </GraphContainer>

            </el-col>
          </el-row>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" class="col-item">
          <GraphContainer title="运行状态图" class="graph-item xpanel-wrapper-3">
            <ProdlineStatePieChart></ProdlineStatePieChart>
          </GraphContainer>
          <GraphContainer title="设备能耗" class="graph-item xpanel-wrapper-3">
            <ProdlineEnergyLineChart :energy-data="prodlineEnergy"></ProdlineEnergyLineChart>
          </GraphContainer>
          <GraphContainer title="产量趋势图" class="graph-item xpanel-wrapper-3">
            <ProdlineTrendLineChart></ProdlineTrendLineChart>
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
// 图表组件
import ProdlineTableOfProductList from './ProdlineTableOfProductList'
import ProdlineOutputBarChart from './ProdlineOutputBarChart'
import ProdlineEnergyLineChart from './ProdlineEnergyLineChart'
import ProdlineStatePieChart from './ProdlineStatePieChart'
import ProdlineCoefficientLineChart from './ProdlineCoefficientLineChart'
import ProdlineTrendLineChart from './ProdlineTrendLineChart'
// models
import PipelineModel from '@/models/pipeline'
export default {
  name: 'ProdlineIndex',
  components: {
    Screenfull,
    GraphContainer,
    ProdlineTableOfProductList,
    ProdlineOutputBarChart,
    ProdlineEnergyLineChart,
    ProdlineStatePieChart,
    ProdlineCoefficientLineChart,
    ProdlineTrendLineChart
  },
  data() {
    return {
      pipelineId: '',
      prodlineOutput: [],
      prodlineEnergy: [],
      intervalId: undefined,
    }
  },
  computed: {},
  created() {
    let { id } = this.$route.query
    if (id && id.length !== 24) this.goOverviewPage()
    this.pipelineId = id
    this.$store.commit('company/SET_PIPELINE_ID', id) // 设置全局的当前的pipelineID
  },
  mounted() {
    // this.getPipelineData()
    // this.intervalId = setInterval(() => {
    //   this.getPipelineData()
    // }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    goOverviewPage() {
      this.$router.push({ path: '/data-visual/overview' })
    },
    async getPipelineData() {
      const params = {
        pipelineId: '5d834e6c0c8e9f276745ded0',
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const { outputData, energyData } = await PipelineModel.searchPipeline(params)
      this.prodlineOutput = outputData
      this.prodlineEnergy = energyData
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.prodline {
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
