<template>
  <div>
    <h2>新增企业</h2>
    <div>企业列表</div>
    <el-cascader :options="options" filterable >
      <template slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
    <div>
      <div v-for="item in options" :key="item.value" class="company-item">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'add',
  components: {},
  data() {
    return {
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
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
