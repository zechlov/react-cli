import Axios from './base'

interface CreateCustomer {
  phone: string
  name: string
  email: string
  company_name: string
  company_phone: string
}

interface ChangeCustomer {
  customer_user_id: number
  name: string
  email: string
  company_name: string
  company_phone: string
}

interface CreateInstance {
  client_id: number
  app_type: number
  name: string
  year: number
  month: number
}

interface NewPass {
  customer_user_id: number
  password: string
}

export default class AgentApi {

  public deleteCustomer(data: { customer_user_id: number }) {
    const url: string = `/customer/delete`
    return Axios(url, data, null, 'POST')
  }

  public getCustomerInstance(data: { customer_user_id: number }) {
    const url: string = `/customer/instance-list`
    return Axios(url, data, null, 'POST')
  }

  public getCustomer(data: { page: number }) {
    const url: string = `/customer/list`
    return Axios(url, data, null, 'POST')
  }

  public saveCustomer(data: CreateCustomer) {
    const url: string = `/customer/save`
    return Axios(url, data, null, 'POST')
  }

  public updateCustomer(data: ChangeCustomer) {
    const url: string = `/customer/update`
    return Axios(url, data, null, 'POST')
  }

  public resetCustomerPass(data: NewPass) {
    const url: string = `/customer/reset-password`
    return Axios(url, data, null, 'POST')
  }

  public setInstance(data: CreateInstance) {
    const url: string = `/instance`
    return Axios(url, data, null, 'POST')
  }

  public deleteInstance(data: {instance_id: number}) {
    const url: string = `/instance/delete/${data.instance_id}`
    return Axios(url, null, null, 'POST')
  }

  public getInstanceList(param: { customer_user_id: number }) {
    const url: string = `/instance/list`
    return Axios(url, null, param, 'GET')
  }

  public getAgentInfo(param: { client_id: number }){
    const url: string = `/client-info/`+ param.client_id
    return Axios(url, null, null, 'GET')
  }

  public getClientInfo() {
    const url: string = `/client-info`
    return Axios(url, null, null, 'GET')
  }

  public checkExpired(data: { instance_id: number }) {
    const url: string = `/instance-is-expired/${data.instance_id}`
    return Axios(url, null, null, 'POST')
  }
}