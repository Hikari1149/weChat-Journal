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
    postComment(bid,content){
        return this._request({
            url:`/book/add/short_comment`,
            method:"POST",
            data:{
                book_id:bid,
                content
            }
        })
    }
    getSearch(key,start){
        return this._request({
            url:`/book/search?summary=1`,
            data:{
                q:key,
                start
            }
        })
    }
    getMyBookCount(){
        return this._request({
            url:`/book/favor/count`
        })
    }
}
export {Book}