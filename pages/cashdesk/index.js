var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.globalData.domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //查询订单表中需要支付多少钱
  },
  payMoney: function() {
    wx.login({
        success: function(res) {
          wx.request({
              url: app.globalData.domain + "/backstage/order/pay",
              data: {
                code: res.code
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
                        wx.navigateTo({
                          url: '../paysuccess/index',
                        })
                      },
                      'fail': function(res) {
                        if (res.errMsg == "requestPayment:fail cancel") {
                          wx.showToast({
                            title: '支付取消',
                            duration: 1200
                          })
                        } else {

                          wx.showToast({
                            title: '支付失败',
                            image: '../../images/error.png',
                            duration: 1200
                          })

                        }
                      },
                    'complete': function(res) {}
                  })
              }
            }
          });
      }
    })


}
})