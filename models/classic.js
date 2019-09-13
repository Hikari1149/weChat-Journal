import {HTTP} from '../utils/http'

export class ClassicModel extends HTTP{
    getLatest(callBack){
        this.request({
            url:'/classic/latest',
            success:(res)=>{
                callBack(res)
                //成功获取数据后 调用callBack函数
            }
        })
    }
}
