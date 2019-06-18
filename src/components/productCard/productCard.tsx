import * as React from 'react'
import style from './productCard.scss'
import { message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router'

interface ProductCardProp {
  image: string;
  name: string;
  jump: string;
}

interface ProductProp extends RouteComponentProps {
  productCardProp: ProductCardProp
}

class Product extends React.Component<ProductProp, {}> {
  constructor(props: ProductProp) {
    super(props)
  }

  public render() {
    const data = this.props.productCardProp

    return (
      <div onClick={() => this.to(data.jump)} className={style['product-card']}
        style={{ background: `url(${data.image})` }}>
        <div>{data.name}</div>
        <div className={style.link}>前往管理</div>
      </div>
    )
  }

  private to(url: string) {
    if(url) {
      this.props.history.push(url)
    } else {
      message.warning('尚在开发中，敬请期待！')
    }
  }

}

const ProductCard = withRouter(Product)

export { ProductCard, ProductCardProp }