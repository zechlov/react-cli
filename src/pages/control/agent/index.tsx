import * as React from 'react'
import style from './index.scss'
import { Button, Input, Icon, Table, Dropdown, Menu, Modal, Spin, Form, message } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { FormComponentProps } from 'antd/lib/form'
import PayForm from 'src/components/payForm/index'
import CreateModal from 'src/components/createProgramm/index'
import QRBox from 'src/components/qrBox/index'
import PaiXinYunApi from 'src/service/index'

interface TableExpandRowProps {
  item: any
  showCreate: () => void
  toPay: (value: string, type: string) => void
}

interface TableExpandRowState {
  info: any
  fetching: boolean,
  qr: boolean
  item?: any
}

class TableExpandRow extends React.Component<TableExpandRowProps, TableExpandRowState> {
  constructor(props: TableExpandRowProps) {
    super(props)
    this.state = {
      info: [],
      fetching: false,
      qr: false
    }
  }

  public async componentWillMount() {
    this.setState({
      fetching: true
    })
    this.getList()
  }

  public componentWillReceiveProps(nextProps: any) {
    this.getList()
  }

  public async getList() {
    const res = await PaiXinYunApi.getAgentApi().getCustomerInstance({ customer_user_id: this.props.item.customer_user_id })
    if (res.status === 200 && res.data) {
      if (res.data.length > 0) {
        res.data.map((value: any) => {
          value = this.setDetails(value)
        })
        this.setState({
          info: res.data
        })
      }
    }
    this.setState({
      fetching: false
    })
  }

  // 发布状态(默认0，未发布
  // 1，上传代码失败
  // 2，提交微信审核成功（等待微信审核）
  // 3，提交微信审核失败
  // 4，微信审核驳回
  // 5，上线成功
  // 6，上线失败)

  public setDetails(value: any) {
    const { status } = value.instance
    let name = ''
    switch (status) {
      case 1:
        name = '上传代码失败'
        break
      case 2:
        name = '等待微信审核'
        break
      case 3:
        name = '提交微信审核失败'
        break
      case 4:
        name = '微信审核驳回'
        break
      case 5:
        name = '上线成功'
        break
      case 6:
        name = '上线失败'
        break
      default:
        name = '未发布'
    }
    value.instance.status_name = name
    const time = new Date(value.instance.ExpiredTime).valueOf() - new Date().valueOf()
    if (time > 0) {
      value.instance.is_expired = true
    } else {
      value.instance.is_expired = false
    }
    return value
  }

  public DropMenu(value: any) {
    return (
      <Menu>
        {/* <Menu.Item>数据</Menu.Item> */}
        <Menu.Item onClick={() => this.delete(value)}>删除</Menu.Item>
      </Menu>
    )
  }

  public render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin={true} />;
    return (
      <div className={style["expands-row"]}>
        {
          this.state.fetching ? <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /></div> : <Button className={style.btn} icon="plus" onClick={() => this.props.showCreate()}>创建小程序</Button>
        }
        {
          this.state.info.length > 0 ? this.state.info.map((value: any) => {
            return (
              <div className={style["programme-line"]} key={value.instance.ID}>
                <div className={style["desc-part"]}>
                  <div className={style["title-line"]}>
                    {value.instance.name}
                    <div className={style["app-type"]}>小程序</div>
                    <div className={style["client-type"]}>{value.instance.app_type === 1 ? '云名片版' : '其他'}</div>
                    {
                      value.instance.is_expired ?
                        <div className={style["status-type"]}>{value.instance.status_name}</div>
                        : <div className={style["expired-type"]}>已过期</div>
                    }
                  </div>
                  <div className={style["status-line"]}>
                    {
                      value.instance.version ?
                        <div className={style["qr-box"]} onClick={() => this.showQR(value.instance)}>小程序二维码</div>
                        : <div className={style["type-box"]}>暂未生成二维码</div>
                    }
                    <div className={style["type-box"]}>·</div>
                    <div className={style["type-box"]}>当前套餐:{`${value.specs.staff_num}人团队/${value.specs.interval}年`}</div>
                    <div className={style["type-box"]}>·</div>
                    <div className={style["time-box"]}>到期时间:{this.toTime(value.instance.ExpiredTime)}</div>
                  </div>
                </div>
                <div className={style["icon-part"]}>
                  <Button type="primary" onClick={() => this.toEdit(value.instance)}>编辑</Button>
                  <Button className={style.btn} onClick={() => this.props.toPay(value, 'pay')}>{value.instance.is_expired ? '续费' : '付费'}</Button>
                  {
                    value.specs.staff_num < 500 ? <Button className={style.btn} onClick={() => this.props.toPay(value, 'up')}>升级</Button> : null
                  }
                  <Dropdown overlay={this.DropMenu(value)}>
                    <Button icon="setting" type="default" />
                  </Dropdown>
                </div>
              </div>
            )
          })
            :
            this.state.fetching ? '' : <div className={style.empty}>暂无数据</div>
        }
        <Modal visible={this.state.qr}
          footer={null}
          destroyOnClose={true}
          onCancel={() => this.cancel()}>
          <QRBox record={this.state.item} />
        </Modal>
      </div>
    )
  }

  private toTime(value: any) {
    const data = new Date(value)
    return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`
  }

  private delete(value: any) {
    Modal.confirm({
      title: '警告！',
      content: '您确定要删除该小程序么？',
      cancelText: '取消',
      okText: '确定',
      onOk: async () => {
        const res = await PaiXinYunApi.getAgentApi().deleteInstance({ instance_id: value.instance.ID })
        if (res.status === 200) {
          message.success('删除成功')
          this.getList()
        }
      }
    })
  }

  private showQR(value: any) {
    this.setState({
      item: value,
      qr: true
    })
  }

  private cancel() {
    this.setState({
      item: null,
      qr: false
    })
  }

  private toEdit(value: any) {
    localStorage.setItem('instanceId', value.ID)
    window.open(`/minprogram/businessCard/${value.ID}/baseinfo`, '_self')
  }
}

interface FormProps extends FormComponentProps {
  submit: (value: any) => void
  cancel: () => void
  editItem: any
}

class ResetForm extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props)
  }

  public handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: AnalyserNode, value: any) => {
      if (!err) {
        value.customer_user_id = this.props.editItem.customer_user_id
        value.password = (window as any).md5(value.password)
        this.props.submit(value)
      }
    })
  }

  public cancel() {
    this.props.cancel()
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={style["add-content"]}>
        <div className={style.title}>修改用户密码</div>
        <Form onSubmit={this.handleSubmit} className={style["add-input"]} >
          <div className={style.label}>用户账号：{this.props.editItem.phone}</div>
          <Form.Item >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入用户密码' }],
              validateTrigger: 'onBlur'
            })(
              <Input type="password" placeholder="用户密码" />
            )}
          </Form.Item>

          <div className={style["form-btns"]}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button type="default" onClick={() => this.cancel()}>取消</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const ResetFormContent = Form.create<FormProps>()(ResetForm)

class AddForm extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props)
  }

  public handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: AnalyserNode, value: any) => {
      if (!err) {
        if (this.props.editItem.customer_user_id) {
          value.customer_user_id = this.props.editItem.customer_user_id
        }
        this.props.submit(value)
      }
    })
  }

  public cancel() {
    this.props.cancel()
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={style["add-content"]}>
        <div className={style.title}>{
          this.props.editItem.customer_user_id ? '更新客户信息' : '新增客户'
        }</div>
        <Form onSubmit={this.handleSubmit} className={style["add-input"]} >
          
          {
            this.props.editItem.customer_user_id ?
              <Form.Item>
                <Input disabled={true} value={this.props.editItem.phone} />
              </Form.Item>
              : <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号' }],
                  validateTrigger: 'onBlur'
                })(
                  <Input placeholder="手机号（登录账户）" />
                )}
              </Form.Item>
          }
          <Form.Item >
            {getFieldDecorator('name', {
              initialValue: this.props.editItem.name!,
              rules: [{ required: true, message: '请输入联系人姓名' }],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="联系人姓名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              initialValue: this.props.editItem.email!,
              rules: [{ type: 'email', required: true, message: '请输入邮箱' }],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="联系人邮箱" />
            )}
          </Form.Item>

          <Form.Item >
            {getFieldDecorator('company_name', {
              initialValue: this.props.editItem.company_name!,
              rules: [{ required: true, message: '请输入公司名称' }],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="公司名称" />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('company_phone', {
              initialValue: this.props.editItem.company_phone!,
              rules: [{ required: true, message: '请输入公司电话' }],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="公司电话" />
            )}
          </Form.Item>
          <div className={style["form-btns"]}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button type="default" onClick={() => this.cancel()}>取消</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const AddFormContent = Form.create<FormProps>()(AddForm)

interface HeadTip {
  key: number,
  name: string
}

interface AgentState {
  dataSource: any[]
  expandedRowKeys: any[]
  add: boolean
  pay: any
  set: boolean
  pass: boolean
  editUser: any
  current: number
}

class AgentTable extends React.Component<{}, AgentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      dataSource: [],
      expandedRowKeys: [],
      add: false,
      pay: {
        show: false,
        type: ''
      },
      set: false,
      pass: false,
      editUser: {},
      current: 1
    }
  }

  public componentWillMount() {
    this.getCustomer(this.state.current)
  }

  public async getCustomer(page: number, customerUserId?: number) {

    const res = await PaiXinYunApi.getAgentApi().getCustomer({ page: page })
    if (res.status === 200) {
      if (customerUserId) {
        this.setState({
          dataSource: res.data,
          expandedRowKeys: [customerUserId]
        })
      } else {
        this.setState({
          dataSource: res.data,
        })
      }
    }
  }

  public async resetPass(value: any) {
    const res = await PaiXinYunApi.getAgentApi().resetCustomerPass(value)
    if (res.status === 200) {
      message.success('修改成功')
      this.handleCancel('pass')
      this.getCustomer(this.state.current)
    } else {
      message.error('提交失败，请稍后再试')
      this.handleCancel('pass')
    }
  }

  public async setUser(value: any) {
    if (!value.customer_user_id) {
      const res = await PaiXinYunApi.getAgentApi().saveCustomer(value)
      if (res.status === 200) {
        message.success('保存成功')
        this.setState({
          add: false
        })
        this.getCustomer(this.state.current)
      }
    } else {
      const res = await PaiXinYunApi.getAgentApi().updateCustomer(value)
      if (res.status === 200) {
        message.success('修改成功')
        this.setState({
          add: false,
          editUser: {}
        })
        this.getCustomer(this.state.current)
      }
    }
  }

  public async pay(value: any) {
    const { type } = this.state.pay
    const data = {
      instance_id: this.state.editUser.instance.ID,
      specs_id: value.leng.ID
    }
    if (type === 'pay') {
      const res = await PaiXinYunApi.getPayApi().createProxyRenew(data)
      if (res.status === 200) {
        message.success('续费成功')
      } else {
        message.error(res.data.msg || '提交失败，请稍后再试')
      }
    } else {
      const res = await PaiXinYunApi.getPayApi().creactProxyPromote(data)
      if (res.status === 200) {
        message.success('升级成功')
      } else {
        message.error(res.data.msg || '提交失败，请稍后再试')
      }
    }
    this.handleCancel('pay')
  }

  public deleteUser(record: any) {
    Modal.confirm({
      title: '警告！',
      content: '您确定要删除下属用户吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => null,
      onOk: async () => {
        const res = await PaiXinYunApi.getAgentApi().deleteCustomer({ customer_user_id: record.customer_user_id })
        if (res.status === 200) {
          message.success('删除成功')
          const dataSource = this.state.dataSource
          this.setState({
            dataSource: dataSource.filter((value: any) => value.customer_user_id !== record.customer_user_id)
          })
        }
      }
    })
  }

  public async setInstance(value: any) {
    const data = {
      customer_user_id: this.state.editUser.customer_user_id,
      app_type: value.app_type,
      specs_id: value.specs.ID
    }
    const res = await PaiXinYunApi.getPayApi().createProxyOrder(data)
    if (res.status === 200) {
      this.setState({
        editUser: {},
        set: false,
        expandedRowKeys: []
      })
      message.success('添加成功')
    } else {
      message.error('添加失败，请稍后再试')
    }
  }

  public render() {
    const colunms: Array<ColumnProps<HeadTip>> = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '账户名',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '公司名称',
        dataIndex: 'company_name',
        key: 'company_name'
      },
      {
        title: '网站数量',
        dataIndex: 'count',
        key: 'count'
      },
      {
        title: '创建时间',
        render: (record: any) => {
          const data = new Date(record.created_at)
          return (
            <div>{
              `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`
            }</div>
          )
        }
      },
      {
        render: (record: any) => {
          const { expandedRowKeys } = this.state
          const item = expandedRowKeys.find((value: any) => value === record.customer_user_id)
          return (
            <div className={style["icon-box"]}>
              <Button onClick={() => this.open(record)}>
                网站管理
                <Icon style={{ fontSize: '10px', transform: `rotate(${item ? '0deg' : '180deg'})`, transition: 'all .3s ease' }} type={'up'} />
              </Button>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item onClick={() => this.editPass(record)}>
                    <div>重置用户密码</div>
                  </Menu.Item>
                  <Menu.Item onClick={() => this.editUser(record)}>
                    <div>更新用户信息</div>
                  </Menu.Item>
                  <Menu.Item onClick={() => this.deleteUser(record)}>
                    <div>删除用户</div>
                  </Menu.Item>
                </Menu>
              }>
                <Button icon="setting" />
              </Dropdown>
            </div>
          )
        }
      }
    ]
    return (
      <div className={style["agent-page"]}>
        <div className={style["input-line"]}>
          <Button type="primary" icon="plus" onClick={() => this.addMenber()}>
            新增客户
          </Button>
          {/* <Input className={style.input}
            placeholder="输入姓名/邮箱/公司名称/联系电话/网站名字/域名"
            prefix={<Icon type="search" />} /> */}
        </div>
        <div className={style["head-line"]}>
          客户登录链接：
        <a href={`https://console.paixinyun.com/agentsign/${this.agentId()}`}>https://console.paixinyun.com/agentsign/{this.agentId()}</a>
        </div>
        <Table columns={colunms}
          className={style.table}
          dataSource={this.state.dataSource}
          rowKey="customer_user_id"
          rowClassName={style.row}
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          expandedRowKeys={this.state.expandedRowKeys}
          expandedRowRender={(record: any) =>
            <TableExpandRow showCreate={() =>
              this.addInstance(record)}
              item={record}
              toPay={(value, type) => this.showPay(value, type)} />}
          pagination={{
            current: this.state.current,
            onChange: (page: number, pageSize: number) => this.changePage(page)
          }}
        />

        {/* 重置用户信息 */}
        <Modal visible={this.state.pass}
          footer={null}
          closable={false}
          onCancel={() => this.handleCancel('pass')}
          destroyOnClose={true}
        >
          <ResetFormContent submit={(value) => this.resetPass(value)}
            cancel={() => this.handleCancel('pass')}
            editItem={this.state.editUser} />
        </Modal>

        {/* 新增用户 */}
        <Modal visible={this.state.add}
          footer={null}
          closable={false}
          onCancel={() => this.handleCancel('add')}
          destroyOnClose={true}
        >
          <AddFormContent submit={(value) => this.setUser(value)}
            cancel={() => this.handleCancel('add')}
            editItem={this.state.editUser} />
        </Modal>

        {/* 支付升级 */}
        <Modal visible={this.state.pay.show}
          footer={null}
          width="760px"
          closable={false}
          bodyStyle={{ padding: 0 }}
          destroyOnClose={true}
          onCancel={() => this.handleCancel('pay')}>
          <PayForm
            type={this.state.pay.type}
            submit={(value) => this.pay(value)}
            cancel={() => this.handleCancel('pay')}
            editer={this.state.editUser.specs} />
        </Modal>

        {/* 新建小程序 */}
        <Modal visible={this.state.set}
          footer={null}
          style={{ top: '20%' }}
          width="936px"
          closable={false}
          bodyStyle={{ padding: 0 }}
          maskClosable={true}>
          <CreateModal cancel={() => this.handleCancel('set')}
            submit={(value) => this.setInstance(value)} />
        </Modal>
      </div>
    )
  }

  private agentId() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      return item.client_id
    }
  }

  private editPass(record: any) {
    this.setState({
      editUser: record,
      pass: true
    })
  }

  private changePage(page: number) {
    this.setState({
      current: page
    })
    this.getCustomer(page)
  }

  private showPay(record: any, type: string) {
    this.setState({
      pay: {
        show: true,
        type: type
      },
      editUser: record
    })
  }

  private addMenber() {
    this.setState({
      add: true
    })
  }

  private addInstance(record: any) {
    this.setState({
      set: true,
      editUser: record
    })
  }

  private editUser(record: any) {
    this.setState({
      add: true,
      editUser: record
    })
  }

  private handleCancel(key: string) {
    switch (key) {
      case 'add':
        this.setState({
          add: false,
          editUser: {}
        })
        break
      case 'pay':
        this.setState({
          pay: {
            show: false,
            type: ''
          },
          editUser: {}
        })
        break
      case 'set':
        this.setState({
          set: false,
          editUser: {}
        })
        break
      case 'pass':
        this.setState({
          pass: false,
          editUser: {}
        })
    }
  }

  private open(record: any) {
    const { customer_user_id: key } = record
    const filtered = this.state.expandedRowKeys
    if (this.state.expandedRowKeys.includes(key)) {
      filtered.splice(filtered.findIndex(element => element === key), 1)
    } else {
      filtered.push(key)
    }
    this.setState({
      expandedRowKeys: filtered,
    })
  }
}

export default AgentTable