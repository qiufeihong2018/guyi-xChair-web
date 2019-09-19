<template>
  <div class="prodline-list-table visual">
    <div class="container">
      <div v-for="item in prodlineList" :key="item.prodlineName" @click="getProdLineId(item.prodlineId)" >
      <ProdlineIcon :num="item.exitNum" :name="item.prodlineName" :state="item.state"
        class="item" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ProdlineIcon from 'comps/base/ProdlineIcon'
import pipelineModel from '@/models/pipeline'
export default {
  name: 'ProdlineIconList',
  components: {
    ProdlineIcon
  },
  props: {
    companyId: {
      default: '5d8041e4de1685795bc379b2',
      type: String
    }
  },
  data() {
    return {
      prodlineList: [
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT01',
          prodlineId: '5d80706697d0ba7c7177fd9b',
          state: 'on', // 三种状态[off, on, pending]
          power: 1000, // 当前的
          entraNum: 120,
          exitNum: 100,
          rejectNum: 20,
          productType: '酒吧椅'
        }
      ]
    }
  },
  computed: {},
  created() { },
  mounted() {
    this.getProdLineList()
  },
  methods: {
    async getProdLineList() {
      let res = await pipelineModel.getList(this.companyId)
      console.log(res)
    },
    getProdLineId(id) {
      let data = { companyId: this.companyId, id, showDetail: true }
      this.$store.commit('company/SER_PIPELINE_ID', data)
      this.$router.push('/data-visual/prodline')
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.prodline-list-table {
  height 99%
  width 97%
  .container {
    display flex
    flex-wrap: wrap
    justify-content flex-start
    .item {
      margin 18px
    }
  }
}
</style>
