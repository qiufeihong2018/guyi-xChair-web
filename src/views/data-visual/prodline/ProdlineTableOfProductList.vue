<template>
  <div class="product-list visual">
    <el-table :data="productList" style="width: 100%" height="100%">
      <el-table-column prop="value" label="" width="130" align="center">
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
      productList: []
    }
  },
  computed: {
    pipelineId() {
      return this.$route.query.id
    },
  },
  async created() {
    const product = await ProductModel.getListByPipeline(this.pipelineId)
  },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.product-list {

}
</style>
