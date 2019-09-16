import {config} from '../config.js'

const showErrTip = (code) =>{
  let msg = ''
  switch(code){
    case '1':
      msg = 'error occured'
      break;
    default:
      msg = 'error'
  }
  wx.showToast({
    title: msg,
    icon:'erro',
    duration:1500
  })
}
export class HTTP{
  _request({url,data={},method='GET'}){
      return new Promise((resolve,reject)=>{
         this.request(url,resolve,reject,data,method)
      })
      
  }

  request(url,resolve,reject,data,method){
    wx.request({
      url: `${config.apiBaseUrl}${url}`,
      method:method,
      data,
      header:{
        'content-type':'application/json',
        appKey:config.appKey
      },
      success:(res)=>{
         let code = res.statusCode.toString()
         if(code.startsWith('2')){
            resolve(res.data)
         }else{ 
            showErrTip(res.errMsg)
            reject()
        }
      },
      fail:(err)=>{
        showErrTip(1)
        reject()
      }
    })
  }
}
