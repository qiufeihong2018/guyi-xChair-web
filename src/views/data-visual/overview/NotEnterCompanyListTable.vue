<template>
  <div class="company-list visual">
    <el-table :data="companyList" style="width: 100%" height="100%">
      <el-table-column prop="alias" label="待入驻企业" width="130" align="center">
        <template slot-scope="scope">
          <span class="name">{{scope.row.alias}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: ' NotEnterCompanyListTable',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: '1111',
          name: '安吉联胜家具有限公司',
          alias: '联胜家具',
        },
        {
          id: '1111',
          name: '浙江五星家具有限公司',
          alias: '五星家具',
        },
        {
          id: '1111',
          name: '浙江中义家具有限公司',
          alias: '中义家具',
        },
        {
          id: '1111',
          name: '浙江强盛家具有限公司',
          alias: '强盛家具',
        },
        {
          id: '1111',
          name: '浙江安吉铭成椅业有限责任公司',
          alias: '铭成椅业'
        },
        {
          id: '1111',
          name: '大康控股集团有限公司',
          alias: '大康控股'
        }
      ]
    }
  },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.company-list {
  position absolute
  top 20px
  right 5px
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
    background #cccccc
  }
}
</style>
