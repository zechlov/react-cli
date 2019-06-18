import * as React from 'react'
import style from './index.scss'
import { Icon, Modal, Button, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { History } from 'history'
import PaiXinYunApi from 'src/service/index'
import PreBox from './preBox'

interface CollapseChildernData {
  name: string;
  url: string
  cb: (url: string) => void;
}

interface CollapseProps {
  icon: string;
  name: string;
  initShowChildren?: boolean,
  childern: CollapseChildernData[];
}

interface CollapseState {
  isShowChildren: boolean
}

class Collapse extends React.Component<CollapseProps, CollapseState> {
  constructor(props: CollapseProps) {
    super(props)

    this.state = {
      isShowChildren: this.props.initShowChildren ? true : false
    }
  }

  public render() {

    return (
      <div>
        <div className={style.collapse}>
          <div className={style.panel} onClick={() => this.setState({ isShowChildren: !this.state.isShowChildren })}>
            <img src={this.props.icon} />
            <span>{this.props.name}</span>
            <Icon style={{ position: 'absolute', right: '10px', fontSize: '10px', opacity: .5 }} type={this.state.isShowChildren ? 'up' : 'down'} />
          </div>
          <div className={style.childern} style={{ height: this.state.isShowChildren ? '112px' : '0' }}>
            {this.props.childern.map((data, index) => (
              <div className={style.child} key={index} onClick={() => data.cb(data.url)}>{data.name}</div>
            )
            )}
          </div>
        </div>
      </div>
    )
  }
}

interface SiderLinkProps {
  icon: string,
  name: string,
  active: boolean,
  onclick: (url: string) => void,
  url: string
}

class SiderLink extends React.Component<SiderLinkProps, {}> {
  constructor(props: SiderLinkProps) {
    super(props)
  }
  public render() {
    return (
      <div className={`${style['category-item']} ${this.props.active ? style.itemActive : ''}`}
        onClick={() => this.props.onclick(this.props.url)}>
        <img src={this.props.icon} />
        <span>{this.props.name}</span>
      </div>
    )
  }
}

interface BusinessSiderProps {
  businessCardStore?: BusinessCardStore,
  history: History
}

interface Category {
  categoryName: string;
  linkList: any[]
}

interface BusinessCardSiderState {
  categoryList: Category[],
  locationUrl: string,
  QR?: string
}

@inject('businessCardStore')
@observer
class BusinessCardSider extends React.Component<BusinessSiderProps, BusinessCardSiderState> {
  constructor(props: BusinessSiderProps) {
    super(props)

    const cateList = [
      {
        categoryName: '首页展示管理',
        linkList: [{
          icon: require('./img/tuwen_intro.svg'),
          name: '图文介绍',
          url: '/minprogram/businessCard/introduction',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(0)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }]
      },
      {
        categoryName: '产品展示管理',
        linkList: [{
          icon: require('./img/prod_list.svg'),
          name: '产品列表',
          url: '/minprogram/businessCard/productList',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(1)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }, {
          icon: require('./img/prod_cate.svg'),
          name: '产品分类',
          url: '/minprogram/businessCard/productCategory',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(1)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }, {
          icon: require('./img/show_set.svg'),
          name: '展示设置',
          url: '/minprogram/businessCard/productDisplaySettings',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(1)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }]
      },
      {
        categoryName: '拍信云名片',
        linkList: [{
          icon: require('./img/cus_mana.svg'),
          name: '客户管理',
          url: '/minprogram/businessCard/cosManage',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.showPreviewChanged(false)
            this.props.businessCardStore!.tabChanged(1)
          }
        }, {
          icon: require('./img/team_mana.svg'),
          name: '团队管理',
          url: '/minprogram/businessCard/groupManage',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.showPreviewChanged(false)
            this.props.businessCardStore!.tabChanged(1)
          }
        }
        ]
      },
      {
        categoryName: '故事管理',
        linkList: [{
          icon: require('./img/article_list.svg'),
          name: '文章列表',
          url: '/minprogram/businessCard/articleList',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(2)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }, {
          icon: require('./img/article_cate.svg'),
          name: '文章分类',
          url: '/minprogram/businessCard/articleType',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(2)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }]
      },
      {
        categoryName: '关于我们管理',
        linkList: [{
          icon: require('./img/about_us.svg'),
          name: '关于我们',
          url: '/minprogram/businessCard/about',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.tabChanged(3)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }]
      },
      {
        categoryName: '数据分析',
        linkList: [
          {
            icon: require('./img/market_data.svg'),
            name: '销售数据',
            url: '/minprogram/businessCard/sellsData',
            onclick: (url: string) => {
              this.props.history.push(url)
              this.props.businessCardStore!.showPreviewChanged(false)
            }
          }, {
            icon: require('./img/visitor_data.svg'),
            name: '访客数据',
            url: '/minprogram/businessCard/visitorData',
            onclick: (url: string) => {
              this.props.history.push(url)
              this.props.businessCardStore!.showPreviewChanged(false)
            }
          }]
      },
      {
        categoryName: '小程序设置',
        linkList: [{
          icon: require('./img/base_info.svg'),
          name: '基本信息',
          url: `/minprogram/businessCard/${this.props.businessCardStore!.instanceId()}/baseinfo`,
          onclick: (url: string) => {
            this.toBase(url)
            this.props.businessCardStore!.tabChanged(4)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }, {
          icon: require('./img/common_style.svg'),
          name: '通用风格',
          url: '/minprogram/businessCard/ProdCommonStyle',
          onclick: (url: string) => {
            this.props.history.push(url)
            this.props.businessCardStore!.showPreviewChanged(true)
          }
        }, {
          icon: require('./img/app_components.svg'),
          name: '功能组件',
          childern: [{
            name: '首页图',
            url: '/minprogram/businessCard/banner',
            cb: (url: string) => {
              this.props.history.push(url)
              this.props.businessCardStore!.tabChanged(0)
              this.props.businessCardStore!.showPreviewChanged(true)
            }
          }, {
            name: '快捷按钮',
            url: '/minprogram/businessCard/shortcut',
            cb: (url: string) => {
              this.props.history.push(url)
              this.props.businessCardStore!.tabChanged(0)
              this.props.businessCardStore!.showPreviewChanged(true)
            }
          }, {
            name: '高级组件',
            cb: (url: string) => {
              message.warning('暂未开放，敬请期待')
            }
          }]
        }
        ]
      }]

    this.state = {
      categoryList: cateList,
      locationUrl: ''
    }
  }


  public componentWillMount() {
    this.setState({ locationUrl: this.props.history.location.pathname })
    this.checkAuth()
    this.getCateGory()
  }

  public async getCateGory() {
    const res = await PaiXinYunApi.getSettingApi().getCategory({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200 && res.data.length > 0) {
      const { categoryList } = this.state
      categoryList.push({
        categoryName: '',
        linkList: [
          {
            icon: require('./img/clockin.svg'),
            name: '打卡策略',
            url: '/minprogram/businessCard/clockIn',
            onclick: (url: string) => {
              this.props.history.push(url)
              this.props.businessCardStore!.showPreviewChanged(false)
            }
          }
        ]
      })

      this.setState({ categoryList })
    }
  }

  public async checkAuth() {
    const res = await PaiXinYunApi.getSettingApi().getAuthState({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200 && res.data.is_authorized) {
      this.getState()
    }
  }

  public async getState() {
    const res = await PaiXinYunApi.getSettingApi().getExamineState({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200) {
      this.props.businessCardStore!.setInstanceStatus('status', res.data.status)
      this.getChange()
    }
  }

  public async getChange() {
    const res = await PaiXinYunApi.getSettingApi().getChangeState({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200 && res.data) {
      this.props.businessCardStore!.setInstanceStatus('status', null)
    }
  }

  public componentDidMount() {
    // 监听路由变化
    this.props.history.listen(route => {
      this.setState({ locationUrl: this.props.history.location.pathname });
    })
  }

  public submit() {
    console.log('aaa')
  }

  public ShowStatus(status: any) {
    switch (status) {
      case 1:
        return <Button className={style.release} type="default" onClick={() => this.showModal('reshow')}>上传失败</Button>
      case 2:
        return  <Button className={style.release} type="default" onClick={() => this.showModal('preview')} title="获取预览二维码">审核中</Button>
      case 3:
        return  <Button className={style.release} type="default" onClick={() => this.showModal('reshow')}>提交审核失败</Button>
      case 4:
        return <Button className={style.release} type="default" onClick={() => this.showModal('reshow')}>审核被驳回</Button>
      case 5:
        return <Button className={style.release} type="default" onClick={() => this.showModal('reshow')}>上线成功</Button>
      case 6:
        return <Button className={style.release} type="default" onClick={() => this.showModal('reshow')}>上线失败</Button>
      default:
        return <Button className={style.release} type="primary" onClick={() => this.showModal('show')}>点击发布</Button>
    }
  }

  public render() {
    return (
      <div className={style['business-card-sider']}>
        <div className={style.logo} style={{ background: `url(${require('./img/logo.png')})` }} />

        {
          this.state.categoryList.map((cate, index) =>
            <React.Fragment key={index}>
              {
                cate.categoryName ?
                  <div className={style.category}>{cate.categoryName}</div>
                  : null
              }

              {
                cate.linkList.map((link, subindex) => {
                  if (link.childern === undefined) {
                    let active: boolean = false
                    if (this.state.locationUrl.includes(link.url)) { active = true }
                    return (
                      <SiderLink icon={link.icon}
                        url={link.url || ''}
                        name={link.name}
                        active={active}
                        onclick={() => link.onclick(link.url)} key={subindex}
                      />
                    )
                  } else {
                    return <Collapse name={link.name} icon={link.icon} childern={link.childern} initShowChildren={true} key={subindex} />
                  }
                })
              }
            </React.Fragment>
          )
        }
        {
          this.ShowStatus(this.props.businessCardStore!.instanceStatus.status)
        }
        {/* <Button className={style.release} type="default" onClick={() => this.showModal('preview')} title="获取预览二维码">审核中</Button> */}
        <div className={style.exit} onClick={() => this.Exit()}>退出编辑器</div>
        <Modal
          visible={this.props.businessCardStore!.instanceStatus.show}
          footer={null}
          onCancel={() => this.handleCancel('show')}
          maskClosable={false}
          style={{ top: '30%' }}>
          <div className={style["confirm-box"]}>
            {
              this.state.QR ? <>
                <div className={style.header}>
                  <h2 className={style.title}>请扫描二维码，提交授权</h2>
                </div>
                <img src={this.state.QR} className={style.QR} />
                <p className={style.tip}>授权完毕请关闭弹窗</p>
              </> : <>
                  <div className={style.header}>
                    <img src={require('src/assets/img/icon-wechat.svg')} alt="" />
                    <h2 className={style.title}>微信小程序授权</h2>
                    <p className={style.desc}>首次发布将需要进行小程序授权，请使用小程序管理员账号进行操作。</p>
                  </div>
                  <Button type="primary" className={style.btn} onClick={() => this.signupWeapp()}>注册小程序账户</Button>
                  <Button type="default" className={style.btn} onClick={() => this.getAuth()}>已有小程序账号，前往授权</Button>
                </>
            }
          </div>
        </Modal>
        <Modal visible={this.props.businessCardStore!.instanceStatus.reshow}
          footer={null}
          onCancel={() => this.handleCancel('reshow')}
          maskClosable={false}
          style={{ top: '30%' }}>
          <div>
            <p>{this.props.businessCardStore!.instanceStatus.reason}</p>
            <Button onClick={() => this.submitWeapp()}>重新提交</Button>
          </div>
        </Modal>
        <Modal visible={this.props.businessCardStore!.instanceStatus.preview}
          footer={null}
          onCancel={() => this.handleCancel('preview')}
          maskClosable={false}
          bodyStyle={{padding: '0px'}}
          destroyOnClose={true}>
          <PreBox instance={this.props.businessCardStore!.instanceId()} />
        </Modal>
      </div>
    )
  }

  private toBase(url: string) {
    const instance = this.props.businessCardStore!.instanceId()
    this.props.history.push(`/minprogram/businessCard/${instance}/baseinfo`)
  }

  private Exit() {
    window.location.replace('/control/main')
  }

  private async getAuth() {
    const res = await PaiXinYunApi.getWechat().authorize(this.props.businessCardStore!.instanceId())
    if (res.status === 200) {
      this.setState({
        QR: `//api.paixinyun.com/${res.data.url}`
      })
    } else {
      message.error(res.data.msg)
    }
  }

  private async signupWeapp() {
    window.open('https://mp.weixin.qq.com/cgi-bin/wx?token=&lang=zh_CN', '_blank')
  }

  private showModal(key: string) {
    this.props.businessCardStore!.setInstanceStatus(key, true)
  }

  private async handleCancel(key: string) {
    if (this.state.QR) {
      this.submitWeapp()
    }
    this.props.businessCardStore!.setInstanceStatus(key, false)
    this.setState({
      QR: ''
    })
  }

  private async submitWeapp() {
    const ext = {
      extEnable: true,
      extAppid: 'wx9b81b31a4bca09d5',
    }
    const itemList: any[] = []
    const json = {
      ext_json: ext,
      instance_id: this.props.businessCardStore!.instanceId(),
      audit_item: itemList,
      user_version: '1.0.0',
      user_desc: 'follow update'
    }
    const ant = await PaiXinYunApi.getWechat().submitProject(json)
    if (ant.status === 200) {
      message.success('提交成功')
      this.getState()
    } else {
      message.error(ant.data.msg)
    }
    this.handleCancel('reshow')
  }
}

class Sider extends React.Component<RouteComponentProps, {}> {
  public render() {
    return (
      <>
        <BusinessCardSider history={this.props.history} />
      </>
    )
  }
}

export default withRouter(Sider)