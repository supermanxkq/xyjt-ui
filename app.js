//app.js
App({
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    //domain: 'http://192.168.0.102:8040'
    domain:'https://alshyl.com'
  },
  onLaunch: function() {
    var that = this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function(res) {
          if (res.code) {
            var d = that.globalData; //这里存储了appid、secret、token串  
            var loginUrl = that.globalData.domain + '/backstage/user/login?code=' + res.code;
            wx.request({
              url: loginUrl,
              data: {
               
              },
              method: 'GET',
              header: {
                'Accept': 'application/json'
              },
              success: function(res) {
                var obj = {};
                obj.openid = res.data.openId;
                // obj.expires_in = Date.now() + res.data.expires_in;
                console.log(obj);
                wx.setStorageSync('user', obj); //存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  }
})