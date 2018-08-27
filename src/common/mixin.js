export const Mixin = {
  data() {
    return {
      signalData: false,
      isAndroid: false,
      isiOS: false
    }
  },
  created() {
    console.log('初始化mixin')
  },
  mounted() {
    const that = this
    // 判断IOS 还是 安卓
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (this.isAndroid) {
      /*与安卓交互的所有JS方法都要放在此处注册，才能调用通过JS调用安卓或者让安卓调用这里的JS*/
      this.connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
          let data = { 'Javascript Responds': '初始化' }
          responseCallback(data)
        })
        // 接收安卓发来的消息 并返回给安卓通知
        bridge.registerHandler('functionInJs', function(data, responseCallback) {
          that.signalData = data
          let responseData = 'Javascript Responds: 收到信息'
          responseCallback(responseData)
        })
      })
    }
    if (this.isiOS) {
      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      this.setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getUserIdFromObjC', function(responseData) {
          console.log(responseData)
        })
      })
    }
  },
  methods: {
    // 发送消息给Android data为消息
    tellAndroid(data, callback) {
      // 调用java中的方法  submitFromWeb是方法名
      console.log('发送消息')
      if (this.isAndroid) {
        window.WebViewJavascriptBridge.callHandler('submitFromWeb', data, function(responseData) {
          if (callback) {
            callback(responseData)
          }
        })
      }
      if (this.isiOS) {
        window.WebViewJavascriptBridge.callHandler('getBlogNameFromObjC', data, function(responseData) {
          if (callback) {
            callback(responseData)
          }
        })
      }
    },
    // 注册事件监听
    connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          callback(window.WebViewJavascriptBridge)
        }, false)
      }
    },
    // IOS 初始化代码
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  }
}
