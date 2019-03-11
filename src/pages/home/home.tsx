import { Button } from 'antd'
import * as React from 'react';
import { Link } from "react-router-dom";
import Hello from 'src/components/hello/hello';
import style from './home.scss';

class Home extends React.Component<{}, { value: number }> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: 0
    }
  }

  public render() {
    return (
      <div className={style.home}>
        <div>拍信云首页</div>
        <div>本地的计数{this.state.value}</div>
        <div onClick={() => this.add()}>
          +
        </div>
        <Link to={`/about`}>
          <Button type='primary'>
            点此去about页面
          </Button>
        </Link>
        <Hello />
      </div>
    )
  }
  public componentWillMount() {
    window.console.log(this.props)
  }
  private add() {
    this.setState({value: this.state.value + 1})
  }
}

export default Home;
