import * as React from 'react'
import style from './index.scss'
import { Button } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface State {
  info: any
}

class PaymentSuccess extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      info: {}
    }
  }

  public async componentWillMount() {
    const trade = this.GetQueryString('out_trade_no')
    if (trade) {
       const res = await PaiXinYunApi.getPayApi().getOrderStatus({out_trade_no: trade})
      if (res.status === 200) {
        this.setState({
          info: res.data
        })
      }
    }
   
  }

  public GetQueryString(name: string) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  }

  public toTime(text: string) {
    if (text) {
      const data = new Date(text)
      return (
        <div>{`${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`}</div>
      )
    } else {
      return
    }
  }

  public componentDidMount() {
    setTimeout(() => {
      location.href = '/'
    }, 6000)
  }

  public render() {
    return (
      <div className={style["payment-success"]}>
        <div className={style["header-bar"]}>
          <img src="" alt="" />
          <p>支付成功</p>
        </div>
        <div className={style["detail-box"]}>
          <div className={style.title}>超级云名片（展示板）</div>
          <div className={style["tips-line"]}>
            <div className={style.tip}>
              <p>签发日期</p>
              <p>{this.toTime(this.state.info.CreatedAt)}</p>
            </div>
            <div className={style.tip}>
              <p>金额</p>
              <p>¥{this.state.info.amount}</p>
            </div>
            <div className={style.tip}>
              <p>支付日期</p>
              <p>{this.toTime(this.state.info.paid_at)}</p>
            </div>
          </div>
        </div>
        <Button type="primary" className={style.btn} onClick={() => this.toHome()}>返回首页</Button>
      </div>
    )
  }

  private toHome() {
    location.href = '/'
  }
}

export default PaymentSuccess