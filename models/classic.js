import {HTTP} from '../utils/http'

export class ClassicModel extends HTTP{
    getLatest(callBack){
        this.request({
            url:'/classic/latest',
            success:(res)=>{
                callBack(res)
                //成功获取数据后 调用callBack函数
                this._setStorage('classicIndex',res.index) //缓存中加入最新一期的序号
            }
        })
    }
    getClassic(index,action,callBack){
        let newIndex = action ==='previous'? index-1:index+1
        let classicData = this._getStorage(`classic-${newIndex}`)
        if(classicData){
           callBack(classicData) 
        }else{
            this.request({
                url:`/classic/${index}/${action}`,
                success:(res)=>{
                    this._setStorage(`classic-${res.index}`,res)
                    callBack(res)
                    
                }
            })
        }
    }
    isFirstest(index){
        let firstIndex = this._getStorage('classicIndex')
        return index === firstIndex 
    }
    isLastest(index){
        return index === 1
    }
    _setStorage(key,val){
      wx.setStorageSync(key,val)    
    }
    _getStorage(key){
      return wx.getStorageSync(key)  
    }
}
