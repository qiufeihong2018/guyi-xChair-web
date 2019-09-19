<template>
  <div class="company-list visual">
    <div class="title item">未入驻规上企业</div>
    <div class="scroll-box">
      <div class="item-list">
        <div v-for="(item,index) in companyList" :key="index" class="item"><span class="name" >{{item.alias}}</span></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: ' NotEnterCompany',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: '1111',
          name: '安吉联胜家具有限公司',
          alias: '联胜家具',
        },
        {
          id: '1111',
          name: '浙江五星家具有限公司',
          alias: '五星家具',
        },
        {
          id: '1111',
          name: '浙江中义家具有限公司',
          alias: '中义家具',
        },
        {
          id: '1111',
          name: '浙江强盛家具有限公司',
          alias: '强盛家具',
        },
        {
          id: '1111',
          name: '浙江安吉铭成椅业有限责任公司',
          alias: '铭成椅业'
        },
        {
          id: '1111',
          name: '大康控股集团有限公司',
          alias: '大康控股'
        }
      ]
    }
  },
  created() {
    let list = [...this.companyList, ...this.companyList]
    this.companyList = list
  },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.company-list {
  position absolute
  top 40px
  right 5px
  z-index 10
  >>> .el-table_1_column_1 {
    padding 8px 0
  }
  .name:before {
    content ''
    margin-right 10px
    display inline-block
    width 10px
    height 10px
    border-radius 50%
    background #cccccc
  }
}
  .title{
    height 40px
    line-height 40px
    text-align center
    font-size 14px
    font-weight bold
  }
  .scroll-box{
    width 130px
    position relative
    height 200px
    overflow hidden
    .item-list{
      width 100%
      text-align center
      position absolute
      animation scrollTop 12s linear infinite
      .item{
        line-height 40px
        height 40px
        font-size 14px
      }
    }
  }
  @keyframes scrollTop{
    from {
      transform: translate3d(0,0,0);
    }
    to{
      transform: translate3d(0,-200px,0);
    }
  }
</style>
