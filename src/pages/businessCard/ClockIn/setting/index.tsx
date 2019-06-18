import * as React from 'react'
import style from './index.scss'
import { Icon, Button } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface SettingProps {
  instance: number
  edit: (value: any) => void
}

interface SettingState {
  group: any[]
  list: any[]
  current: number
}

class ClockInSetting extends React.Component<SettingProps, SettingState> {
  constructor(props: SettingProps) {
    super(props)
    this.state = {
      group: [],
      list: [],
      current: 0
    }
  }

  public componentWillMount() {
    this.getGroup()
  }

  public async getGroup() {
    const res = await PaiXinYunApi.getGroupApi().getGroupList({ instance_id: this.props.instance })
    if (res.status === 200 && res.data) {
      this.setState({
        group: res.data
      })
      if (res.data.length > 0) {
        this.getList(res.data[this.state.current])
      }
    }
  }

  public async getList(record: any) {
    const res = await PaiXinYunApi.getClockInApi().getPlans({ instance_id: this.props.instance, group_id: record.ID })
    if (res.status === 200 && res.data) {
      this.setState({
        list: res.data
      })
    }
  }

  public addItem() {
    this.props.edit({})
  }

  public render() {
    return (
      <div className={style["setting-wrapper"]}>
        <div className={style["head-line"]}>
          {
            this.state.group.length > 0 ? this.state.group.map((value: any, index: number) => {
              return (
                <div className={`${style["head-item"]} ${this.state.current === index ? style.active : ''}`}
                  key={value.ID}
                  onClick={this.selectGroup.bind(this, value, index)}>{value.name}</div>
              )
            })
              : null
          }
        </div>
        <div className={style["detail-box"]}>
          <div className={style["title-line"]}>
            <div>打卡名称</div>
            <div className={style.long}>打卡地点</div>
            <div>打卡时间</div>
            <div>打卡点经度</div>
            <div>打卡点纬度</div>
          </div>
          {
            this.state.list.length > 0 ?
              this.state.list.map((value: any, index: number) => {
                return (
                  <div className={style["setting-item"]} key={index}>
                    <div className={style["text-box"]}>{value.name}</div>
                    <div className={`${style["text-box"]} ${style.long}`}>{value.address}</div>
                    <div className={style["text-box"]}>{value.time}</div>
                    <div className={style["text-box"]}>{Number(value.lat).toFixed(2)}°E</div>
                    <div className={style["text-box"]}>{Number(value.lng).toFixed(2)}°N</div>
                    <div className={style["btn-box"]}>
                      <div className={style["text-btn"]} onClick={this.edit.bind(this, value)}><Icon type="edit" /></div>
                      {/* <div className={style["text-btn"]} onClick={this.delete.bind(this, value)}><Icon type="delete" /></div> */}
                    </div>
                  </div>
                )
              })
              : <div className={style.empty}>暂无数据</div>
          }
        </div>
        <Button className={style.submit} onClick={() => this.addItem()} type="primary">添加</Button>
      </div>
    )
  }

  private selectGroup(value: any, index: number) {
    this.getList(value)
    this.setState({
      current: index
    })
  }

  private edit(value: any) {
    this.props.edit(value)
  }

  // private delete(value: any) {
  //   console.log(value)
  // }
}

export default ClockInSetting