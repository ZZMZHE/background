import axios from 'axios'
import { Message } from 'element-ui'

const urlMap = {
    // http://192.168.0.208:8911 本地
    development: 'https://api.smdxx.com/admin_api/admin',//线上地址
    production: 'https://api.smdxx.com/admin_api/admin'//线上地址
    // development: 'http://192.168.0.35:8912/admin',
    // production: 'http://192.168.0.35:8912/admin'
    // development: 'http://39.100.93.227:8911/admin',
    // production: 'http://39.100.93.227:8911/admin'
    // development: 'http://192.168.0.208:8911/admin',
    // production: 'http://192.168.0.208:8911/admin'
}
const baseUrl = urlMap[process.env.NODE_ENV]

axios.interceptors.request.use(config => { // 请求拦截
    config.withCredentials = true
    return config
}, err => {
    Message.error({ message: '请求超时!' })
    return Promise.resolve(err)
})

export function get(url) {
    return function(addUrl = '', params = {}) {
        return axios.get(baseUrl + url + addUrl, {
            params
        }).then(res => {
            console.log(res)
            const { status, msg } = res.data
            if (status === 200) {
                return res.data
            } else if (status === 500) {
                Message.error(msg)
            }
        }).catch(e => {

        })
    }
}

export function post(url) {
    return function(addUrl = '', data = {}) {
        return axios.post(baseUrl + url + addUrl, data)
            .then(res => {
                const { status, msg } = res.data
                if (status === 200) {
                    return res.data
                } else if (status === 500) {
                    Message.error(msg)
                }
            }).catch(e => {

            })
    }
}
