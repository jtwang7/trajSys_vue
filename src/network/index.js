import axios from 'axios'

export const baseRequest = (config) => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:7001',
        method: 'get',
        timeout: 10000,
        // proxy: {
        //     protocol: 'http',
        //     host: '127.0.0.1',
        //     port: 7001,
        // },
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}