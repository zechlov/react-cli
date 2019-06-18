import { Button, Form, Input, message, } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import style from './index.scss'
import PaiXinYunApi from 'src/service/index'

interface NormalLoginProps {
  recordPass: boolean
  count: number
  link: boolean
}

class LoginForm extends React.Component<FormComponentProps, NormalLoginProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      recordPass: false,
      count: 60,
      link: true
    }
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        values.password = (window as any).md5(values.password)
        values.type = 2
        const res = await PaiXinYunApi.getUser().SignUpUser(values)
        if (res.status === 200) {
          message.success('注册成功！')
          setTimeout(() => {
            location.href = '/signin'
          }, 2500)
        } else {
          message.error('提交失败，请稍后再试')
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
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入电话号码！' },
              // { pattern: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/, message: '号码格式不规范！' }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large' placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('code', {
            rules: [
              { required: true, message: '请输入验证码!' },
              { min: 6, message: '验证码为6位!' }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large'
              addonAfter={
                <Button type="default"
                  disabled={
                    value && !open && this.state.link ? false : true
                  }
                  style={{ width: '102px', boxSizing: 'border-box', border: 'none', background: 'transparent' }}
                  onClick={() => this.getSmCode(value)}>
                  {this.state.link ? `发送验证码` : `${this.state.count}s`}
                </Button>
              }
              type='text' placeholder='输入6位短信验证码' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码长度至少6位!' }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large' type='password' placeholder='输入密码' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('client_name', {
            rules: [
              { required: true, message: '请输入公司名!' },
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size='large' type='text' placeholder='输入公司名' />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.buttonSubmit}>
            立 即 注 册
              </Button>
        </Form.Item>
      </Form>
    )
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