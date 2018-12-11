var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
    }, {
      icon: '../../images/iconfont-shouhuodizhi.png',
      text: '收货地址管理',
      unreadNum:5
    }, {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    // }, {
    //   icon: '../../images/icon_normal.png',
    //   text: '分享小程序'
    // }]
    }]
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  onLoad: function() {
    // wx.setTabBarBadge({
    //   index: 3,
    //   text: '10',
    // })
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  //跳转页面
  call: function(e) {
      wx.makePhoneCall({
        phoneNumber: '18004831028',
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '小野吉他工作室',
      path: '/pages/classify/index',
      imageUrl: "/images/share2.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})