import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Company {
  /**
   * 获取安吉所有的椅艺企业信息
   *
   * @static
   * @returns 
   */
  static async getList() {
    const data = await get('company/all')
    return data
  }


  /**
   * 获取某企业Id所有pipeline列表
   *
   * @static
   * @param {*} id
   * @returns
   */
  static async getPipelineList(id) {
    const data = await get(`company/${id}/pipeline`)
    return data
  }
}