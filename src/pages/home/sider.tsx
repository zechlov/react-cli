import * as React from 'react'
import style from './sider.scss'

interface NavigationProp { icon: string; name: string; }

class NavigationItem extends React.Component<{ product: NavigationProp }, {}> {
  constructor(props: { product: NavigationProp }) {
    super(props)
  }

  public render() {
    return (
      <div className={style['product-item']}>
        <img src={this.props.product.icon} />
        <span>{this.props.product.name}</span>
      </div>
    )
  }
}

const Navigation = () =>
  <div className={style['product-list']}>
    <NavigationItem product={{ icon: require('./img/product_1.svg'), name: '商标云注册' }} />
    <div className={style.dividing} />
    <NavigationItem product={{ icon: require('./img/product_2.svg'), name: '知产云搜索' }} />
    <div className={style.dividing} />
    <NavigationItem product={{ icon: require('./img/product_3.svg'), name: '客户增长宝' }} />
    <div className={style.dividing} />
    <NavigationItem product={{ icon: require('./img/product_4.svg'), name: '极速建站宝' }} />
  </div>

const AccountUp = () =>
  <div className={style['account-up']}>
    <h3>账户升级</h3>
    <p>还在想着如何挖掘更多客户<br />不如快速开通拍信云营销<br />板块，只需要升级为金牌商户</p>
  </div>

interface RecommendData {
  image: string;
  content: string;
  button: string;
  jump: string;
}

class Recommend extends React.Component<{ recommendData: RecommendData }, {}> {
  constructor(pros: any) {
    super(pros)
  }

  public render() {
    const data = this.props.recommendData

    return (
      <div className={style.recommend}>
        <img src={data.image} />
        <p dangerouslySetInnerHTML={{ __html: data.content }} />
        <a href={data.jump} target="_blank">{data.button}</a>
      </div>
    )
  }
}

class Sider extends React.Component<{}, { recommendData: RecommendData }> {
  constructor(props: any) {
    super(props)

    this.state = {
      recommendData: {
        image: require('./img/recommand.svg'),
        content: '拍信云最新上线的<br>建站宝，可以实现10分钟<br>建立一个分销网站和小程序 ',
        button: '抢先体验GO',
        jump: 'http://365rf.com/'
      }
    }
  }

  public render() {
    return (
      <div className={style.sider}>
        <div className={style['manage-platform']}>拍信云管理平台</div>
        <Navigation />
        <AccountUp />
        <Recommend recommendData={this.state.recommendData} />
      </div>
    )
  }
}

export default Sider