const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/company',
  name: 'Company',
  component: undefined,
  meta: {
    title: '企业',
    icon: 'fa fa-industry',
  },
  children: [
    {
      path: '/company/index',
      component: _import('company/index'),
      name: 'CompanyIndex',
      meta: { title: '基础配置', icon: 'fa fa-wrench' },
    },
  ],
}
