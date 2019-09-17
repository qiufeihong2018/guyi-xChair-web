<template>
  <div class="prodline-list-table visual">
    <div class="container">
      <div v-for="item in prodlineList" :key="item.prodlineName" @click="getProdLineId(item.prodlineId)" >
      <ProdlineIcon
      :num="item.exitNum" :name="item.prodlineName"
      class="item" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ProdlineIcon from 'comps/base/ProdlineIcon'
import MonitorModel from '@/models/monitor'
export default {
  name: 'ProdlineListTable',
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
          prodlineId: '',
          swith: '开',
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
      let res = await MonitorModel.getCompanyInfo(this.companyId)
    },
    getProdLineId(id) {
      let data = { id, showDetail: true }
      console.log('gengxin')
      this.$store.commit('company/SER_PIPELINE_ID', data)
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
