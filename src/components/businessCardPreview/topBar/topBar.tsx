import * as React from 'react'
import style from './topBar.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

@inject('businessCardStore')
@observer
class TopBar extends React.Component<BusinessCardProps, {}> {
  
  public componentWillMount() {
    this.getStyle()
  }

  public async getStyle() {
    const res = await PaiXinYunApi.getSettingApi().getStyle({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200) {
      this.props.businessCardStore!.setGlobalColor({
        base: res.data.color_customized,
        style: res.data.navigation_style
      })
    }
  }

  public render() {
    const timeImage = require('./img/time_white.png')
    const iconsImage = require('./img/icons_white.png')
    const buttonImage = require('./img/button_white.png')

    let title = ''
    let show = true

    switch (this.props.businessCardStore!.tabIndex) {
      case 0:
        title = '首页'
        break
      case 1:
        title = '产品'
        break
      case 2:
        title = '故事'
        break
      case 3:
        title = '关于我们'
        break
      case 4:
        title = '联系我们'
        show = false
        break
    }

    return (
      <>
      {
        show ? <div className={style.topbar} style={{background: this.props.businessCardStore!.globalColor.base}}>
        <div className={style['status-bar']}>
          <div className={style['status-bar-time']} style={{ background: `url(${timeImage})` }} />
          <div className={style['status-bar-icons']} style={{ background: `url(${iconsImage})` }} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.button} style={{ background: `url(${buttonImage})` }} />
      </div> : null
      }
      </>
    )
  }
}

export default TopBar