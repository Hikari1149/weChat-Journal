// components/like/index.js
Component({

  properties:{
    like:{
      type:Boolean
    },
    count:{
      type:Number,
    },
    readOnly:{
      type:Boolean
    }
  },
  methods:{
    onLike: function () {
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like
      })
      //触发自定义事件
      this.triggerEvent('like',{
        behavior:this.properties.like   
      })
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgLike:'./images/like.png',
    imgDisLike:'./images/like@dis.png',
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