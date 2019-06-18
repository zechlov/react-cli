import Axios from './base'

export default class DataApi {
  public getTotalStatistic(data: {
    instance_id: number
    days: number
  }) {
    const url: string = `bc/visit-statistics`
    return Axios(url, data, null, 'POST')
  }

  public getVisitStatistic(data: {
    instance_id: number
    page: number
  }) {
    const url: string = `bc/staffs-statistics`
    return Axios(url, data, null, 'POST')
  }

  public getGroupStatistic(data: {
    instance_id: number
    group_id: number
  }) {
    const url: string = `bc/instance-team-statistics`
    return Axios(url, data, null, 'POST')
  }

  public getStaffStatistic(data: {
    instance_id: number
    page: number
  }) {
    const url: string = `bc/staff-users-statistics`
    return Axios(url, data, null, 'POST')
  }
}