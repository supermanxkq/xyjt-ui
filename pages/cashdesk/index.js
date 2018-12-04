var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.globalData.domain,
    payMoney: 0,
    orderId: 0,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //查询订单表中需要支付多少钱
    wx.request({
      url: this.data.domain + '/backstage/order/orderMoneyView?id=' + options.orderId,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          payMoney: res.data.payMoney,
          orderId: res.data.id
        });
      }
    })
  },
  payMoney: function(e) {
    var that = this;
    that.setData({
      disabled: true
    })
    var orderId = e.target.dataset.orderid;
    wx.login({
      success: function(res) {
        wx.request({
          url: app.globalData.domain + "/backstage/order/pay",
          data: {
            code: res.code,
            orderId: orderId
          },
          method: 'GET',
          success: function(res) {
            console.log(res);
            if (res.data != null && res.data != undefined && res.data != '') {
              wx.setStorageSync("openid", res.data.openid); //将获取的openid存到缓存中    
              wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.packageStr,
                'signType': res.data.signType,
                'paySign': res.data.paySign,
                'success': function(res) {
                  wx.redirectTo({
                    url: '../paysuccess/index',
                  })
                },
                'fail': function(res) {
                  if (res.errMsg == "requestPayment:fail cancel") {
                    wx.showToast({
                      title: '支付取消',
                      duration: 1200
                    })
                    setTimeout(function() {
                      wx.hideToast()
                      wx.reLaunch({
                        url: '../classify/index',
                      })
                    }, 2000)
                  } else {
                    wx.showToast({
                      title: '支付失败',
                      image: '../../images/error.png',
                      duration: 1200
                    })
                    setTimeout(function() {
                      wx.hideToast()
                      wx.reLaunch({
                        url: '../classify/index',
                      })
                    }, 2000)

                  }
                },
                'complete': function(res) {}
              })
            }
          }
        });
      }
    })
  },
  toIndex: function() {
    wx.reLaunch({
      url: '../classify/index',
    })
  }
})