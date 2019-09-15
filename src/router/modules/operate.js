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
      path: '/operate/add',
      component: _import('operate/add'),
      name: 'OperateAdd',
      meta: { title: '企业配置', icon: 'fa fa-wrench' },
    },
    {
      path: '/operate/setting',
      component: _import('operate/setting'),
      name: 'OperateSetting',
      meta: { title: '流水线配置', icon: 'fa fa-wrench' },
    },
  ],
}
