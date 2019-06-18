import * as React from 'react'
import style from './index.scss'

export interface TitleHeaderProps {
  title: string;
  subtitle: string
}

export class TitleHeader extends React.Component<TitleHeaderProps, {}> {
  public render() {
    return (
      <div className={style['title-header-wrapper']}>
        <div className={style.content}
          style={{ background: `url(${require('./img/bg.png')})` }}>
          <h2>{this.props.title}</h2>
          <p>{this.props.subtitle}</p>
        </div>
      </div>
    )
  }
}