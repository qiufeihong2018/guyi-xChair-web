import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Company {
  /**
   * 根据时间查询minitor
   *
   * @static
   * @returns
   */
  static async searchMonitor(params) {
    const data = await post('monitor/search', params)
    return data
  }

  static async getCompanyInfo(id) {
    const data = await get(`pipeline/${id}`, '', '')
    return data
  }
  // static getPipeLineDetail(params) {
  //   const data = get('pipeline/:companyId', params)
  //   return data
  // }
}
