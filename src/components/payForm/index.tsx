import * as React from 'react'
import style from './index.scss'
import { Icon, Button, message } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface PayFromProps {
  type: string
  editer: any
  submit: (value: any) => void
  cancel: () => void
}

interface PayFormState {
  group: any[]
  current: any
  detail: any
}

class PayForm extends React.Component<PayFromProps, PayFormState> {
  constructor(props: PayFromProps) {
    super(props)
    this.state = {
      detail: {
        type: {},
        leng: {}
      },
      group: [],
      current: {}
    }
  }

  public async componentWillMount() {
    const res = await PaiXinYunApi.getPayApi().getInstanceSpecs()
    if (res.status === 200 && res.data.length > 0) {
      const list: any[] = []
      const temp: any = {}
      res.data.map((value: any) => {
        if (!temp[value.staff_num]) {
          list.push({
            staff_num: value.staff_num,
            price: [value]
          })
          temp[value.staff_num] = value.staff_num
        } else {
          for (const etwas of list) {
            if (etwas.staff_num === value.staff_num) {
              etwas.price.push(value)
              break
            }
          }
        }
      })
      const { staff_num, interval } = this.props.editer
      const item = list.find((value: any) => value.staff_num === staff_num)
      let leng = {}
      if (item) {
        leng = item.price.find((v: any) => v.interval === interval)
      }
      this.setState({
        detail: {
          type: staff_num,
          leng: leng
        },
        group: list,
        current: item || {}
      })
    }
  }

  public submitValue() {
    const { type, leng } = this.state.detail

    if (type === 0) {
      if (this.props.type === 'pay') {
        message.warning('请返回并升级套餐')
        return
      } else {
        message.warning('请选择套餐人数')
        return
      }
    }
    if (this.props.type === 'up' && type <= this.props.editer.staff_num) {
      message.warning('只能升级成更多人数的套餐')
      return
    }
    if (!leng.price) {
      if (this.props.type === 'pay') {
        message.warning('请返回并升级套餐')
        return
      } else {
        message.warning('请选择时长套餐')
        return
      }
    }
    this.props.submit(this.state.detail)
  }

  public render() {
    return (
      <div className={style["pay-form"]}>
        <div className={style["close-btn"]} onClick={() => this.props.cancel()}>
          <Icon type="close" />
        </div>
        <div className={style.title}>云名片小程序包年-付费</div>
        <div className={style["group-line"]}>
          {
            this.state.group.map((value: any, index: number) => {
              return (
                <div
                  className={`${style["group-item"]} ${this.state.detail.type === value.staff_num ? style.active : null}`}
                  key={index}
                  onClick={this.selectNum.bind(this, value)}>{value.staff_num}人团队</div>
              )
            })
          }
        </div>
        <div className={style["price-line"]}>
          {
            this.state.current.price ?
              this.state.current.price.map((value: any) => {
                if (value.price === '0') {
                  return
                }
                return (
                  <div className={`${style["price-item"]} ${this.state.detail.leng.interval! === value.interval ? style.active : null}`}
                    key={value.ID}
                    onClick={this.selectPrice.bind(this, value)}>
                    <div className={style.title}>{value.interval}年</div>
                    <div className={style.price}>￥{value.price}</div>
                  </div>
                )
              })
              : null
          }
        </div>
        <Button type="primary" onClick={() => this.submitValue()} className={style["submit-btn"]}>立即付费</Button>
      </div>
    )
  }

  private selectNum(record: any) {
    if (this.props.type === 'pay') {
      message.warning('续费时请直接支付')
      return
    }
    if (this.props.editer.staff_num >= record.staff_num) {
      message.warning('只能升级为更多人数的套餐')
      return
    }
    const { detail, group } = this.state
    detail.type = record.staff_num
    detail.leng = {}
    const item = group.find((value: any) => value.staff_num === record.staff_num)
    this.setState({
      detail,
      current: item
    })
  }

  private selectPrice(record: any) {
    // if (this.props.type === 'pay') {
    //   message.warning('续费时请直接支付')
    //   return
    // }
    const { detail } = this.state
    detail.leng = record
    this.setState({ detail })
  }
}

export default PayForm