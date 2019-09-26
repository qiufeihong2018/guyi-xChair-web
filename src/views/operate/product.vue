<template>
  <el-container class="prodline">
    <el-header class="header">
      <h2>产品配置</h2>
    </el-header>
    <el-container style="margin-top: 10px; height: 700px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in companyList" :key="item._id" :label="item.companyName" >
          <el-table :data="productList" style="width: 100%"  height="80vh">
            <el-table-column label="序号"   type="index"  width="100px" ></el-table-column>
            <el-table-column label="产品型号" prop="model"
                             :sortable='true'
                             :sort-method="sortChangeModel">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.model }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数字代号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.no }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品类型"
                             :sortable='true'
                             :sort-method="sortChangeType"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品净重(kg)">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.suttleWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column label=" 产品总重(kg)"
                             :sortable='true'
                             :sort-method="sortChangeTotalWeight"
            >
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
    <el-dialog title="编辑" :visible.sync="dialogModifyVisible">
      <el-form :model="product" label-width="100px">
        <el-form-item label="生产线" label-width="100px">
          <el-select v-model="product.pipelineId" placeholder="请选择" @change="getPipeLineName">
            <el-option v-for="item in pipelineList" :key="item.value" :label="item.pipelineName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品型号" label-width="100px">
          <el-input v-model="product.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数字代号" label-width="100px">
          <el-input v-model="product.no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" label-width="100px">
          <el-input v-model="product.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品净重(kg)" label-width="100px">
          <el-input v-model="product.suttleWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品总重(kg)" label-width="100px">
          <el-input v-model="product.totalWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="长宽高(cm)" label-width="100px">
          <div style="display: flex">
            <el-input v-model="product.length" autocomplete="off"></el-input> X
            <el-input v-model="product.width" autocomplete="off"></el-input> X
            <el-input v-model="product.height" autocomplete="off"></el-input>
          </div>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleEditPipeline">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增产品" :visible.sync="dialogCreateVisible">
      <el-form :model="newProduct" label-width="100px">
        <el-form-item label="生产线" label-width="100px">
          <el-select v-model="newProduct.pipelineId" placeholder="请选择" @change="getNewPipeLineName">
            <el-option v-for="item in pipelineList" :key="item.value" :label="item.pipelineName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品型号" label-width="100px">
          <el-input v-model="newProduct.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品注册代号" label-width="100px">
          <el-input v-model="newProduct.no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" label-width="100px">
          <el-input v-model="newProduct.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品净重(kg)" label-width="100px">
          <el-input v-model="newProduct.suttleWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品总重(kg)" label-width="100px">
          <el-input v-model="newProduct.totalWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品长宽高(cm)" label-width="100px">
          <div style="display: flex">
            <el-input v-model="newProduct.length" autocomplete="off"></el-input>X
            <el-input v-model="newProduct.width" autocomplete="off"></el-input>X
            <el-input v-model="newProduct.height" autocomplete="off"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleCreateProduct">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import PipelineModel from '@/models/pipeline'
import CompanyModel from '@/models/company'
import ProductModel from '@/models/product'
export default {
  name: 'OperateProduct',
  components: {},
  data() {
    return {
      companyList: companies,
      productList: [],
      dialogModifyVisible: false,
      dialogCreateVisible: false,
      product: {
        pipelineId: '5d834e6c0c8e9f276745ded0',
        pipelineName: 'ALT01',
        model: '8810',
        no: '8810',
        type: '办公转椅',
        suttleWeight: 8,
        totalWeight: 10,
        length: 100,
        width: 80,
        height: 120
      },
      pipelineList: [],
      inputVisible: false,
      inputValue: '',
      companyId: '',
      currentProbe: { // 当前的采集器
        companyId: '',
        companyAlias: '',
        pipelineId: '', // 采集器所属生产线的ID
        probeNo: '', // 采集器的编号 AA01
      },
      newProduct: {
        pipelineId: '',
        pipelineName: '',
        model: '', // 产品型号(公司记录在册)
        no: '', // 产品数字代号(生产线上采集器设置的)(纯数字)
        type: '',
        suttleWeight: 0,
        totalWeight: 0,
        length: 0,
        width: 0,
        height: 0
      }
    }
  },
  computed: {},
  async mounted() {
    this.getCompanies()
  },
  methods: {
    // 公司列表，产品列表，生产线列表初始化
    async getCompanies() {
      this.companyList = await CompanyModel.getList()
      this.companyId = this.companyList[0]._id
      this.probeList = await CompanyModel.getList(this.companyId)
      await this.getList()
      await this.getPipeLineList()
    },
    async handleTabClick(tab, event) {
      this.companyId = this.companyList[tab.index]._id
      await this.getPipeLineList()
      await this.getList()
    },
    sortChangeTotalWeight(a, b) { // 排序
      return a.type - b.type
    },

    sortChangeModel(a, b) { // 排序
      return a.model - b.model
    },
    sortChangeType(a, b) { // 排序
      return a.totalWeight - b.totalWeight
    },
    handleEdit(index, row) {
      this.dialogModifyVisible = true
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
    handleDelete(index, row) {
      this.deleteProduct(index, row)
    },
    async deleteProduct(index, row) {
      const res = await ProductModel.deleteProduct(row._id)
      if (res.status && res.status === 200) {
        this.handleCloseDialog()
      } else {
        this.$message.error(res.message)
      }
    },
    // handleDeleteProbe(probe) {
    //   this.pipeline.probeList.splice(this.pipeline.probeList.indexOf(probe), 1)
    // },
    // handleInputConfirm() {
    //   let { inputValue } = this
    //   if (inputValue) {
    //     this.pipeline.probeList.push(inputValue)
    //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // },
    showInput() {
      // 新增采集器

      //
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleEditPipeline() {
      const res = await ProductModel.updateProdcut(this.product)
      if (res._id) {
        this.handleCloseDialog()
      } else {
        this.$message.error(res.message)
      }
    },
    async handleCreateProduct() {
      let data = this.newProduct
      data.companyId = this.companyId
      const res = await ProductModel.createProduct(data)
      if (res.status && res.status === 200) {
        this.handleCloseDialog()
      } else {
        this.$message.error(res.message)
      }
    },
    showCreateDialog() {
      this.dialogCreateVisible = true
      this.newProduct.companyId = this.companyId
      this.newProduct = {
        pipelineId: '',
        pipelineName: '',
        model: '',
        no: '',
        type: '',
        suttleWeight: 0,
        totalWeight: 0,
        length: 0,
        width: 0,
        height: 0
      }
    },
    // select获取值
    getPipeLineName(val) {
      let object = this.pipelineList.find(item => item.id === val)
      console.log('object', object)
      this.product.pipelineName = object.pipelineName
    },
    getNewPipeLineName(val) {
      let object = this.pipelineList.find(item => item.id === val)
      console.log('object', object)
      this.newProduct.pipelineName = object.pipelineName
    },
    async getList() {
      this.productList = await ProductModel.getListByConmpany(this.companyId)
    },
    async getPipeLineList() {
      this.pipelineList = await PipelineModel.getList(this.companyId)
    },
    // 关闭所有弹窗
    async handleCloseDialog() {
      this.dialogCreateVisible = false
      this.dialogModifyVisible = false
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
