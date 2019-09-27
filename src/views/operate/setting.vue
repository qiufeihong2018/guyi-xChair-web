<template>
  <el-container class="operate-setting">
    <el-aside width="250px">
      <h3>行业企业列表</h3>
      <el-input v-model="input" placeholder="请输入关键词搜索"></el-input>
      <div class="company">
        <div v-for="item in options" :key="item.value" class="company-item">
          {{ item.label }}
        </div>
      </div>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'OperateSetting',
  components: {},
  data() {
    return {
      value: [],
      options: [
        {
          value: '01', // id
          label: '大康控股集团有限公司',
          children: [
            {
              value: '01',
              label: '车间01',
              children: [
                {
                  value: '01',
                  label: '流水线01',
                },
                {
                  value: '02',
                  label: '流水线02',
                },
                {
                  value: '03',
                  label: '流水线03',
                },
              ]
            }
          ],
        },
        {
          value: '02',
          label: '浙江永艺家具股份有限公司',
          children: [],
        },
        {
          value: '03',
          label: '安吉联胜家具有限公司',
          children: [],
        },
        {
          value: '04',
          label: '浙江恒林椅业股份有限公司',
          children: [],
        },
        {
          value: '05',
          label: '浙江强盛家具有限公司',
          children: [],
        },
        {
          value: '06',
          label: '浙江强龙椅业股份有限公司',
          children: [],
        },
        {
          value: '07',
          label: '浙江安吉铭成椅业有限责任公司',
          children: [],
        },
        {
          value: '08',
          label: '安吉伟誉家具有限公司',
          children: [],
        },
        {
          value: '09',
          label: '浙江五星家具有限公司',
          children: [],
        },
        {
          value: '10',
          label: '浙江中义家具有限公司',
          children: [],
        },
      ]
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    handleChange(value) {
      // 在此可以获取唯一的["zhinan", "shejiyuanze", "fankui"]
      // console.log(value)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.operate-setting {
  height 100%
}
</style>
