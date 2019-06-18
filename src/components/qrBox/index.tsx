import * as React from 'react'
import style from './index.scss'
import { Icon, Button } from 'antd'
import PaiXinYunApi from 'src/service/index'

interface RecordProps {
  record: any
  tip?: string
}

interface RecordState {
  qr: string
  err: boolean
}

class QRBox extends React.Component<RecordProps, RecordState> {
  constructor(props: RecordProps) {
    super(props)
    this.state = {
      qr: '',
      err: false
    }
  }

  public async componentDidMount() {
    const data = {
      instance_id: this.props.record.ID,
      scene: 'a=0',
      page: 'pages/index/index'
    }
    const res = await PaiXinYunApi.getWechat().createCoed(data)
    if (res.status === 200 && res.data.url) {
      this.setState({
        qr: res.data.url
      })
    } else {
      this.setState({
        err: true
      })
    }
  }

  public render() {
    return (
      <div className={style["qr-box"]}>
        <div className={style.content}>
          {
            !this.state.err ?
              this.state.qr ?
                <img src={`https://api.paixinyun.com/${this.state.qr}`} alt="" />
                : <Icon type="loading" />
              : <div>数据错误，请联系客服</div>
          }
        </div>
        {
          this.state.qr ? <a className={style.download} href={`https://api.paixinyun.com/${this.state.qr}`} target="_blank">
            <Button type="default">点击下载小程序码</Button>
          </a> : null
        }
        {
          this.props.tip ?
            <div className={style.tip}>{this.props.tip}</div>
            : null
        }
      </div>
    )
  }

}

export default QRBox