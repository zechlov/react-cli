import Axios from './base'

/**
 * @param app_type  小程序类型
 * @param specs_id 套餐id
 */
interface CreateOrder {
  app_type: string
  specs_id: string
}

interface Order {
  instance_id: number
  specs_id: string
}

interface ProxyOrder {
  app_type: number
  specs_id: number
  customer_user_id: number
}
 
/**
 * 
 * @param body 商品或支付单简要描述
 * @param out_trade_no 商户系统内部的订单号
 * @param total_fee 订单总金额，单位为分
 * @param spbill_create_ip APP和网页支付提交用户端ip
 * @param notify_url 接收微信支付异步通知回调地址
 * @param trade_type 填 MWEB
 * @param time_expire 订单失效时间，yyyyMMddHHmmss
 */
interface WechatPay {
  order_id: number,
  spbill_create_ip: string
}

export default class PayApi {

  public getInstanceSpecs() {
    const url: string = `bc/instance-specs-list`
    return Axios(url, null, null, 'GET')
  }

  public wechatTrade(data: WechatPay) {
    const url: string = `/wxpay-trade`
    return Axios(url, data, null, 'post')
  }

  public AliTrade(data: any) {
    const url: string = `/alipay-trade`
    return Axios(url, data, null, 'POST', 'text/xml')
  }

  public getOrderList() {
    const url: string = `/order/list`
    return Axios(url, null, null, 'POST')
  }

  public createOrder(data: CreateOrder) {
    const url: string = `/order/new`
    return Axios(url, data, null, 'POST')
  }

  public createPromote(data: Order) {
    const url: string = `/order/promote`
    return Axios(url, data, null, 'POST')
  }

  public createRenew(data: Order) {
    const url: string = `/order/renew`
    return Axios(url, data, null, 'POST')
  }

  public getOrderStatus(data: {out_trade_no: string}) {
    const url: string = `/order`
    return Axios(url, null, data, 'GET')
  }

  public createProxyOrder(data: ProxyOrder) {
    const url: string = `/order/proxy/new`
    return Axios(url, data, null, 'POST')
  }

  public creactProxyPromote(data: Order) {
    const url: string = `/order/proxy/promote`
    return Axios(url, data, null, 'POST')
  }

  public createProxyRenew(data: Order) {
    const url: string = `/order/proxy/renew`
    return Axios(url, data, null, 'POST')
  }
}