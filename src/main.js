import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Message } from 'element-ui'
import './plugins/element.js'
import 'assets/style/css/index.styl'
import echarts from 'echarts'
import 'default-passive-events' // 取消 passive警告
// import Blob from './vendor/Blob'
// import Export2Excel from './vendor/Export2Excel.js'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
// 请求拦截
// 请求发送拦截，把数据发送给后台之前做些什么......
axios.interceptors.request.use((request) => {
    return request
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// 请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
    // 特殊错误处理，状态为10时为登录超时
    if (response.data.status === 200) {
        return response
    } else {
        if (response.data.status === 501) {
            // console.log(2)
            // Message.error({ message: '登录超时，请重新登录' })
            router.push('/login')
            // 其余错误状态处理
        } else if (response.data.status === 502) {
            // console.log(2)
            // Message.error({ message: '登录超时，请重新登录' })
            // http://192.168.0.76:8080/#/background/home/view_count/statistics
            let url = window.location.href
            let rou = url.split('/background/')[1]
            let r = rou.split('/')
            // console.log(r)
            router.push(`/background/${r[0]}/${r[1]}`)
            Message.error({ message: response.data.msg })
            // 其余错误状态处理
        } else {
            Message.error({ message: response.data.msg })
        }
    }
    // if (response.data.status === 501 && response.data.msg === '请登录') {
    //     router.push('/login')
    //     // Message.error({ message: '登录超时，请重新登录' })
    //     // 其余错误状态处理
    // } else if (response.data.status === 200) {
    //     // 将我们请求到的信息返回页面中请求的逻辑
    //     return response
    // } else {
    //     return response
    // }
    // ......
}, function (error) {
    return Promise.reject(error)
})
