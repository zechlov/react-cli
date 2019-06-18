import Axios from './base'

export default class TestApi {

    public tip() {
        const url: string = '/common/tip'
        return Axios(url, null, null, 'POST')
    }

    public message() {
        const url: string = `/wx-auth-callback`
        return Axios(url, null, null, 'POST')
    }

}