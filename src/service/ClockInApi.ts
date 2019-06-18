import Axios from './base'

/**
 * @param group_id   分组id
 * @param instance_id  实例id
 */
interface ClockPlan {
  group_id: number
  instance_id: number
}

/**
 * @param id  id 新建不填
 * @param lng 经度
 * @param lat 纬度
 * @param name  名称
 * @param address  地址
 * @param time 打卡时刻
 * @param group_id  销售分组id
 * @param instance_id  实例id
 * @param created_by 创建用户id
 */
interface ClockPlanData {
  id?: number
  lng: string
  lat: string
  name: string
  address: string
  time: string
  group_id: number
  instance_id: number
  created_by: number
}

/**
 * @param date  日期 yyyy-mm-dd
 * @param instance_id 实例id
 */
interface ClockCount {
  date: string
  instance_id: number
}

/**
 * @param date  日期 yyyy-mm-dd
 * @param staff_id 销售id
 * @param instance_id 实例id
 */
interface DailyCount {
  date: string
  staff_id: number
  instance_id: number
}

/**
 * @param rule  打卡规则
 * @param instance_id id
 * @param minute_before  提前时间
 * @param minute_after 延后时间
 */
interface RuleSet {
  rule: string
  instance_id: number
  minute_before: number
  minute_after: number
}



export default class ClockInApi {

  public getPlans(data: ClockPlan) {
    const url: string = `bc/signin-plan-list`
    return Axios(url, null, data, 'GET')
  }

  public savePlan(data: ClockPlanData) {
    const url: string = `bc/signin-plan`
    return Axios(url, data, null, 'POST')
  }

  public getRule(data: { instance_id: number }) {
    const url: string = `bc/signin-rule`
    return Axios(url, null, data, 'GET')
  }

  public saveRule(data: RuleSet) {
    const url: string = `bc/signin-rule`
    return Axios(url, data, null, 'POST')
  }

  public getAllRecord(data: ClockCount) {
    const url: string = `bc/signin-count`
    return Axios(url, null, data, 'GET')
  }
  
  public getDailyRecord(data: DailyCount) {
    const url: string = `bc/signin-detail`
    return Axios(url, data, null, 'POST')
  }
}