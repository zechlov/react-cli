import * as React from 'react'
import style from './index.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import TabBar from './tabBar/tabBar'
import TopBar from './topBar/topBar'
import TabViewOne from './tabViews/tabViewOne'
import TabViewTwo from './tabViews/tabViewTwo'
import TabViewThree from './tabViews/tabViewThree'
import TabViewFour from './tabViews/tabViewFour'
import TabViewFive from './tabViews/tavViewFive'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

@inject('businessCardStore')
@observer
class MainPage extends React.Component<BusinessCardProps, {}> {

  public render() {
    let TabView

    switch (this.props.businessCardStore!.tabIndex) {
      case 0:
        TabView = TabViewOne
        break
      case 1:
        TabView = TabViewTwo
        break
      case 2:
        TabView = TabViewThree
        break
      case 3:
        TabView = TabViewFive
        break
      default:
        TabView = TabViewFour
        break
    }

    return (
      <>
        <TopBar />
        <div className={style.box}>
          <div className={style.content}>
            <TabView />
          </div>
        </div>
        <TabBar />
      </>
    )
  }
}

interface PreViewState {
  status: boolean
}

@inject('businessCardStore')
@observer
class MiniprogramPreview extends React.Component<BusinessCardProps, PreViewState> {
  constructor(props: any) {
    super(props)
    this.state = {
      status: false
    }
  }

  public render() {
    const isShowPrew = this.props.businessCardStore!.isShowPrew

    return (
      <div className={!this.state.status ? style['miniprogram-preview'] : style["all-preview"]}
        style={{ display: isShowPrew ? 'flex' : 'none' }}>
        <div className={style.title}>展示预览</div>

        <div className={style['phone-container']}>
          <MainPage />
        </div>

        <div className={style.buttons}>
          {
            this.state.status ?
            <>
              <div onClick={() => this.preView(false)}>退出预览</div>
            </> :
            <>
              <div onClick={() => this.preView(true)}>预览模式</div>
            </>
          }
        </div>
      </div>
    )
  }
  private preView(status: boolean) {
    this.setState({
      status: status
    })
  }
}

export default MiniprogramPreview