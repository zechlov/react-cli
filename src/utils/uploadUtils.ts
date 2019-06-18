const uploadUtils = {
  uploadConfig: {
    async: false,
    url: 'http://api.paixin.com/thirdpart/qiniu',
    data: '',
    method: 'post',
    credentials: true,
    crossDomain: true
  },
  today: new Date(),
  getYear: function () {
    return this.today.getFullYear()
  },
  getMonthAndDate: function () {
    // 获取当前月份，默认一月以 0 开始所以需要加一
    const month = this.today.getMonth() + 1
    const date = this.today.getDate()

    const Mon = (month < 10 ? '0' + month : month) + ''
    const Day = (date < 10 ? '0' + date : date) + ''

    return `${Mon}${Day}`
  },
  getAll: function () {
    return this.getYear() + '/' + this.getMonthAndDate()
  },
  getDir: function () {
    return 'photos/' + this.getYear() + '/' + this.getMonthAndDate() + '/'
  },
  getKey: () => {
    const date = new Date()
    return `photos${Date.parse(date.toString())}`
  },
  getUploadData() {
    const date = this.getAll()
    const dataObj = {
        type: 'uptoken',
        bucket: 'images',
        file_ext: 'jpg',
        file_dir: 'photos/' + date
      }
    return dataObj
  },
  getUploadDataSimilar() {
    const date = this.getAll()
    const dataObj = {
        type: 'uptoken',
        bucket: 'images',
        file_ext: 'jpg',
        file_dir: 'temp/' + date
      }
    return dataObj
  },
  getUploadDataCards() {
    const date = this.getAll()
    const dataObj = {
        type: 'uptoken',
        bucket: 'private',
        file_ext: 'jpg',
        file_dir: 'cards/' + date
      }
    return dataObj
  }
}

export default uploadUtils
