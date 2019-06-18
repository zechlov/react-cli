import * as React from 'react'
import style from './css/tabThree.scss'
import { inject, observer } from 'mobx-react'
import { BusinessCardStore } from 'src/store/index'
import PaiXinYunApi from 'src/service/index'

interface BusinessCardProps {
  businessCardStore?: BusinessCardStore
}

@inject('businessCardStore')
@observer
class Article extends React.Component<BusinessCardProps, {}> {
  public async componentWillMount() {
    const { logs, articles } = this.props.businessCardStore!.TabThreeData
    if (logs.length < 2) {
      const res = await PaiXinYunApi.getArticle().getArticleType({ instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        const typeList = [
          {
            name: '全部',
            ID: 0
          }
        ].concat(res.data)
        this.props.businessCardStore!.setTabThree('logs', typeList)
      }
    }
    if (articles.length < 1) {
      const res = await PaiXinYunApi.getArticle().getArticleList({ type_id: 0, instance_id: this.props.businessCardStore!.instanceId() })
      if (res.status === 200) {
        this.props.businessCardStore!.setTabThree('articles', res.data)
      }
    }
  }

  public render() {
    const data = this.props.businessCardStore!.TabThreeData
    const BaseColor = this.props.businessCardStore!.globalColor.base
    return (
      <>
        <div className={style["tab-line"]}>
        {
          data.logs.map((item:any, index:number) => {
            return (
              <div className={style["tab-box"]} key={index}>
                <div className={`${style["tab-item"]} ${data.current === index ? style.active : ''}`}
                  style={{color:index === data.current ? BaseColor : '', borderColor: index === data.current ? BaseColor : ''}}
                >{item.name}</div>
              </div>
            )
          })
        }
        </div>
        <div className={style["article-content"]}>
          {
            data.articles.length > 0 ?
            data.articles.map((item: any, index: number) => {
              return (
                <div className={style["article-box"]} key={index}>
                  <div className={style["article-img"]}>
                    <img  src={`${item.cover}?imageView2/2/w/300/h/300`}/>
                  </div>
                  <div className={style["article-title"]}>{item.name}</div>
                </div>
              )
            })
            : null
          }
          <div className={style.bottom}>- 无更多文章 -</div>
      </div>
      </>
    )
  }
}

class TabViewThree extends React.Component {
  public render() {
    return (
      <Article/>
    )
  }
}

export default TabViewThree