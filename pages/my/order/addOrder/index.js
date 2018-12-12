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
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryConfirmOrder();
  },
  queryConfirmOrder: function() {
    var that = this;
    var user = wx.getStorageSync('user') || {};
    wx.request({
      url: app.globalData.domain + '/backstage/order/confirmOrder?crUsId=' + user.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (!res.data.takeAddress) {
          wx.navigateTo({
            url: '../../address/index',
          })
        }
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
    var that = this;
    that.setData({
      disabled: true
    })
    var user = wx.getStorageSync('user') || {};
    wx.request({
      url: app.globalData.domain + '/backstage/order/create',
      method: 'POST',
      data: {
        'crUsId': user.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.resultCode == 'SUCCESS') {
          wx.reLaunch({
            url: '../../../cashdesk/index?orderId=' + res.data.id,
          })
        }
      }
    });
  },
  toIndex: function() {
    wx.reLaunch({
      url: '../../../classify/index',
    })
  },
  onShow() {
    //页面中没有默认的收货地址的时候，重新加载地址信息
    this.queryConfirmOrder();
  }
})