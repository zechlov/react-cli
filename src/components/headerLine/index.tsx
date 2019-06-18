import * as React from 'react'
import style from './index.scss'
import { Tabs } from 'antd'

interface HeadProps {
  headTips: string[],
  currentTip: any,
  clickTab: (key: string) => void,
  btns?: boolean
}

class HeaderLine extends React.Component<{ headProp: HeadProps }, {}> {
  constructor(props: { headProp: HeadProps }) {
    super(props)
  }

  public render() {
    const data = this.props.headProp
    let html
    if (data.btns) {
      html = (
        <div className={style["tab-btns"]}>
          <div className={style["tab-btn"]}>刷新</div>
          <div className={style["tab-btn"]}>导出数据</div>
        </div>
      )
    }
    return (
      <div className={style["tab-content"]}>
        <div className={style["tab-box"]}>
          <Tabs defaultActiveKey={data.currentTip} onChange={
            (key: string) => {
              this.props.headProp.clickTab(key)
            }
          }>
            {
              data.headTips.map((item: string, index: any) => {
                return (
                  <Tabs.TabPane tab={item} key={index} />
                )
              })
            }
          </Tabs>
        </div>
        {html}
      </div>
    )
  }
}

export { HeaderLine, HeadProps } 