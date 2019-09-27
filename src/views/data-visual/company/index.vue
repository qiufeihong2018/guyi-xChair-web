<template>
  <el-container class="overview">
    <el-tooltip content="全屏显示" placement="bottom">
      <Screenfull style="position: fixed; top: 10px; right: 10px;" />
    </el-tooltip>
    <el-tooltip content="返回大屏" placement="bottom">
      <div style="margin-right: 15px;position: absolute; top: 10px; right: 40px;z-index:99"
           @click="goOverviewPage">
        <fa-icon icon-name="home" />
      </div>
    </el-tooltip>
    <el-header class="header" height="72px">
      <p>{{this.title}}·详情</p>
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" class="col-item">

          <GraphContainer title="运行状态" class="graph-item xpanel-wrapper-6">
            <!--<div class="visual-select">-->
              <!--<el-select-->
                <!--v-model="companyId"-->
                <!--placeholder="请选择"-->
                <!--size="mini"-->
                <!--popper-class="select-option"-->
                <!--@change="changeCompany">-->
                <!--<el-option-->
                  <!--v-for="item in companyList"-->
                  <!--:key="item._id"-->
                  <!--:label="item.chineseName"-->
                  <!--:value="item._id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
            <ProdlineStatus />
            <CompanyProdlineStateList />
          </GraphContainer>

          <el-row class="xpanel-wrapper-3">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">

              <GraphContainer title="本日产量统计图" class="graph-item xpanel-wrapper-1">
                <CompanyOutputBarChart />
              </GraphContainer>

            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item" style="height: 100%">

              <GraphContainer title="本日单位能耗系数" class="graph-item xpanel-wrapper-1">
                <BarChartOfEnergyCostFacter />
              </GraphContainer>

            </el-col>
          </el-row>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" class="col-item">
          <GraphContainer title="运行状态图" class="graph-item xpanel-wrapper-3">
            <OperatingStatusBarChart />
          </GraphContainer>
          <GraphContainer title="本日设备能耗" class="graph-item xpanel-wrapper-3">
          </GraphContainer>
          <GraphContainer title="设备有效利用率" class="graph-item xpanel-wrapper-3">
            <UtilizationBarChart :chart-data="utilizationData" />
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import { mapState } from 'vuex'
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
// import TimeSwitch from 'comps/base/TimeSwitch'
// 业务组件
import CompanyProdlineStateList from './CompanyProdlineStateList'
import ProdlineStatus from './ProdlineStatus'
import OperatingStatusBarChart from './OperatingStatusBarChart'
// import EnergyConsumptionBarChart from './EnergyConsumptionBarChart'
import BarChartOfEnergyCostFacter from './BarChartOfEnergyCostFacter'
import UtilizationBarChart from './UtilizationBarChart'
import CompanyOutputBarChart from './CompanyOutputBarChart'
// models
import MonitorModel from '@/models/monitor'
import PipelineModel from '@/models/pipeline'
import CompanyModel from '@/models/company'

// 补0
function formatBit(val) {
  val = +val
  return val > 9 ? val : `0${val}`
}

export default {
  name: 'DataVisualOverview',
  components: {
    Screenfull,
    GraphContainer,
    // TimeSwitch,
    CompanyProdlineStateList,
    ProdlineStatus,
    OperatingStatusBarChart,
    // EnergyConsumptionBarChart,
    BarChartOfEnergyCostFacter,
    UtilizationBarChart,
    CompanyOutputBarChart
  },
  data() {
    return {
      title: '暂无',
      intervalId: undefined,
      intervalIdOfgetPipelineList: undefined,
      powerTimeData: [],
      powerData: [],
      outputTimeData: [],
      repeatedCounting: [],
      defectiveNumber: [],
      productionQuantity: [],
      repeatedNum: 0,
      defectiveNum: 0,
      productionNum: 0,
      statusList: [
        {
          type: '关机',
          color: 'red',
          time: 0
        },
        {
          type: '空转', // 不生产(没有入口数据)
          color: 'yellow',
          time: 0
        },
        {
          type: '运行',
          color: 'green',
          time: 0
        },
      ],
      timeRange: {},
      utilizationData: [],
      companyList: [],
      companyId: ''
    }
  },
  computed: {
    // companyId() {
    //   return this.$route.query.id
    // },
    ...mapState({
      showDetail: state => state.company.pipeLine.showDetail
    }),
  },
  watch: {
    showDetail() {}
  },
  async created() {
    this.companyId = this.$route.query.id
    // let { id } = this.$route.query
    // let company = companies.find(item => item.id === id)
    // if ((id && id.length !== 24) || !company) {
    //   // 返回到overview
    //   this.$router.push({ path: '/data-visual/overview' })
    // }
    // this.title = company.alias
    //
    // this.$store.dispatch('company/getCompanyAllPipelineStateStat', id)
  },
  mounted() {
    this.getCompanyList()
    this.getPipelineStateTime()
    this.intervalId = setInterval(() => {
      this.getPipelineStateTime()
    }, 30000)
    this.intervalRefreshPipelineList()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
    clearInterval(this.intervalIdOfgetPipelineList)
  },
  methods: {
    changeCompany(value) {
      const query = {
        id: value
      }
      this.$router.push({
        path: '/data-visual/company',
        query
      })
      window.location.reload()
    },

    async getCompanyList() {
      this.companyList = await CompanyModel.getList()
      let { id } = this.$route.query
      let company = this.companyList.find(item => item._id === id)
      if ((id && id.length !== 24) || !company) {
        // 返回到overview
        this.$router.push({ path: '/data-visual/overview' })
      }
      this.title = company.chineseName

      this.$store.dispatch('company/getCompanyAllPipelineStateStat', id)
    },

    goOverviewPage() {
      this.$router.push('/data-visual/overview')
    },
    intervalRefreshPipelineList() {
      this.$store.dispatch('company/getProdlineList', this.companyId)
      // 30秒刷新一次企业的所有生产线的状态
      this.intervalIdOfgetPipelineList = setInterval(() => {
        this.$store.dispatch('company/getProdlineList', this.companyId)
      }, 30000)
    },
    async getConsumption(range) {
      const res = await PipelineModel.getStateTime(range)
      const utilization = []
      if (res.onTime && res.pendingTime) {
        utilization.push(
          ((res.onTime / (res.onTime + res.pendingTime)) * 100).toFixed(2)
        )
      } else {
        utilization.push(0)
      }
      this.utilizationData = utilization
    },

    async getPipelineStateTime() {
      const params = {
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      const res = await PipelineModel.getStateTime(params)
      this.statusList[0].time = res.offTime / 1000
      this.statusList[1].time = res.pendingTime / 1000
      this.statusList[2].time = res.onTime / 1000
    },

    formDate(dateForm) {
      if (dateForm === '') { // 解决deteForm为空传1970-01-01 00:00:00
        return ''
      }
      let dateee = new Date(dateForm).toJSON()
      let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    // 秒转时分秒，求模很重要，数字的下舍入
    formatSeconds(time) {
      let min = Math.floor(time % 3600)
      let val = `${formatBit(Math.floor(time / 3600))}时${formatBit(Math.floor(min / 60))}分`
      return val
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
        .state-time {
          display flex
          justify-content center
          position absolute
          top: 40px
          right: 50px
          .item {
            margin 0 20px
            font-size 18px
            .num {
              margin-right 5px
              border-radius 3px
              display inline-block
              padding 2px 5px
              text-align center
              color black
            }
          }
        }
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
