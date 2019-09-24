import {HTTP} from '../utils/http-p'

class Keyword extends HTTP{
    key = 'q'
    maxLength = 10
    getHistory(){
        return wx.getStorageSync(this.key)  || []
    }
    addKeyword(key){
        let words = this.getHistory()
        if(words.length>=this.maxLength){
            words.pop()
        }
        if(!words.includes(key))
            words.unshift(key)
        wx.setStorageSync(this.key,words)
    }
    getHot(){
        return this._request({
            url:'/book/hot_keyword'
        })
    }
}
export {Keyword}