import WxValidate from '../../utils/WxValidate.js'
var validate;
var app = getApp()

Page({
  // 初始化表单校验
  initValidate() {
    // 创建实例对象
    this.validate = new WxValidate({
      name: {
        required: true,
        maxlength: 10
      },
      phone: {
        required: true,
        tel: true,
        maxlength: 11
      },
      age: {
        required: true,
        digits: true,
        maxlength: 2,
      },
      date: {
        required: true,
      },
      type: {
        required: true,
      }
    }, {
      name: {
        required: '请输入姓名!',
        maxlength: '名称不得超过10字!'
      },
      phone: {
        required: '请输入手机号码!',
        tel: '手机格式不正确!'
      },
      age: {
        required: '请输入年龄!',
        digits: '年龄是数字！',
        maxlength: '不接受大龄学员！',
      },
      date: {
        required: '请选择试听日期！'
      },
      type: {
        required: '请选择课程类型！',
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    disabled: false,
    checkboxItems: [{
        name: '吉他',
        value: '0',
        checked: true
      },
      {
        name: '尤克里里',
        value: '1'
      }
    ],
    radioItems: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0',
        checked: true
      }
    ],
  },
  formSubmit: function(e) {
    if (!this.validate.checkForm(e.detail.value)) {
      const error = this.validate.errorList[0];
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none'
      })
      return false
    }
    var that = this;
    that.setData({
      disabled: true
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.address);
    var user = wx.getStorageSync('user') || {};
    console.log('form发生了submit事件，携带user为：', user)
    wx.request({
      url: app.globalData.domain + '/backstage/coursereserve/create',
      method: 'POST',
      data: {
        'name': e.detail.value.name,
        'phone': e.detail.value.phone,
        'age': e.detail.value.age,
        'gotoClassDate': that.data.date,
        'crUsId': user.openid,
        'type': e.detail.value.type,
        'expirence': e.detail.value.expirence
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.resultCode == 'SUCCESS') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function() {
            wx.hideToast()
            wx.reLaunch({
              url: '../my/index',
            })
          }, 2000)
        }
      }
    });
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate() //验证规则函数
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})