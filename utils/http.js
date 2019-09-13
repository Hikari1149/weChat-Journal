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
  request(params){
    wx.request({
      url: `${config.apiBaseUrl}${params.url}`,
      method:params.method || 'GET',
      data:params.data,
      header:{
        'content-type':'application/json',
        appKey:config.appKey
      },
      success:(res)=>{
         let code = res.statusCode.toString()
         if(code.startsWith('2')){
          params.success && params.success(res.data)
         }else{
            showErrTip(res.errMsg)
         }
      },
      fail:(err)=>{
        showErrTip(1)
      }
    })
  }
}
