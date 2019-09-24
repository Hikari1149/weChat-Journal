// pages/book-detail/book-detail.js
import {Book} from '../../models/book'
import {LikeModel} from '../../models/like'
const Like  = new LikeModel()
const BookModel  = new Book()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    comments:[],
    like:false,
    count:0,
    posting:false
  },
  onLike:function(event){
    let status = event.detail.behavior
    Like.postLike(this.data.detail.id,400,status)
  },
  onCancel:function(){
    this.setData({posting:false})
  },
  onShowPost:function(){
    this.setData({posting:true})
  },
  onPost:function(e){
    let comment = e.detail.text || e.detail.value
    if(comment.length === 0 )  return
    if(comment.length>12){
      wx.showToast({
        title:"comment's length can't exceed 12.",
        icon:''
      })
    }
    BookModel.postComment(this.data.detail.id,comment)
    .then(res=>{
      wx.showToast({
        title:'+1',
        icon:''
      })
      this.data.comments.unshift({
        content:comment,
        nums:'1'
      })
      this.setData({
        posting:false,
        comments:this.data.comments
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bid = options.bid;
    let detailReq = BookModel.getDetail(bid)
    let commentsReq = BookModel.getComment(bid)
    let favorReq = BookModel.getFavor(bid)
    wx.showLoading({title:'Loading'})
    Promise.all([detailReq,commentsReq,favorReq])
    .then((res)=>{
      this.setData({
        detail:res[0],
        comments:res[1].comments,
        like:res[2].like_status,
        count:res[2].fav_nums
      })
      wx.hideLoading()
    })
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})