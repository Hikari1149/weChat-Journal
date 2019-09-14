import {HTTP} from '../utils/http'

class LikeModel extends HTTP{
    postLike(artId,type,status){
        let url = status ? '/like':'/like/cancel'
        this.request({
            url,
            method:'POST',
            data:{
                art_id:artId,
                type
            }
        })
    }
}
export {LikeModel}