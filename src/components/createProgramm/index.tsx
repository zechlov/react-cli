import * as React from 'react'
import style from './index.scss'
import { Divider, Button, Modal } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface CreateProps {
  cancel: () => void
  submit: (value: any) => void
}

interface CreateState {
  programm: any[]
  setting: any
  current: any
}

class CreateProgramm extends React.Component<CreateProps, CreateState> {
  constructor(props: CreateProps) {
    super(props)
    this.state = {
      programm: [
        {
          instance_id: 1,
          name: '营销名片',
          cover: ''
        }
      ],
      setting: [],
      current: {
        app_type: 1,
        specs: {}
      }
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
      this.setState({
        setting: list
      })
    }
  }

  public submit() {
    const { specs } = this.state.current
    Modal.confirm({
      title: '提示',
      content: `您是否确定花费${specs.price}元开通云名片小程序？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.submit(this.state.current)
      }
    })
  }

  public render() {
    return (
      <div className={style["create-body"]}>
        {/* <div className={style["instance-list"]}>
          {
            this.state.programm.map((value: any) => {
              return (
                <div className={`${style["instance-item"]} ${this.state.current.app_type === value.instance_id ? style.active : null}`} key={value.instance_id}>
                  <div className={style.icon}>
                    <img src={value.cover} alt="" />
                  </div>
                  {value.name}
                </div>
              )
            })
          }
        </div> */}
        <div className={style["select-content"]}>
          <div className={style["tabs-line"]}>
            <div className={`${style.tab} ${style.active}`}>
              普通版
          </div>
            <div className={style.tab}>
              电商版
          </div>
          </div>
          <Divider />
          <div className={style["desc-line"]}>
            <div className={style.title}>服务内容</div>
            <div className={style.desc}>销售名片、超级云助理、企业介绍、产品展示、在线咨询</div>
          </div>
          <div className={style["price-content"]}>
            <div className={style.title}>套餐价格</div>
            {
              this.state.setting.length > 0 ?
                this.state.setting.map((value: any, index: number) => {
                  return (
                    <div className={style["price-line"]} key={index}>
                      <div className={style["price-group"]}>{value.staff_num}人团队</div>
                      {
                        value.price.map((v: any, i: number) => {
                          return (
                            <div className={`${style["price-item"]} ${this.state.current.specs.ID! === v.ID ? style.active : null}`}
                              key={i}
                              onClick={this.selectItem.bind(this, v)}>{v.interval === 0 ? '2月免费试用套餐' : `${v.interval}年 / ￥${v.price}`} </div>
                          )
                        })
                      }
                    </div>
                  )
                })
                : null
            }
          </div>
          <div className={style["btn-box"]}>
            <Button type="primary" onClick={() => this.submit()}>立即开通</Button>
            <Button onClick={() => this.props.cancel()}>取消</Button>
          </div>
        </div>
      </div>
    )
  }

  private selectItem(item: any) {
    const current = this.state.current
    current.name = this.state.programm[0].name
    current.specs = item
    this.setState({
      current
    })
  }
}

export default CreateProgramm