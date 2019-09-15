// 采集器
import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Probe {

  /**
   * 获取某个采集器的详情
   *
   * @static
   * @param {*} id
   * @returns
    {
      companyId: '', // 公司ID
      companyName: '', // 公司名
      pipelineId: '', // 生产线ID
      pipelineName: '', // 生产线别名
      probeId: '', // 采集器的id
      probeNo: 'AA01' // 采集器编号
      monitorList: [
      ‘CD01’,
      ‘CE01’
      ]
    }
   * @memberof Probe
   */
  static async getDetail(id) {
    const data = await get(`probe/${id}`)
    return data
  }

  /**
   *
   *
   * @static
   * @param {*} data
    {
      companyId: '', // 公司ID
      companyName: '', // 公司名
      pipelineId: '', // 生产线ID
      pipelineName: '', // 生产线别名
      probeId: '', // 采集器的id
      probeNo: 'AA01' // 采集器编号
      monitorList: [
      ‘CD01’,
      ‘CE01’
      ]
    }
   * @returns
   * @memberof Probe
   */
  static async modifyDetail(data) {
    const data = await post('probe', data)
    return data
  }
}