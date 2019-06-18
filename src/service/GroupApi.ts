import Axios from './base'

interface SaveGroupData {
  instance_id: number
  name: string
  leader_id: number
  leader_name: string
  group_id?: number
}

interface DeleteGroupData {
  instance_id: number
  group_id: number
}

interface SetStaffMenber {
  ID?: number
  instance_id: number
  name: string
  phone: string
  avatar: string
  gender: number
  title: string
  role: number
  group_id: number
  main_staff_id?: number
}

export default class GroupManageApi {

  public getStaff(param: { staff_id: number }) {
    const url: string = `bc/staff`
    return Axios(url, null, param, 'GET')
  }

  public getStaffGroup(param: { group_id: number }) {
    const url: string = `bc/staff-group`
    return Axios(url, null, param, 'GET')
  }

  public getGroupList(param: { instance_id: number }) {
    const url: string = `bc/staff-groups`
    return Axios(url, null, param, 'GET')
  }

  public getStaffWechatId(param: { staff_id: number }) {
    const url: string = `bc/staff-id-to-wechat-user-id`
    return Axios(url, null, param, 'GET')
  }

  public getStaffs(param: { instance_id: number, all: boolean }) {
    const url: string = `bc/staffs`
    return Axios(url, null, param, 'GET')
  }

  public saveGroup(data: SaveGroupData) {
    const url: string = `bc/staff-group`
    return Axios(url, data, null, 'POST')
  }

  public deleteGroup(data: DeleteGroupData) {
    const url: string = `bc/staff-group-delete`
    return Axios(url, data, null, 'POST')
  }

  public setStaffMenber(data: SetStaffMenber) {
    const url: string = `bc/staff`
    return Axios(url, data, null, 'POST')
  }

  public getStaffId(data: {
    name: string
    phone: number
  }) {
    const url: string = `staff`
    return Axios(url, data, null, 'POST')
  }

  public getVerifyCode(param: { instance_id: number }) {
    const url: string = `bc/staff-verify-code/${param.instance_id}`
    return Axios(url, null, null, 'GET')
  }
}