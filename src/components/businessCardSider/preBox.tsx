import * as React from 'react'
import style from './index.scss'
import PaiXinYunApi from 'src/service/index'
import { Button, Input, message } from 'antd';

interface PreProps {
  instance: any
}

interface PreState {
  QR: string
  showList: boolean,
  dataSource: any[]
}

class PreBox extends React.Component<PreProps, PreState> {
  constructor(props: PreProps) {
    super(props)
    this.state = {
      QR: '',
      showList: false,
      dataSource: []
    }
  }

  public async componentWillMount() {
    const res = await PaiXinYunApi.getWechat().createPreCode(this.props.instance)
    if (res.status === 200) {
      this.setState({
        QR: res.data.url
      })
    }
  }

  public async componentDidMount() {
    const res = await PaiXinYunApi.getWechat().getPreList(this.props.instance)
    if (res.status === 200) {
      this.setState({
        dataSource: res.data
      })
    }
  }

  public async submit(index: number) {
    const { dataSource } = this.state
    if (!dataSource[index].wechatid) {
      message.warning('请编辑微信号')
      return
    }
    const data = {
      instance_id: this.props.instance,
      wechatid: dataSource[index].wechatid
    }
    const res = await PaiXinYunApi.getWechat().addTaster(data)
    if (res.status === 200) {
      dataSource[index].editer = false
      this.setState({ dataSource })
    } else {
      message.error(res.data.msg)
    }
  }

  public render() {
    return (
      <>
        {
          this.state.showList ?
            <div className={style["pre-list"]}>
              <div className={style.title}>
              <Button type="primary" icon="plus" size="small" onClick={() => this.addTaster()}>添加体验者</Button>
              </div>
              <div className={style["pre-table"]}>
                <div className={style.top} />
                <div className={style['header-line']}>
                  <div className={style.id}>编号</div>
                  <div className={style.wechat}>微信号</div>
                  <div className={style.btn}>操作</div>
                </div>
                {
                  this.state.dataSource.length > 0 ?
                    this.state.dataSource.map((value: any, index: number) => {
                      return (
                        <div className={style["item-line"]} key={index} style={{background: index%2 === 0 ? '#F7FAFB' : ''}}>
                          <div className={style.id}>{index > 8 ? index + 1 : '0' + (index + 1)}</div>
                          <div className={style.wechat}>
                            {
                              value.editer ?
                                <Input defaultValue={value.wechatid} onBlur={this.changeValue.bind(this, index)} />
                                : value.wechatid
                            }
                          </div>
                          <div className={style.btn}>
                            {
                              value.editer ?
                                <Button type="primary" size="small" onClick={this.submit.bind(this, index)}>确定</Button>
                                : null
                            }
                          </div>
                        </div>
                      )
                    })
                    : <div className={style.empty}>暂无数据</div>
                }
              </div>
              <div className={style.footer}>
                <Button type="default" className={style.add} onClick={() => this.hideList()}>返回上一级</Button>
              </div>
            </div>
            : <div className={style["pre-box"]}>
              <div className={style.tip}>管理员体验者可扫描下方二维码即可体验体验版</div>
              <div className={style.tip}>（下载保存该二维码）</div>
              <div className={style['QR-box']}>
                <img src={`https://api.paixinyun.com/${this.state.QR}`} alt="" />
              </div>
              <div className={style["text-btns"]}>
                <div onClick={() => this.download()}>点击下载二维码</div>
                <div onClick={() => this.showList()}>查看体验者</div>
              </div>
            </div>
        }
      </>
    )
  }

  private changeValue(index: number, event: any) {
    const { dataSource } = this.state
    dataSource[index].wechatid = event.target.value
    this.setState({ dataSource })
  }

  private addTaster() {
    const { dataSource } = this.state
    dataSource.push({
      wechatid: '',
      editer: true
    })
    this.setState({ dataSource })
  }

  private download() {
    window.open(`https://api.paixinyun.com/${this.state.QR}`, '_blank')
  }

  private showList() {
    this.setState({
      showList: true
    })
  }

  private hideList() {
    this.setState({
      showList: false
    })
  }
}

export default PreBox