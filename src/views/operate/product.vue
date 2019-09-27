<template>
  <el-container class="prodline">
    <el-header class="header">
      <h2>产品配置</h2>
    </el-header>
    <el-container style="margin-top: 10px; height: 700px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item._id" :label="item.companyName" >
          <el-table :data="productList" style="width: 100%" height="750px">
            <el-table-column label="生产线" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pipelineName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品型号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.model }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数字代号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.no }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品类型">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品净重(kg)">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.suttleWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column label=" 产品总重(kg)">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.totalWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column label="长宽高(cm)" width="150px">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.length}} X {{scope.row.width}} X {{scope.row.height}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="180px">
              <template slot="header">
                <el-button size="mini" type="primary" @click="showCreateDialog">+新增产品</el-button>
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
    <el-dialog :title="editTitle"  :visible.sync="showEdit">
      <ProductEdit :id="companyId" :product="product" :is-add="isAdd" :pipelines="pipelineList" @handleCloseDig="handleCloseDig"/>
    </el-dialog>

  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import PipelineModel from '@/models/pipeline'
import CompanyModel from '@/models/company'
import ProductModel from '@/models/product'
import ProductEdit from './ProductEdit'
export default {
  name: 'OperateProduct',
  components: { ProductEdit },
  data() {
    return {
      companyList: companies,
      productList: [],
      isAdd: false, // 是否新增
      showEdit: false,
      product: {},
      pipelineList: [],
      companyId: ''
    }
  },
  computed: {
    editTitle() {
      return this.isAdd ? '新建' : '编辑'
    }
  },
  async mounted() {
    this.getCompanies()
  },
  methods: {
    // 公司列表，产品列表，生产线列表初始化
    async getCompanies() {
      this.companyList = await CompanyModel.getList()
      this.companyId = this.companyList[0]._id
      this.probeList = await CompanyModel.getList(this.companyId)
      this.getPipeLineList()
      await this.getList()
    },
    async handleTabClick(tab, event) {
      this.companyId = this.companyList[tab.index]._id
      this.getPipeLineList()
      await this.getList()
    },
    handleEdit(index, row) {
      this.showEdit = true
      this.isAdd = false
      let data = {
        id: row._id,
        pipelineId: row.pipelineId,
        pipelineName: row.pipelineName,
        model: row.model, // 产品型号(公司记录在册)
        no: row.no, // 产品数字代号(生产线上采集器设置的)(纯数字)
        type: row.type,
        suttleWeight: row.suttleWeight,
        totalWeight: row.totalWeight,
        length: row.length,
        width: row.width,
        height: row.height
      }
      this.product = data
    },
    async getPipeLineList() {
      this.pipelineList = await PipelineModel.getList(this.companyId)
    },

    handleDelete(index, row) {
      this.$confirm('此操作将删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteProduct(index, row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteProduct(index, row) {
      const res = await ProductModel.deleteProduct(row._id)
      if (res.status && res.status === 200) {
        this.getList()
      } else {
        this.$message.error(res.message)
      }
    },
    showInput() {
      // 新增采集器
      //
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showCreateDialog() {
      this.showEdit = true
      this.isAdd = true
      let data = {
        pipelineId: '',
        pipelineName: '',
        model: '', // 产品型号(公司记录在册)
        no: '', // 产品数字代号(生产线上采集器设置的)(纯数字)
        type: '',
        suttleWeight: 0,
        totalWeight: 0,
        length: 0,
        width: 0,
        height: 0,
        companyId: this.companyId
      }
      this.product = data
    },
    // select获取值
    getPipeLineName(val) {
      let object = this.pipelineList.find(item => item.id === val)
      this.product.pipelineName = object.pipelineName
    },
    async getList() {
      this.productList = await ProductModel.getListByConmpany(this.companyId)
    },
    // 关闭所有弹窗
    async handleCloseDig() {
      this.showEdit = false
      this.getList()
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
    margin-left 10px
  }
  .button-new-tag {
    height 32px
    line-height 30px
    padding-top 0
    padding-bottom 0
  }
  .input-new-tag {
    width 90px
    vertical-align bottom
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
