<template>
  <div class="body" ref='body' v-show="detailData">
    <img :src="detailData.image_bg">
    <img src="http://p7o5mvmp4.bkt.clouddn.com/%E5%AD%97@3x.png" class="font-img">
    <img src="http://p7o5mvmp4.bkt.clouddn.com/%E9%87%91%E5%B8%81@3x.png" class="awd-img">
    <img src="http://p7o5mvmp4.bkt.clouddn.com/%E8%B4%AD%E4%B9%B0%E6%8C%89%E9%92%AE@3x.png" class="btn-img">
    <!-- <div class="price flex" @click="_tellIndex(detailData.good.id, detailData.good.price, !detailData.is_buy)"></div> -->
    <div class="price flex has-buy" @click="_tellIndex(detailData.good.id, detailData.good.price, !detailData.is_buy)" v-if="detailData.is_buy">您已经购买过该礼包</div>
    <div class="price flex" v-if="!detailData.is_buy" @click="_tellIndex(detailData.good.id, detailData.good.price, !detailData.is_buy)">
      <div class="o-pirce ellipsis">
        原价￥{{detailData.good.original_price}} 
        <div class="hen1"></div>
      </div>
      <div class="n-pirce ellipsis">现价￥{{detailData.good.price}}</div>
    </div>
    <div class="award-box-left flex"> 
      <div class="abf-title flex r-c ellipsis">{{detailData.awards[0].label}}</div>
      <div class="abf-title flex" ellipsis>原价{{Math.round(detailData.awards[0].score/1000)}}元</div>
    </div>
    <div class="award-box-right flex">
      <div class="abf-title flex r-c">{{detailData.awards[1].label}}</div>
      <div class="abf-title flex">享受购买{{Math.round(detailData.awards[1].discount*10)}}折</div>
    </div>
   <img src="http://p7o5mvmp4.bkt.clouddn.com/libao.png" class="libao-img">
  </div>
</template>
<script type="text/javascript">
import {Mixin} from 'common/detailActivityMixin'
export default {
  mixins: [Mixin],
  data () {
    return {
      data: '我是子页面'
    }
  },
  created () {
    console.log('初始化first-recharg-one')
    // 加载完毕
    this.$emit('initialization')
  },
  mounted () {
    // tellAndroid
  },
  methods: {
    _inint () {
      // setInterval(() => {
      //   this.time = this.countDown(this.detailData.end_time)
      // }, 1000)
    },
    _get () {
      console.log('父页面调用了我')
    },
    _tellIndex (goodid, price, canbuy) {
      console.log('点击')
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
.body{
  width: 100%;
  height: auto;
  position: relative;
}
.font-img{
  position: absolute;
  width: 90%;
  height: auto;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
  z-index: 999;
}
.awd-img{
  position: absolute;
  width: 75%;
  height: auto;
  left: 50%;
  top: 36%;
  transform: translate(-50%, 0);
  z-index: 998;
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
.btn-img{
  position: absolute;
  top: 69%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0);
  z-index: 999;
}
.bottom-img{
  height: auto;
  min-height: 200px;
  max-height: 250px;
}
.libao-box{
  width: 90%;
  height: 18%;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, 0);
}
.libao-img{
  width: 90%;
  height: auto;
  position: absolute;
  left: 50%;
  bottom: 2%;
  transform: translate(-50%, 0);
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
 .price{
  width: 80%;
  height: 6%;
  position: absolute;
  top: 70.5%;
  left: 10%;
  z-index: 99999;
  color: #fff;
  font-size: 16px;
  justify-content: flex-start;
  text-indent: 0;
 }
 .o-pirce{
  width: 40%;
  position: relative;
 }
 .hen1{
  width: 75%;
  margin-right: 15%;
  height: 2px;
  background: #FFC801;
  transform: rotate(-8deg) translate(0 , -10px);
 }
 .n-pirce{
  font-size: 18px;
  text-decoration: underline;
 }
 .has-buy{
  justify-content: center;
  top: 70%;
  left: 5%;
 }
 .award-box-left{
  width: 27%;
  height: 10%;
  position: absolute;
  left: 15%;
  top: 40%;
  z-index: 999999;
  flex-wrap: wrap;
  align-content: center;
 }
 .award-box-right{
  width: 27%;
  height: 10%;
  position: absolute;
  right: 15%;
  top: 40%;
  z-index: 999999;
  flex-wrap: wrap;
  align-content: center;
 }
 .abf-title{
  width: 100%;
  height: 38%;
  font-size: 15px;
  font-weight: 600;
  color: #AC49EC;
 }
 .r-c{
  font-size: 16px;
  color: #FF455D;
 }
</style>
