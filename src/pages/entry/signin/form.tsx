import { Button, Form, Input, message, } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import style from './index.scss'
import PaiXinYunApi from 'src/service/index'

interface NormalLoginProps {
  recordPass: boolean,
  types: any,
  typeChecked: boolean,
  count: number
  link: boolean
}

class LoginForm extends React.Component<FormComponentProps, NormalLoginProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      recordPass: false,
      typeChecked: true,
      types: ['验证码登录', '密码登录'],
      count: 60,
      link: true
    }
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        if (this.state.typeChecked) {
          const res = await PaiXinYunApi.getUser().loginInCode(values)
          if (res.status === 200 && res.data.token) {
            localStorage.setItem('token', res.data.token)
            const exp = new Date();
            const Days = 30;
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = `token=${res.data.token}; path=/; domain=.paixinyun.com;expires=${exp.toUTCString()}`
            const item = JSON.parse(window.atob(res.data.token.split('.')[1]))
            if (item && item.role === 2) {
              window.open('/control/main', '_self')
            } else {
              window.open('/', '_self')
            }
          } else {
            message.error('验证码错误')
          }
        } else {
          // md5加密
          values.password = (window as any).md5(values.password)
          const res = await PaiXinYunApi.getUser().loginInPass(values)
          if (res.status === 200&& res.data.token) {
            localStorage.setItem('token', res.data.token)
            const exp = new Date();
            const Days = 30;
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = `token=${res.data.token}; path=/; domain=.paixinyun.com;expires=${exp.toUTCString()}`
            const item = JSON.parse(window.atob(res.data.token.split('.')[1]))
            if (item && item.role === 2) {
              window.open('/control/main', '_self')
            } else {
              window.open('/', '_self')
            }
          } else {
            message.error('密码错误')
          }
        }
      }
    });
  }

  public render() {
    const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form
    const open = getFieldError('phone')
    const value = getFieldValue('phone')
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className={style.types}>
          {
            this.state.types.map((item: string, index: number) => {
              return (
                <div key={index} className={style.type}>{item}</div>
              )
            })
          }
          <input type="checkbox" className={`${style.typeCheckbox} ${!this.state.typeChecked ? style.lt0 : style.rt0}`} onChange={this.typeChange} />
          <span className={`${style.type} ${style.typeActive} ${this.state.typeChecked ? style.typeActiveLf : style.typeActiveRf}`} />
        </div>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入电话号码！' },
              // { pattern: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/, message: '号码格式不规范！' }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large' addonAfter={
              this.state.typeChecked ?
                <Button type="default"
                  disabled={
                    value && !open && this.state.link ? false : true
                  }
                  style={{width: '102px', boxSizing: 'border-box', border: 'none', background: 'transparent'}}
                  onClick={() => this.getSmCode(value)}>
                  {this.state.link ? `发送验证码` : `${this.state.count}s`}
                </Button>
                : null
            } placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(this.state.typeChecked ? 'code' : 'password', {
            rules: [
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少6位!' }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large' type={this.state.typeChecked ? 'text' : 'password'} placeholder={`${this.state.typeChecked ? '输入6位短信验证码' : '密码'}`} />
          )}
        </Form.Item>
        {
          this.state.typeChecked ? (
            null
          ) : (
              <div className={style.signSet}>
                {/* <Checkbox checked={this.state.recordPass}
                  onChange={this.Remember}
                  >记住密码</Checkbox> */}
                <div className={style.link} onClick={() => this.forget()}>忘记密码</div>
              </div>
            )
        }
        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.buttonSubmit}>
            登 录
              </Button>
        </Form.Item>
        {/* <div>
              还没有账号？
              <Link to={`/signup`}>立即注册</Link>
            </div> */}
      </Form>
    )
  }
  private typeChange = () => {
    this.setState({
      typeChecked: !this.state.typeChecked
    })
  }
  private forget = () => {
    this.setState({
      typeChecked: true
    })
  }
  private async getSmCode(value: string) {
    const res = await PaiXinYunApi.getUser().getSmCode({ phone: value })
    if (res.status === 200) {
      message.success('发送成功')
      this.countTime()
    }
  }
  private countTime() {
    let { count } = this.state
    const timer = setInterval(
      () => {
        this.setState({
          count: (count--),
          link: false
        }, () => {
          if (count === 0) {
            clearInterval(timer);
            this.setState({ link: true, count: 60 })
          }
        })
      }, 1000)
  }
}
export default Form.create<FormComponentProps>()(LoginForm)