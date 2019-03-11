import { Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import style from './index.scss'

interface NormalLoginProps{
    types: any,
    typeChecked: boolean
}

class LoginForm extends React.Component<FormComponentProps, NormalLoginProps> {
    constructor(props:any){
        super(props)
        this.state = {
          typeChecked: true,
          types: ['验证码登录', '密码登录']
        }
    }
    
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err:any, values:any) => {
          if (!err) { 
            console.log('Received values of form: ', values)
          }
        });
      }
    public render() {
        const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form
        const open = getFieldError('username')
        const value = getFieldValue('username')
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className={`${style.types}`}>
              {
                this.state.types.map((item:string, index:number) => {
                  return (
                    <div key={index} className={`${style.type}`}>{item}</div>
                  )
                })
              }
              <input type="checkbox" className={ `${style.typeCheckbox} ${!this.state.typeChecked? style.lt0 : style.rt0}`} onChange={this.typeChange}/>
              <span className={`${style.type} ${style.typeActive} ${this.state.typeChecked?  style.typeActiveLf : style.typeActiveRf}` } />
            </div>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                    { required: true, message: '请输入电话号码！' },
                    { pattern: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/, message: '号码格式不规范！' }
                ],
                validateTrigger: 'onBlur'
              })(
                <Input size='large' addonAfter={
                this.state.typeChecked? <Button type="default" disabled={
                  value && !open ? false : true
                }>获取验证码</Button> : null
              } placeholder="手机号"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码!' },
                  { min: this.state.typeChecked ? 4 : 6, message: '密码至少6位!'}
                ],
                validateTrigger: 'onBlur'
              })(
                <Input size='large' type="password" placeholder={`${this.state.typeChecked? '输入4位短信验证码' : '密码'}`}/>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={`${style.buttonSubmit}`}>
                登 录
              </Button>
            </Form.Item>
          </Form>
        )
    }
    private typeChange = () => {
      this.setState({
        typeChecked: !this.state.typeChecked
      })
    }
}
export default  Form.create<NormalLoginProps>()(LoginForm)