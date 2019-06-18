import * as React from 'react'
import style from './topbar.scss'
import PaiXinYunApi from 'src/service/index'
import { Dropdown, Menu, message } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'

class Logo extends React.Component {
  public toHome() {
    location.href = '/'
  }
  public render() {
    return (
      <div className={style.logo} onClick={() => this.toHome()}>拍信云</div>
    )
  }
}

class Tabs extends React.Component {
  public render() {
    return (
      <div className={style["tabs-box"]}>
        <div className={`${style["tabs-item"]} ${style.active}`}>云产品</div>
        <div className={style["tabs-item"]}>发现</div>
        <div className={style["tabs-line"]} />
      </div>
    )
  }
}

interface TabState {
  user: any
  role: number
}

class ControlTop extends React.Component<RouteComponentProps, TabState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      user: {},
      role: 0
    }
  }

  public async componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item && item.type === 1 && item.role === 2) {
        this.setState({
          role: 2
        })
      }
      this.getInfo()
    }
  }

  public async getInfo() {
    const res = await PaiXinYunApi.getUser().getUserInfo()
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data))
      this.setState({
        user: res.data
      })
    }
  }

  public signOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    document.cookie = `token=; path=/; domain=.paixinyun.com;`
    message.success('已退出登录！')
    window.open('/', '_self')
  }

  public toLink(address: string, name: string) {
    return (
      <div onClick={() => this.link(address)}>{name}</div>
    )
  }

  public render() {
    return (
      <>
        {
          this.props.location.pathname.indexOf('sign') === -1 ?
            <div className={style["control-topbar"]}>
              <div className={style["topbar-content"]}>
                <div className={style["top-left"]}>
                  <Logo />
                  <Tabs />
                </div>
                <div className={style["top-right"]}>
                  {
                    this.state.user.user_id ?
                      <div className={style["user-info"]}>
                        {
                          this.state.role === 2 ? null : <div className={style.balance}>余额： {this.state.user.balance}</div>
                        }
                        <Dropdown overlay={() => {
                          return (
                            <Menu>

                              <Menu.Item>
                                {this.toLink('infomation', '个人中心')}
                              </Menu.Item>
                              <Menu.Item>
                                {this.toLink('payment', '我的账单')}
                              </Menu.Item>
                              <Menu.Item>
                                {this.toLink('safety', '重置密码')}
                              </Menu.Item>
                              <Menu.Item onClick={() => this.signOut()}>退出登录</Menu.Item>
                            </Menu>
                          )
                        }}>
                          <div className={style.avatar}>
                            <img src={this.state.user.avatar || require('src/assets/img/Group.svg')} alt="" />
                          </div>
                        </Dropdown>

                      </div>
                      : <button className={style["sign-in"]}>登录</button>
                  }
                </div>
              </div>
            </div>
            : null
        }
      </>
    )
  }

  private link(url: string) {
    this.props.history.push(`/control/user/${url}`)
  }
}

export default withRouter(ControlTop)