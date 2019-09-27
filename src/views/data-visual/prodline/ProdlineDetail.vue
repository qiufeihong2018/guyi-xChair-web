<template>
  <div class="prodline-detail visual">
    <div class="container">

      <el-table :data="detail" style="width: 100%" height="100%" >
        <el-table-column prop="lineName" label="生产线"  align="center" />
        <el-table-column prop="prodId" label="产品型号"  align="center" />
        <el-table-column prop="proType" label="产品类型"  align="center" />
        <el-table-column prop="failNum" label="不合格次数"  align="center" />
        <el-table-column prop="successNum" label="合格数"  align="center" />
        <el-table-column prop="timeLong" label="生产时长"  align="center" />
        <el-table-column prop="waste" label="耗电量"  align="center" />
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import pipelineModel from '@/models/pipeline'
export default {
  name: 'ProdlineDetail',
  components: {},
  data() {
    return {
      detail: [
        {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }, {
          lineName: 'ALT01',
          prodId: '8080',
          proType: '办公转椅',
          failNum: 1,
          successNum: 99,
          timeLong: '9-15点',
          waste: 3.5
        }
      ]
    }
  },
  computed: {
    ...mapState({
      pipeLine: state => state.company.pipeLine

    })
  },
  watch: {
    pipeLine() {
      this.getData()
    }
  },
  created() { this.getData() },
  mounted() { },
  methods: {
    async getData() {
      let { id, companyId } = this.pipeLine
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
