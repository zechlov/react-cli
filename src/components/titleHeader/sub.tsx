import * as React from 'react'
import style from './index.scss'

interface TitleHeaderProps {
  title: string;
  subtitle: string
}

class SubtitleHeader extends React.Component<TitleHeaderProps, {}> {
  public render() {
    return (
      <div className={style['subtitle-header-wrapper']}>
        <div className={style.content}>
          <h2>{this.props.title}</h2>
          <p>{this.props.subtitle}</p>
        </div>
      </div>
    )
  }
}
export default SubtitleHeader