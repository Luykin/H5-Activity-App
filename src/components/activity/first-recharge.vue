<template>
  <div class="body" v-show="detailData" ref='body'>
    <div v-if="!popup">
      <img :src="detailData.image_bg" class="header-img img">
      <div class="body-box flex">
        <div class="end-time postionCenter">活动倒计时:{{time}}</div>
        <div class="awards-box postionCenter flex">
          <div class="awards flex">
            <div v-for="item in detailData.awards" class="flex award-item">
              <img :src="item.icon" class="award-icon">
              <div class="score flex">+{{item.score || (item.day + '天VIP')}}</div>
            </div>
          </div>
          <div class="awards-name flex">
            <div v-for="item in detailData.awards" class="flex award-txt">
             {{item.label}}
            </div>
          </div>
        </div>
        <img :src="detailData.icon_pay" class="pay-icon postionCenter pay-icon-frames" v-if="!detailData.is_buy" @click="_tellIndex(detailData.good.id, detailData.good.price, !detailData.is_buy)">
        <img :src="detailData.icon_is_pay" class="pay-icon postionCenter pay-icon-frames" v-if="detailData.is_buy" @click="_tellIndex(detailData.good.id, detailData.good.price, !detailData.is_buy)">
        <img :src="detailData.image_bg_1" class="body-img img">
      </div>
      <img :src="detailData.image_bg_2" class="bottom-img img">
    </div>
    <div v-if="popup">
      <img :src="detailData.image_pop" class="pop-img">
    </div>
  </div>
</template>
<script type="text/javascript">
import {Mixin} from 'common/detailActivityMixin'
export default {
  mixins: [Mixin],
  data () {
    return {
      data: '我是子页面',
      time: '倒计时'
    }
  },
  created () {
    console.log('初始化first-recharge')
    // 加载完毕
    this.$emit('initialization')
  },
  mounted () {
    // tellAndroid
  },
  methods: {
    _inint () {
      setInterval(() => {
        this.time = this.countDown(this.detailData.end_time)
      }, 1000)
    },
    _get () {
      console.log('父页面调用了我')
    },
    _tellIndex (goodid, price, canbuy) {
      if (canbuy) {
        this.$emit('activity', {goodid, price})
      } else {
        this.$emit('tips', '您已购买该礼包')
      }
    },
    countDown (endtime) {
      let time = Date.parse(new Date()) / 1000
      if (endtime - time <= 0) {
        return '活动已经结束'
      } else {
        return this.normalTimeCountDown(endtime - time)
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
    }
  },
  watch: {
  }
}
</script>
<style scoped>
.body{
  width: 100%;
  height: auto;
}
.img{
  display: block;
  width: 100%;
  min-width: 320px;
  max-width: 420px;
  margin: 0 auto;
}
.award-item{
  flex-wrap: wrap;
  width: 80px;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #D8A848;
  margin: 0 10px;
}
.award-txt{
  width: 80px;
  height: 100%;
  margin: 0 10px;
  font-size: 14px;
  color: #fff;
}
.body-box{
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.award-icon{
  width: 45px;
  height: 45px;
}
.score{
  width: 100%;
  color: #f45648;
  font-weight: 600;
  font-size: 13px;
}
.end-time{
  position: absolute;
  top: 3%;
  color: #e7a83e;
  font-size: 14px;
}
.pay-icon{
  position: absolute;
  top: 67%;
  width: 75%;
  max-width: 320px;
  min-width: 260px;
  height: auto;
  max-height: 70px;
  min-height: 40px;
  animation: iconframes .8s linear infinite forwards; 
}
.awards-box{
  position: absolute;
  top: 32%;
  height: 120px;
  min-width: 220px;
  flex-wrap: wrap;
  border-radius: 10px;
  background: #f5d788;
  border: 1px solid #D8A848;
  box-shadow: 0px 0px 5px #D8A848;
}
.awards{
  width: 100%;
  height: 80%;
}
.awards-name{
  height: 20%;
  width: 100%;
}
.header-img{
  height: 180px;
}
.body-img{
  height: auto;
  /*min-height: 300px;*/
}
.bottom-img{
  height: auto;
  min-height: 200px;
  max-height: 250px;
}
 @keyframes iconframes {
  0%{
    width: 80%;
  }
  50%{
    width: 70%
  }
  100%{
    width: 80%
  }
 }
</style>
