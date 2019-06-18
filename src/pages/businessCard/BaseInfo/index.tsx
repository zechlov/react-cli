import * as React from 'react'
import style from './index.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import { TitleHeader } from 'src/components/titleHeader/index'
import { SubTitle } from 'src/components/subtitle/index'
import { Form, Input, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { debounce } from 'lodash'
import PaiXinYunApi from 'src/service/index'
import Upload from 'src/components/cropperUpload/index'

declare var qq: any;
let map: any = null
let geocoder: any = null
let marker: any = null
let geoaddress: any = null

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
  match?: any
}


interface LogoProps {
  setLogo: (url:string) => void
  img: string
}

class LogoUpload extends React.Component<LogoProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      img: ''
    }
  }

  public setLogo(url: any) {
    this.props.setLogo(url)
  }

  public componentWillMount() {
    this.setState({
      img: this.props.img
    })
  }

  public componentWillReceiveProps(nextProps: any) {
    this.setState({
      img: nextProps.img
    })
  }

  public render() {
    return (
      <div className={style.logoUpload}>
        <Upload imgUrl={(url) => this.setLogo(url)}>
          <div className={style.logoPreview}>
            {
              this.state.img ? <img src={this.state.img + '?imageView2/2/w/200/h/200'}/> : 'LOGO'
            }
          </div>
        </Upload>

        <div className={style.logoUploadTips}>
          <span>上传logo</span>
          <p>(推荐尺寸140*140，大小2M内)</p>
        </div>
      </div>
    )
  }
}

interface BaseInfoFormState {
  info: any
  geo: any
  logo?: any
}

interface FormProps extends FormComponentProps {
  Appid: number
  businessCardStore?: BusinessCardStore
}

@inject('businessCardStore')
@observer
class BaseInfoForm extends React.Component<FormProps, BaseInfoFormState> {
  constructor(props: FormProps) {
    super(props)

    this.state = {
      info: {},
      geo: ''
    }
  }

  public async componentWillMount() {
    const res = await PaiXinYunApi.getSettingApi().getBaseInfo({ instance_id: this.props.Appid })
    if (res.status === 200) {
      this.setState({
        info: res.data
      })
      this.codeAddress(res.data.location)
      this.props.businessCardStore!.setBase(res.data)
    }
  }

  private onInputChange = (e: any) => {
    this.codeAddress(e.target.value)
  }

  private codeAddress = debounce((address: string) => {
    geocoder.getLocation(address)
    this.setState({
      geo: map.center.lat + ', ' + map.center.lng
    })
  }, 10)

  private getAddress = debounce((latlng: string) => {
    geoaddress.getAddress(latlng)
    this.setState({
      geo: map.center.lat + ', ' + map.center.lng
    })
  }, 10)

  private initMap() {
    const container = document.getElementById('container')
    const cen = new qq.maps.LatLng(39.936273, 116.44004334);
    map = new qq.maps.Map(container, {
      center: cen,
      zoom: 13
    })

    geocoder = new qq.maps.Geocoder({
      complete: (result: any) => {
        map.setCenter(result.detail.location)

        marker = new qq.maps.Marker({
          map: map,
          position: result.detail.location
        })

      }
    })

    geoaddress = new qq.maps.Geocoder({
      complete: (result: any) => {
        map.setCenter(result.detail.location)

        marker.setPosition(result.detail.location)
        
        const info = this.state.info
        info.location = result.detail.address
        this.setState({ info })
      }
    })

    event = new qq.maps.event.addListener(
      map,
      'click',
      (e:any) => {
        this.getAddress(e.latLng)
      })
  }

  public componentDidMount() {
    this.initMap()
  }

  public setLogoInfo(url: string) {
    const info = this.state.info
    info.logo = url
    this.setState({ info })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <>
        <SubTitle text="LOGO" />
        <LogoUpload setLogo={(url) => this.setLogoInfo(url)} img={this.state.info.logo!}/>
        <SubTitle text="基本信息" />
        <div className={style.baseInfoFormWapper}>
          <div className={style.baseInfoForm}>
            <Form {...formItemLayout}>
              <Form.Item label="小程序名称">
                {getFieldDecorator('mimiprogramName', {
                  initialValue: this.state.info.name!,
                  rules: [{ required: true, message: ' 请输入小程序名称' }],
                })(
                  <Input placeholder="输入小程序名称" />
                )}
              </Form.Item>
              <Form.Item label="公司全称">
                {getFieldDecorator('comName', {
                  initialValue: this.state.info.company_name!,
                  rules: [{ required: true, message: '请输入公司全称' }],
                })(
                  <Input placeholder="输入公司全称" />
                )}
              </Form.Item>
              <Form.Item label="联系电话">
                {getFieldDecorator('phone', {
                  initialValue: this.state.info.contact!,
                  rules: [{ required: true, message: '请输入联系电话' }],
                })(
                  <Input placeholder="输入联系电话" />
                )}
              </Form.Item>
              <Form.Item label="公司网址">
                {getFieldDecorator('link', {
                  initialValue: this.state.info.website!,
                  rules: [{ required: false, message: '' }],
                })(
                  <Input placeholder="输入公司网址" />
                )}
              </Form.Item>
              <Form.Item label="公司地址">
                {getFieldDecorator('address', {
                  initialValue: this.state.info.location!,
                  rules: [{ required: true, message: '请输入公司地址' }],
                })(
                  <Input placeholder="输入公司地址" onBlur={this.onInputChange} />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <SubTitle text="公司位置定位" />
        <div className={style.map} id="container" />
        <div className={style.save} onClick={() => this.submit()} >保存</div>
      </>
    )
  }

  private async submit() {
    const info = this.state.info
    const data = {
      instance_id: this.props.businessCardStore!.instanceId(),
      name: info.name!,
      company_name: info.company_name!,
      contact: info.contact!,
      contact_is_shown: info.contact_is_shown!,
      website: info.website!,
      website_is_shown: info.website_is_shown!,
      location: info.location!,
      location_is_shown: info.location_is_shown!,
      extra_info: info.extra_info!,
      geo: info.geo!,
      logo: info.logo!,
    }
    this.props.form.validateFields((err: AnalyserNode, value: any) => {
      if (!err) {
        data.name = value.mimiprogramName
        data.company_name = value.comName
        data.contact = value.phone
        data.website = value.link
        data.location = value.address
        data.geo = this.state.geo
      }
    })
    if (this.state.logo) {
      data.logo = this.state.logo
    }
    const res = await PaiXinYunApi.getSettingApi().setBaseInfo(data)
    if (res.status === 200) {
      message.success('修改成功！')
      this.props.businessCardStore!.setBase(res.data)
    } else {
      message.error(res.data.msg)
    }
  }
}

@inject('businessCardStore')
@observer
class BusinessCardInfo extends React.Component<BusinessCardProps, {}> {

  public componentWillMount() {
    this.props.businessCardStore!.setInstance(+this.props.match.params.appId)
  }

  public render() {
    const InfoForm = Form.create<FormProps>()(BaseInfoForm)

    return (
      <div className={style['business-card-info']}>
        <TitleHeader title="基本信息" subtitle="小程序基本信息设置" />
        <div className={style['content-wrapper']}>
          <InfoForm Appid={+this.props.match.params.appId} />
        </div>
      </div>
    )
  }
}

export default BusinessCardInfo