// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    firstest:Boolean,
    lastest:Boolean
  },
  /**
   * 组件的初始数据
   */
  data: {
    imgLeft:'./images/triangle@left.png',
    imgRight:'./images/triangle@right.png',
    imgDisLeft:'./images/triangle.dis@left.png',
    imgDisRight:'./images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      if(!this.properties.firstest){
        this.triggerEvent('onNext',{},{})
      }
    },
    onRight:function(event){
      if(!this.properties.lastest){
        this.triggerEvent('onPrev',{},{})
      }

    }
  }
})
