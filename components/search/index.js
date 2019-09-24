// components/search/index.js

import {Keyword} from '../../models/keyword'
import {Book} from '../../models/book'
import {paginationBev} from '../../components/behaviors/pagination'

let keywordModel  = new Keyword()
let bookModel = new Book()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:Number,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys:[],
    hotKeys:[],
    finished:false,
    q:'',
    loading:false,
    loadingCenter:false,
  },

  /**
   * 组件的方法列表
   */
  attached:function(){
    let words = keywordModel.getHistory()
    this.setData({historyKeys:words})

    let hotKeysReq = keywordModel.getHot()
    hotKeysReq.then(res=>{
      this.setData({hotKeys:res.hot})
    })
  },
  methods: {
    loadMore:function(){
      if(this.data.loading){
        return
      } 
      if(!this.hasMore())
        return
      this.setData({loading:true})
      let bookArrReq = bookModel.getSearch(this.data.q,this.data.start)
      bookArrReq.then(res=>{
        this.setMoreData(res.books)
      }).finally(()=>{this.setData({loading:false})})
    },
    onCancel:function(){
      this.triggerEvent('onCancel',{},{})
    },
    onDelete:function(){
        this.setData({
          finished:false,
          q:''
        })
    },
    onConfirm:function(e){
      this.setData({finished:true,loadingCenter:true})
      this.initPagination()
      let key = e.detail.value || e.detail.text
      keywordModel.addKeyword(key)
      let bookArrReq = bookModel.getSearch(key,0)
      bookArrReq.then(res=>{
        this.setMoreData(res.books)
        this.setData({
          q:key,
          loadingCenter:false
        })
      }) 
    },
  }
})
