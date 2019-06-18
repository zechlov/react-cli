import * as React from 'react'
import { Suspense } from 'react'
import { Switch } from "react-router-dom"
import style from './default.scss'
import Topbar from 'src/components/topbar/topbar'
// import Topbar from 'src/components/topbar/controlTop'


const Default = (props: any) => {
  return (
    <div className={style.App}>
      <Topbar />
      <Suspense fallback={<div />}>
        <Switch>
          {props.children}
        </Switch>
      </Suspense>
    </div>
  )
}

export default Default