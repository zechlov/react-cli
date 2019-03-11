import Post from './base'

export default class TestApi {

    public tip() {
        const url: string = '/common/tip'
        return Post(url)
    }

}