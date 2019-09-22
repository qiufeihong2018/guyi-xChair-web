/* 公司配置 */
/* eslint-disable */
import CompanyModel from '@/models/company'
import tree from "element-ui/packages/table/src/store/tree";
const state = {
  companyId: '5d8041e4de1685795bc379b2',
  companyList: [],
  companyAllPipelineCounterStat: [
    // {
    //   dataType: "counter",
    //   pipelineId: "",
    //   pipelineName: "",
    //   in: 0,
    //   out: 0,
    //   failed: 0
    // }
  ], // 所有生产线的计数器
  companyAllPipelinePowerStat: [ // 所有生产线的耗电量
    {
      dataType: "power",
      pipelineId: "",
      pipelineName: "",
      power: 0
    }
  ], 
  prodlineList: [], // 该公司的生产线列表
  prodlineListStateStat: { // 生产线列表状态统计
    off: 0,
    on: 0,
    pending: 0
  },
  pipeLine: {
    companyId: '',
    showDetail: false,
    id: ''
  },
}

const getters = {

}

const mutations = {
  SET_COMPANY_LIST: (state, list) => {
    // let companyList = [...list].map(item => {
    //   return {
    //     id: item._id,
    //     name: item.companyName
    //   }
    // })
    state.companyList = list
  },
  // 初始化(清空)生产线列表的状态统计(关机、开机、空转)
  CLEAR_PRODLINE_LIST_STATE_STAT: (state) => {
    state.prodlineListStateStat = {
      off: 0,
      on: 0,
      pending: 0
    }
  },
  SET_PRODLINE_LIST: (state, list) => {
    state.prodlineList = list
    // 设置生产线列表的状态统计(关机、开机、空转)
    list.forEach(item => {
      if (item.state === 'on') state.prodlineListStateStat.on += 1
      if (item.state === 'off') state.prodlineListStateStat.off += 1
      if (item.state === 'pending') state.prodlineListStateStat.pending += 1
    })
  },
  SET_PIPELINE_ID: (state, pipeLine) => {
    state.pipeLine = pipeLine
  },
  SET_COMPANY_ALL_PIPELINE_STATE: (state, { counterList, powerList} ) => {
    // 所有生产线的耗电量
    state.companyAllPipelinePowerStat = powerList 
    // 所有生产线的计数器
    state.companyAllPipelineCounterStat = counterList 
  },
}

const actions = {
  async getCompanyList({ commit }, companyId) {
    const companyList = await CompanyModel.getList()
    commit('SET_COMPANY_LIST', companyList)
  },
  async getProdlineList({ commit }, companyId) {
    const prodlineList = await CompanyModel.getPipelineList(companyId)
    commit('CLEAR_PRODLINE_LIST_STATE_STAT')
    commit('SET_PRODLINE_LIST', prodlineList)
  },
  async getCompanyAllPipelineStateStat({ commit }, companyId) {
    let counterList = await CompanyModel.getAllPipelineCounterStats(companyId)
    let powerList = await CompanyModel.getAllPipelinePowerStats(companyId)
    commit('SET_COMPANY_ALL_PIPELINE_STATE', { counterList, powerList })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
