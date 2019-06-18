import * as React from 'react'
import style from './index.scss'
import { Icon } from 'antd'

class ServiceLine extends React.Component {
  public render() {
    return(
      <div className={style['service-line']}>
        <div className={style.title}>如有疑问，联系客服</div>
        <div className={style["banner-line"]}>
          <div className={style["banner-item"]}>
            <Icon type="qq"/>
            <p className={style.content}>QQ沟通</p>
            <p className={style.tip}>快速套餐购买咨询</p>
          </div>
          <div className={style["banner-item"]}>
            <Icon type="phone"/>
            <p className={style.content}>400-9613-900</p>
            <p className={style.tip}>工作时间： 9:00-20:00</p>
          </div>
          <div className={style["banner-item"]}>
            <Icon type="wechat"/>
            <p className={style.content}>拍信公众号</p>
            <p className={style.tip}>微信扫一扫关注我们</p>
          </div>
          <div className={style["banner-item"]}>
            <Icon type="question-circle" />
            <p className={style.content}>帮助中心</p>
            <p className={style.tip}>有问题点这里</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceLine