<template>
  <div class="body" v-show="detailData" ref='body'>
    <img :src="detailData.image_bg" class="header-img">
    <div class="chest-box flex" v-for="item in detailData.goods" v-bind:key="item.id">
      <img :src="item.image" class="item-img">
      <div class="buy-btn postionCenter" @click="_tellIndex(item.id, item.price, item.can_buy)">
        <img :src="detailData.icon_pay" class="item-img">
        <div class="btn-txt flex ellipsis" v-if="item.can_buy">{{item.price}}元 开启礼包</div>
        <div class="btn-txt flex ellipsis" v-else>您已购买该礼包</div>
      </div>
    </div>
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
    console.log('初始化restricted-purchase')
    // 加载完毕
    this.$emit('initialization')
  },
  mounted () {
  },
  methods: {
    _inint () {
      console.log('inint')
    },
    _tellIndex (goodid, price, canbuy) {
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
.hidden{
  opacity: 0;
  visibility: hidden;
}
.body{
  width: 100%;
  height: auto;
/*  padding-bottom: 20px;*/
}
.header-img{
  display: block;
  width: 100%;
  height: 180px;
  min-width: 320px;
  max-width: 420px;
  margin: 0 auto;
}
.chest-box{
  width: 88%;
  min-width: 310px;
  max-width: 355px;
  height: 300px;
  flex-wrap: wrap;
  align-items: flex-start;
  border-radius: 8px;
  margin: 20px auto 0;
  position: relative;
  overflow: hidden;
}
.buy-btn{
  width: 150px;
  height: 40px;
  position: absolute;
  top: 85%;
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
  color: #882D00;
}
 @keyframes btn {
  0%{
  }
  50%{

  }
  100%{

  }
 }
</style>

