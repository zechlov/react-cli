import Axios from './base'

interface StyleList {
  instance_id: number
  color_id?: number
  color_customized?: string
  product_layout: number
  article_layout: number
  navigation_style: number
}

interface BaseInfo {
  instance_id: number
  name?: string
  company_name?: string
  contact?: string
  contact_is_shown?: boolean
  website?: string
  website_is_shown?: boolean
  location?: string
  location_is_shown?: boolean
  extra_info?: string
  geo?: string
  logo?: string
  staff_num?: string
}

interface AboutInfo {
  instance_id: number
  content: string
  is_shown: boolean
}

interface BannerItem {
  id?: number
  pic: string
  type_id: number
  url?: string
  product_id?: number
  product_type_id?: number
  position: number
  instance_id: number
}

interface BannerInfo {
  instance_id: number
  rotation_chart_list: BannerItem[]
}

interface ShortCutItem {
  id?: number
  pic: string
  type_id: number
  url?: string
  product_id?: number
  product_type_id?: number
  phone?: string
  address?: string
  instance_id: number
}

interface ShortCutInfo {
  instance_id: number
  shortcut_button_list: ShortCutItem[]
}

interface Normal {
  instance_id: number
}

interface ShortCut {
  instance_id: number
}

export default class CommonSettingApi {

  public getStyle(param: Normal) {
    const url: string = `bc/theme`
    return Axios(url, null, param, 'GET')
  }

  public setStyle(data: StyleList) {
    const url: string = `bc/theme`
    return Axios(url, data, null, 'POST')
  }

  public getBaseInfo(param: Normal) {
    const url: string = `bc/instance`
    return Axios(url, null, param, 'GET')
  }

  public setBaseInfo(data: BaseInfo) {
    const url: string = `bc/instance`
    return Axios(url, data, null, 'POST')
  }

  public getQiniuToken() {
    const url: string = `bc/qiniu-upload-token`
    return Axios(url, null, null, 'GET')
  }

  public getBannerList(data: Normal) {
    const url: string = `bc/rotation-chart/list`
    return Axios(url, data, null, 'POST')
  }

  public saveBanner(data: BannerInfo) {
    const url: string = `bc/rotation-chart/save`
    return Axios(url, data, null, 'POST')
  }

  public getAbout(param: Normal) {
    const url: string = `bc/about`
    return Axios(url, null, param, 'GET')
  }

  public saveAbout(data: AboutInfo) {
    const url: string = `bc/about`
    return Axios(url, data, null, 'POST')
  }

  public getShortCut(data: ShortCut) {
    const url: string = `bc/shortcut-button/list`
    return Axios(url, data, null, 'POST')
  }

  public saveShortCut(data: ShortCutInfo[]) {
    const url: string = `bc/shortcut-button/save`
    return Axios(url, data, null, 'POST')
  }

  public getAuthState(data: Normal) {
    const url: string = `instance-is-authorized/${data.instance_id}`
    return Axios(url, null, null, 'POST')
  }

  public getExamineState(data: Normal) {
    const url: string = `/get-instance/${data.instance_id}`
    return Axios(url, null, null, 'GET')
  }

  public getChangeState(data: Normal) {
    const url: string = `bc/instance-check-changed/${data.instance_id}`
    return Axios(url, null, null, 'GET')
  }

  public getIntroduction(param: { instance_id: number }) {
    const url: string = `bc/rich-text-description`
    return Axios(url, null, param, 'GET')
  }

  public saveIntroduction(data: { instance_id: number, content: any }) {
    const url: string = `bc/rich-text-description`
    return Axios(url, data, null, 'POST')
  }

  public getCategory(data: { instance_id: number }) {
    const url: string = `/instance/function/${data.instance_id}`
    return Axios(url, null, null, 'GET')
  }
}