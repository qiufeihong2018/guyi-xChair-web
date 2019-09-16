<template>
  <el-container class="prodline">
    <el-header class="header">
      <h2>生产线配置</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item.alias" :label="item.name">
          <el-table :data="pipelineList" style="width: 100%">
            <el-table-column label="生产线" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pipelineName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采集器列表">
              <template slot-scope="scope">
                <span v-for="el in scope.row.probeList" :key="el" style="margin-left: 10px">{{ el }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
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
import PipelineModel from '@/models/pipeline'
export default {
  name: 'OperateProdline',
  components: {},
  data() {
    return {
      companyList: companies,
      pipelineList: [],
    }
  },
  computed: {},
  methods: {
    async handleTabClick(tab, event) {
      let { id: companyId } = this.companyList[tab.index]
      this.pipelineList = await PipelineModel.getList(companyId)
      console.log('this.pipelineList', this.pipelineList)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.prodline {
  .header {
    text-align center
    line-height 60px
  }
}
.prodline {
  .header {
    text-align center
    line-height 60px
  }
  .main {
    margin-left 10px
    table {
      tr {
        border-bottom 1px solid #d1dbe5
        th {
          padding 10px
        }
        td {
          padding 5px 10px
          text-align right
          width 200px
        }
      }
    }
  }
}
</style>
