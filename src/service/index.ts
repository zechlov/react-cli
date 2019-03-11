
import TestApi from './TestApi'

class PaiXinYun {

    public test: TestApi

    public getTest() {
        if (!this.test) {
            this.test = new TestApi()
        }
        return this.test
    }
}

export default new PaiXinYun()
