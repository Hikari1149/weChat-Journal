import {HTTP} from '../utils/http-p'

class Book extends HTTP{
    getHotBook(){
        return this._request({
            url:'/book/hot_list',
        })
    }
    getComment(bid){
        return this._request({
            url:`/book/${bid}/short_comment`
        })
    }
    getFavor(bid){
        return this._request({
            url:`/book/${bid}/favor`
        })
    }
    getDetail(bid){
        return this._request({
            url:`/book/${bid}/detail`
        })
    }
}
export {Book}