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
          </GraphContainer>
          <GraphContainer title="待定" class="graph-item xpanel-wrapper-2">
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" class="col-item">
          <GraphContainer title="入驻企业分布" class="graph-item xpanel-wrapper-1">
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" class="col-item">
          <GraphContainer title="待定" class="graph-item xpanel-wrapper-3">
          </GraphContainer>
          <GraphContainer title="待定" class="graph-item xpanel-wrapper-3">
          </GraphContainer>
          <GraphContainer title="待定" class="graph-item xpanel-wrapper-3">
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
export default {
  name: 'DataVisualOverview',
  components: {
    Screenfull,
    GraphContainer,
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
