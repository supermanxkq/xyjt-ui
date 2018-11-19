var app = getApp()
Page({
  data: {
    userInfo: {},
    addressList: {}
  },
  onLoad: function() {
    this.queryAddressList();
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryAddressList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  //查询地址列表
  queryAddressList: function() {
    var that = this;
    //请求后台获取地址列表数据
    wx.request({
      url: app.globalData.domain+'/backstage/takeaddress/list',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.resultCode == 'SUCCESS') {
          console.log(res)
          that.setData({
            addressList: res.data.content
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'loading'
          })
        }
      }
    })
  },
  //跳转到新增收货人页面
  toAddPage:function(){
    wx.navigateTo({
      url: 'addAddress/index',
    })
  }

})