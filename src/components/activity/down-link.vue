<template>
  <div class="down-body">
    <top-tips ref="toptips">{{tips}}</top-tips>
    <popup ref="popup">
      <div class="qr-code-warp flex">
        <!-- <img src="http://p8sxtcg6t.bkt.clouddn.com/1531743481.png" alt="下载链接二维码" class="qr-code"> -->
        <div class="flex qr-text pop-h">下载安装《拳皇命运》</div>
        <div class="flex qr-text">请点击按钮复制添加</div>
        <div class="flex qr-text">微信活动客服</div>
        <img src="http://p8sxtcg6t.bkt.clouddn.com/456.png" alt="客服微信" class="btn-wx" @click="_copy">
      </div>
    </popup>
    <interlayer ref="interlayer" @close='_interlayerHide'></interlayer>
    <div class="xiazai">
      <div class="down-ck" @click="_down"></div>
    </div>
    <div class="copy-q">
      <div class="copyq" @click="_copy">
        <textarea id="input-css">4739180</textarea>
      </div>
    </div>
    <img src="http://p8sxtcg6t.bkt.clouddn.com/%E7%AB%8B%E5%8D%B3%E5%8F%82%E4%B8%8E@3x.png" alt="下载链接二维码" class="btn-img" @click="_down">
    <img src="http://p8sxtcg6t.bkt.clouddn.com/123312.png" alt="活动背景图" class="body-img">
    <!-- <top-tips ref="toptips">{{tips}}</top-tips> -->
  </div>
</template>
<script type="text/javascript">
import popup from 'base/popup/popup'
import interlayer from 'base/interlayer/interlayer'
import topTips from 'base/topTips/toptips'
export default {
  data() {
    return {
      tips: ''
    }
  },
  created() {
    // this.$refs.popup._showPopup()
  },
  mounted() {
    // this.$refs.popup._showPopup()
  },
  methods: {
    _down() {
      this.$refs.popup._showPopup()
      this.$refs.interlayer._showLayer()
    },
    _interlayerHide() {
      this.$refs.popup._hiddenPopup()
      this.$refs.interlayer._hiddenLayer()
    },
    _copy() {
      var Url2 = document.getElementById("input-css")
      Url2.select()
      document.execCommand("Copy")
      this._tips('已复制微信号码')
      Url2.blur()
    },
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
  },
  components: {
    popup,
    interlayer,
    topTips
  }
}

</script>
<style scoped>
.down-body {
  width: 100%;
}

.qr-code-warp {
  flex-wrap: wrap;
  width: 280px;
  height: 300px;
  align-content: center;
}

.qr-text {
  width: 100%;
  height: 30px;
  color: #C07848;
}

.body-img {
  display: block;
  width: 100%;
  height: auto;
  padding-bottom: 50px;
}

.btn-img {
  display: block;
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  height: 50px;
}

#input-css {
  width: 100%;
  height: 100%;
  opacity: 0;
}

.down-ck {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 12%;
  z-index: 9999;
  /*  background: #000;*/
}

.xiazai {
  position: absolute;
  padding-top: 135%;
  width: 100%;
  /*  background: #000;*/
}

.copyq {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5%;
  /*  background: #000;*/
}

.copy-q {
  position: absolute;
  padding-top: 258%;
  width: 100%;
  /*  background: #000;*/
}

.qr-code {
  width: 65%;
  height: auto;
}

.btn-wx {
  width: 70%;
  height: auto;
  margin: 10px auto;
}

.pop-h {
  text-rendering: auto;
  height: 40px;
  margin-bottom: 40px;
  font-weight: bolder;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
  "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
}

</style>
