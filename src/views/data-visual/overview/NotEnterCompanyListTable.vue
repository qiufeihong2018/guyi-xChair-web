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
  name: 'NotEnterCompanyListTable',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: '1111',
          name: '浙江五星家具有限公司',
          alias: '五星家具',
          value: [119.684128, 30.693911, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江中义家具有限公司',
          alias: '中义家具',
          value: [119.475287, 30.61134, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江强盛家具有限公司',
          alias: '强盛家具',
          value: [119.617488, 30.703658, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江安吉铭成椅业有限责任公司',
          alias: '铭成椅业',
          value: [119.575287, 30.51134, 10, '未入驻']
        },
        {
          id: '1111',
          name: '大康控股集团有限公司',
          alias: '大康控股',
          value: [119.632147, 30.649607, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江环辰椅业有限公司',
          alias: '环辰椅业',
          value: [119.612225, 30.61461, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江大东方椅业股份有限公司',
          alias: '大东方',
          value: [119.68004, 30.626159, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江万昌家具股份有限公司',
          alias: '万昌家具',
          value: [119.753518, 30.753862, 10, '未入驻']
        },
        {
          id: '1111',
          name: '安吉科瑞椅业科技有限公司',
          alias: '科瑞椅业',
          value: [119.70004, 30.526159, 10, '未入驻']
        },
        {
          id: '1111',
          name: '强龙家具股份有限公司',
          alias: '强龙家具',
          value: [119.68004, 30.626159, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江博泰家具有限公司',
          alias: '博泰家具',
          value: [119.68004, 30.626159, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江泰丰家具有限公司',
          alias: '泰丰家具',
          value: [119.68004, 30.626159, 10, '未入驻']
        },
        {
          id: '1111',
          name: '浙江大唐家具有限公司',
          alias: '大唐家具',
          value: [119.68004, 30.626159, 10, '未入驻']
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
      animation scrollTop 26s linear infinite
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
      transform: translate3d(0,-520px,0);
    }
  }
</style>
