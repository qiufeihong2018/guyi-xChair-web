/* 公司配置 */
/* eslint-disable */
const state = {
  companyList: []
}

const getters = {

}

const mutations = {
  SET_COMPANY_LIST: (state, list) => {
    let companyList = [...list].map(item => {
      return {
        id: item._id,
        name: item.companyName
      }
    })
    state.companyList = companyList
  },
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
