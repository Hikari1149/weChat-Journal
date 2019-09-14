// components/epsoide/index.js
const Month  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    epNum:{
      type:String,
      observer:function(newVal,oldVal,changedPath){
        let val = newVal.length === 1 ? `0${newVal}`:newVal
        this.setData({
          epNum:val
        })  
      }  
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year:0,
    month:''
  },
  ready(){
    let date = new Date()
    let month = Month[date.getMonth()]
    let year = date.getFullYear()
    this.setData({
      month,
      year
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
