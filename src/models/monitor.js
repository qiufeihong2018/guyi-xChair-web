import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Company {
  /**
   * 根据时间查询monitor
   *
   * @static
   * @returns
   */
  static async searchMonitor(params) {
    const data = await post('monitor/search', params)
    return data
  }
}
