<template>
  <el-container class='company'>
    <el-header class="header">
      <h2>企业信息</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-aside width="200px" class="aside">
        <el-table :data="companyList" style="width: 100%" header-align="center">
          <el-table-column prop="name" label="企业列表">
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main class="main">
        <el-form ref="form" :model="form">
          <el-form :inline="true" label-width="100px">
            <el-form-item label="企业名称:">
              {{ form.name }}
            </el-form-item>
          </el-form>
          <el-form :inline="true" label-width="100px">
            <el-form-item label="企业地址:">
              {{form.address}}
            </el-form-item>
            <el-form-item label="企业邮编:">
              {{ form.zipCode }}
            </el-form-item>
          </el-form>
        </el-form>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="2016">2016年</el-menu-item>
          <el-menu-item index="2017">2017年</el-menu-item>
          <el-menu-item index="2018">2018年</el-menu-item>
        </el-menu>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'OperateCompany',
  components: {},
  data() {
    return {
      companyList: [
        {
          id: 1,
          name: '中源家居股份有限公司',
        },
        {
          id: 2,
          name: '永艺家具股份有限公司',
        },
        {
          id: 3,
          name: '浙江恒林椅业股份有限公司',
        },
        {
          id: 4,
          name: '安吉富和家具股份有限公司',
        },
        {
          id: 5,
          name: '安吉隆博家具股份有限公司',
        },
        {
          id: 6,
          name: '浙江盛信椅业股份有限公司',
        }
      ],
      form: {
        name: '中源家居股份有限公司',
        address: '安吉县递铺街道塘浦工业园区2-5幢',
        zipCode: '313300',
        totalStaff: 1453, // 总的员工表
        businessScope: '家具及家居配件的生产和销售',
        honor: '浙江省研发中心、高新技术企业、浙江省出口名牌',
        certification: '三体系认证',
        mainProduct: '固定沙发、功能沙发',
        pctOfMainProduct: 0.7,
        kpi: [
          {
            year: 2016, // 2016的数据
            output: 60100, // 工业总产数值(万)
            operatingIncome: 59174, // 营业总收入
            sale: 59174, // 销售收入
            export: 8125, // 出口创汇(万·美元)
            tax: 2246, // 缴税总额
            profitAfterTax: 7322, // 税后收入
            averageSale: 40.73, // 人均销售收入
            totalAsset: 37074, // 资产总额
            fixedAsset: 9467, // 固定资产
            debtRatio: 0.65, // 资产负债率
          }
        ]
      },
      activeIndex: '2016'
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>> .el-form-item {
  label {
    font-size 18px
    color black
  }
  .el-form-item__content {
    font-size 18px
  }
}
.company {
  .header {
    text-align center
    line-height 60px
    box-shadow 0.5px 0.5px 4px
  }
  .aside {
  }
  .main {
    margin-left 10px
  }
}
</style>
