import * as React from 'react'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import PaiXinYunApi from 'src/service/index'
import utils from 'src/utils/uploadUtils'

interface CropperProps {
  width?: number
  height?: number
  modalWidth?: number
  imgUrl: (url: string) => void
}

interface CropperState {
  info: any
}

class CropperUpload extends React.Component<CropperProps, CropperState> {
  constructor(props: CropperProps) {
    super(props)
    this.state = {
      info: null
    }
  }

  public render() {
    const { width, height, modalWidth } = this.props
    return (
      <ImgCrop
        modalWidth={modalWidth || 520}
        width={width || 100}
        height={height || 100}>
        <Upload
          style={{ cursor: 'pointer' }}
          name="file"
          action="https://up.qbox.me/"
          showUploadList={false}
          multiple={true}
          data={() => this.getUpToken()}
          beforeUpload={this.beforeUpload}
          onChange={(info: any) => this.handleUploadChange(info)}
        >
          {this.props.children}
        </Upload>
      </ImgCrop>
    )
  }

  private handleUploadChange(info: any) {
    if (info.file.status === 'done') {
      const url = `https://cdn-cloud.paixin.com/${info.file.response.key}`
      this.props.imgUrl(url)
    }
  }

  private getUpToken() {
    return this.state.info
  }

  private beforeUpload = async (file: File) => {
    // 限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg'
    const isJPEG = file.type === 'image/jpeg'
    const isGIF = file.type === 'image/gif'
    const isPNG = file.type === 'image/png'
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('超过2M限制，不允许上传')
      return false
    }
    await this.setUploadInfo()
    return true
  }

  private async setUploadInfo() {
    const res = await PaiXinYunApi.getSettingApi().getQiniuToken()
    const key = utils.getKey()
    if (res.status === 200) {
      this.setState({
        info: {
          token: res.data.token,
          key: `${key}.jpg`
        }
      })
    }
  }
}

export default CropperUpload