<template>
  <div>
    <div class="video-box flex">
      <div class="redeem-code flex">
        <span class="ellipsis">{{name}}兑换码:</span>
        <span class="code ellipsis" @click="_copy">{{adtion}}</span>
        <div class="copy-warp flex">
          <div class="copy flex" @click="_copy">复制
            <textarea id="input-css">{{adtion}}</textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="video-box flex">
      <div class="redeem-code flex">
        <span class="ellipsis">兑换链接:</span>
        <span class="code ellipsis" @click="_copyR">{{redeem}}</span>
        <div class="copy-warp flex">
          <div class="copy flex" @click="_copyR">复制
            <textarea id="input-cssR">{{redeem}}</textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="video-box flex" v-show="!iframe">
      <div class="redeem-code flex">
        <span>提示</span>
      </div>
      <span class="tips">1、复制兑换码，点击立即兑换，进入官网兑换页面粘贴并确认，即开通成功。</span>
      <span class="tips">2、每个兑换码有效期为10分钟，购买2个月会员的用户，购买成功后，会出现2个兑换码，进入官网兑换页面依次粘贴有效兑换码即开通成功，三个月会员及以上同理。</span>
      <span class="tips">3、此会员兑换码一经购买，不予退换。购买后请立即使用，以免遗忘后过期。</span>
    </div>
<!--     <div class="if-warp" v-if="iframe">
      <iframe :src="redeem" class="iframe" width="100%" height="100%"></iframe>
    </div> -->
    <img :src="bgimg" alt="兑换流程图" class="bg-img" v-show="!iframe">
    <!-- <div class="pop-box-btn flex" v-show="!iframe" @click="_showiframe">立即兑换</div> -->
    <top-tips ref="toptips">{{tips}}</top-tips>
  </div>
</template>
<script>
import { task } from 'api/videocard'
import topTips from 'base/topTips/toptips'
export default {
  data() {
    return {
      bgimg: '',
      redeem: '', 
      name: '',
      tips: '',
      iframe: null,
      timeforTask: null,
      timeforCumt: 0,
      adtion: '正在获取兑换码中',
      load: true,
      bgList: {
        '2003': 'http://p7o5mvmp4.bkt.clouddn.com/%E8%85%BE%E8%AE%AF%E4%BC%9A%E5%91%98%E5%85%91%E6%8D%A2%E6%B5%81%E7%A8%8B@3x%281%29.jpg',
        '2001': 'http://p7o5mvmp4.bkt.clouddn.com/%E7%88%B1%E5%A5%87%E8%89%BA%E5%85%91%E6%8D%A2%E6%B5%81%E7%A8%8B@3x%281%29.jpg',
        '2002': 'http://p7o5mvmp4.bkt.clouddn.com/%E4%BC%98%E9%85%B7%E4%BC%9A%E5%91%98%E5%85%91%E6%8D%A2%E6%B5%81%E7%A8%8B@3x%281%29.jpg'
      },
      redeemUrl: {
        '2003': 'https://101.200.72.49/codeOrder/txspRecharge_three',
        '2001': 'http://m.iqiyi.com/vip/jihuoma.html',
        '2002': 'https://h5.vip.youku.com/active_card'
      },
      nameList: {
        '2003': '腾讯',
        '2001': '爱奇艺',
        '2002': '优酷'
      }
    }
  },
  created() {
    this.$root.eventHub.$on('sucess', (res) => {
      this.adtion = '正在获取兑换码中'
      this.load = true
      this._clearTimeforSPS()
      this._setflow()
      this._task()
      this.timeforTask = setInterval(() => {
        this._task()
        this.timeforCumt = this.timeforCumt + 1
        if (this.timeforCumt >= 3) {
          this._clearTimeforSPS()
        }
      }, 1500)
    })
    this._setflow()
    this._task()
    this.timeforTask = setInterval(() => {
      this._task()
      this.timeforCumt = this.timeforCumt + 1
      if (this.timeforCumt >= 18) {
        this._clearTimeforSPS()
      }
    }, 1500)
  },
  computed: {
  },
  methods: {
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
    _copyR() {
      var Url2 = document.getElementById("input-cssR")
      Url2.select()
      document.execCommand("Copy")
      this._tips('已复制兑换链接')
      Url2.blur()
    },
    _copy() {
      if (this.load) {
        var Url2 = document.getElementById("input-css")
        this._tips('正在加载兑换码')
        Url2.select()
        Url2.blur()
      } else {
        var Url2 = document.getElementById("input-css")
        Url2.select()
        document.execCommand("Copy")
        this._tips('已复制兑换码')
        Url2.blur()
      }
    },
    _task() {
      task(this.queryG.user_id, this.queryG.id, this.queryG.env).then((res) => {
        console.log(res[0])
        if (res[0].addition) {
          this.load = false
          this.adtion = res[0].addition
          this._clearTimeforSPS()
        } else {}
      })
    },
    _clearTimeforSPS() {
      clearInterval(this.timeforTask)
      this.timeforTask = null
      this.timeforCumt = 0
    },
    _showiframe() {
      if (this.load) {
        this._tips('正在加载兑换码')
      } else {
        if (this.queryG.good !== 'yk') {
          this.iframe = true
        } else {
          window.location.href = 'https://h5.vip.youku.com/active_card'
        }
      }
    },
    _setflow() {
      this.queryG = this.$route.query
      if (!this.queryG.good) {
        this.$router.replace({
          path: '/video-card'
        })
        return false
      } else {
        this.bgimg = this.bgList[this.queryG.good]
        this.redeem = this.redeemUrl[this.queryG.good]
        this.name = this.nameList[this.queryG.good]
      }
    },
  },
  components: {
    topTips
  },
  beforeDestroy() {
  	this._clearTimeforSPS()
  }
}

</script>
<style scoped>
#input-css {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

#input-cssR {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.pop-box-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  background: #EF4D4D;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  letter-spacing: 5px;
}

.video-box {
  width: 100%;
  height: auto;
  min-height: 50px;
  flex-wrap: wrap;
  border-bottom: 2px solid rgba(242, 242, 242, 1);
}

.redeem-code {
  width: 90%;
  height: 40px;
  padding: 0 5%;
  font-size: 15px;
  color: #333;
  justify-content: flex-start;
  margin-top: 10px;
}

.count-down {
  width: 90%;
  height: 30px;
  padding: 0 5%;
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  justify-content: flex-start;
}

.code {
  color: #FF5454;
  width: 160px;
  font-size: 14px;
  text-indent: 8px;
  user-select: text;
}

.copy-warp {
  width: 0;
  flex-grow: 1;
  min-width: 70px;
  justify-content: flex-end;
}

.copy {
  width: 70px;
  height: 25px;
  background: linear-gradient(90deg, rgba(146, 213, 255, 1), rgba(89, 170, 255, 1));
  border-radius: 1000px;
  color: #fff;
  font-size: 14px;
  position: relative;
}

.tips {
  width: 90%;
  padding: 0 5%;
  height: auto;
  font-size: 13px;
  line-height: 20px;
  color: #999;
  margin-bottom: 10px;
}

.if-warp {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
}

iframe {
  border: none;
}

</style>
