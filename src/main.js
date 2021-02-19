import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css


import 'typeface-roboto'
import App from './App'
import router from './router/router'
import store from './store'
import vFilter from '@/utils/myFilter'
import echarts from 'echarts'
import '@/icons' // icon


import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Cookies from 'js-cookie'



// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
for (let key in vFilter){
  Vue.filter(key,vFilter[key])
}
const toastConfig = {
  position: 'bottom-start',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'
}


Vue.use(Loading);
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Toast,toastConfig)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
