import * as React from 'react'
import style from './css/tabFive.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessTabStore {
  businessCardStore?: BusinessCardStore,
}

@inject('businessCardStore')
@observer
class TabdivFive extends React.Component<BusinessTabStore, {}> {
  constructor(props: BusinessTabStore) {
    super(props)
  }

  public async componentWillMount() {
    const { html } = this.props.businessCardStore!.TabFiveData
    if (!html) {
      const res = await PaiXinYunApi.getSettingApi().getAbout({ instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        this.props.businessCardStore!.setTabFive({
          html: res.data.content,
          show: res.data.is_shown
        })
      }
    }
  }

  public render() {
    return (
      <>
        {
          this.props.businessCardStore!.TabFiveData.html ? 
          <div className={style["about-page"]} dangerouslySetInnerHTML={{__html: this.props.businessCardStore!.TabFiveData.html}} /> : 
          <img src={require('src/assets/img/about-empty.svg')} className={style["empty-img"]}/>
        }
        
      </>
    )
  }
}

export default TabdivFive