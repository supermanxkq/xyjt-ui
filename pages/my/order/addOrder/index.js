// pages/my/order/addOrder/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认收货地址
    takeAddressDefault: {},
    //商品列表
    list: {},
    domain: app.globalData.domain,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryConfirmOrder();
  },
  queryConfirmOrder: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/backstage/order/confirmOrder',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          takeAddressDefault: res.data.takeAddress,
          list: res.data.orderConfirmVos
        })
      }
    })
  },
  /**
   * 提交订单处理函数
   */
  formSubmit: function(e) {
    wx.request({
      url: app.globalData.domain + '/backstage/order/create',
      method: 'POST',
      data: {
        'crUsId': 1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.resultCode == 'SUCCESS') {
          wx.navigateTo({
            url: '../../../cashdesk/index',
          })
        }
      }
    });
  }
})