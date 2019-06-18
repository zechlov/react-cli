import * as React from 'react';
import Sider from './sider'
import Main from './main'
import style from './home.scss'
import { RouteComponentProps, withRouter } from 'react-router'

class Home extends React.Component<RouteComponentProps, { value: number }> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      value: 0
    }
  }

  public render() {
    return (
      <div className={style.home}>
        <Sider />
        <Main/>
      </div>
    )
  }
}

export default withRouter(Home);
