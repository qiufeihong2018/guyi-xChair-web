<template>
  <div class="product-list visual">
    <el-table :data="productList" style="width: 100%" max-height="450">
      <el-table-column prop="pipelineName" label="生产线" width="100" align="center">
      </el-table-column>
      <el-table-column prop="productModel" label="产品型号" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip  content="正在生产" placement="right">
            <span>
            <fa-icon icon-name="circle-o" style="color: #5bc59f;font-size: 15px"></fa-icon>
            {{ scope.row.productModel}}
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="产品类型" width="130" align="center">
      </el-table-column>
      <el-table-column prop="statrTime" label="开始时间" align="center">
        <template slot-scope="scope">
          <span>{{ formDate(new Date(scope.row.startTime))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="positiveEnergy" label="耗电量(kwh)" width="100" align="center">
        <template slot-scope="scope">
          <span>{{(scope.row.positiveEnergy * 2.5).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="out" label="成品数" width="80" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PipelineModel from '@/models/pipeline'
import ProductModel from '@/models/product'
export default {
  name: 'ProdlineStateTable',
  data() {
    return {
      productList: [],
      intervalId: undefined,
      pipelineList: []
    }
  },
  computed: {
    companyId() {
      return this.$route.query.id
    },
  },
  mounted() {
    this.getPipelineList()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async getPipelineList() {
      this.pipelineList = await PipelineModel.getList(this.companyId)
      this.getStateTableData()
      this.intervalId = setInterval(() => {
        this.getStateTableData()
      }, 30000)
    },
    getStateTableData() {
      let products = []
      this.pipelineList.forEach(async (item, index) => {
        const product = await this.getPipelineState(item.id)
        if (product !== null) {
          products.push(Object.assign(product, {
            pipelineName: item.pipelineName
          }))
        }
        if (index === this.pipelineList.length - 1) {
          this.productList = products
        }
      })
    },
    async getPipelineState(pipelineId) {
      const currentProduct = await ProductModel.getCurrentProduct({
        pipelineId
      })
      return currentProduct
    },
    formDate(dateForm) {
      if (dateForm === '') { // 解决deteForm为空传1970-01-01 00:00:00
        return ''
      }
      let dateee = new Date(dateForm).toJSON()
      let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      let time = date.split(' ')[1]
      return time
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
