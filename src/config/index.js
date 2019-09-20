const config = {
  company: '杭州谷逸网络科技',
  // 'development'
  baseURL: process.env.NODE_ENV === 'production' ? 'http://121.40.107.95:5001/api/v1/' : 'http://121.40.107.95:5001/api/v1/',
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://121.40.107.95:5001/api/v1/' : 'http://localhost:5001/api/v1/',
  layout: {
    type: 'default', // 左右布局: default; T型布局: t-type; 上下布局: vertical
    maxWidth: '170px',
    minWidth: '60px',
  },
}

export default config
