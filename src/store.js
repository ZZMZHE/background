import Vue from 'vue'
import Vuex from 'vuex'
// import { getStyleCategory, getModelRole } from 'api/index.js'
Vue.use(Vuex)
const uploadUrl = {
    // ------------------------ 聊天的id记得换
    development: 'https://api.smdxx.com/admin_api/admin/file/upload/',//线上地址
    production: 'https://api.smdxx.com/admin_api/admin/file/upload/'//线上地址
    // development: 'http://192.168.0.35:8912/admin/file/upload/',
    // production: 'http://192.168.0.35:8912/admin/file/upload/'
    // development: 'http://192.168.0.208:8911/admin/file/upload/',
    // production: 'http://192.168.0.208:8911/admin/file/upload/'
    // development: 'http://39.100.93.227:8911/admin/file/upload/',
    // production: 'http://39.100.93.227:8911/admin/file/upload/'
}
const downLoadUrl = {
    development: 'http://192.168.0.35:8912/admin/file/upload/',//线上地址
    production: 'http://192.168.0.35:8912/admin/file/upload/'//线上地址
    // development: 'http://192.168.0.35:8912/admin/count/file',
    // production: 'http://192.168.0.35:8912/admin/count/file'
    // development: 'http://192.168.0.208:8911/admin/count/file',
    // production: 'http://192.168.0.208:8911/admin/count/file'
    // development: 'http://39.100.93.227:8911/admin/count/file',
    // production: 'http://39.100.93.227:8911/admin/count/file'
}
export default new Vuex.Store({
    state: {
        uploadUrl: uploadUrl[process.env.NODE_ENV],
        downLoadUrl: downLoadUrl[process.env.NODE_ENV],
        signStatus: '', // 登录状态
        roles: [], // 角色列表
        account: [] // 权限列表
    },
    mutations: {
        sign(state) { // 登录
            state.signStatus = 'ok'
            sessionStorage.setItem('signStatus', 'ok')
        },
        logout(state) { // 退出
            state.signStatus = ''
            sessionStorage.clear()
        },
        permissionList (state, platform) {
            state.account = platform
            sessionStorage.setItem('permissionList', JSON.stringify(platform))
        }
        // getCategory(state, categories = []) {
        //     state.categories = categories
        // },
        // getModelRole(state, roles) {
        //     state.roles = roles
        // }
    },
    actions: {
        // 获取权限信息
        permissionList ({ commit }, platform) {
            commit('PERMISSION_LIST', platform)
        }
        // _getStyleCategory(context, type) { // type  1—风格，2—作品类目
        //     getStyleCategory(type, null).then(res => {
        //         if (res) {
        //             if (parseInt(type) === 1) {
        //                 context.commit('getStyle', res.data)
        //             } else if (parseInt(type) === 2) {
        //                 context.commit('getCategory', res.data)
        //             }
        //         }
        //     })
        // },
        // _getModelRole(context) { // 获取用户类型
        //     getModelRole().then(res => {
        //         if (res) {
        //             context.commit('getModelRole', res.data)
        //         }
        //     })
        // }
    }
})
