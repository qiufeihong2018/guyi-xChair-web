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
