<template>
  <el-container class='company'>
    <el-header class="header">
      <h2>企业信息</h2>
    </el-header>
    <el-container style="margin-top: 10px">
      <el-tabs tab-position="left" type="border-card" style="width: 100%">
        <el-tab-pane v-for="company in companyList" :key="company.name" :label="company.name">
          <el-main class="main">
            <el-form ref="form" :model="company" label-width="100px">
              <el-form :inline="true" label-width="100px">
                <el-form-item label="企业名称:">
                  {{ company.name }}
                </el-form-item>
              </el-form>
              <el-form :inline="true" label-width="100px">
                <el-form-item label="企业地址:">
                  {{company.address}}
                </el-form-item>
                <el-form-item label="企业邮编:">
                  {{ company.zipCode }}
                </el-form-item>
              </el-form>
              <el-form-item label="职工人数:">
                {{company.totalStaff}}
              </el-form-item>
              <el-form :inline="true" label-width="100px">
                <el-form-item label="经营范围:">
                  {{ company.businessScope }}
                </el-form-item>
                <el-form-item label="主导产品:">
                  {{ company.mainProduct }}
                </el-form-item>
              </el-form>
              <el-form :inline="true" label-width="100px">
                <el-form-item label="获奖情况:">
                  {{ company.honor }}
                </el-form-item>
              </el-form>
              <el-form :inline="true" label-width="100px">
                <el-form-item label="认证情况:">
                  {{ company.certification }}
                </el-form-item>
              </el-form>
            </el-form>
            <el-tabs v-model="activeIndex">
              <el-tab-pane label="2016年" name="2016">
                <table style="margin-top: 10px;">
                  <tr>
                    <th>工业总产数值(万元)</th>
                    <td>{{company.kpi[0].output}}</td>
                    <th>营业总收入(万元)</th>
                    <td>{{company.kpi[0].operatingIncome}}</td>
                  </tr>
                  <tr>
                    <th>销售收入(万元)</th>
                    <td>{{company.kpi[0].sale}}</td>
                    <th>出口创汇(万美元)</th>
                    <td>{{company.kpi[0].export}}</td>
                  </tr>
                  <tr>
                    <th>交税总额(万元)</th>
                    <td>{{company.kpi[0].tax}}</td>
                    <th>税后收入(万元)</th>
                    <td>{{company.kpi[0].profitAfterTax}}</td>
                  </tr>
                  <tr>
                    <th>人均销售收入(万元)</th>
                    <td>{{company.kpi[0].averageSale}}</td>
                    <th>资产总额(万元)</th>
                    <td>{{company.kpi[0].totalAsset}}</td>
                  </tr>
                  <tr>
                    <th>固定资产(万元)</th>
                    <td>{{company.kpi[0].fixedAsset}}</td>
                    <th>资产负债率(%)</th>
                    <td>{{company.kpi[0].debtRatio}}</td>
                  </tr>
                </table>
              </el-tab-pane>
              <el-tab-pane label="2017年" name="2017"></el-tab-pane>
              <el-tab-pane label="2018年" name="2018"></el-tab-pane>
            </el-tabs>
          </el-main>

        </el-tab-pane>
      </el-tabs>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { companies } from 'assets/data/company'
import CompanyModel from '@/models/company'
import { mapMutations } from 'vuex'
export default {
  name: 'OperateCompany',
  components: {},
  data() {
    return {
      companyList: companies,
      //   [
      //   {
      //     id: 1,
      //     name: '中源家居股份有限公司',
      //   },
      //   {
      //     id: 2,
      //     name: '永艺家具股份有限公司',
      //   },
      //   {
      //     id: 3,
      //     name: '浙江恒林椅业股份有限公司',
      //   },
      //   {
      //     id: 4,
      //     name: '安吉富和家具股份有限公司',
      //   },
      //   {
      //     id: 5,
      //     name: '安吉隆博家具股份有限公司',
      //   },
      //   {
      //     id: 6,
      //     name: '浙江盛信椅业股份有限公司',
      //   }
      // ],
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
  async mounted() {
    let list = await CompanyModel.getList()
    console.log('list', list)
    this.setCompanyList(list)
  },
  methods: {
    ...mapMutations({
      setCompanyList: 'company/SET_COMPANY_LIST'
    }),
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },

  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>> .el-form-item {
  margin-bottom 5px
  margin-right 20px
  label {
    font-size 18px
    color black
    border-left solid 4px #409EFF
  }
  .el-form-item__content {
    font-size 18px
  }
}
.company {
  .header {
    text-align center
    line-height 60px
  }
  .aside {
  }
  .main {
    margin-left 10px
    table {
      tr {
        border-bottom 1px solid #d1dbe5
        th {
          padding 10px
        }
        td {
          padding 5px 10px
          text-align right
          width 200px
        }
      }
    }
  }
}
</style>
