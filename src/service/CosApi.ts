import Axios from './base'


/**
 * @param instance_id  实例id
 * @param title_enabled 职称是否启用
 * @param title_required 职位是否必填
 * @param email_enabled 邮箱是否启用
 * @param email_required 邮箱是否必填
 * @param company_enabled 公司名是否启用
 * @param company_required 公司名是否必填
 * @param location_required 地址是否必填
 * @param location_enabled 地址是否启用
 */
interface DetailList {
  instance_id: number
  title_enabled: boolean
  title_required: boolean
  email_enabled: boolean
  email_required: boolean
  company_enabled: boolean
  company_required: boolean
  location_required: boolean
  location_enabled: boolean
}

export default class CosApi {
  public getTagList(data: { instance_id: number }) {
    const url: string = `bc/user-tag-list`
    return Axios(url, data, null, 'POST')
  }

  public saveTag(data: any[]) {
    const url: string = `bc/user-tag-save`
    return Axios(url, data, null, 'POST')
  }

  public deleteTag(data: { id: number }) {
    const url: string = `bc/user-tag-delete`
    return Axios(url, data, null, 'POST')
  }

  public getUserList(data: { instance_id: number }) {
    const url: string = `bc/user-list`
    return Axios(url, data, null, 'POST')
  }

  public getDetailList(data: { instance_id: number }) {
    const url: string = `bc/wechat-user-setting`
    return Axios(url, null, data, 'GET')
  }

  public saveDetailList(data: DetailList) {
    const url: string = `bc/wechat-user-setting`
    return Axios(url, data, null, 'POST')
  }
}