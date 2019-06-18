import { action, observable } from 'mobx'

function initIsShowPrew(): boolean {
  const url = window.location.href
  const notShowUrls = [
    '/minprogram/businessCard/productCategory',
    '/minprogram/businessCard/productDisplaySettings',
    '/minprogram/businessCard/visitorData',
    '/minprogram/businessCard/clockIn',
    '/minprogram/businessCard/cosManage',
    '/minprogram/businessCard/groupManage'
  ]

  let isShow = true

  notShowUrls.forEach(t => {
    if (url.indexOf(t) > -1) {
      isShow = false
    }
  })

  return isShow
}

interface BusinessCard {
  instanceStatus: any
  tabIndex: number
  isShowPrew: boolean
  globalColor: any
  TabOneData: any
  TabTwoData: any
  TabThreeData: any
}

export default class BusinessCardStore implements BusinessCard {
  @observable
  public instanceStatus: any = {
    status: null,
    show: false,
    reshow: false
  }

  @observable
  public instanceId: any = () => {
    const instanceId = localStorage.getItem('instanceId')
    if (instanceId) {
      const num = parseInt(instanceId, 10)
      return num
    } else {
      return null
    }
  }

  @observable
  public tabIndex: number = 0

  @observable
  public isShowPrew: boolean = initIsShowPrew()

  @observable
  public baseInfo: any = {
    logo: '',
    company_name: '公司名',
    name: '公司公众号',
    contact: '电话',
    location: '公司地址',
    website: '公司网址'
  }

  @observable
  public globalColor: any = {
    base: '#6e68fc !important',
    light: '#F0EFFF',
    heavy: '#7169FF',
    style: 1
  }
  @observable
  public TabOneData: any = {
    banner: [],
    iconList: [],
    introduct: ''
  }

  @observable
  public TabTwoData: any = {
    logs: [],
    current: 0,
    products: [],
    proList: []
  }
  @observable
  public TabThreeData: any = {
    logs: [],
    current: 0,
    articles: []
  }
  @observable
  public TabFiveData: any = {
    html: '',
    show: true
  }

  @action
  public setInstanceStatus(key: string, value: any) {
    this.instanceStatus[`${key}`] = value
  }

  @action
  public setInstance(value: any) {
    localStorage.setItem('instanceId', value)
  }

  @action
  public tabChanged(index: number) {
    this.tabIndex = index
  }

  @action
  public showPreviewChanged(isShow: boolean) {
    this.isShowPrew = isShow
  }

  @action
  public setBase(info: any) {
    this.baseInfo = info
  }

  @action
  public setGlobalColor(info: any) {
    this.globalColor = info
  }

  @action
  public setTabOne(key: string, value: any) {
    this.TabOneData[`${key}`] = value
  }

  @action
  public setTabTwo(key: string, value: any) {
    this.TabTwoData[`${key}`] = value
  }

  @action
  public setTabThree(key: string, value: any) {
    this.TabThreeData[`${key}`] = value
  }

  @action
  public setTabFive(data: any) {
    this.TabFiveData = data
  }
}
