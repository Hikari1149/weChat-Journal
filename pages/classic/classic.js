// pages/classic/classic.js

import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'

const classic = new ClassicModel()
const like = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstest:true,
    lastest:false,
    favNum:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //成功获取数据后 会调用传入的callBack函数
    classic.getLatest((res)=>{
      this.setData({
        classicData:res,
        favNum:res.fav_nums,
        likeStatus:res.like_status
      })
    })  
  },
  onLike:function(event){
    const classicData = this.data.classicData
    const {id,type} = classicData
    let status = event.detail.behavior
    like.postLike(id,type,status)
  },


  onPrev:function(){
    this._getClassic('previous')
  },
  onNext:function(){
    this._getClassic('next')
  },
  _getClassic:function(action){
    let index = this.data.classicData.index
    classic.getClassic(index,action,(res)=>{
      this._getLike(res.id,res.type)
      this.setData({
        classicData:res,
        firstest:classic.isFirstest(res.index),
        lastest:classic.isLastest(res.index)
      
      })
    })
  },
  _getLike:function(artId,type){
    classic.getLike(artId,type,(res)=>{
      this.setData({
        favNum:res.fav_nums,
        likeStatus:res.like_status
      })
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