import {
  post,
  get,
  put,
  _delete
} from '@/utils/request'

export default class product {
  /**
   * 根据公司查列表
   *
   * @static
   * @returns
   */
  static async getListByConmpany(companyId) {
    const data = await get(`company/${companyId}/product`)
    return data
  }

  /**
   * 查找产品生产历史数据
   *
   * @static
   * @returns
   */
  static async getHistoryProduct(data) {
    const res = await post('pipeline/state/history', data)
    return res
  }

  /**
   * 查找当前生产产品
   *
   * @static
   * @returns
   */
  static async getCurrentProduct(data) {
    const res = await post('pipeline/state/current', data)
    return res
  }
  /**
   * 修改产品
   *
   * @static
   * @returns
   */

  static async updateProdcut(data) {
    const res = await put('product', data)
    return res
  }
  /**
   * 创建产品
   *
   * @static
   * @returns
   */

  static async createProduct(data) {
    const res = await post('product', data)
    return res
  }
  /**
   * 删除产品
   *
   * @static
   * @returns
   */

  static async deleteProduct(id) {
    const res = await _delete(`product/${id}`)
    return res
  }
}
