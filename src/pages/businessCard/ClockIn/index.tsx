import * as React from 'react'
import style from './index.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import { TitleHeader } from 'src/components/titleHeader/index'
import { HeaderLine, HeadProps } from 'src/components/headerLine/index'
import ClockInSetting from './setting/index'
import ClockInMap from './setting/map'
import ClockInDataList from './dataList/index'
import ClockInRules from './rules/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

interface ClockInState {
  HeadData: HeadProps
  Map: boolean
  editer: any
  group: any[]
  user: any
}

@inject('businessCardStore')
@observer
class BusinessCardClockIn extends React.Component<BusinessCardProps, ClockInState> {
  constructor(props: BusinessCardProps) {
    super(props)
    this.state = {
      HeadData: {
        headTips: ['打卡设置', '打卡数据', '打卡规则'],
        currentTip: '0',
        clickTab: (key) => this.changeTab(key)
      },
      Map: false,
      editer: {},
      group: [],
      user: {}
    }
  }

  public componentWillMount() {
    const item = localStorage.getItem('user')
    if (item) {
      this.setState({
        user: JSON.parse(item)
      })
    }
    this.getGroup()
  }

  public async getGroup() {
    const res = await PaiXinYunApi.getGroupApi().getGroupList({ instance_id: this.props.businessCardStore!.instanceId() })
    if (res.status === 200 && res.data) {
      this.setState({
        group: res.data
      })
    }
  }

  public changeTab(key: string) {
    const HeadData = this.state.HeadData
    HeadData.currentTip = key
    this.setState({
      HeadData
    })
  }

  public showTabs(tabs: string) {
    const instance = this.props.businessCardStore!.instanceId()
    switch (tabs) {
      case '0':
        return <ClockInSetting instance={instance} edit={(value) => this.getMap(value)} />
      case '1':
        return <ClockInDataList instance={instance} />
      case '2':
        return <ClockInRules instance={instance}/>
      default:
        return null
    }
  }

  public render() {
    return (
      <div className={style['business-card-clockin']}>
        <TitleHeader title="打卡策略" subtitle="帮助员工进行打卡定位" />
        <div className={style["manage-content"]}>
          {
            this.state.Map ? <ClockInMap
              editer={this.state.editer}
              user={this.state.user}
              cancel={() => this.cancel()}
              instance={this.props.businessCardStore!.instanceId()}
              group={this.state.group} /> :
              <>
                <HeaderLine headProp={this.state.HeadData} />
                {this.showTabs(this.state.HeadData.currentTip)}
              </>
          }
        </div>
      </div>
    )
  }

  private getMap(value: any) {
    this.setState({
      Map: true,
      editer: value
    })
  }

  private cancel() {
    this.setState({
      Map: false,
      editer: {}
    })
  }

}

export default BusinessCardClockIn