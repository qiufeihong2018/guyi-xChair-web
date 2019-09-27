<template>
      <div calss="from-box">
      <el-form :model="product" label-width="100px">
        <el-form-item label="生产线" label-width="100px">
          <el-select v-model="product.pipelineId" placeholder="请选择" @change="getPipeLineName">
            <el-option v-for="item in pipelines" :key="item.value" :label="item.pipelineName" :value="item.id">
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
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="handleEditPipeline">确 定</el-button>
      </div>
      </div>
</template>

<script>
import PipelineModel from '@/models/pipeline'
import ProductModel from '@/models/product'
export default {
  name: 'ProductEdit',
  props: {
    product: {
      default: {},
    },
    id: {
      default: '5d834e6c0c8e9f276745ded0'
    },
    'isAdd': {
      type: Boolean,
      default: false
    },
    pipelines: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    getPipeLineName(val) {
      let object = this.pipelines.find(item => item.id === val)
      console.log('object', object)
      this.product.pipelineName = object.pipelineName
    },
    async handleEditPipeline() {
      if (this.isAdd) {
        let data = this.product
        console.log('新增')
        const res = await ProductModel.createProduct(data)
        if (res.status === 200) {
          this.closeEdit()
        } else {
          this.$message.error(res.message)
        }
      } else {
        const res = await ProductModel.updateProdcut(this.product)
        if (res._id) {
          this.closeEdit()
        } else {
          this.$message.error(res.message)
        }
      }
    },

    closeEdit() {
      this.$emit('handleCloseDig')
    }
  }
}
</script>

<style scoped>

</style>
