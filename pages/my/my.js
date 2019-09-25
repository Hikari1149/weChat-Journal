// pages/my/my.js
import {Book} from '../../models/book'
const bookModel = new Book()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    myBooksCount:0,
    classics:[]
  },

  hasGottenUserInfo:function(){
    wx.getSetting({
      success:(data)=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:(data)=>{
              this.setData({
                hasUserInfo:true,
                userInfo:data.userInfo
              })
            }
          })
        }else{
          this.setData({hasUserInfo:false})
        }
      }
    })
  },
  onGetUserInfo(event){
    let userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        hasUserInfo:true,
        userInfo
      })
    }
  },
  getMyBookCount:function(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({myBooksCount:res.count})
    })
  },
  getMyFavor:async function(){
    let res = await bookModel.getMyFavor()
    this.setData({classics:res})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.hasGottenUserInfo(),
    this.getMyBookCount()
    this.getMyFavor()

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