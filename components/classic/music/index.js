// components/classic/music/index.js
import {classicBeh} from '../classic-beh'

let mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    musicSrc:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    imgTag:'./images/music@tag.png',
    imgPlaying:'./images/player@playing.png',
    imgWaiting:'./images/player@waitting.png'
  },

  attached:function(){
    this._recoverStatus()
    this._listenStatus()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      let playing=this.data.playing
      if(playing){
        this.setData({playing:false})
        mMgr.pause()
      }else{
        this.setData({playing:true})
        mMgr.src=this.properties.musicSrc
        mMgr.title='hikari-music'
      }
    },
    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({playing:false})
        return
      } 
      if(mMgr.src === this.properties.musicSrc){
        this.setData({playing:true})
      }
    },
    _listenStatus:function(){
      //播放器状态改变  -> 改变按钮UI状态
        mMgr.onPause(()=>{
          this._recoverStatus()
        })
        mMgr.onPlay(()=>{
          this._recoverStatus()
        })
        mMgr.onStop(()=>{
          this._recoverStatus()
        })
        mMgr.onEnded(()=>{
          this._recoverStatus()
        })
    }

  }
})
