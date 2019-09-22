import Vue from 'vue'
import FaIcon from 'comps/base/FaIcon'
import color from 'assets/data/color'
import TimeSwitch from 'comps/base/TimeSwitch'

Vue.component('fa-icon', FaIcon)
Vue.component('time-switch', TimeSwitch)
Vue.prototype.color = color
