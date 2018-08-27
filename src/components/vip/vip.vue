<template>
  <div class="area" ref='area'>
    <scroller>
      <div class="header">
        <div class="header-info flex">当前积分值:</div>
        <div class="header-scroe flex" v-if="userInfo">{{userInfo.sum_score}}</div>
        <div class="haader-btn flex" @click="_tell(0)">立即升级</div>
        <div class="header-cha flex" v-show = '!maxLave'>{{IntegralGap}}，即可获得更多权益</div>
        <div class="header-cha flex" v-show = 'maxLave'>您已达到最大等级，快去享受尊贵权益吧~</div>
      </div>
      <div class="vip-title flex">等级积分介绍</div>
      <div class="canvas-warp-box flex" ref='canvasWarp' v-if="vipGradeList" :class="{'max-lave': maxLave || topVip}">
        <div class="warp-box flex">
          <div v-for="(item, index) in vipGradeList" class="vip-item flex">
            <img :src="userInfo.avatar" alt="用户头像" v-if="userInfo && index == lightUpLaction" class="user-img">
            <div class="order flex" ref='userSC'>{{item.sum_score}}</div>
            <div class="tick flex" :class="_widthClass(index)">
              <div class="user-tick" ref='userTick'></div>
            </div>
            <div class="order flex" ref='userDJ'>{{item.label}}</div>
          </div>
        </div>
      </div>
      <div class="vip-title flex">等级特权介绍</div>
      <div class="liberty-warp-box" v-if="vipGradeList">
        <div class="lwb-title flex lwb-item">
          <div class="lwb-item-cul title-lwb-ic flex" v-for="item in titleLiberty">{{item}}</div>
        </div>
        <div class="lwb-item flex" v-for="item in vipGradeList">
          <div class="lwb-item-cul golden flex">{{item.label}}</div>
          <div class="lwb-item-cul flex">{{item.sign_score}}</div>
          <div class="lwb-item-cul flex">{{item.discount >= 1 ? '无' : item.discount * 10 + '折'}}</div>
          <div class="lwb-item-cul flex">{{item.speed_up === 1 ? '无' : '100%'}}</div>
          <div class="lwb-item-cul flex">{{item.grade === 0 ? '非VIP' : item.grade === 1 ? '初级VIP' : item.grade === 2 ? '中级VIP' :item.grade === 3 ? '高级VIP' : '无'}}</div>
        </div>
      </div>
      <div class="privilege-box flex">
        <div v-for="item in privilegeList" class="pb-item-warp">
          <div class="pb-item flex">
            <img :src="item.icon" :alt="item.title" class="pb-item-icon">
            <div class="pb-item-title flex">{{item.title}}</div>
            <div class="pb-item-title flex describe ellipsis">{{item.describe}}</div>
          </div>
        </div>
      </div>
      <div class="vip-title flex">成长值介绍</div>
      <div class="normal-box flex">购买获取积分数量 = 成长值数量(积分)</div>
      <div class="vip-title flex">升级宝典</div>
      <div class="btn-warp flex">
        <img src="http://p7o5mvmp4.bkt.clouddn.com/%E5%8D%87%E7%BA%A7%E5%AE%9D%E5%85%B8_%E7%AB%8B%E5%8D%B3%E8%B4%AD%E4%B9%B0@3x.png" alt="购买积分" class="bw-img1">
        <div class="bw-info flex">
          <div class="bw-info-item flex bii-title ellipsis">购买积分</div>
          <div class="bw-info-item flex describe ellipsis">1积分=1成长值</div>
        </div>
        <div class="bw-btn flex" @click="_tell(1)">立即购买</div>
      </div>
      <!-- 			<div class="btn-warp flex">
				<img src="http://p7o5mvmp4.bkt.clouddn.com/%E5%8D%87%E7%BA%A7%E5%AE%9D%E5%85%B8_%E7%AB%8B%E5%8D%B3%E7%AD%BE%E5%88%B0@3x.png" alt="购买积分" class="bw-img">
				<div class="bw-info flex">
					<div class="bw-info-item flex bii-title ellipsis">每日签到加积分</div>
					<div class="bw-info-item flex describe ellipsis">会员等级越高，签到奖励积分更多</div>
				</div>
				<div class="bw-btn flex" @click="_tell(2)">立即签到</div>
			</div>
			<div class="btn-warp flex">
				<img src="http://p7o5mvmp4.bkt.clouddn.com/%E5%8D%87%E7%BA%A7%E5%AE%9D%E5%85%B8_%E8%B5%9A%E5%8F%96%E7%A7%AF%E5%88%86@3x.png" alt="购买积分" class="bw-img">
				<div class="bw-info flex">
					<div class="bw-info-item flex bii-title ellipsis">做任务，赚积分</div>
					<div class="bw-info-item flex describe ellipsis">完成不同的任务，获得更多的积分</div>
				</div>
				<div class="bw-btn flex" @click="_tell(3)">赚取积分</div>
			</div> -->
    </scroller>
    <top-tips ref="toptips">{{tips}}</top-tips>
  </div>
</template>
<script type="text/javascript">
import { Mixin } from 'common/mixin'
// import canvasVip from 'components/vipGradeCanvas/canvas'
import topTips from 'base/topTips/toptips'
import { getVips, getUserInfo } from 'api/vip'
export default {
  mixins: [Mixin],
  data() {
    return {
      tips: '',
      vipGradeList: false,
      maxLave: null,
      topVip: null,
      userInfo: false,
      lightUpLaction: 0,
      titleLiberty: ['等级', '签到积分', '积分折扣', '刷粉速度', '活动特权'],
      privilegeList: [{
        icon: 'http://p7o5mvmp4.bkt.clouddn.com/%E7%AD%BE%E5%88%B0%E7%A7%AF%E5%88%86@3x.png',
        title: '签到积分',
        describe: '每天签到获取积分',
      }, {
        icon: 'http://p7o5mvmp4.bkt.clouddn.com/%E7%B2%89%E5%B8%81%E6%8A%98%E6%89%A3@3x.png',
        title: '积分折扣',
        describe: '购买积分享八五折',
      }, {
        icon: 'http://p7o5mvmp4.bkt.clouddn.com/%E9%99%90%E8%B4%AD%E7%A4%BC%E5%8C%85@3x.png',
        title: '限购礼包',
        describe: '多次礼包购买特权',
      }, {
        icon: 'http://p7o5mvmp4.bkt.clouddn.com/%E5%88%B7%E7%B2%89%E9%80%9F%E5%BA%A6@3x.png',
        title: '刷粉速度',
        describe: '优先派单急速涨粉',
      }]
    }
  },
  created() {
    this._setVipInfo()
    // this._vipInit()
  },
  computed: {
    // _userClass(index) {
    // 	return `user-vip-item${this.lightUp[index]}`
    // },
    IntegralGap() {
      if (this.vipGradeList && this.userInfo) {
        // this.$nextTick(() => {
        // 	console.log(this.$refs.userTick)
        // 	this.$refs.userTick[0].className = 'user-tick user-vip-item100'
        // })
        let score
        let vipRank
        for (let i = 0; i < this.vipGradeList.length; i++) {
          if (this.userInfo.sum_score <= 0) {
            score = this.vipGradeList[0].sum_score - this.userInfo.sum_score
            vipRank = this.vipGradeList[0].label
            this.$nextTick(() => {
              this.$refs.userTick[0].className = `user-tick user-vip-item0`
            })
            this.lightUpLaction = 0
            break
          }
          if (this.userInfo.sum_score < this.vipGradeList[0].sum_score && this.userInfo.sum_score > 0) {
            score = this.vipGradeList[0].sum_score - this.userInfo.sum_score
            vipRank = this.vipGradeList[1].label
            // this.lightUp[i] = (this.userInfo.sum_score/this.vipGradeList[0].sum_score).toFixed(1) * 100
            this.$nextTick(() => {
              this.$refs.userSC[0].style.color = '#9D7D59'
              this.$refs.userDJ[0].style.color = '#9D7D59'
              this.$refs.userTick[0].className = `user-tick user-vip-item${(this.userInfo.sum_score/this.vipGradeList[0].sum_score).toFixed(1) * 100}`
            })
            this.lightUpLaction = 0
            break
          }
          if (this.userInfo.sum_score < this.vipGradeList[i].sum_score && this.userInfo.sum_score >= this.vipGradeList[i - 1].sum_score) {
            setTimeout(() => {
              this.$refs.userSC[i].style.color = '#9D7D59'
              this.$refs.userDJ[i].style.color = '#9D7D59'
              this.$refs.userTick[i].className = `user-tick user-vip-item${(this.userInfo.sum_score/this.vipGradeList[i].sum_score).toFixed(1) * 100}`
            }, i * 500)
            this.lightUpLaction = i
            score = this.vipGradeList[i].sum_score - this.userInfo.sum_score
            if (i >= this.vipGradeList.length - 1) {
            	this.topVip = true
              vipRank = this.vipGradeList[this.vipGradeList.length - 1].label
            } else {
              vipRank = this.vipGradeList[i + 1].label
            }
            break
          }
          if (this.userInfo.sum_score >= this.vipGradeList[this.vipGradeList.length - 1].sum_score) {
            score = 0
            this.lightUpLaction = this.vipGradeList.length - 1
            this.maxLave = true
            for (let i = 0; i < this.vipGradeList.length; i++) {
              setTimeout(() => {
                this.$refs.userSC[i].style.color = '#9D7D59'
                this.$refs.userDJ[i].style.color = '#9D7D59'
                this.$refs.userTick[i].className = `user-tick user-vip-item100`
              }, i * 500)
            }
            vipRank = this.vipGradeList[this.vipGradeList.length - 1].label
            break
          }
          if (this.userInfo.sum_score >= this.vipGradeList[i].sum_score) {
            setTimeout(() => {
              this.$refs.userSC[i].style.color = '#9D7D59'
              this.$refs.userDJ[i].style.color = '#9D7D59'
              this.$refs.userTick[i].className = `user-tick user-vip-item100`
            }, i * 500)
          }
        }
        return `还差${score}积分升级${vipRank}`
      } else {
        return `还差0积分升级VIP0`
      }
    }
  },
  mounted() {
    // tellAndroid
  },
  methods: {
    _tell(res) {
      this.tellAndroid(res)
    },
    _setVipInfo() {
      this.signalData = this.$route.query
      const query = this.$route.query
      if (!query.uaid || !query.user_id || !query.env || !query.market) {
        this.$nextTick(() => {
          this._tips('缺少必填参数')
        })
        return false
      } else {
        this._vipInit(query.uaid, query.env, query.user_id, query.market)
      }
    },
    _vipInit(uaid, env, userid, marketPosition) {
      // console.log(marketPosition)
      getVips(uaid, env).then((res) => {
        if (res.errorStatus) {
          this._tips(res.errorStatus)
          return
        }
        if (res) {
          this.vipGradeList = this._formatVG(res)
        }
      })
      getUserInfo(uaid, userid, env, marketPosition).then((res) => {
        if (res.errorStatus) {
          this._tips(res.errorStatus)
          return
        }
        if (res) {
          // console.log(res)
          this.userInfo = res.user
        }
      })
    },
    _formatVG(res) {
      res.forEach((item) => {
        item.grade = 0
        if (item.vip_rights && item.vip_rights.length) {
          for (let i = 0; i < item.vip_rights.length; i++) {
            if (item.vip_rights[i].grade != 0) {
              item.grade = item.vip_rights[i].grade
              break
            }
          }
        }
      })
      return res
    },
    _widthClass(index) {
      return `vip-item${index}`
    },
    // _userClass(index) {
    // 	return `user-vip-item${this.lightUp[index]}`
    // },
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
.vip-title {
  justify-content: flex-start;
  border-left: 4px solid #333333;
  height: 20px;
  width: 90%;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-indent: 10px;
  margin: 15px auto;
}

.privilege-box {
  width: 92%;
  height: auto;
  flex-wrap: wrap;
  margin: 15px auto 0;
  justify-content: flex-start;
}

.pb-item-warp {
  max-width: 34%;
  min-width: 33%;
  /*height: */
  padding-top: 33.3%;
  flex-grow: 1;
  position: relative;
}

.pb-item {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  flex-wrap: wrap;
  align-content: center;
}

.header {
  width: 100%;
  padding-top: 50%;
  background: url('http://p7o5mvmp4.bkt.clouddn.com/%E4%BC%9A%E5%91%98%E7%A7%AF%E5%88%86%E8%83%8C%E6%99%AF@3x.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.canvas-warp-box {
  margin: 0 auto;
  width: 92%;
  padding-top: 65%;
  border: 1px solid #EBEBEB;
  border-radius: 5px;
  position: relative;
}

.lwb-item {
  height: 40px;
}

.lwb-item-cul {
  width: 0;
  height: 100%;
  flex-grow: 1;
  color: #333;
  /*background: #E3D4C2;*/
  border-right: 1px solid #E5DFD7;
  border-top: 1px solid #E5DFD7;
  font-size: 10px;
  /*	font-weight: 600;*/
}

.title-lwb-ic {
  background: #E3D4C2;
}

.golden {
  color: #A68968;
}

.liberty-warp-box {
  width: 92%;
  height: auto;
  min-height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  border-bottom: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  overflow: hidden;
  /*border-top: 1px solid #EBEBEB;*/
}

.warp-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.vip-item {
  flex-grow: 1;
  width: 0;
  height: 100%;
  min-height: 100%;
  flex-shrink: 0;
  align-items: flex-end;
  flex-wrap: wrap;
  align-content: flex-end;
}

.tick {
  width: 30%;
  background: #C8CDD2;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-items: flex-end;
  overflow: hidden;
}

.user-tick {
  width: 100%;
  height: 0;
  background: #9D7D59;
}

.vip-item0 {
  animation: gradientA .5s ease-out 0s 1 forwards;
}

.vip-item1 {
  animation: gradientB .5s ease-out .2s 1 forwards;
}

.vip-item2 {
  animation: gradientC .5s ease-out .4s 1 forwards;
}

.vip-item3 {
  animation: gradientD .5s ease-out .6s 1 forwards;
}

.vip-item4 {
  animation: gradientE .5s ease-out .8s 1 forwards;
}

.vip-item5 {
  animation: gradientF .5s ease-out 1s 1 forwards;
}

.vip-item6 {
  animation: gradientG .5s ease-out 1.2s 1 forwards;
}

.user-vip-item0 {
  /*animation: gradientZ .5s ease-out 0s 1 forwards;*/
}

.user-vip-item10 {
  animation: gradientZ .5s ease-out 0s 1 forwards;
}

.user-vip-item20 {
  animation: gradientA .5s ease-out 0s 1 forwards;
}

.user-vip-item30 {
  animation: gradientB .5s ease-out 0s 1 forwards;
}

.user-vip-item40 {
  animation: gradientC .5s ease-out 0s 1 forwards;
}

.user-vip-item50 {
  animation: gradientD .5s ease-out 0s 1 forwards;
}

.user-vip-item60 {
  animation: gradientE .5s ease-out 0s 1 forwards;
}

.user-vip-item70 {
  animation: gradientF .5s ease-out 0s 1 forwards;
}

.user-vip-item80 {
  animation: gradientG .5s ease-out 0s 1 forwards;
}

.user-vip-item90 {
  animation: gradientH .5s ease-out 0s 1 forwards;
}

.user-vip-item100 {
  animation: gradientI .5s ease-out 0s 1 forwards;
}

@keyframes gradientZ {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 10%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientA {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 20%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientB {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 30%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientC {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 40%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientD {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 50%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientE {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 60%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientF {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 70%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientG {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 80%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientH {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 90%;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes gradientI {
  0% {
    height: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    height: 100%;
    transform: translate3d(0, 0, 0);
  }
}

.order {
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: #DFE1E2;
  overflow: hidden;
}

.normal-box {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.pb-item-icon {
  width: 40%;
  height: auto;
}

.pb-item-title {
  width: 100%;
  height: 20%;
}

.bw-info-item {
  height: 40%;
  width: 100%;
  text-indent: 10px;
  font-size: 16px;
  justify-content: flex-start;
}

.describe {
  font-size: 10px;
  color: #DEDEDE;
}

.btn-warp {
  width: 100%;
  height: 55px;
  margin: 10px auto;
}

.bw-info {
  width: 58%;
  height: 100%;
  flex-wrap: wrap;
  /*justify-content: flex-start;*/
  align-content: center;
}

.bw-btn {
  width: 22%;
  height: 55%;
  border-radius: 1000px;
  background: #555555;
  color: #DBC3A1;
}

.bw-img1 {
  width: 9%;
  height: auto;
}

.bw-img {
  width: 8%;
  height: auto;
}

.header-info {
  width: 100%;
  color: #fff;
  position: absolute;
  top: 10%;
  font-size: 14px;
}

.header-scroe {
  width: 100%;
  color: #fff;
  position: absolute;
  top: 26%;
  font-size: 38px;
}

.haader-btn {
  width: 75px;
  height: 25px;
  border-radius: 1000px;
  border: 1px solid #fff;
  color: #fff;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 14px;
}

.header-cha {
  width: 100%;
  font-size: 13px;
  color: #fff;
  position: absolute;
  bottom: 5%;
}

.lightUp {
  background: #9D7D59;
}

.user-img {
  display: block;
  width: 60%;
  height: auto;
  border-radius: 1000px;
  overflow: hidden;
}
.max-lave{
	padding-top: 85%;
}
</style>
