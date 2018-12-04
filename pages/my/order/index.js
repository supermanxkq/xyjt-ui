var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    cartImg: '../../../images/a0p.png',
    domain: app.globalData.domain,
    tipWords: '您还没有订单呢～'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryOrderList();
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryOrderList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作∏
    wx.stopPullDownRefresh();
  },
  /**
   * 查询订单详情
   */
  queryOrderList: function() {
    var that = this;
    var user = wx.getStorageSync('user') || {};
    wx.request({
      url: app.globalData.domain + '/backstage/order/list?crUsId=' + user.openid,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          list: res.data.content,
        });
      }
    })
  },
  goto_pay: function(e) {
    var orderid = e.target.dataset.orderid;
    wx.reLaunch({
      url: '../../cashdesk/index?orderId=' + orderid,
    })
  },
  confirm_receive: function(e) {
    var orderid = e.target.dataset.oid;
    wx.request({
      url: app.globalData.domain + '/backstage/order/confirmReceive?id=' + orderid,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.resultCode == 'SUCCESS') {
          wx.showToast({
            title: '确认成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function() {
            wx.hideToast()
            wx.redirectTo({
              url: 'index',
            })
          }, 2000)
        }
      }
    })
  }

})