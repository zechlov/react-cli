import * as React from 'react'
import style from './index.scss'
import PaiXinYunApi from 'src/service/index'
import { RouteComponentProps, withRouter } from 'react-router'

interface FooterState {
  info: any
  show: boolean
}

class Footer extends React.Component<RouteComponentProps, FooterState> {
  constructor(props: any) {
    super(props)
    this.state = {
      info: {},
      show: true
    }
  }

  public componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item && item.type === 1 && item.role === 2) {
        this.getInfo()
      }
    }
    if (this.props.location.pathname.indexOf('sign') !== -1 || !token) {
      this.setState({
        show: false
      })
    }
  }

  public async getInfo() {
    const res = await PaiXinYunApi.getAgentApi().getClientInfo()
    if (res.status === 200) {
      this.setState({
        info: res.data
      })
    }
  }

  public render() {
    return (
      <div className={style["footer-container"]}
        style={{ display: `${this.state.show ? 'block' : 'none'}` }}>
        <div className={style["footer-wrapper"]}>
          <div className={style["footer-box"]}>
            {
              this.state.info.phone ?
                <>
                  <div className={style["client-name"]}>
                    <div className={style.title}>您的专属服务商</div>
                    <div className={style.content}>{this.state.info.client_name}</div>
                  </div>
                  <div className={style["client-phone"]}>
                    <div className={style.title}>服务商联系电话</div>
                    <div className={style.content}>{this.state.info.phone}</div>
                  </div>
                </>
                : <>
                  <div className={style["list-line"]}>
                    <div className={style["list-cloumn"]}>
                      <div className={style.title}>关于拍信云</div>
                      <a href="" className={style.link}>拍信云介绍</a>
                      <a href="" className={style.link}>拍信云LABS</a>
                      <a href="" className={style.link}>提交问题</a>
                      <a href="" className={style.link}>合作伙伴</a>
                    </div>
                    <div className={style["list-cloumn"]}>
                      <div className={style.title}>拍信云价格</div>
                      <a href="" className={style.link}>知产服务会员</a>
                      <a href="" className={style.link}>优惠码申请</a>
                    </div>
                    <div className={style["list-cloumn"]}>
                      <div className={style.title}>加入拍信团队</div>
                      <a href="" className={style.link}>入职拍信公司</a>
                      <a href="" className={style.link}>分销拍信产品</a>
                    </div>
                    <div className={style["list-cloumn"]}>
                      <div className={style.title}>企业云业务</div>
                      <a href="" className={style.link}>知产商Saas</a>
                      <a href="" className={style.link}>云确权系统</a>
                      <a href="" className={style.link}>云建站系统</a>
                      <a href="" className={style.link}>流量广告投放</a>
                    </div>
                    <div className={style["list-cloumn"]}>
                      <div className={style.title}>社交媒体</div>
                      <a href="" className={style.link}>拍信云公众号</a>
                      <a href="" className={style.link}>拍信云微博</a>
                      <a href="" className={style.link}>拍信云知乎</a>
                    </div>
                  </div>
                </>
            }



          </div>
        </div>
        <div className={style["under-line"]}>
          © 2017 无锡路大在线科技有限公司 All Rights Reserved 苏ICP备14057276号-1 | 增值电信业务经营许可证 苏B2-20190018
        </div>
      </div>
    )
  }
}

export default withRouter(Footer)