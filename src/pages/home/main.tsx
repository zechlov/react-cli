import * as React from 'react'
import style from './main.scss'
import { ProductCard, ProductCardProp } from 'src/components/productCard/productCard'

interface CategoryProp {
  icon: string;
  name: string;
  productCardList: ProductCardProp[];
}

class Category extends React.Component<{ categoryProp: CategoryProp }, {}> {
  public render() {
    const data = this.props.categoryProp

    return (
      <div className={style.category}>
        <div className={style['category-name']}>
          <img src={data.icon} />
          <span>{data.name}</span>
        </div>
        <div className={style['product-card-list']}>
          {
            data.productCardList.map((item, index) =>
              <ProductCard productCardProp={item} key={index} />
            )
          }
        </div>
      </div>
    )
  }
}

class Main extends React.Component<{}, { categoryPropList: CategoryProp[] }> {
  constructor(props: any) {
    super(props)

    this.state = {
      categoryPropList: []
    }
  }

  public componentDidMount():void {
    this.getData()
  }

  private getData(): void {
    const list: CategoryProp[] = []

    const miniprogramData = {
      icon: require('./img/icon_miniprogram.svg'),
      name: '小程序',
      productCardList: [{
        image: require('./img/card_1_1.svg'),
        name: '名片小程序',
        jump: '/control/main'
      }, {
        image: require('./img/card_1_2.svg'),
        name: '预约小程序',
        jump: ''
      }, {
        image: require('./img/card_1_3.svg'),
        name: '电商小程序',
        jump: ''
      }, {
        image: require('./img/card_1_4.svg'),
        name: '点餐小程序',
        jump: ''
      }, {
        image: require('./img/card_1_5.svg'),
        name: '酒店小程序',
        jump: ''
      }, {
        image: require('./img/card_1_6.svg'),
        name: '响应式网站',
        jump: ''
      }]
    }

    const marketingData = {
      icon: require('./img/icon_marketing.svg'),
      name: '云营销',
      productCardList: [{
        image: require('./img/card_2_1.svg'),
        name: '商标注册',
        jump: ''
      }, {
        image: require('./img/card_2_2.svg'),
        name: '微活动',
        jump: ''
      }]
    }

    const intellectualData = {
      icon: require('./img/icon_intellectual.svg'),
      name: '云知产',
      productCardList: [{
        image: require('./img/card_3_1.svg'),
        name: '微传单',
        jump: ''
      }, {
        image: require('./img/card_3_2.svg'),
        name: '专利申请',
        jump: ''
      }, {
        image: require('./img/card_3_3.svg'),
        name: '版权登记',
        jump: ''
      }, {
        image: require('./img/card_3_4.svg'),
        name: '高新认证',
        jump: ''
      }]
    }

    list.push(miniprogramData)

    list.push(marketingData)

    list.push(intellectualData)

    this.setState({categoryPropList: list})
  }

  public render() {
    return (
      <div className={style.main}>
        {
          this.state.categoryPropList.map((data, index) =>
            <Category categoryProp={data} key={index} />
          )
        }
      </div>
    )
  }
}

export default Main