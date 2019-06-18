
import TestApi from './TestApi'
import WechatApi from './WechatApi'
import UserApi from './UserApi'
import ArticleApi from './ArticleApi'
import ProductApi from './ProductApi'
import SettingApi from './SettingApi'
import GroupApi from './GroupApi'
import DataApi from './DataApi'
import AgentApi from './AgentApi'
import PayApi from './PayApi'
import ClockInApi from './ClockInApi'
import CosApi from './CosApi'

class PaiXinYun {

    public test: TestApi

    public getTest() {
        if (!this.test) {
            this.test = new TestApi()
        }
        return this.test
    }

    public wechat: WechatApi

    public getWechat() {
        if (!this.wechat) {
            this.wechat = new WechatApi()
        }
        return this.wechat
    }

    public user: UserApi

    public getUser() {
        if (!this.user) {
            this.user = new UserApi()
        }
        return this.user
    }

    public article: ArticleApi

    public getArticle() {
        if (!this.article) {
            this.article = new ArticleApi()
        }
        return this.article
    }

    public product: ProductApi

    public getProduct() {
        if (!this.product) {
            this.product = new ProductApi()
        }
        return this.product
    }

    public setting: SettingApi

    public getSettingApi() {
        if (!this.setting) {
            this.setting = new SettingApi()
        }
        return this.setting
    }

    public group: GroupApi

    public getGroupApi() {
        if (!this.group) {
            this.group = new GroupApi()
        }
        return this.group
    }

    public Data: DataApi

    public getDataApi() {
        if (!this.Data) {
            this.Data = new DataApi()
        }
        return this.Data
    }

    public Agent: AgentApi

    public getAgentApi() {
        if (!this.Agent) {
            this.Agent = new AgentApi()
        }
        return this.Agent
    }

    public Pay: PayApi

    public getPayApi() {
        if (!this.Pay) {
            this.Pay = new PayApi()
        }
        return this.Pay
    }

    public ClockIn: ClockInApi

    public getClockInApi() {
        if (!this.ClockIn) {
            this.ClockIn = new ClockInApi()
        }
        return this.ClockIn
    }

    public Cos: CosApi

    public getCosApi() {
        if (!this.Cos) {
            this.Cos = new CosApi()
        }
        return this.Cos
    }
}

export default new PaiXinYun()
