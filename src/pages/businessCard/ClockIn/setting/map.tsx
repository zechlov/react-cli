import * as React from 'react'
import style from './index.scss'
import { Form, Input, Button, Select, message, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { debounce } from 'lodash'
import { SubTitle } from 'src/components/subtitle';
import PaiXinYunApi from 'src/service/index'

declare var qq: any;
let map: any = null
let geocoder: any = null
let marker: any = null
let geoaddress: any = null


interface MapProps extends FormComponentProps {
  group: any[]
  instance: number
  cancel: () => void
  user: any
  editer: any
}

class MapForm extends React.Component<MapProps, {}> {
  constructor(props: MapProps) {
    super(props)
  }

  // 位置求坐标
  private codeAddress = debounce((address: string) => {
    geocoder.getLocation(address)
  }, 10)

  //  坐标求位置
  private getAddress = debounce((latlng: string) => {
    geoaddress.getAddress(latlng)
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

        this.props.form.setFieldsValue({
          lat: result.detail.location.lat,
          lng: result.detail.location.lng
        })

      }
    })

    geoaddress = new qq.maps.Geocoder({
      complete: (result: any) => {
        map.setCenter(result.detail.location)
        if (marker) {
          marker.setPosition(result.detail.location)
        } else {
          marker = new qq.maps.Marker({
            map: map,
            position: result.detail.location
          })
        }

        this.props.form.setFieldsValue({
          address: result.detail.address,
          lat: result.detail.location.lat,
          lng: result.detail.location.lng
        })
      }
    })

    event = new qq.maps.event.addListener(
      map,
      'click',
      (e: any) => {
        this.getAddress(e.latLng)
      })
  }

  public componentDidMount() {
    this.initMap()
    this.codeAddress(this.props.editer.address)
  }

  public submit() {
    this.props.form.validateFields(async (err: AnalyserNode, value: any) => {
      if (!err) {
        const data:any = {
          lat: value.lat + '',
          lng: value.lng + '',
          address: value.address,
          group_id: value.group,
          time: value.time,
          name: value.name,
          instance_id: this.props.instance,
          created_by: this.props.user.user_id
        }
        if (this.props.editer) {
          data.id = this.props.editer.ID
        }
        const res = await PaiXinYunApi.getClockInApi().savePlan(data)
        if (res.status === 200) {
          message.success('提交成功！')
          this.props.cancel()
        } else {
          message.error(res.data.msg)
        }
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        <SubTitle text="在地图添加定位点" />
        <div className={style["main-content"]}>
          <div className={style["form-content"]}>
            <Form>
              <Form.Item label="打卡规则名称">
                {getFieldDecorator('name', {
                  initialValue: this.props.editer!.name,
                  rules: [
                    { required: true, message: '请设置打卡规则名称' }
                  ]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="选择分组">
                {getFieldDecorator('group', {
                  initialValue: this.props.editer.group_id,
                  rules: [
                    { required: true, message: '请选择分组' }
                  ]
                })(
                  <Select>
                    {
                      this.props.group.length > 0 ?
                        this.props.group.map((value: any) =>
                          <Select.Option key={value.ID} value={value.ID}>{value.name}</Select.Option>
                        )
                        : null
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="定位点名称">
                {getFieldDecorator('address', {
                  initialValue: this.props.editer.address,
                  rules: [
                    { required: true, message: '请设置打卡定位点' }
                  ]
                })(
                  <Input onBlur={this.handelChange} />
                )}
              </Form.Item>
              <Form.Item label="定位点经度">
                {getFieldDecorator('lat', {
                  initialValue: this.props.editer.lat
                })(
                  <Input disabled={true} />
                )}
              </Form.Item>
              <Form.Item label="定位点纬度">
                {getFieldDecorator('lng', {
                  initialValue: this.props.editer.lat
                })(
                  <Input disabled={true} />
                )}
              </Form.Item>
              <Form.Item label="打卡时间">
                {getFieldDecorator('time', {
                  initialValue: this.props.editer.time,
                  rules: [
                    { required: true, message: '请编辑打卡时间' }
                  ]
                })(
                  <Input type="time" placeholder="请选择时间" />
                )}
              </Form.Item>
            </Form>
          </div>
          <div className={style.map} id="container" />
        </div>
        <Button type="primary" onClick={() => this.submit()}>保存</Button>
        <Button type="default" onClick={() => this.cancel()} style={{marginLeft: '25px'}}>返回</Button>
      </>
    )
  }

  private handelChange = (event: any) => {
    this.codeAddress(event.target.value)
  }

  private cancel() {
    Modal.confirm({
      title: '提示',
      content: '确定要放弃当期编辑状态返回么？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => this.props.cancel()
    })
  }

}

const MapSetting = Form.create<MapProps>()(MapForm)

export default MapSetting