<template>
  <el-container class="probe">
    <el-header class="header">
      <h2>采集器配置</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item._id" :label="item.companyName">
         {{item}}
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import CompanyModel from '@/models/company'
export default {
  name: 'OperateProdline',
  components: {},
  data() {
    return {
      companyList: [],
    }
  },
  computed: {},
  mounted() {
    this.getCompanies()
  },
  methods: {
    async handleTabClick(tab, event) {
      console.log(tab)
    },
    async getCompanies() {
      this.companyList = await CompanyModel.getList()
      console.log(this.companyList)
    }
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
