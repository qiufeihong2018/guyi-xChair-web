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
              <el-tab-pane v-for="item in company.kpi" :key="item.year" 
                :label="`${item.year}年`" :name="item.year">
                <table style="margin-top: 10px;">
                  <tr>
                    <th>工业总产数值(万元)</th>
                    <td>{{item.output}}</td>
                    <th>营业总收入(万元)</th>
                    <td>{{item.operatingIncome}}</td>
                  </tr>
                  <tr>
                    <th>销售收入(万元)</th>
                    <td>{{item.sale}}</td>
                    <th>出口创汇(万美元)</th>
                    <td>{{item.export}}</td>
                  </tr>
                  <tr>
                    <th>交税总额(万元)</th>
                    <td>{{item.tax}}</td>
                    <th>税后收入(万元)</th>
                    <td>{{item.profitAfterTax}}</td>
                  </tr>
                  <tr>
                    <th>人均销售收入(万元)</th>
                    <td>{{item.averageSale}}</td>
                    <th>资产总额(万元)</th>
                    <td>{{item.totalAsset}}</td>
                  </tr>
                  <tr>
                    <th>固定资产(万元)</th>
                    <td>{{item.fixedAsset}}</td>
                    <th>资产负债率(%)</th>
                    <td>{{item.debtRatio}}</td>
                  </tr>
                </table>
              </el-tab-pane>
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
      activeIndex: 2016
    }
  },
  computed: {},
  created() { },
  async mounted() {
    let companyList = await CompanyModel.getList()
    this.setCompanyList(companyList)
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
