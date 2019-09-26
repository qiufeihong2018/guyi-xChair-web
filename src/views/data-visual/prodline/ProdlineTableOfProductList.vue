<template>
  <div class="product-list visual">
    <el-table :data="productList" style="width: 100%" max-height="450">
      <el-table-column prop="productModel" label="产品型号" width="130" align="center">
        <template slot-scope="scope">
          <el-tooltip  v-if="scope.$index === 0" content="正在生产" placement="right">
            <span>
            <fa-icon icon-name="circle-o" style="color: #5bc59f;font-size: 15px"></fa-icon>
            {{ scope.row.productModel}}
            </span>
          </el-tooltip>
          <span v-else style="margin-left: 15px">{{ scope.row.productModel}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="产品类型" width="130" align="center">
      </el-table-column>
      <el-table-column prop="statrTime" label="生产开始时间" align="center">
        <template slot-scope="scope">
          <span>{{ formDate(new Date(scope.row.startTime))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="生产结束时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{ formDate(new Date(scope.row.endTime))}}</span>
          <span v-else style="color: #5bc59f">正在生产...</span>
        </template>
      </el-table-column>
      <el-table-column prop="positiveEnergy" label="耗电量(kwh)" width="130" align="center">
        <template slot-scope="scope">
          <span>{{(scope.row.positiveEnergy * 2.5).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="failed" label="不合格次数" width="130" align="center">
      </el-table-column>
      <el-table-column prop="out" label="成品数" width="130" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
// models
import ProductModel from '@/models/product'

export default {
  name: 'ProdlineTableOfProductList',
  components: {},
  data() {
    return {
      productList: [],
      intervalId: undefined
    }
  },
  computed: {
    pipelineId() {
      return this.$route.query.id
    },
  },
  mounted() {
    this.getProducts()
    this.intervalId = setInterval(() => {
      this.getProducts()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async getProducts() {
      const params = {
        pipelineId: this.pipelineId,
        start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
        end: +new Date()
      }
      let products = await ProductModel.getHistoryProduct(params)
      products = products.result.sort((a, b) => b.startTime - a.startTime)
      const currentProduct = await ProductModel.getCurrentProduct({
        pipelineId: this.pipelineId
      })
      products.unshift(currentProduct)
      this.productList = products
    },
    formDate(dateForm) {
      if (dateForm === '') { // 解决deteForm为空传1970-01-01 00:00:00
        return ''
      }
      let dateee = new Date(dateForm).toJSON()
      let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.product-list {

}
</style>
