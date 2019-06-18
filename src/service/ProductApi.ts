import Axios from './base'

interface ProductUpdateData {
  id: number
  name: string
  desc: string
  price?: number
  has_price: boolean
  has_detail: boolean
  detail?: string
  banner_list: any[]
  cover: string
  type_list: any
  instance_id: number
}

interface ProductSaveData {
  name: string
  desc: string
  price?: number
  has_price: boolean
  has_detail: boolean
  detail?: string
  banner_list: any[]
  cover: string
  type_list: any
  instance_id: number
}

export default class ProductApi {
  public deleteProduct(data: { id: number }) {
    const url: string = `bc/product/delete`
    return Axios(url, data, null, 'POST')
  }

  public getProductDetail(data: { id: number }) {
    const url: string = `bc/product/detail`
    return Axios(url, data, null, 'POST')
  }

  public getProductList(data: { type_id: number, instance_id: number }) {
    const url: string = `bc/product/list`
    return Axios(url, data, null, 'POST')
  }

  public saveProduct(data: ProductSaveData) {
    const url: string = `bc/product/save`
    return Axios(url, data, null, 'POST')
  }

  public updateProduct(data: ProductUpdateData) {
    const url: string = `bc/product/update`
    return Axios(url, data, null, 'POST')
  }

  public deleteProductType(data: { id: number }) {
    const url: string = `bc/product/type/delete`
    return Axios(url, data, null, 'POST')
  }

  public getProductType(data: { instance_id: number }) {
    const url: string = `bc/product/type/list`
    return Axios(url, data, null, 'POST')
  }

  public getProductTypeList(data: {instance_id: number}) {
    const url: string = `bc/product/type/level-list`
    return Axios(url, data, null, 'POST')
  }

  public saveProductType(data: {
    name: string
    parent_id: number
    instance_id: number
  }) {
    const url: string = `bc/product/type/save`
    return Axios(url, data, null, 'POST')
  }

  public updateProductType(data: {
    id: number
    name: string
  }) {
    const url: string = `bc/product/type/update`
    return Axios(url, data, null, 'POST')
  }

  public getButtonDetail(data: { instance_id: number }) {
    const url: string = `bc/product/button/detail`
    return Axios(url, data, null, 'POST')
  }

  public saveButtonDetail(data: {
    name: string,
    has_button: boolean,
    product_button_type_id?: number,
    instance_id: number
  }) {
    const url: string = `bc/product/button/save`
    return Axios(url, data, null, 'POST')
  }
}