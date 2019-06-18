import * as React from 'react'
import { Suspense } from 'react'
import { Switch } from "react-router-dom"
import style from './control.scss'
// import Topbar from 'src/components/topbar/controlTop'
import Topbar from 'src/components/topbar/topbar'
import Footer from 'src/components/footer/index'
import ControlSider from 'src/components/controlSider/index'
import { History } from 'history'

class Control extends React.Component<{ history: History }, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      show: true
    }
  }

  public componentWillMount() {
    if (this.props.history.location.pathname.indexOf('sign') !== -1 || this.props.history.location.pathname === '/') {
      this.setState({
        show: false
      })
    }
  }

  public componentDidMount() {
    this.props.history.listen(route => {
      if (this.props.history.location.pathname.indexOf('sign') !== -1 || this.props.history.location.pathname === '/') {
        this.setState({
          show: false
        })
      } else {
        this.setState({
          show: true
        })
      }
    })
  }

  public render() {
    return (
      <div className={style.App}>
        <Topbar />
        <div className={
          this.state.show ? style["main-wrapper"] : null
        }>
          <ControlSider />
          <Suspense fallback={<div />}>
            <Switch>
              {this.props.children}
            </Switch>
          </Suspense>
        </div>

        <Footer />
      </div>
    )
  }

}

export default Control