<template>
  <div class="prodline-list-table visual">
    <div class="container">
      <ProdlineIcon v-for="item in prodlineList" :key="item.prodlineName" 
      :num="item.exitNum" :name="item.prodlineName" 
      class="item" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ProdlineIcon from 'comps/base/ProdlineIcon'
export default {
  name: 'ProdlineListTable',
  components: {
    ProdlineIcon
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
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT02',
          prodlineId: '',
          swith: '开',
          power: 3000, // 当前的
          entraNum: 220,
          exitNum: 210,
          rejectNum: 10,
          productType: '办公椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        },
        {
          companyName: '',
          companyId: '',
          prodlineName: 'ALT03',
          prodlineId: '',
          swith: '关',
          power: 3100, // 当前的
          entraNum: 250,
          exitNum: 234,
          rejectNum: 16,
          productType: '电竞椅'
        }
      ]
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
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
