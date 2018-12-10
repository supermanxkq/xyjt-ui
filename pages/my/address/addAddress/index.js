var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDefault: '1',
    disabled:false
  },
  onLoad: function () {
  },
  //改变为默认
  changeIsDefault: function(e) {
    var that = this;
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == true) {
      //给隐藏的input标签设置值
      that.setData({
        isDefault: "1"
      })
    } else {
      that.setData({
        isDefault: "0"
      })
    }
  },
  formSubmit: function(e) {
    var that=this;
    that.setData({
      disabled:true
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.address);
    var user = wx.getStorageSync('user') || {};
    console.log('form发生了submit事件，携带user为：', user)
    wx.request({
      url: app.globalData.domain +'/backstage/takeaddress/create',
      method:'POST',
      data:{
        'name': e.detail.value.name, 
        'phone': e.detail.value.phone,
        'address': e.detail.value.address,
        'isDefault': e.detail.value.isDefault,
        'crUsId':user.openid
      }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.resultCode == 'SUCCESS') {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
            wx.redirectTo({
              url: '../index',
            })
          }, 2000)
        }
      }
    });
  }
})