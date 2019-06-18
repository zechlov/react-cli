const Utils = {
  rsa_encrypt(value: string) {
    const JSEncrypt = (window as any).JSEncrypt
    const str = value || '';
    const publicKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCczuvW8UtnZMRma8l4QRA4ALi6
    zB9JJQQKN8Xm1O0akMPiDrU3tbL/YPF9v6jQBdhikk5EWxio+5+lnHTnjjLeBQGO
    SIszXv6dhYN2PCZ1TDmyC/7TiPseLjQsCpWKyzaUwh3O9hr4+lGd66w55DCH8wmg
    XnXBAwv2z1q2S1pRBwIDAQAB
    -----END PUBLIC KEY-----`

   
  
    if (str === ''){
      return ''
    }
  
    // eslint-disable-next-line no-undef
    const rsa = new JSEncrypt();
  
    rsa.setKey(publicKey);
  
    return rsa.encrypt(str) || '';
  },

  rsa_decrypt(value: string) {
    const JSEncrypt = (window as any).JSEncrypt
    const str = value || '';
     const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    MIICXAIBAAKBgQCczuvW8UtnZMRma8l4QRA4ALi6zB9JJQQKN8Xm1O0akMPiDrU3
    tbL/YPF9v6jQBdhikk5EWxio+5+lnHTnjjLeBQGOSIszXv6dhYN2PCZ1TDmyC/7T
    iPseLjQsCpWKyzaUwh3O9hr4+lGd66w55DCH8wmgXnXBAwv2z1q2S1pRBwIDAQAB
    AoGAAfX5e/5aczpeo3JT3bR2AfCYk/bcd/EF6zipRSTV3LzvB2IaypA2OxOV354e
    59yV3QnyuYNYmjUUwb3ViyjQU5bv88F75u5IEiQBB9Sv0GxlwZ8V7aEkOOBMFClZ
    4ZjMqgR+2+fdktxJ8bg34y0hsCNpKKuhExDUtg7GtaRuX6ECQQDmhQEmRa8lNuse
    xP2BO1Sf32Kb+vzp5WSX5YISqE5IH58VMZo1QvCn/rof8cL0s/X1okhFwwByB+Eq
    OyNg8oTXAkEAriQdRIVdFaYvZvl6O/oFvyYa0ye7stfu96MmmleFpb8+HAizrVOh
    EZrX/P71hAfDEkKuZ0UiQLP54LKv1nHfUQJAbW/NSOciLC+zVas9koGhPjjl7pks
    QrpVlEswAj2G1HS2qHAg/pImAAtNP2ceH9/jr9Z4Ky5VYs1c1xi2Rgs8hwJAaCIk
    dlMhxM5pzjQlSjRKt3F73QUHkvzZY7BmZykrPGBOLcluWJmH2dU0j4+PFXLmzcae
    MBcBUpvNMvbne18A4QJBAJ7Xbnl0UoIf+Yj0uPkkSinKbIbiWT8PjL4sUzdtMuf+
    q5xBYVwmNfmD7fDajz2iFKzg6xE1dwDZnc193pRPuYA=
    -----END RSA PRIVATE KEY-----
    `

    if (str === ''){
      return ''
    }
  
    // eslint-disable-next-line no-undef
    const rsa = new JSEncrypt();
  
    rsa.setKey(privateKey);
  
    return rsa.decrypt(str) || '';
  },

  unset_cookie(name: string, path: string) {
    let exp:any = new Date()
    exp.setTime(exp.getTime() - 1)
    exp = exp + ''
    const cval = this.cookie(name)
    if (cval !== null) {
      path = path || '/'
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=' + path + ';'
    }
  },

  cookie(name:string) {
    const arrstr = document.cookie.split('; ')

    for (const i of arrstr) {
      const temp = arrstr[i].split('=')
      if (temp[0] === name) {
        return decodeURIComponent(temp[1])
      }
    }
    return ''
  }

}

export default Utils