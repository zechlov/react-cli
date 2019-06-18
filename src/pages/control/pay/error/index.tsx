import * as React from 'react'
import style from './index.scss'
import { Button } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface State {
  info: any
}

class PaymentError extends React.Component<{}, State> {
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

  public render() {
    return (
      <div className={style["payment-success"]}>
        <div className={style["header-bar"]}>
          <img src="" alt="" />
          <p>支付失败</p>
        </div>
        <div className={style["detail-box"]}>
          <div className={style.title}>请检查是否网络问题或者事余额不足</div>
        </div>
        <Button type="primary" className={style.btn} onClick={() => this.toHome()}>重新支付</Button>
      </div>
    )
  }

  private toHome() {
    location.href = '/'
  }
}

export default PaymentError