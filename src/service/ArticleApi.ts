import Axios from './base'

interface ArticleSave {
  cover: string,
  title: string,
  detail: string,
  article_type_id: number,
  status: number,
  instance_id: number
}

interface ArticleUpdate {
  id: number
  cover: string,
  title: string,
  detail: string,
  article_type_id: number,
  status: number
}

interface ArticleStatus {
  id: string
  status: number
}

interface ArticleType {
  name: string
  id?: number
  instance_id: number
}

export default class ArticleApi {

  public deleteArticleType(data: { id: string }) {
    const url: string = `bc/article/type/delete`
    return Axios(url, data, null, 'POST')
  }

  public saveArticleType(data: ArticleType) {
    const url: string = `bc/article/type/save`
    return Axios(url, data, null, 'POST')
  }

  public getArticleType(data: { instance_id: number }) {
    const url: string = `bc/article/type/list`
    return Axios(url, data, null, 'POST')
  }

  public deleteArticle(data: { id: string }) {
    const url: string = `bc/article/delete`
    return Axios(url, data, null, 'POST')
  }

  public setArticleStatus(data: ArticleStatus) {
    const url: string = `bc/article/update-status`
    return Axios(url, data, null, 'POST')
  }

  public getArticleDetail(data: { id: string }) {
    const url: string = `bc/article/detail`
    return Axios(url, data, null, 'POST')
  }

  public getArticleList(data?: { type_id: number, instance_id: number }) {
    const url: string = `bc/article/list`
    return Axios(url, data, null, 'POST')
  }

  public saveArticle(data: ArticleSave) {
    const url: string = `bc/article/save`
    return Axios(url, data, null, 'POST')
  }

  public setTopArticle(data: { id: string }) {
    const url: string = `bc/article/set-top`
    return Axios(url, data, null, 'POST')
  }

  public updateArticle(data: ArticleUpdate) {
    const url: string = `bc/article/update`
    return Axios(url, data, null, 'POST')
  }

}