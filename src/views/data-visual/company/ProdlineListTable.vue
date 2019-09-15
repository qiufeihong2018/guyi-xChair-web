<template>
  <div class="prodline-list-table visual">
    <el-table :data="prodlineList" class="table" style="widht: 100%" height="100%" @row-click="handleRowClick">
      <el-table-column prop="prodlineName" label="生产线" />
      <el-table-column prop="swith" label="运行状态" />
      <el-table-column prop="productType" label="生产类型" />
      <el-table-column prop="power" label="耗电量" />
      <el-table-column prop="exitNum" label="合格数" />
      <el-table-column prop="rejectNum" label="不合格次数" />
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProdlineListTable',
  components: {},
  data() {
    return {
      prodlineList: [
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT01',
          prodlineId: '',
          swith: '开',
          power: 1000, // 当前的
          entraNum: 120,
          exitNum: 100,
          rejectNum: 20,
          productType: '酒吧椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT02',
          prodlineId: '',
          swith: '开',
          power: 3000, // 当前的
          entraNum: 220,
          exitNum: 210,
          rejectNum: 10,
          productType: '办公椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        }
      ]
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.prodline-list-table {
  position relative
  height 99%
  width 97%
  .table {
    position absolute
    top 0
    left 10px
  }
}
</style>
