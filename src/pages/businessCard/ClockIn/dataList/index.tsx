import * as React from 'react'
import style from './index.scss'
import { Table, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import PaiXinYunApi from 'src/service/index'

interface TableExpandRowProps {
  date: string
  item: any
  instance: number
}

interface TableExpandRowState {
  info: any
}

class TableExpandRow extends React.Component<TableExpandRowProps, TableExpandRowState> {
  constructor(props: TableExpandRowProps) {
    super(props)
    this.state = {
      info: [],
    }
  }

  public componentWillMount() {
    this.getInfo()
  }

  public async getInfo() {
    const res = await PaiXinYunApi.getClockInApi().getDailyRecord({
      staff_id: this.props.item.staff_id,
      date: this.props.date,
      instance_id: this.props.instance
    })
    if (res.status === 200) {
      this.setState({
        info: res.data
      })
    }
  }

  public render() {
    const colunms: Array<ColumnProps<HeadTip>> = [
      {
        title: '打卡地点',
        dataIndex: 'address',
        key: 'address',
        width: '150px'
      },
      {
        title: '打卡时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
        width: '150px'
      },
      {
        title: '真实打卡时间',
        dataIndex: 'time',
        key: 'time',
        width: '150px'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '40%'
      },
    ]
    return (
      <div className={style["expands-row"]}>
        <Table
          bodyStyle={{ border: 'none' }}
          columns={colunms}
          dataSource={this.state.info}
          pagination={false}
          locale={
            { emptyText: <div className={style.empty}>暂无数据</div> }
          }
        />
      </div>
    )
  }
}

interface DataProps {
  instance: number
}

interface DataState {
  dataSource: any[]
  expandedRowKeys: any[]
  current: any
}

interface HeadTip {
  key: number,
  name: string
}


class ClockInDataList extends React.Component<DataProps, DataState> {
  constructor(props: DataProps) {
    super(props)
    this.state = {
      dataSource: [],
      expandedRowKeys: [],
      current: ''
    }
  }

  public async componentWillMount() {
    const date = new Date()
    const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`
    this.setState({ current })
    const res = await PaiXinYunApi.getClockInApi().getAllRecord({
      date: current,
      instance_id: this.props.instance
    })
    if (res.status === 200) {
      this.setState({
        dataSource: res.data
      })
    }
  }

  public render() {
    const colunms: Array<ColumnProps<HeadTip>> = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        width: '50px',
        render: avatar => <div className={style.avatar}><img src={avatar} alt=""/></div>
      },
      {
        title: '员工姓名',
        dataIndex: 'user_name',
        key: 'user_mane'
      },
      {
        title: '所属小组',
        dataIndex: 'group_name',
        key: 'group_name'
      },
      {
        title: '打卡次数',
        dataIndex: 'signin_count',
        key: 'signin_count'
      },
      {
        title: '缺卡次数',
        dataIndex: 'absent_count',
        key: 'absent_count'
      },
      {
        render: (record: any) => {
          const { expandedRowKeys } = this.state
          const item = expandedRowKeys.find((value: any) => value === record.staff_id)
          return (
            <div onClick={() => this.open(record)}>
              <Icon type={item ? 'up' : 'down'} />
            </div>
          )
        }
      }
    ]
    return (
      <div className={style["setting-wrapper"]}>
        <div className={style["head-line"]}>
          <div>{this.state.current}<Icon type="down" /></div>
        </div>
        <Table
          columns={colunms}
          rowKey="staff_id"
          dataSource={this.state.dataSource}
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          expandedRowKeys={this.state.expandedRowKeys}
          expandedRowRender={(record: any) =>
            <TableExpandRow
              instance={this.props.instance}
              date={this.state.current}
              item={record} />}
          locale={
            { emptyText: <div className={style.empty}>暂无数据</div> }
          }
        />
      </div>
    )
  }

  private open(record: any) {
    const { staff_id : key } = record
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

export default ClockInDataList