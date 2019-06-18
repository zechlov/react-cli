import * as React from 'react'
import style from './index.scss'
import { Button, Icon, Modal, message } from 'antd'
import PaiXinYunApi from 'src/service/index'
import PayForm from 'src/components/payForm/index'
import CreateModal from 'src/components/createProgramm/index'
import QRBox from 'src/components/qrBox'
import ServiceLine from './serviceLine'
import { RouteComponentProps, withRouter } from 'react-router'

interface MainState {
  info: any[]
  add: boolean
  pay: any
  editer: any
  private: boolean
  qr: boolean
  item?: any
  client?: any
}

class ControlMainPage extends React.Component<RouteComponentProps, MainState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      info: [],
      add: false,
      pay: {
        show: false,
        type: ''
      },
      editer: {},
      private: true,
      qr: false
    }
  }

  public componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item && item.type === 1 && item.role === 2) {
        this.getInfo()
        this.setState({
          private: false
        })
      }
    }
    this.getList()
  }

  public async getInfo() {
    const res = await PaiXinYunApi.getAgentApi().getClientInfo()
    if (res.status === 200) {
      this.setState({
        client: res.data
      })
    }
  }

  public async getList() {
    const res = await PaiXinYunApi.getAgentApi().getInstanceList({ customer_user_id: 0 })
    if (res.status === 200 && res.data) {
      if (res.data.length > 0) {
        res.data.map((value: any) => {
          value = this.setDetails(value)
        })
        this.setState({
          info: res.data
        })
      }
    }
  }

  public setDetails(value: any) {
    const { status } = value.instance
    let name = ''
    switch (status) {
      case 1:
        name = '上传代码失败'
        break
      case 2:
        name = '等待微信审核'
        break
      case 3:
        name = '提交微信审核失败'
        break
      case 4:
        name = '微信审核驳回'
        break
      case 5:
        name = '上线成功'
        break
      case 6:
        name = '上线失败'
        break
      default:
        name = '未发布'
    }
    value.instance.status_name = name
    const time = new Date(value.instance.ExpiredTime).valueOf() - new Date().valueOf()
    if (time > 0) {
      value.instance.is_expired = true
    } else {
      value.instance.is_expired = false
    }
    return value
  }

  public async setInstance(value: any) {
    if (!value.specs.ID) {
      message.error('请选择具体套餐')
      return
    }
    const data = {
      app_type: value.app_type,
      specs_id: value.specs.ID,
    }
    const res = await PaiXinYunApi.getPayApi().createOrder(data)
    if (res.status === 200) {
      message.success('订单创建成功！')
      this.props.history.push({ pathname: '/control/payment/main', state: res.data })
    }
  }

  public async pay(value: any) {
    const { type } = this.state.pay
    const { editer } = this.state
    const data = {
      instance_id: editer.instance.ID,
      specs_id: value.leng.ID
    }
    if (type === 'pay') {
      const res = await PaiXinYunApi.getPayApi().createRenew(data)
      if (res.status === 200) {

        message.success('续费订单创建成功')
        setTimeout(() => {
          this.props.history.push({ pathname: '/control/payment/main', state: res.data })
        }, 2000)

      } else {
        message.error(res.data.msg || '提交失败，请稍后再试')
      }
    } else {
      const res = await PaiXinYunApi.getPayApi().createPromote(data)
      if (res.status === 200) {
        message.success('升级订单创建成功')
        setTimeout(() => {
          this.props.history.push({ pathname: '/control/payment/main', state: res.data })
        }, 2000)
      } else {
        message.error(res.data.msg || '提交失败，请稍后再试')
      }
    }
    this.handleCancel('pay')
  }

  public render() {
    return (
      <div className={style["main-page"]}>
        {
          this.state.info.length === 0 && this.state.private ?
            <div className={style["create-content"]}>
              <img src={require('src/assets/img/banner.png')} className={style.banner} />
              <Button className={style["add-btn"]} type="primary" onClick={() => this.addModal()}><Icon type="plus" />创建小程序</Button>
            </div>
            : <>
              <div className={style["title-tabs"]}>
                <div className={`${style["title-tab"]} ${style.active}`}>我的小程序</div>
                <Button type="primary" onClick={
                  () => this.state.private ? this.addModal() : this.contact()
                }><Icon type="plus" />创建小程序</Button>
              </div>
              <div className={style["items-content"]}>
                {
                  this.state.info.length > 0 ?
                    this.state.info.map((value: any) => {
                      return (
                        <div className={style["item-box"]} key={value.instance.ID}>
                          <div className={style["desc-part"]}>
                            <div className={style["title-line"]}>
                              {value.instance.name}
                              <div className={style["app-type"]}>小程序</div>
                              <div className={style["client-type"]}>{value.instance.app_type === 1 ? '云名片版' : '其他'}</div>
                              {
                                value.instance.is_expired ?
                                  <div className={style["status-type"]}>{value.instance.status_name}</div>
                                  : <div className={style["expired-type"]}>已过期</div>
                              }
                            </div>
                            <div className={style["status-line"]}>
                              <div className={style["type-box"]}>当前套餐： {`${value.specs.staff_num}人团队/${value.specs.interval}年`}</div>
                              ·
                              {
                                value.instance.version ?
                                  <div className={style["qr-box"]} onClick={() => this.showQR(value.instance)}>小程序二维码</div>
                                  : <div className={style["type-box"]} style={{ marginLeft: '8px' }}>暂未生成二维码</div>
                              }
                            </div>
                            <div className={style["btns-line"]}>
                              <Button type="primary" onClick={() => this.toEdit(value.instance)}>编辑</Button>
                              <Button className={style.btn}
                                onClick={
                                  () => this.state.private ? this.toPay(value, 'pay') : this.contact()
                                }>{value.instance.is_expired ? '续费' : '付费'}</Button>
                              {
                                value.specs.staff_num < 500 ? <Button className={style.btn}
                                  onClick={
                                    () => this.state.private ? this.toPay(value, 'up') : this.contact()
                                  }>升级</Button> : null
                              }
                            </div>
                          </div>
                          <div className={style["data-part"]}>
                            <Button disabled={true} type="default" icon="bar-chart" size="small">数据</Button>
                            <Button disabled={true} type="default" icon="delete" size="small">删除</Button>
                          </div>
                        </div>
                      )
                    })
                    : <div className={style.empty}>暂无数据</div>
                }
              </div>
              <Modal visible={this.state.qr}
                footer={null}
                destroyOnClose={true}
                onCancel={() => this.cancel()}>
                <QRBox record={this.state.item} />
              </Modal>
            </>
        }
        {
          this.state.private ? <ServiceLine /> : null
        }
        <Modal visible={this.state.add}
          footer={null}
          onCancel={() => this.handleCancel('set')}
          style={{ top: '20%' }}
          width="936px"
          closable={false}
          bodyStyle={{ padding: 0 }}
          destroyOnClose={true}
          maskClosable={true}>
          <CreateModal cancel={() => this.handleCancel('set')}
            submit={(value) => this.setInstance(value)} />
        </Modal>
        <Modal visible={this.state.pay.show}
          footer={null}
          width="760px"
          closable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}
          onCancel={() => this.handleCancel('pay')}>
          <PayForm
            type={this.state.pay.type}
            submit={(value) => this.pay(value)}
            cancel={() => this.handleCancel('pay')}
            editer={this.state.editer.specs} />
        </Modal>
      </div>
    )
  }

  private showQR(value: any) {
    this.setState({
      item: value,
      qr: true
    })
  }

  private cancel() {
    this.setState({
      item: null,
      qr: false
    })
  }

  private contact() {
    Modal.warning({
      title: '提示！',
      content: <div>
        请联系您的上级代理进行相关操作<br />
        代理名称：<strong>{this.state.client!.client_name}</strong><br />
        联系电话：<strong>{this.state.client!.phone}</strong>
      </div>,
      okText: '确认'
    })
  }

  private toEdit(value: any) {
    localStorage.setItem('instanceId', value.ID)
    window.open(`/minprogram/businessCard/${value.ID}/baseinfo`, '_self')
  }

  private toPay(record: any, type: string) {
    this.setState({
      pay: {
        show: true,
        type: type
      },
      editer: record
    })
  }

  private addModal() {
    this.setState({
      add: true
    })
  }

  private handleCancel(key: string) {
    switch (key) {
      case 'set':
        this.setState({
          add: false
        })
        break
      case 'pay':
        this.setState({
          pay: {
            show: false,
            type: ''
          },
          editer: {}
        })
        break
    }
  }
}

export default withRouter(ControlMainPage)