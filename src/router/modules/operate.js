const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/operate',
  name: 'Operate',
  component: undefined,
  meta: {
    title: '操作员',
    icon: 'fa fa-wrench',
  },
  children: [
    {
      path: '/operate/company',
      component: _import('operate/company'),
      name: 'OperateCompany',
      meta: { title: '企业配置', icon: 'fa fa-wrench' },
    },
    {
      path: '/operate/prodline',
      component: _import('operate/prodline'),
      name: 'OperateProdline',
      meta: { title: '生产线配置', icon: 'fa fa-wrench' },
    },
    {
      path: '/operate/product',
      component: _import('operate/product'),
      name: 'OperateProduct',
      meta: { title: '产品配置', icon: 'fa fa-wrench' },
    },
  ],
}
