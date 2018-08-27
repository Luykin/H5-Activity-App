<template>
  <div class="down-body">
    <top-tips ref="toptips">{{tips}}</top-tips>
    <img src="http://p70pqu6ys.bkt.clouddn.com/%E7%95%8C%E9%9D%A2@3x.png" alt="iqos活动背景">
    <img src="http://p70pqu6ys.bkt.clouddn.com/%E6%B7%BB%E5%8A%A0%E5%BE%AE%E4%BF%A1%E5%8F%B7@3x1.png" alt="添加微信" class="iqos-wx" :data-clipboard-text="wx">
    <div class="wx-box">
      <div class="p-wx-box flex">{{wx}}</div>
    </div>
<!--     <textarea ref="inputT" class="input-css">{{wx}}</textarea> -->
  </div>
</template>
<script type="text/javascript">
import topTips from 'base/topTips/toptips'
import ClipboardJS from 'clipboard'

export default {
  data() {
    return {
      tips: '',
      wx: 'cq-IQOS2018'
    }
  },
  created() {
    const clipboard = new ClipboardJS('.iqos-wx')
    const that = this
    clipboard.on('success', function(e) {
      that._tips('已将微信号复制到剪贴板打开微信添加朋友，粘贴即可')
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);

      e.clearSelection()
    });

    clipboard.on('error', function(e) {
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    });
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
      const Url2 = this.$refs.inputT
      Url2.select()
      document.execCommand("Copy")
      this._tips('已将微信号复制到剪贴板打开微信添加朋友，粘贴即可')
      Url2.blur()
    },
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
  },
  components: {
    topTips
  }
}

</script>
<style scoped>
.iqos-wx {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: auto;
}

.input-css {
  width: 0;
  height: 0;
  opacity: 0;
}

.wx-box {
  position: absolute;
  top: 0;
  width: 100%;
  padding-top: 314%;
  /*  background: red;*/
}

.p-wx-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  color: #000;
  font-size: 18px;
  text-indent: 130px;
}

</style>
