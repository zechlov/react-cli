import * as React from 'react'
import style from './index.scss'
import { SubTitle } from 'src/components/subtitle';
import { Button, Input, Form, message, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import PaiXinYunApi from 'src/service/index'

interface RulesState {
  info: any
}

interface RulesProps extends FormComponentProps {
  instance: number
}

class ClockInForm extends React.Component<RulesProps, RulesState> {
  constructor(props: RulesProps) {
    super(props)
    this.state = {
      info: {
        rule: '',
        minute_before: 0,
        minute_after: 0
      }
    }
  }

  public componentWillMount() {
    this.getRules()
  }

  public async getRules() {
    const res = await PaiXinYunApi.getClockInApi().getRule({
      instance_id: this.props.instance
    })
    if (res.status === 200) {
      this.setState({
        info: res.data
      })
    }
  }

  public submit = () => {
    this.props.form.validateFields(async (err: AnalyserNode, value: any) => {
      const data = {
        rule: value.rule,
        instance_id: this.props.instance,
        minute_before: Number.parseInt(value.minute_before, 0) || 0,
        minute_after: Number.parseInt(value.minute_after, 0) || 0
      }
      const res = await PaiXinYunApi.getClockInApi().saveRule(data)
      if (res.status === 200) {
        message.success('修改成功！')
      } else {
        message.error(res.data.msg)
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    const { rule, minute_before, minute_after } = this.state.info
    return (
      <div className={style["main-content"]}>
        <Form>
          <SubTitle text="可打卡时间（默认打卡点前后10分钟）" />
          <div className={style["btn-content"]}>
            <div className={style["btn-line"]}>
              <Form.Item label="提前时间">
                {getFieldDecorator('minute_before', {
                  initialValue: minute_before === 0 ? null : minute_before
                })(
                  <Input className={style.select} type="number" addonAfter={<div>分钟</div>}/>
                )}
              </Form.Item>
              <Form.Item label="延后时间">
                {getFieldDecorator('minute_after', {
                  initialValue: minute_after === 0 ? null : minute_after
                })(
                  <Input className={style.select} type="number" addonAfter={<div>分钟</div>}/>
                )}
              </Form.Item>
            </div>
          </div>
          <Divider />
          <SubTitle text="打卡规则" />
          <div className={style["detail-content"]}>
            <Form.Item>
              {getFieldDecorator('rule', {
                initialValue: rule,
                rules: [
                  { required: true, message: '请设定打卡规则' }
                ]
              })(
                <Input.TextArea placeholder={
                  `相关工作人员需在指定时间点，到达指定地点进行打卡，允许在时间点前后十分钟内打卡。
例如：指定地点A地的打卡时间为10:00，9:50-10:10之间都可以打卡。`
                } />
              )}
            </Form.Item>

          </div>
        </Form>
        <Button type="primary" onClick={this.submit}>保存</Button>
      </div>
    )
  }
}

const ClockInRules = Form.create<RulesProps>()(ClockInForm)

export default ClockInRules