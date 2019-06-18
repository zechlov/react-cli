import * as React from 'react'
import style from './tabBar.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

interface Tab { icon: string; name: string }

interface State {
  tabList: Tab[]
}

@inject('businessCardStore')
@observer
class TabView extends React.Component<BusinessCardProps, State> {
  
  constructor(props: any) {
    super(props)

    this.state = {
      tabList: [{
        icon: require('./img/home.svg'),
        name: '首页'
      }, {
        icon: require('./img/prod.svg'),
        name: '产品'
      }, {
        icon: require('./img/story.svg'),
        name: '故事'
      }, {
        icon: require('./img/about.svg'),
        name: '关于我们'
      }, {
        icon: require('./img/contact.svg'),
        name: '联系我们'
      }]
    }
  }

  private handleTabClick(i: number) {
    this.props.businessCardStore!.tabChanged(i)
  }

  public render() {
    const currentIndex = this.props.businessCardStore!.tabIndex

    return (
      <div className={
        this.props.businessCardStore!.globalColor.style === 1 ?
        style['tab-view'] :
        style['tab-view-dark']
        }>
        {this.state.tabList.map(
          (tab, index) => (
            <div className={style['tab-item']}
              onClick = {this.handleTabClick.bind(this, index)}
              style={{ opacity: currentIndex === index ? 1 : 0.5 }}
              key={index}>
              <img src={tab.icon} />
              <div className={style['tab-name']}>{tab.name}</div>
            </div>
          )
        )}

      </div>
    )
  }
}

export default TabView