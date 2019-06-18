import * as React from 'react'
import style from './topbar.scss'
import { notification, Icon, Button, Dropdown, Menu, message } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import PaiXinYunApi from 'src/service/index'

class Logo extends React.Component {
  public toHome() {
    location.href = '/'
  }

  public render() {
    return (
      <div className={style.logo}
        style={{
          background: `url(${require('src/assets/img/logo-black.svg')})`
        }}
        onClick={() => this.toHome()} />
    )
  }
}

interface Link {
  icon: string;
  label: string;
  url?: string;
  user?: boolean
}

class Navigation extends React.Component<{ user?: any }, { navigationlinkList: Link[] }> {
  constructor(props: any) {
    super(props)

    this.state = {
      navigationlinkList: [{
        icon: require('./img/icon_home.svg'),
        label: '拍信云首页',
        url: '//www.paixinyun.com'
      }, {
        icon: require('./img/about.svg'),
        label: '关于我们'
      }, 
      // {
      //   icon: require('./img/order.svg'),
      //   label: '订单中心',
      //   user: true
      // }, 
      {
        icon: require('./img/service.svg'),
        label: '客服中心',
        user: true
      }, {
        icon: require('./img/more.svg'),
        label: '更多服务',
        user: true
      }]
    }
  }

  public render() {

    return (
      <div className={style.navigation}>
        {
          this.state.navigationlinkList.map(
            (link, index) => {
              if (link.user && !this.props.user) {
                return
              }
              return (
                <div className={style['navigation-item']} key={index}>
                  <img src={link.icon} />
                  <a href={link.url}>{link.label}</a>
                </div>
              )
            }
          )
        }
      </div>
    )
  }
}

// interface ConsoleProps {
//   link: (url: string) => void
// }

// class ConsoleButton extends React.Component<ConsoleProps, {}> {
//   constructor(props: ConsoleProps) {
//     super(props)
//   }

//   public render() {
//     return (
//       <div className={style['console-button']} onClick={() => this.handleClick()}>
//         <span>控制台</span>
//         <div className={style['add-icon']}>
//           <div />
//           <div />
//         </div>
//       </div>
//     )
//   }

//   private handleClick() {
//     const token = localStorage.getItem('token')
//     if (token) {
//       this.props.link('/control/main')
//     } else {
//       this.props.link('/signin')
//     }
//   }

// }

// 通知按钮组件传入的props
interface NoticeInfo {
  unreadNum: number;
}

interface NoticeInfoProps {
  noticeInfo: NoticeInfo
}

// 通知按钮
class Notice extends React.Component<NoticeInfoProps, {}> {
  constructor(props: NoticeInfoProps) {
    super(props)
  }

  public openNotification(): void {
    notification.open({
      message: '通知',
      description: '此功能暂未开放，敬请期待',
      duration: 2,
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };

  public render() {
    return (
      <span className={style.notice}>
        <div
          style={{
            background: `url(${require('./img/notice.svg')})`
          }}
          onClick={() => this.openNotification()} />
        <span style={{display: this.props.noticeInfo.unreadNum ? 'block' : 'none'}} className={style.num}>{this.props.noticeInfo.unreadNum}</span>
      </span>
    )
  }
}

interface UserProps {
  user?: any
  link: (url: string) => void
}

interface UserState {
  role: number
  link: any[]
}

class UserInfo extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props)
    this.state = {
      role: 0,
      link: [
        {
          name: '个人中心',
          url: 'infomation'
        },
        {
          name: '我的账单',
          url: 'payment'
        },
        {
          name: '重置密码',
          url: 'safety'
        }
      ]
    }
  }

  public componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item && item.type === 1 && item.role === 2) {
        this.setState({
          role: 2
        })
      }
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
          this.props.user ?
            <div className={style['user-info']}>
              <div className={style["avatar-box"]}>
                <img src={this.props.user!.avatar || require('src/assets/img/Group.svg')} />
              </div>
              <Dropdown overlay={() => {
                return (
                  <Menu>
                    {
                      this.state.role === 2 ?
                      null
                      : this.state.link.map((value: any, index: number) =>
                        <Menu.Item key={index}>
                          {this.toLink(value.url, value.name)}
                        </Menu.Item>
                      )
                    }
                    <Menu.Item onClick={() => this.signOut()}>退出登录</Menu.Item>
                  </Menu>
                )
              }}>
                <div className={style["user-name"]}>
                  {this.props.user.name}
                  <Icon type="down" />
                </div>
              </Dropdown>

            </div>
            :
            <div className={style['user-info']}>
              <span className={style['user-name']}>
                <Button type="default" onClick={this.login}>请登录</Button>
              </span>
            </div>
        }
      </>
    )
  }

  private login = () => {
    this.props.link('/signin')
  }

  private link(url: string) {
    this.props.link(`/control/user/${url}`)
  }
}

interface TopbarState {
  user: any
  role: number
}

class Topbar extends React.Component<RouteComponentProps, TopbarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: null,
      role: 0
    }
  }

  public componentWillMount() {
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

  public render() {
    return (
      <div className={style['topbar-container']} style={{display: `${this.props.location.pathname.indexOf('agent') === -1 ? 'flex': 'none'}`}}>
        <Logo />
        <Navigation user={this.state.user} />
        <div style={{ flex: 1 }} />
        {
          this.state.user ?
            <>
              <Notice noticeInfo={{ unreadNum: 0 }} />
            </>
            : null
        }
        <UserInfo user={this.state.user} link={(url) => this.changeUrl(url)} />
      </div>
    )
  }

  private changeUrl(url: string) {
    this.props.history.push(url)
  }
}

export default withRouter(Topbar)