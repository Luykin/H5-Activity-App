<template>
  <div>
    <img src="http://p70pqu6ys.bkt.clouddn.com/%E4%BC%9A%E5%91%98%E9%A1%B5%E9%9D%A212%E5%85%83001.jpg" alt="视频卡" class="bg-img">
    <div class="record flex" @click="_toRecord">购买记录</div>
    <div class="video-btn flex" @click="_showPop" v-if='show'>立即开通</div>
    <div class="pop-box" ref='popbox' v-loading='loading'>
      <div class="pop-box-top flex" v-if="services">
        <div class="pbt-tipis flex">1元 = 1000积分</div>
        <div v-for="item in services" class="pbt-item flex" :class='{"active-pbt-item": activeServices.id === item.id}' @click="_chose(item)">
          <span class="pbt-label flex">{{item.label}}</span>
          <div class="pbt-score flex"><span class="pbt-score-fw">{{item.score}}</span>积分</div>
          <span class="pbt-point flex">{{item.point}}个月</span>
          <img src="http://pbfntaxkx.bkt.clouddn.com/%E9%80%89%E4%B8%AD%E8%A7%92%E6%A0%87@3x.png" alt="选中图标" class="chose-img" v-show='activeServices.id === item.id'>
        </div>
      </div>
      <div class="pop-box-btn flex" @click="_exchange">立即兑换</div>
    </div>
    <interlayer ref="interlayer" @close='_hidePop'></interlayer>
    <top-tips ref="toptips">{{tips}}</top-tips>
  </div>
</template>
<script>
import { Mixin } from 'common/mixin'
import topTips from 'base/topTips/toptips'
import { getActivityDetail } from 'api/index'
import { addkamitask } from 'api/videocard'
import interlayer from 'base/interlayer/interlayer'
import { encryptByDES, decryptByDES } from 'common/util'
import { SUCCESS_CODE } from 'api/config'
export default {
  data() {
    return {
      signalData: null,
      tips: '',
      services: false,
      activeServices: null,
      loading: false,
      show: true
    }
  },
  created() {
    if (this._openInWebview()) {

    } else {}
    this._setActivity()
  },
  mounted() {

  },
  methods: {
    _toRecord() {
      // this.signalData.uaid, this.signalData.user_id, this.signalData.category, this.signalData.campaign_id, this.signalData.env
      this.$refs.interlayer._hiddenLayer()
      this.$refs.popbox.setAttribute('style', 'animation: none')
      this.$router.push({
        path: `/video-record?user_id=${this.signalData.user_id}&env=${this.signalData.env}`
      })
      this.$root.eventHub.$emit('record')
    },
    _chose(item) {
      this.activeServices = item
    },
    _exchange() {
      if (!this.signalData) {
        this._tips('加载数据中')
        return false
      }
      this.loading = true
      addkamitask(this.signalData.uaid, this.signalData.user_id, this.activeServices.id, this.signalData.env).then((res) => {
        this.loading = false
        if (res.err_msg) {
          // console.log(res.err_msg)
          this._tips(res.err_msg)
          return
        }
        if (res.status === 'ok' && res.task_info[0]) {
          this._tips('购买成功')
          this.$router.replace({
            path: `/video-sucess?good=${this.activeServices.category}&id=${res.task_info[0].id}&user_id=${this.signalData.user_id}&env=${this.signalData.env}`
          })
        }
      })
    },
    _openInWebview() {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
        return false
      } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
        return false
      } else if (ua.match(/WeiBo/i) == "weibo") {
        return false
      } else {
        if (ua.match(/Android/i) != null) {
          return ua.match(/browser/i) == null
        } else if (ua.match(/iPhone/i) != null) {
          return ua.match(/safari/i) == null
        } else {
          return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
        }
      }
    },
    _setActivity() {
      this.signalData = this.$route.query
      const query = this.$route.query
      if (!query.uaid || !query.user_id || !query.category || !query.campaign_id || !query.env) {
        this.$nextTick(() => {
          this._tips('缺少必填参数')
        })
        return false
      } else {
        this._getActivityDetail(this.signalData.uaid, this.signalData.user_id, this.signalData.category, this.signalData.campaign_id, this.signalData.env)
      }
    },
    _getActivityDetail(uaid, userid, category, campaignid, prefixurl) {
      getActivityDetail(uaid, userid, category, campaignid, prefixurl).then((res) => {
        if (res.errorStatus || res.err_msg) {
          this._tips(res.errorStatus || res.err_msg)
          return
        }
        if (res.services) {
          this.activeServices = res.services[0]
          this.services = res.services
        }
      })
    },
    _showPop() {
      this.$refs.interlayer._showLayer()
      this.$refs.popbox.setAttribute('style', 'animation: popboxbtnshow .3s ease-out 1 forwards')
    },
    _hidePop() {
      this.$refs.interlayer._hiddenLayer()
      this.$refs.popbox.setAttribute('style', 'animation: popboxbtnhide .3s ease-out 1 forwards')
    },
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
  },
  components: {
    interlayer,
    topTips
  }
}

</script>
<style type="text/css" media="screen">
.bg-img {
  width: 100%;
  height: auto;
  padding-bottom: 50px;
}

.video-btn {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  z-index: 99;
  background: linear-gradient(180deg, rgba(245, 213, 144, 1), rgba(161, 116, 42, 1));
  color: rgba(63, 29, 7, 1);
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 5px;
  font-family: PingFangSC-Medium;
}

.pop-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 220px;
  background: #fff;
  z-index: 9999;
  transform: translate(0, 100%);
}

.pop-box-top {
  height: 80%;
  width: 100%;
  flex-wrap: wrap;
  align-content: center;
}

.pop-box-btn {
  height: 20%;
  width: 100%;
  background: #EF4D4D;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  letter-spacing: 5px;
}

.pbt-item {
  width: 29%;
  height: 65%;
  margin: 0 1%;
  border-radius: 5px;
  border: 1px solid rgba(231, 231, 231, 1);
  position: relative;
  flex-wrap: wrap;
  align-content: center;
}

.pbt-tipis {
  width: 93%;
  padding: 0 3.5%;
  height: 15%;
  margin-top: -5%;
  justify-content: flex-start;
  color: #555;
}

.pbt-label {
  width: 100%;
  color: rgba(51, 51, 51, 1);
  font-size: 13px;
}

.pbt-score {
  width: 100%;
  font-size: 10px;
  color: #555;
  margin: 20px auto;
}

.pbt-score-fw {
  color: #FF5454;
  font-size: 20px;
  font-weight: 900;
}

.pbt-point {
  color: #333;
  font-size: 14px;
}

.chose-img {
  width: 30%;
  height: auto;
  position: absolute;
  bottom: 0;
  right: 0;
}

.active-pbt-item {
  border: 1px solid #FF5454;
}

.record {
  width: 4.86rem;
  height: 1.71rem;
  position: absolute;
  right: 0;
  top: 47%;
  background: linear-gradient(180deg, rgba(252, 224, 164, 1), rgba(187, 141, 54, 1));
  border-radius: 7.14rem 0rem 0rem 7.14rem;
  border: 0.07rem solid rgba(211, 183, 106, 1);
  color: rgba(86, 51, 11, 1);
}

@keyframes popboxbtnshow {
  0% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes popboxbtnhide {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 100%);
  }
}

</style>
