/* 公司配置 */
/* eslint-disable */
import CompanyModel from '@/models/company'
const state = {
  companyList: []
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
}

const actions = {
  async getCompanyList({ commit }, user) {
  // console.log('commit', commit)
    const companyList = await CompanyModel.getList()
    commit('SET_COMPANY_LIST', companyList)
},

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
