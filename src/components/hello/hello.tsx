
import { inject, observer } from 'mobx-react'
import * as React from 'react';
import PaiXinYunApi from 'src/service/index'
import { HelloStore } from 'src/store/index';
import style from './hello.scss'

interface HelloProps {
  helloStore?: HelloStore
}

@inject('helloStore')
@observer
class Hello extends React.Component<HelloProps, {data: any}> {

  constructor(props: any) {
    super(props)
    this.state = {
      data: []
    }
  }

  public render() {
    return (      
      <div className={style.hello}>
        <div onClick={() => this.props.helloStore!.sayHello()}>+</div>
        <div>store的计数{this.props.helloStore!.hello}</div>
      </div>
    )
  }
  public async componentWillMount() { 
    const res = await PaiXinYunApi.getTest().tip()
    this.setState({ data: res.data })
    window.console.log(this.state.data)
  }
}

export default Hello