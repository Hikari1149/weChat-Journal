# 微信小程序-FE入门

### 基本概念

#### flex属性

* flex容器将消除其item的块状特效
* justify-content: space-between .\( Distribute items evenly,The first item is flush with the start, the last is flush with the end.\)
* flex-wrap: wrap  \(当item宽度和大于容器宽度时换行\)

#### Promise

* Promise是一个**对象**,用来存储**状态**,表示一个异步操作的最终完成 \(或失败\), 及其结果值.
*  **`then()`** 方法返回一个  [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/API/Promise) 。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

#### 尺寸单位 <a id="&#x5C3A;&#x5BF8;&#x5355;&#x4F4D;"></a>

* rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

#### 封装一个HTTP类

* HTTP类中 编写request方法,调用wx.request\(Object\) 发起一个HTTP请求
* 需要发起网络请求的组件只要继承HTTP类即可

#### 监听事件

事件系统是组件间通信的主要方式之一。自定义组件可以触发任意的事件，引用组件的页面可以监听这些事件

#### 触发事件

自定义组件触发事件时，需要使用 `triggerEvent` 方法，指定事件名、detail对象和事件选项

### 期刊,图书功能实现

判断当前期刊是否为最新/后一期

```text
classic page第一次加载时会获取最新一期期刊.
此时调用 wx.setStorageSync(string key, any data) 将最新一期的序号写入缓存中
将当前期刊index和最新期刊的index比较即可(wx.getStorageSync(string key))
```

播放背景音乐

```text
BackgroundAudioManager
BackgroundAudioManager 实例，可通过 wx.getBackgroundAudioManager 获取。
属性
string src
音频的数据源（2.2.3 开始支持云文件ID）。默认为空字符串，当设置了新的 src 时，会自动开始播放，目前支持的格式有 m4a, aac, mp3, wav。
```

点击图书查看详情

```text
wx.navigateTo({url: '要跳转page的路径'})
page在onLoad的时候,可以接收到跳转时传入的参数
```

组件中动态插入内容

```text
<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>
使用时，用 slot 属性来将节点插入到不同的slot上。

<!-- 引用组件的页面模板 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
    <view slot="before">这里是插入到组件slot name="before"中的内容</view>
    <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
    <view slot="after">这里是插入到组件slot name="after"中的内容</view>
  </component-tag-name>
</view>
```

编写mask组件

```text
给一个view标签添加遮罩的样式(opacity,z-index ..)
然后直接将该标签插入要使用wxml中 wx:if控制是否显示遮罩即可
```

下拉加载更多数据

```text
调用Page的API onReachBottom() 监听是否滑到底部.
滑到底部时 Page页面传递一个随机字符more给search组件.
search组件利用observer监听more,more变化时请求数据.
```

获取用户信息

```text
设置button的open-type属性getUserInfo,弹出请求授权的Modal
getUserInfo	获取用户信息，可以从bindgetuserinfo回调中获取到用户信息

查看是否获得授权:wx.getSetting 获取用户的当前设置。
返回值中带有scope,只会出现小程序已经向用户请求过的权限。
```

#### 框架中基本的API

* **Page\(Object object\)**

  注册小程序中的一个页面。接受一个 `Object` 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。

* **data**

  `data` 是页面第一次渲染使用的**初始数据**。

  页面加载时，`data` 将会以`JSON`字符串的形式由逻辑层传至渲染层，因此`data`中的数据必须是可以转成`JSON`的类型：字符串，数字，布尔值，对象，数组。

  渲染层可以通过 [WXML](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/index.html) 对数据进行绑定。

* **Page.prototype.setData\(Object data, Function callback\)**

  `setData` 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 `this.data` 的值（同步）

* observers: 组件数据字段监听器，用于监听 properties 和 data 的变化
* **behaviors**

  `behaviors` 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。

  每个 `behavior` 可以包含一组属性、数据、生命周期函数和方法。**组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。** 每个组件可以引用多个 `behavior` ，`behavior` 也可以引用其他 `behavior` 。

* **组件wxml的slot**

  在组件的wxml中可以包含 `slot` 节点，用于承载组件使用者提供的wxml结构。

  默认情况下，一个组件的wxml中只能有一个slot。需要使用多slot时，可以在组件js中声明启用。

* **WXS 模块**

  WXS 代码可以编写在 wxml 文件中的 `<wxs>` 标签内，或以 `.wxs` 为后缀名的文件内。

  **模块**

  每一个 `.wxs` 文件和 `<wxs>` 标签都是一个单独的模块。

  每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。

  一个模块要想对外暴露其内部的私有变量与函数，只能通过 `module.exports` 实现。





