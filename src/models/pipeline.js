import {
  post,
  get,
  put,
  _delete
} from '@/utils/request'

export default class Pipeline {
  // 获取某个企业所有的pipeline
  static async getList(companyId) {
    const data = await get(`company/${companyId}/pipeline/all`)
    return data
  }

  /**
   * 获取某个pipeline的详情
   *
   * @static
   * @param {*} id
   * @returns
   */
  static async getDetail(id, companyId) {
    const data = await get(`company/${companyId}/pipeline/${id}`)
    return data
  }

  /**
   * 新增 pipeline的详情
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
  static async createDetail(params) {
    const data = await post('pipeline', params)
    return data
  }

  /**
   * 修改 pipeline的详情
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
    const data = await put('pipeline', params)
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

  /**
   * 删除某个pipeline
   *
   * @static
   * @param {*} id
   * @returns
   */
  static async deletePipeline(id) {
    const data = await _delete(`pipeline/${id}`)
    return data
  }

  static async getPipelineState(id) {
    const data = await get('pipelineState')
    return data
  }

  /**
   * 根据时间段查找生产线状态
   */
  static async searchPipelineState(params) {
    const data = await post('pipelineState/search', params)
    return data
  }

  /**
   * 查找生产线各状态时长
   *
   */
  static async getStateTime(params) {
    const data = await post('pipelineState/time', params)
    return data
  }

  /**
   * 根据时间查询生产线数据(产量,能耗等)
   *
   * @static
   * @returns
   */
  static async searchPipeline(params) {
    const data = await post('monitor/search', params)
    let energyData = []
    let outputData = []
    data.forEach(item => {
      if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.positiveEnergy) {
        energyData.push(item)
      }
      if (Object.prototype.toString.call(item.value) === '[object Object]' && item.value.productionQuantity) {
        outputData.push(item)
      }
    })
    return {
      energyData,
      outputData
    }
  }
}
