<template>
  <div class="borderline visual">
    <el-table :data="borderlineList" style="widht: 100%" height="100%">
      <el-table-column prop="year" label="普通类" width="80" align="center" />
      <el-table-column prop="line_level_1" label="第一段(分)" width="100" align="center" />
      <el-table-column prop="line_level_2" label="第二段(分)" width="100" align="center" />
      <el-table-column prop="line_level_3" label="第三段(分)" width="100" align="center" />
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: ' CompanyList',
  components: {},
  data() {
    return {
      borderlineList: [
        {
          year: 2019,
          line_level_1: 595,
          line_level_2: 496,
          line_level_3: 264,
        },
        {
          year: 2018,
          line_level_1: 588,
          line_level_2: 490,
          line_level_3: 344,
        },
        {
          year: 2017,
          line_level_1: 577,
          line_level_2: 480,
          line_level_3: 359,
        },
      ]
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.borderline {
  position absolute
  top 0
  left 30%
}
</style>
