const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/about',
  name: 'About',
  component: undefined,
  meta: {
    title: '关于',
    icon: 'fa fa-info-circle',
  },
  children: [
    {
      path: '/about/line',
      component: _import('about/index'),
      name: 'AboutIndex',
      meta: { title: '行业介绍', icon: 'el-icon-house' },
    },
    {
      path: '/about/company',
      component: _import('about/company'),
      name: 'AboutCompany',
      meta: { title: '公司详情', icon: 'el-icon-house' },
    },
  ],
}
