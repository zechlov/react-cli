import Axios from './base'

interface CreateCode {
  instance_id: number
  scene: string
  page: string
}

export default class WechatApi {

  public wxcode(userId: number) {
    const url: string = `/wx-create-wx-code/${userId}`
    return Axios(url, null, null, 'POST')
  }

  public authorize(clientId: number) {
    const url: string = `/wx-create-authorize-url/${clientId}`
    return Axios(url, null, null, 'POST')
  }

  public submitProject(data: any) {
    const url: string = `/wx-commit-program`
    return Axios(url, data, null, 'POST')
  }

  public getPage(param: { instance_id: number }) {
    const url: string = `/wx-get-page/${param.instance_id}`
    return Axios(url, null, null, 'GET')
  }

  public getCategory(param: { instance_id: number }) {
    const url: string = `/wx-get-category/${param.instance_id}`
    return Axios(url, null, null, 'GET')
  }

  public userAppid(data: { instance_id: number }) {
    const url: string = `/wx-get-appid/${data.instance_id}`
    return Axios(url, null, null, 'GET')
  }

  public createCoed(data: CreateCode) {
    const url: string = `wx-create-wx-code`
    return Axios(url, data, null, 'POST')
  }

  public createPreCode(instance: number) {
    const url: string = `/wx-taster-qrcode/${instance}`
    return Axios(url, null, null, 'POST')
  }

  public getPreList(instance: number) {
    const url: string = `/wx-taster-list/${instance}`
    return Axios(url, null, null, 'GET')
  }

  public addTaster(data: {
    instance_id: number,
    wechatid: string
  }) {
    const url: string = `/wx-add-taster`
    return Axios(url, data, null, 'POST')
  }
}