// import { AxiosInstance } from 'axios'
import axios from 'axios'

axios.interceptors.request.use(
    config => {
        const Token = localStorage.getItem('token')
        if (Token) {
            const exp = new Date();
            const Days = 30;
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = `token=${Token}; path=/; domain=.paixinyun.com;expires=${exp.toUTCString()}`
            config.headers.Authorization = Token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    })

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        //  401 token失效
        if (error.response && error.response.status === 401 && error.response.data.msg === '未授权') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            location.replace('/')
            return
        } else {
            let res:any = {
                data: {}
            }
            if (error.response) {
                res = error.response
                res.data.msg = error.response.data.msg || '提交失败，请稍后再试'
            } else {
                res.data.msg = '提交失败，请稍后再试'
            }
            
            return res
        }
    }
)

// function deleteEmptyProperty(object: any) {
//     for (const field of Object.keys(object)) {
//         const value = object[field]
//         if (value === '' || value === null || value === undefined) {
//             delete object[field]
//         }
//     }

//     return object
// }

/**
 * 
 * @param url 不带host的url
 * @param data 请求体
 * @param params query参数
 * @param method 方法，大写字母
 * @param type 数据格式, 默认application/json
 */
const Axios = (url: string, data: any, params: any, method: string, type?: string) => {
    const config = {
        baseURL: '//api.paixinyun.com',
        // baseURL: '//192.168.0.245:8000',
        url: url,
        method: method,
        headers: {
            'Content-Type': type || 'application/json'
        },
        data: data,
        params: params,
    }

    // config = deleteEmptyProperty(config)

    // console.log(config)

    return axios(config)
}

export default Axios