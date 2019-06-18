import Axios from './base'

interface LoginProps {
  phone: string,
  code?: string,
  password?: string
}

interface UpdateUser {
  user_id: number
  avatar: string
  name: string
  email: string
}

interface SignUpUser {
  phone: number
  code: any
  password: any
  client_name: string
  type: number
}

interface NewPass {
  phone: string
  validate_code: string
  password_new: string
}

export default class UserApi {

  public getSmCode(data: any) {
    const url: string = '/security/send-sms'
    return Axios(url, data, null, 'POST')
  }

  public loginInCode(data: LoginProps) {
    const url: string = `/token-check-validate`
    return Axios(url, data, null, 'POST')
  }

  public loginInPass(data: LoginProps) {
    const url: string = `/token`
    return Axios(url, data, null, 'POST')
  }

  public resetPass(data: NewPass) {
    const url: string = `/modify-password`
    return Axios(url, data, null, 'POST')
  }

  public userInfo(data: any) {
    const url: string = `/token`
    return Axios(url, data, null, 'POST')
  }

  public getUserInfo() {
    const url: string = `/user-info`
    return Axios(url, null, null, 'POST')
  }

  public setUserInfo(data: UpdateUser) {
    const url: string = `/update-user-info`
    return Axios(url, data, null, 'POST')
  }

  public SignUpUser(data: SignUpUser) {
    const url: string = '/sign-up'
    return Axios(url, data, null, 'POST')
  }
}