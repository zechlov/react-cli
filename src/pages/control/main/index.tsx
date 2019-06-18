import * as React from 'react'
import style from './index.scss'
import Agent from 'src/pages/control/agent/index'
import Private from 'src/pages/control/private/index'

interface MainState {
  item?: any
}

class ControlMainPage extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props)
  }

  public componentWillMount() {
    this.setPage()
  }


  public setPage() {
    const token = localStorage.getItem('token')
    if (token) {
      const item = JSON.parse(window.atob(token.split('.')[1]))
      if (item) {
        this.setState({ item })
      }
    } else {
      location.href = '/signin'
    }
  }


  public render() {
    let html = null
    const { item } = this.state
    if (item.type === 1 && item.role === 1) {
      html = <Agent />
    } else {
      html = <Private />
    }
    return (
      <div className={style["main-page"]}>
        {html}
      </div>
    )
  }

}

export default ControlMainPage