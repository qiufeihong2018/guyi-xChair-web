import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Pipeline {
  // 获取某个企业所有的pipeline
  static async getList(companyId) {
    const data = await get(`pipeline/${companyId}`)
    return data
  }

  /**
   * 获取某个pipeline的详情
   *
   * @static
   * @param {*} id
   * @returns
   */
  static async getDetail(id) {
    const data = await get(`pipeline/${id}`)
    return data
  }

  /**
   * 修改/新增 pipeline的详情
   *
   * @static
   * @param {*} data 
    data = {
      companyId: '',   // 公司ID
      companyName: '', // 公司名
      pipelineId:'',  // 生产线ID
      pipelineName: '', // 生产线的别名
      pipelineNo: '', // 生产线的编号（彭导可自定义）
      probeList: [  // 该生产线的所有采集器的列表
        'AA01',
        'AA02'
      ]
      }
   * @returns
   */
  static async modifyDetail(params) {
    const data = await post('pipeline', params)
    return data
  }

  /**
   *  获取某条生产线的所有采集器
   *
   * @static
   * @param {*} id
   * @returns 
    列表
    [
      {
        companyId: '', // 公司ID
        companyName: '', // 公司名
        pipelineId: '', // 生产线ID
        pipelineName: '', // 生产线别名
        probeId: '',//采集器ID
        probeNo: 'AA01' // 采集器编号
      },
      {
        companyId: '',
        companyName: '',
        pipelineId: '',
        pipelineName: '',
        probeId: '',
        probeNo: 'AA02'
      },
    ]
   */
  static async getAllProbe(id) {
    const data = await post(`pipeline/${id}/probe`)
    return data
  }
}
