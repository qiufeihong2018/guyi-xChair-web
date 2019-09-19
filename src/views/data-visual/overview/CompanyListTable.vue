<template>
  <div class="company-list visual">
    <el-table :data="companyList" style="width: 100%" height="100%" @row-click="handleRowClick">
      <el-table-column prop="alias" label="一期入驻企业(6)" width="130" align="center">
        <template slot-scope="scope">
          <span class="name">{{scope.row.alias}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CompanyListTable',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: '5d8042e7de1685795bc379ce',
          name: '中源家居股份有限公司',
          alias: '中源家居',
        },
        {
          id: '5d8042f7de1685795bc379d0',
          name: '永艺家具股份有限公司',
          alias: '永艺家具',
        },
        {
          id: '5d804350de1685795bc379dc',
          name: '浙江恒林椅业股份有限公司',
          alias: '恒林椅业',
        },
        {
          id: '5d804314de1685795bc379d4',
          name: '安吉富和家具股份有限公司',
          alias: '富和家具',
        },
        {
          id: '5d8041e4de1685795bc379b2',
          name: '安吉隆博家具股份有限公司',
          alias: '隆博家具',
        },
        {
          id: '5d804375de1685795bc379e0',
          name: '浙江盛信椅业股份有限公司',
          alias: '盛信椅业',
        },
      ]
    }
  },
  methods: {
    handleRowClick(row) {
      let { id } = row
      if (id.length === 24) {
        const routerConfig = {
          path: '/data-visual/company',
          query: {
            id
          }
        }
        this.$router.push(routerConfig)
      }
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.company-list {
  position absolute
  top 40px
  left 5px
  z-index 10
  >>> .el-table_1_column_1 {
    padding 8px 0
  }
  .name:before {
    content ''
    margin-right 10px
    display inline-block
    width 10px
    height 10px
    border-radius 50%
    background #3dff33
  }
}
</style>
