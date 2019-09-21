<template>
  <div class="proline-status">
    <div>生产线:</div>
    <div v-for="item in statusList" :key="item.type" class='item'>
      <span class="num" :style="{'background-color': item.color}">{{item.num}}</span>
      <span class="type">{{item.type}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
  name: 'ProdlineStatus',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      statusList: state => {
        const obj = state.company.prodlineListStateStat
        return [
          {
            type: '关机',
            color: 'red',
            num: obj.off
          },
          {
            type: '空转', // 不生产(没有入口数据)
            color: 'yellow',
            num: obj.pending
          },
          {
            type: '运行',
            color: 'green',
            num: obj.on
          },
        ]
      }
    })
  },
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.proline-status {
  display flex
  justify-content center
  font-size 18px
  .item {
    margin 0 20px
    .num {
      margin-right 5px
      border-radius 3px
      display inline-block
      width 24px
      text-align center
      color black
    }
  }
}
</style>
