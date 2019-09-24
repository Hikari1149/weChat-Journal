import {HTTP} from '../../utils/http-p'

let paginationBev = Behavior({
    properties:{

    },
    data:{
        start: 0,
        count:20,
        empty:false,
        ending:false,
        dataArray:[]
    },
    methods:{
        setMoreData:function(dataArray){
            if(dataArray.length ===0){
                this.data.ending = true
                if(this.data.dataArray.length ===0 ){
                    this.setData({empty:true})
                }
            }
            let temp = this.data.dataArray.concat(dataArray)
            this.data.start += this.data.count
            this.setData({
                dataArray:temp
            })
        },
        hasMore:function(){
            return !this.data.ending
        },
        initPagination:function(){
            this.data.ending=false
            this.data.start = 0
            this.data.dataArray=[]
            this.setData({
                dataArray:[]
            })
        }
    }
})
export {paginationBev}