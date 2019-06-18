import * as React from 'react'
import { Suspense } from 'react'
import { Switch } from "react-router-dom"
import style from './businessCard.scss'
import BusinessCardSider from 'src/components/businessCardSider/index'
import MiniprogramPreview from 'src/components/businessCardPreview/index'
import { History } from 'history'

class Miniprogram extends React.Component<{ history: History }, {}> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className={style.App}>
        <div className={style["left-box"]}>
          <BusinessCardSider />
          <Suspense fallback={<div />}>
            <Switch>
              {this.props.children}
            </Switch>
          </Suspense>
        </div>
        <MiniprogramPreview />
      </div>
    )
  }
}

export default Miniprogram