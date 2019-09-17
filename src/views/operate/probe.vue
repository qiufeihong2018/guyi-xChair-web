<template>
  <el-container class="probe">
    <el-header class="header">
      <h2>采集器配置</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item._id" :label="item.companyName">
          <el-table :data="probeList" style="width: 100%">
            <el-table-column label="采集器" prop="probeName" width="180">
            </el-table-column>
            <el-table-column label="流水线列表">
              <template slot-scope="scope">
                <span v-for="(el, index) in scope.row.pipelineList" :key="index" style="margin-left: 10px">{{ el }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header">
                <el-button size="mini" type="primary">+新增采集器</el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import CompanyModel from '@/models/company'
import ProbeModel from '@/models/probe'
export default {
  name: 'OperateProdline',
  components: {},
  data() {
    return {
      companyList: [],
      companyId: 0,
      probeList: []
    }
  },
  computed: {},
  mounted() {
    this.getCompanies()
  },
  methods: {
    async handleTabClick(tab, event) {
      this.companyId = this.companyList[tab.index]._id
      this.probeList = await ProbeModel.getList(this.companyId)
    },
    async getCompanies() {
      this.companyList = await CompanyModel.getList()
      this.companyId = this.companyList[0]._id
      this.probeList = await ProbeModel.getList(this.companyId)
    },
    handleEdit(index, row) {
    },
    handleDelete(index, row) {},
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.probe {
  .header {
    text-align center
    line-height 60px
  }
}
</style>
