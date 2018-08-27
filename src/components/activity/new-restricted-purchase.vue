<template>
  <div class="body" v-show="detailData" ref='body'>
    <div class="time-cutdown" v-show="time">{{time}}</div>
    <img :src="detailData.image_bg" class="header-img">
    <div class="chest-box flex" v-for="(item, index) in detailData.goods" v-bind:key="item.id">
      <img :src="item.image" class="item-img">
      <div class="discont-box flex" :class="{'oft': index == 0,'wft' : index == 1, 'rft' : index == 2}">{{item.discount}}<span class="min-font">折</span></div>
      <div class="cb-label">{{item.label}}</div>
      <div class="cb-discrpt ellipsis flex">原价<div class="o-price">{{Math.round(item.original_price)}}元<div class="o-heng"></div></div>,现在仅需<span class="now-proce">{{Math.round(item.price)}}</span>元!</div>
      <div class="score flex"><div class="price-top flex">{{item.price*1000}}</div><div class="jia">+</div> <div class="price-bottom flex">{{item.score - item.price*1000}}</div></div>
      <div class="buy-btn postionCenter" @click="_tellIndex(item.id, item.price, item.can_buy)">
        <img :src="detailData.icon_pay" class="item-img">
        <div class="btn-txt flex ellipsis" v-if="item.can_buy">{{item.price}}元 开启礼包</div>
        <div class="btn-txt flex ellipsis" v-else>您已购买该礼包</div>
      </div>
    </div>
    <img src="http://p7o5mvmp4.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8H5%E9%A1%B5%E9%9D%A2_005.jpg" class="footer-img">
  </div>
</template>
<script type="text/javascript">
import {Mixin} from 'common/detailActivityMixin'
export default {
  mixins: [Mixin],
  data () {
    return {
      data: '我是子页面',
      time: false
    }
  },
  created () {
    console.log('初始化new-restricted-purchase')
    // 加载完毕
    this.$emit('initialization')
  },
  computed: {},
  mounted () {
  },
  methods: {
    _inint () {
      if (this.detailData.end_time && this.detailData.start_time) {
        setInterval(() => {
          this.time = this.countDown(this.detailData.end_time, this.detailData.start_time)
        }, 1000)
      }
    },
    countDown (endtime, starttime) {
      let time = Date.parse(new Date()) / 1000
      if (endtime - time <= 0) {
        return '活动已经结束'
      } else {
        if (starttime > time) {
          return '活动还未开启'
        } else {
          return this.normalTimeCountDown(endtime - time)
        }
      }
    },
    normalTimeCountDown: function (item) {
      let day = item / 3600 >= 24 ? parseInt(item / (3600 * 24)) : 0 // 天
      let hour = (item - day * 24 * 3600) / 3600 >= 1 ? parseInt((item - day * 24 * 3600) / 3600) : 0 // 小时
      let minute = (item - day * 24 * 3600 - hour * 3600) / 60 >= 1 ? parseInt((item - day * 24 * 3600 - hour * 3600) / 60) : 0 // 分钟
      let second = item - day * 24 * 3600 - hour * 3600 - minute * 60 // 秒
      day = day == 0 ? '' : day + '天'
      hour = hour == 0 ? '' : hour < 10 ? '0' + hour + ':' : hour + ':'
      minute = minute == 0 ? '' : minute < 10 ? '0' + minute + ':' : minute + ':'
      second = second < 10 ? '0' + second : second
      return day + hour + minute + second
    },
    _tellIndex (goodid, price, canbuy) {
      console.log('点击按钮')
      if (canbuy) {
        this.$emit('activity', {goodid, price})
      } else {
        this.$emit('tips', '您已购买该礼包')
      }
    }
  },
  watch: {
  }
}
</script>
<style scoped>
img{
  pointer-events: none;
}
.hidden{
  opacity: 0;
  visibility: hidden;
}
.body{
  width: 100%;
  height: auto;
/*  padding-bottom: 20px;*/
  position: relative;
}
.area{
  background: #b858b9;
}
.header-img{
  display: block;
  width: 100%;
  height: auto;
  min-width: 320px;
  max-width: 420px;
  margin: 0 auto;
}
.chest-box{
  width: 100%;
  min-width: 310px;
  max-width: 420px;
  height: auto;
  flex-wrap: wrap;
  align-items: flex-start;
/*  border-radius: 8px;*/
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.buy-btn{
  width: 150px;
  height: 40px;
  position: absolute;
  top: 86%;
  background-size: 100% 100%;
}
.item-img{
  width: 100%;
  height: 100%;
}
.btn-txt{
  position: absolute;
  left: 0;
  top: 0;
  height: 85%;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-shadow: 1px 0 20px #CE4E18;
}
.discont-box{
  width: 20%;
  height: 20%;
  position: absolute;
  left: 6%;
  top: 16%;
  font-size: 24px;
  font-weight: bolder;
  z-index: 9999;
}
.oft{
  color: #f9e67b;
}
.wft{
  color: #F6F6F6;
}
.rft{
  color: #EC5436;
}
.min-font{
  font-size: 15px;
}
.cb-label{
  position: absolute;
  left: 50%;
  top: 12%;
  transform: translate(-50%, 0);
  font-size: 18px;
  color: #fff;
  font-weight: 600;
}
.cb-discrpt{
  width: 50%;
  position: absolute;
  left: 53%;
  top: 23%;
  transform: translate(-40%, 0);
  font-size: 14px;
  color: #fff;
  justify-content: flex-start;
  vertical-align: bottom;
}
.o-price{
  position: relative;
}
.o-heng{
  width: 100%;
  height: 1px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 50%;
}
.now-proce{
  font-size: 24px;
  color: #FEDC24;
  font-weight: 900;
}
.score{
  width: 20%;
  height: 8%;
  position: absolute;
  left: 35.5%;
  top: 64%;
  color: #FDD523;
  /*flex-wrap: wrap;*/
}
.price-top{
  width: 100%;
  height: 50%;
  font-size: 15px;
  font-weight: 600;
  justify-content: flex-start;
}
.price-bottom{
  width: 100%;
  height: 50%;
  font-size: 15px;
  font-weight: 600;
  justify-content: flex-start;
 /* font-weight: 600;*/
}
.time-cutdown{
  position: absolute;
  top: 15%;
  left: 48%;
  z-index: 9999999;
  font-size: 12px;
  color: #B05111;
  font-weight: 600;
}
.jia{
  margin: 0 3px;
  font-weight: 600;
}
.footer-img{
  width: 100%;
  height: auto;
}
</style>
