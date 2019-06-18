import * as React from 'react'
import style from './css/tabTwo.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

interface TabState {
  current: any
}

@inject('businessCardStore')
@observer
class TabLine extends React.Component<BusinessCardProps, TabState> {
  constructor(props: BusinessCardProps) {
    super(props)
    this.state = {
      current: 0
    }
  }

  public async componentWillMount() {
    const { logs, proList } = this.props.businessCardStore!.TabTwoData
    if (proList.length < 1) {
      const res = await PaiXinYunApi.getProduct().getProductList({ type_id: 0, instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        this.props.businessCardStore!.setTabTwo('proList', res.data || [])
      }
    }
    if (logs.length < 2) {
      const res = await PaiXinYunApi.getProduct().getProductTypeList({ instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        const typeList = [
          {
            name: '全部',
            ID: 0,
            child: []
          }
        ].concat(res.data || [])
        this.props.businessCardStore!.setTabTwo('logs', typeList)
      }
    }
  }

  public render() {
    const data = this.props.businessCardStore!.TabTwoData
    const base = this.props.businessCardStore!.globalColor.base
    return (
      <>
        <div className={style["tab-line"]}>
          {
            data.logs.map((item: any, index: number) => {
              return (
                <div className={style["tab-box"]} key={index}>
                  <div className={`${style["tab-item"]}`}
                    style={{ color: index === this.state.current ? base : '', borderColor: index === this.state.current ? base : '' }}
                    onClick={this.setIndex.bind(this, index)}
                  >{item.name}</div>
                </div>
              )
            })
          }
        </div>
        <div className={style["item-line"]}>
          {
            this.state.current > 0 ?
              <div className={style["head-line"]}>
                {
                  data.logs[this.state.current].child.length > 0 ?
                    <>
                      <div className={style["head-box"]}>
                        <div className={`${style["head-item"]}`}
                          style={{ color: base, borderColor: base }}
                        >全部</div>
                      </div>
                      {
                        data.logs[this.state.current].child.map((item: any, index: number) => {
                          return (
                            <div className={style["head-box"]} key={index}>
                              <div className={`${style["head-item"]}`}>{item.name}</div>
                            </div>
                          )
                        })
                      }
                    </>
                    : null
                }
              </div> : null
          }
          <div className={style["product-content"]}>
            {
              data.proList.length > 0 ?
              data.proList.map((tip: any, i: number) => {
                return (
                  <div className={style["product-item"]} key={i}>
                    <img className={style["product-img"]} src={`${tip.pic_url}?imageView2/2/w/60/h/60`} />
                    <div className={style["product-title"]}>{tip.name}</div>
                  </div>
                )
              })
              : null
            }
          </div>
        </div>
      </>
    )
  }

  private setIndex(index: number) {
    this.setState({
      current: index
    })
  }
}



class TabViewTwo extends React.Component {
  public render() {
    return (
      <div className={style["container-box"]}>
        <TabLine />
      </div>
    )
  }
}

export default TabViewTwo