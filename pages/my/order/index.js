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
  onLoad: function() {
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
  /**
   * 去支付
   */
  goto_pay: function(e) {
    var orderid = e.target.dataset.orderid;
    wx.reLaunch({
      url: '../../cashdesk/index?orderId=' + orderid,
    })
  },
  /**
   * 确认收货
   */
  confirm_receive: function(e) {
    var that=this;
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
            that.onLoad();
          }, 2000)
        }
      }
    })
  },
  /**
   * 删除订单
   */
  deleteOrder: function(e) {
    var that=this;
    var id = e.target.dataset.index;
    wx.showModal({
      title: '删除订单',
      content: '确定要订单吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/backstage/order/remove/' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.resultCode == 'SUCCESS') {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function () {
                  wx.hideToast()
                  that.onLoad();
                }, 2000)
              } else {
                console.log("删除失败！");
              }
            }
          })
        } else {
          console.log("用户点击取消");
        }
      }
    })
  }

})