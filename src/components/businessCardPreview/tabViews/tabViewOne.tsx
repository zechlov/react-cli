import * as React from 'react'
import style from './css/tabOne.scss'
import { Carousel } from 'antd'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

@inject('businessCardStore')
@observer
class TabViewOne extends React.Component<BusinessCardProps, {}> {
  public temp = {
    banner: [
      {
        pic: '',
        name: '',
        position: 1
      },
      {
        pic: '',
        name: '',
        position: 2
      },
      {
        pic: '',
        name: '',
        position: 2
      }
    ],
    iconList: [
      {
        pic: require('src/assets/img/banner-icon1.png'),
        name: '第一'
      },
      {
        pic: require('src/assets/img/banner-icon2.png'),
        name: '第二'
      },
      {
        pic: require('src/assets/img/banner-icon3.png'),
        name: '第三'
      },
      {
        pic: require('src/assets/img/banner-icon4.png'),
        name: '第四'
      },
      {
        pic: require('src/assets/img/banner-icon5.png'),
        name: '第五'
      },
      {
        pic: require('src/assets/img/banner-icon6.png'),
        name: '第六'
      },
      {
        pic: require('src/assets/img/banner-icon7.png'),
        name: '第七'
      },
      {
        pic: require('src/assets/img/banner-icon8.png'),
        name: '第八'
      }
    ]
  }

  public async componentWillMount() {
    const { banner, iconList, introduct } = this.props.businessCardStore!.TabOneData
    if (banner.length < 1) {
      const res = await PaiXinYunApi.getSettingApi().getBannerList({instance_id: this.props.businessCardStore!.instanceId()})
      if (res.status === 200) {
        if (res.data.rotation_chart_list.length > 0) {
          this.props.businessCardStore!.setTabOne('banner', res.data.rotation_chart_list)
        } else {
          this.props.businessCardStore!.setTabOne('banner', this.temp.banner)
        }
      }
    }
    if (iconList.length < 1) {
      const res = await PaiXinYunApi.getSettingApi().getShortCut({ instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        if (res.data.shortcut_button_list.length > 0) {
          this.props.businessCardStore!.setTabOne('iconList', res.data.shortcut_button_list)
        } else {
          this.props.businessCardStore!.setTabOne('iconList', this.temp.iconList)
        }
      }
    }
    if (introduct === '') {
      const res = await PaiXinYunApi.getSettingApi().getIntroduction({instance_id: this.props.businessCardStore!.instanceId()})
      if (res.status === 200) {
        this.props.businessCardStore!.setTabOne('introduct', res.data.content)
      }
    }
  }

  public render() {
    const banner = this.props.businessCardStore!.TabOneData.banner
    const data = this.props.businessCardStore!.TabOneData
    return (
      <>
      <div className={style['home-page']}>
        <Carousel>
          {
            banner.length > 0 ?
            banner.map((value:any, index:number) => {
              if (value.position !== 1) {
                return
              }
              return (
                <div className={style["banner-wrapper"]} key={index} >
                  {
                    value.pic ? <img src={`${value.pic}`} alt=""/> : <div>banner</div>
                  }
                </div>
              )
            })
            : null
          }
        </Carousel>
      </div>
      <div className={style["icon-list"]}>
      {
        data.iconList.length > 0 ?
        data.iconList.map((item:any, index:number) => {
          return (
              <div className={style["icon-box"]} key={index}>
                <div className={style["icon-item"]}>
                  <img className={style["icon-tab"]} src={item.pic}/>
                </div>
                <div className={style["icon-title"]}>{item.name}</div> 
              </div>
          )
        })
        : null
      }
      </div>
      <div className={style.banner}>
        <div className={style["banner-title"]}>活动专区</div>
        <div className={style["banner-content"]}>
          {
            banner.length > 0 ?
            banner.map((value: any, index: number) => {
              if (value.position !== 2) {
                return
              }
              return (
                <div className={style["banner-item"]} key={index}>
                  {
                    value.pic ? <img src={value.pic} alt=""/> : <div>banner</div>
                  }
                </div>
              )
            })
            : null
          }
        </div>
      </div>
      <div className={style.banner}>
        <div className={style["banner-title"]}>产品介绍</div>
        <div className={style["banner-container"]}>
          {
            this.props.businessCardStore!.TabOneData.introduct ? 
            <div className={style["banner-box"]} dangerouslySetInnerHTML={{__html: this.props.businessCardStore!.TabOneData.introduct}}/> :
            <div className={style.origin}>banner</div>
          }
          
        </div>
      </div>
      </>
    )
  }
}

export default TabViewOne