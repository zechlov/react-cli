import * as React from 'react'
import style from './index.scss'
import { History } from 'history'
import { RouteComponentProps, withRouter } from 'react-router'
import { Icon, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';

interface ControlSiderProps {
  history: History
}

interface Category {
  categoryName: string;
  linkList: any[]
  pay?: number
}

interface ControlSiderState {
  categoryList: Category[],
  locationUrl: string,
  pay?: number
}

class ControlSider extends React.Component<ControlSiderProps, ControlSiderState> {
  constructor(props: ControlSiderProps) {
    super(props)

    const cateList = [{
      categoryName: '',
      pay: 1,
      linkList: [{
        icon: '',
        name: '账户资料',
        url: '/control/user/infomation',
        onclick: (url: string) => {
          this.props.history.push(url)
        }
      }]
    }, {
      categoryName: '',
      pay: 2,
      linkList: [{
        icon: '',
        name: '我的账单',
        url: '/control/user/payment',
        onclick: (url: string) => {
          this.props.history.push(url)
        }
      }]
    }, {
      categoryName: '',
      pay: 1,
      linkList: [{
        icon: '',
        name: '安全设置',
        url: '/control/user/safety',
        onclick: (url: string) => {
          this.props.history.push(url)
        }
      }]
    }]

    this.state = {
      categoryList: cateList,
      locationUrl: ''
    }
  }

  public componentWillMount() {
    this.setState({
      locationUrl: this.props.history.location.pathname
    })
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item && item.type === 1 && item.role === 2) {
        this.setState({
          pay: 2
        })
      }
    }
  }

  public componentDidMount() {
    // 监听路由变化
    this.props.history.listen(route => {
      this.setState({
        locationUrl: this.props.history.location.pathname
      })
    })
  }

  public itemRender = (route: any, params: any, routes: any, paths: any) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={route.path}>{route.breadcrumbName}</Link>
      );
  }

  public render() {
    const routes = [
      {
        path: '/control/main',
        breadcrumbName: '主页',
      },
      {
        path: '/control/user',
        breadcrumbName: '个人中心'
      }
    ];
    return (
      <>
        {
          this.state.locationUrl.includes('/user') ?
            <div className={style["control-sider"]}>
              <div className={style["bread-crumb"]}>
                <Breadcrumb routes={routes} itemRender={this.itemRender} />
              </div>
              {
                this.state.categoryList.map((cate: any, index: number) => {
                  return (
                    <>
                      {
                        cate.pay === this.state.pay ?
                          null
                          : <React.Fragment key={index}>
                            {
                              cate.linkList.map((link: any, sub: number) => {

                                let active: boolean = false
                                if (this.state.locationUrl.includes(link.url)) {
                                  active = true
                                }
                                return (
                                  <div className={`${style['category-item']} ${active ? style.itemActive : ''}`}
                                    onClick={() => link.onclick(link.url)}
                                    key={sub}>
                                    <img src={link.icon} />
                                    <span>{link.name}</span>
                                    <Icon type="right" />
                                  </div>
                                )
                              })
                            }
                          </React.Fragment>
                      }
                    </>
                  )
                })
              }
            </div>
            : null
        }
      </>
    )
  }
}

class Sider extends React.Component<RouteComponentProps, {}> {
  public render() {
    return (
      <ControlSider history={this.props.history} />
    )
  }
}

export default withRouter(Sider)