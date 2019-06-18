import * as React from 'react'
import style from './css/tabFour.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'

interface BusinessTabStore {
  businessCardStore?: BusinessCardStore,
}

@inject('businessCardStore')
@observer
class Company extends React.Component<BusinessTabStore, {}> {
  constructor(props: BusinessTabStore) {
    super(props)
  }

  public render() {
    const base = this.props.businessCardStore!.baseInfo
    return (
      <>
        <div className={style.company}>
          <div className={style["avatar-box"]}>
            <img className={style.avatar} src={base.logo + '?imageView2/2/w/200/h/200'}/>
          </div>
          <div className={style.name}>{base.company_name}</div>
        </div>
        <div className={style.mitline} />
        <div className={style["info-container"]}>
          <div className={style["info-box"]}>
            <div className={style["info-item"]}>
              <div className={style.title}>
                <img className={style["info-icon"]} src={require("./img/phone.svg")} />
                <div className={style["title-name"]}>
                  <div>电</div>
                  <div>话</div>
                </div>
              </div>
              <div className={style["info-tab"]}>
                {base.contact}
              </div>
            </div>
            {/* <div className={style["info-item"]}>
              <div className={style.title}>
                <img className={style["info-icon"]} src={require("./img/mail.svg")} />
                <div className={style["title-name"]}>
                  <div>邮</div>
                  <div>箱</div>
                </div>
              </div>
              <div className={style["info-tab"]}>
                Mike Wilson@163.com
              </div>
            </div> */}
            <div className={style["info-item"]}>
              <div className={style.title}>
                <img className={style["info-icon"]} src={require("./img/address.svg")} />
                <div className={style["title-name"]}>
                  <div>地</div>
                  <div>址</div>
                </div>
              </div>
              <div className={style["info-tab"]}>
                <div>{base.location}</div>
                {/* <img className={style["with-link"]} src={require("./img/icon-arrow.svg")} /> */}
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style.title}>
                <img className={style["info-icon"]} src={require("./img/website.svg")} />
                <div className={style["title-name"]}>
                  <div>网</div>
                  <div>站</div>
                </div>
              </div>
              <div className={style["info-tab"]} style={{ color: '#000' }}>
                <div>{base.website}</div>
                {/* <img className={style["with-link"]} src={require("./img/icon-arrow.svg")} /> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

interface State {
  companyData: any
}

class TabdivFour extends React.Component<{}, State> {

  constructor(props: any) {
    super(props)

    this.state = {
      companyData: {}
    }
  }

  public render() {
    return (
      <Company />
    )
  }
}

export default TabdivFour