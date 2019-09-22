<template>
  <el-container class="prodline">
    <el-header class="header">
      <h2>生产线配置</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item._id" :label="item.companyName">
          <el-table :data="pipelineList" style="width: 100%">
            <el-table-column label="生产线" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pipelineName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采集器列表">
              <template slot-scope="scope">
                <span v-for="(el, index) in scope.row.probeList" :key="index" style="margin-left: 10px">{{ el }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header">
                <el-button size="mini" type="primary" @click="showCreateDialog">+新增生产线</el-button>
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

    <el-dialog title="编辑" :visible.sync="dialogModifyVisible">
      <el-form :model="pipeline" label-width="100px">
        <el-form-item label="流水线名称"  label-width="100px">
          <el-input v-model="pipeline.pipelineName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="采集器列表"  label-width="100px">
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="primary" @click="showInput">新增采集器</el-button>
          <br>
          <el-tag
            v-for="(probe, index) in pipeline.probeList"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleDeleteProbe(probe)">
            {{probe}}
          </el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleEditPipeline">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增生产线" :visible.sync="dialogCreateVisible">
      <el-form :model="pipeline" label-width="100px">
        <el-form-item label="流水线名称"  label-width="100px">
          <el-input v-model="pipeline.pipelineName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="采集器列表"  label-width="100px">
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="primary" @click="showInput">新增采集器</el-button>
          <br>
          <el-tag
            v-for="(probe, index) in pipeline.probeList"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleDeleteProbe(probe)">
            {{probe}}
          </el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleCreatePipeLine">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import PipelineModel from '@/models/pipeline'
import CompanyModel from '@/models/company'
export default {
  name: 'OperateProdline',
  components: {},
  data() {
    return {
      companyList: companies,
      pipelineList: [],
      dialogModifyVisible: false,
      dialogCreateVisible: false,
      pipeline: {
        id: '',
        pipelineName: '',
        companyId: '',
        probeList: []
      },
      inputVisible: false,
      inputValue: '',
      companyId: '',
      currentProbe: { // 当前的采集器
        companyId: '',
        companyAlias: '',
        pipelineId: '', // 采集器所属生产线的ID
        probeNo: '', // 采集器的编号 AA01
      },
      newPipeline: {
        pipelineName: '',
        companyId: '',
        probeList: []
      }
    }
  },
  computed: {},
  async mounted() {
    this.getCompanies()
    // this.companyId = this.companyList[0].id
    // this.pipelineList = await PipelineModel.getList(this.companyId)
  },
  methods: {
    async getCompanies() {
      this.companyList = await CompanyModel.getList()
      this.companyId = this.companyList[0]._id
      this.pipelineList = await PipelineModel.getList(this.companyId)
    },
    async handleTabClick(tab, event) {
      this.companyId = this.companyList[tab.index]._id
      this.pipelineList = await PipelineModel.getList(this.companyId)
    },
    handleEdit(index, row) {
      this.dialogModifyVisible = true
      this.pipeline = row
      this.pipeline.id = row.id
    },
    async handleDelete(index, row) {
      const res = await PipelineModel.deletePipeline(row.id)
      if (res.status && res.status === 200) {
        this.pipelineList = await PipelineModel.getList(this.companyId)
      } else {
        this.$message.error(res.message)
      }
    },
    handleDeleteProbe(probe) {
      this.pipeline.probeList.splice(this.pipeline.probeList.indexOf(probe), 1)
    },
    handleInputConfirm() {
      let { inputValue } = this
      if (inputValue) {
        this.pipeline.probeList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      // 新增采集器

      //
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleEditPipeline() {
      const res = await PipelineModel.modifyDetail(this.pipeline)
      if (res.status && res.status === 200) {
        this.pipelineList = await PipelineModel.getList(this.companyId)
        this.dialogModifyVisible = false
      } else {
        this.$message.error(res.message)
      }
    },
    async handleCreatePipeLine() {
      const res = await PipelineModel.createDetail(this.pipeline)
      if (res.status && res.status === 200) {
        this.pipelineList = await PipelineModel.getList(this.companyId)
        this.dialogCreateVisible = false
      } else {
        this.$message.error(res.message)
      }
    },
    showCreateDialog() {
      this.dialogCreateVisible = true
      this.newPipeline.companyId = this.companyId
      this.pipeline = {
        pipelineName: '',
        companyId: this.companyId,
        probeList: []
      }
    },
    async handleCloseDialog() {
      this.dialogCreateVisible = false
      this.dialogModifyVisible = false
      this.pipelineList = await PipelineModel.getList(this.companyId)
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
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
