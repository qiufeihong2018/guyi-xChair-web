/* 可视化界面配置 */
/* eslint-disable */
const state = {
  geo: {
    province: '',
    city: ''
  },
  collegeList: [],
  year: 2
}

const getters = {

}

const mutations = {
  SET_PROVINCE: (state, province) => {
    state.geo.province = province
  },
  SET_CITY: (state, city) => {
    state.geo.city = city
  },
  SET_COLLEGE_LIST: (state, collegeList) => {
    state.collegeList = collegeList
  },
  SET_YEAR:(state,year)=>{
  state.year = year
}
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
