/* eslint-disable */
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
    {
      companyId: '', // 公司ID
      companyName: '', // 公司名
      pipelineList: [
      {
        id: '', // 生产线的ID
        name: '', // 生产线的别名
        no: '', // 生产线的编号(自定义)
        }
      ]
   */
  static async getPipelineList(id) {
    const data = await get(`company/${id}/pipeline/all`)
    return data
  }
  // 获取今天公司所有生产线的生产量
  static async getAllPipelineCounterStats(companyId) {
    const data = await post('/company/pipeline/stats', {
      id: companyId, //companyId,
      dataType: "counter",
      // start: 1566981600000,
      // end: 1569168000000,
      start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
      end: +new Date()
    })
    // console.log('CounterStats', data)
    const processedData = data.map(item => {
      if (item.value) {
        item.in = item.value.repeatedCounting
        item.failed = item.value.defectiveNumber
        item.out = item.value.productionQuantity
      } else {
        item.in = 0
        item.failed = 0
        item.out = 0
      }
      return item
    })
    return processedData
  }

  // 获取今天公司所有生产线的用电量
  static async getAllPipelinePowerStats(companyId) {
    const data = await post('/company/pipeline/stats', {
      id: companyId,
      dataType: "power",
      // start: 1566981600000,
      // end: 1569168000000,
      start: +new Date(new Date(new Date().toLocaleDateString()).getTime()),
      end: +new Date()
    })
    // console.log('PowerStats', data)
    const processedData = data.map(item => {
      if (item.value) {
        item.power = item.value.positiveEnergy * 2.5
      } else {
        item.power = 0
      }
      return item
    })
    processedData.sort((prev, next) => prev.pipelineId < next.pipelineId)
    return processedData
  }
}
