import * as React from 'react'
import style from './index.scss'

export interface SubTitleProps {
  text: string,
  color?: string
}

export class SubTitle extends React.Component<SubTitleProps> {
  constructor(props: SubTitleProps) {
    super(props)
  }

  public static defaultProps = {
    color: 'rgba(110, 104, 252, 1)'
  }

  public render() {
    return (
      <div className={style['subtitle-component']}>
        <span className={style.icon} style={{ background: this.props.color }} />
        <span className={style.text}>{this.props.text}</span>
      </div>
    )
  }
}
