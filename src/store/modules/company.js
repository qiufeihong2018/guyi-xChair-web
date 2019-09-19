/* 公司配置 */
/* eslint-disable */
import CompanyModel from '@/models/company'
import tree from "element-ui/packages/table/src/store/tree";
const state = {
  companyList: [],
  pipeLine: {
    companyId:'',
    showDetail:false,
    id:''
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
  SET_PIPELINE_ID:(state,pipeLine)=>{
    state.pipeLine = pipeLine
  }

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
