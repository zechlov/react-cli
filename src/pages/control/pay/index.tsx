import * as React from 'react'
import style from './index.scss'
import { Icon, Modal } from 'antd'
import PaiXinYunApi from 'src/service/index'
import { RouteComponentProps, withRouter } from 'react-router'
import * as QRCode from 'qrcode.react'

interface PayFormState {
  detail: any
  status: boolean
  show: boolean
  html: any
}

class PaymentMain extends React.Component<RouteComponentProps, PayFormState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      detail: null,
      status: false,
      show: false,
      html: null
    }
  }

  public componentWillMount() {
    if (this.props.history.location.state && this.props.history.location.state.status) {
      this.setState({
        detail: this.props.history.location.state
      })
    }
  }

  // public wechatPay = async () => {
  //   const ip = (window as any).returnCitySN.cip
  //   const data = {
  //     order_id: this.state.detail.ID || this.state.detail.id,
  //     spbill_create_ip: ip
  //   }
  //   let html: any = null
  //   const res = await PaiXinYunApi.getPayApi().wechatTrade(data)
  //   if (res.status === 200) {
  //     html = res.data.url
  //   }
  //   this.setState({
  //     html: html,
  //     show: true
  //   })
  // }

  public async aliPay() {
    const data = {
      order_id: this.state.detail.ID || this.state.detail.id
    }
    const res = await PaiXinYunApi.getPayApi().AliTrade(data)
    if (res.status === 200) {
      window.location.href = res.data.url
    }
  }

  public render() {
    return (
      <div className={style["payment-page"]}>
        {
          this.state.detail ?
            <>
              <div className={style.title}>付费详情</div>
              <div className={style["info-line"]}>
                <div className={style.label}>付费项目</div>
                <div className={style["info-content"]}> 云名片小程序包年-付费</div>
              </div>
              <div className={style["info-line"]}>
                <div className={style.label}>项目名称</div>
                <div className={style["info-content"]}>
                  {this.state.detail.name}
                </div>
              </div>
              <div className={style["info-line"]}>
                <div className={style.label}>支付金额</div>
                <div className={style["info-content"]}>
                  ￥{this.state.detail.amount}
                </div>
              </div>
              <div className={style["info-line"]} style={{ alignItems: 'center' }}>
                <div className={style.label}>支付方式</div>
                <div className={style["info-content"]}>
                  <div className={style.pay} onClick={() => this.aliPay()}>
                    <div className={style.icon1}>
                      <Icon type="alipay-circle" />
                    </div>
                    支付宝
                  </div>
                  {/* <div className={style.pay} onClick={() => this.show()}>
                    <div className={style.icon2}>
                      <Icon type="wechat" />
                    </div>
                    微信
                  </div> */}
                </div>
              </div>
              <div className={style["info-line"]}>
                <div className={style.label}>扫码支付</div>
                <div className={style["info-content"]}>
                  <div className={style.qr}>
                    打开支付宝扫一扫，轻松支付
            </div>
                </div>
              </div>
              <div className={style.footer}>
                如果您已支付成功，请刷新此页面，不要重复支付
        </div>
            </>
            : <div className={style["out-time"]} onClick={() => this.back()}>数据过期，请返回重新发起支付</div>
        }
        <Modal visible={this.state.show}
          footer={null}
          width="300px"
          onCancel={() => this.cancel()}>
          {this.state.html ?
            <div className={style["qr-box"]}>
              <QRCode value={this.state.html} />
            </div>
            : <div className={style["qr-box"]}>请求失败，请稍后再试</div>}
        </Modal>
      </div>
    )
  }

  // private show() {
  //   this.wechatPay()
  // }

  private cancel() {
    this.setState({
      show: false
    })
  }

  private back() {
    this.props.history.go(-1)
  }
}

export default withRouter(PaymentMain)