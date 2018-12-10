// pages/paysuccess/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    payMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      payMoney: options.payMoney,
      orderId: options.orderId
    });
  },
  toGoodsList: function() {
    wx.reLaunch({
      url: '../classify/index',
    })
  },
  toOrderList: function() {
    wx.reLaunch({
      url: '../my/index',
    })
  }
})