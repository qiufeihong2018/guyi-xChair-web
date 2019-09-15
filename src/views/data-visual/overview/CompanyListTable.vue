<template>
  <div class="company-list visual">
    <el-table :data="companyList" style="widht: 100%" height="100%" @row-click="handleRowClick">
      <el-table-column prop="alias" label="一期入驻企业(6)点击·详情" width="130" align="center" />
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: ' CompanyListTable',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: '5d7e63c1ba35562fe1084626',
          name: '中源家居股份有限公司',
          alias: '中源家居',
        },
        {
          id: '5d7e642d201b65318803e39f',
          name: '永艺家具股份有限公司',
          alias: '永艺家具',
        },
        {
          id: '5d7e6443201b65318803e3a0',
          name: '浙江恒林椅业股份有限公司',
          alias: '恒林椅业',
        },
        {
          id: '5d7e6450201b65318803e3a1',
          name: '安吉富和家具股份有限公司',
          alias: '富和家具',
        },
        {
          id: '5d7e6459201b65318803e3a2',
          name: '安吉隆博家具股份有限公司',
          alias: '隆博家具',
        },
        {
          id: '5d7e6467201b65318803e3a3',
          name: '浙江盛信椅业股份有限公司',
          alias: '盛信椅业',
        },
      ]
    }
  },
  methods: {
    handleRowClick(row) {
      let { id } = row
      let newRouter = this.$router.resolve({
        path: '/data-visual/company-detail',
        query: {
          id
        }
      })
      window.open(newRouter.href, '_blank')
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.company-list {
  position absolute
  top 20px
  left 5px
  z-index 10
  >>> .el-table_1_column_1 {
    padding 8px 0
  }
}
</style>
