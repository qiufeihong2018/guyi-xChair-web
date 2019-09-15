<template>
  <div class="proline-status">
    <div v-for="item in statusList" :key="item.type" class='item'>
      <span class="num" :style="{'background-color': item.color}">{{item.num}}</span>
      <span class="type">{{item.type}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProdlineStatus',
  components: {},
  data() {
    return {
      statusList: [
        {
          type: '关机',
          color: 'red',
          num: 1
        },
        {
          type: '空转', // 不生产(没有入口数据)
          color: 'yellow',
          num: 1
        },
        {
          type: '运行',
          color: 'green',
          num: 1
        },
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
.proline-status {
  display flex
  justify-content center
  .item {
    margin 0 20px
    font-size 18px
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
