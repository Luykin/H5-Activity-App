<template>
  <div class="area" ref='area'>
    <betterscroll class="wrapper" :data="datalist" :pulldown='false' ref='wrapper'>
      <first-recharge v-on:initialization="_initialization" v-on:activity="_activity" v-on:setBackground="_setBackground" v-on:tips="_tips" ref='activity' v-if="signalData && signalData.category == 2 && signalData.campaign_id <= 3"></first-recharge>
      <first-recharge-one v-on:initialization="_initialization" v-on:activity="_activity" v-on:setBackground="_setBackground" v-on:tips="_tips" ref='activity' v-if="signalData && signalData.category == 2 && signalData.campaign_id >= 4 && signalData.campaign_id < 6"></first-recharge-one>
      <!-- <down-link ref='activity' v-if="signalData && signalData.category == 2 && signalData.campaign_id == 6"></down-link> -->
      <restricted-purchase v-on:initialization="_initialization" v-on:activity="_activity" v-on:setBackground="_setBackground" v-on:tips="_tips" ref='activity' v-if="signalData && signalData.category == 3 && signalData.campaign_id < 3"></restricted-purchase>
      <new-restricted-purchase v-on:initialization="_initialization" v-on:activity="_activity" v-on:setBackground="_setBackground" v-on:tips="_tips" ref='activity' v-if="signalData && signalData.category == 3 && signalData.campaign_id == 3"></new-restricted-purchase>
      <down-link ref='activity' v-if="signalData && signalData.category == 2 && signalData.campaign_id == 6"></down-link>
      <top-tips ref="toptips">{{tips}}</top-tips>
    </betterscroll>
  </div>
</template>
<script type="text/javascript">
import { Mixin } from 'common/mixin'
import topTips from 'base/topTips/toptips'
import { encryptByDES, decryptByDES } from 'common/util'
import betterscroll from 'base/better-scroll/better-scroll'

export default {
  mixins: [Mixin],
  data() {
    return {
      tips: '',
      datalist: []
    }
  },
  created() {
    const that = this
    console.log('初始化index')
    // 设置活动
    this._setActivity(that)
  },
  mounted() {
    // tellAndroid
  },
  methods: {
    _setActivity(that) {
      this.signalData = this.$route.query
      const query = this.$route.query
      if (!query.uaid || !query.user_id || !query.category || !query.campaign_id || !query.env) {
        this.$nextTick(() => {
          this._tips('活动网址缺少必填参数')
        })
        return false
      }
    },
    _activity(res) {
      console.log(res)
      if (res.goodid && res.price) {
        this.tellAndroid(res)
      }
    },
    _initScroll() {
      this.$refs.wrapper._initScroll()
      // this.$refs.wrapper.refresh()
    },
    _initialization(res) {
      console.log('组件准备完毕，发起网络请求 设置状态（弹窗/页面）')
      this.$nextTick(() => {
        // 检测高度设置状态（弹窗/页面）
        // this.$refs.wrapper._initScroll()
        this.$refs.activity._getActivityDetail(this.signalData.uaid, this.signalData.user_id, this.signalData.category, this.signalData.campaign_id, this.signalData.env, this._initScroll)
      })
    },
    _setBackground(res) {
      if (res.indexOf('#') > -1) {
        this.$refs.area.style.background = res
      } else {
        this.$refs.area.style.background = '#' + res
      }
      // console.log(this.$refs.area.style.background)
    },
    _setState() {
      console.log(document.documentElement.clientHeight)
      if (document.documentElement.clientHeight < 400 || this.$route.query.pop) {
        this.$nextTick(() => {
          this.$refs.activity._setState()
        })
      }
    },
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
    refresh() {
      console.log('refresh')
    },
    infinite() {
      console.log('infinite')
    }
  },
  components: {
    topTips,
    betterscroll,
    downLink: () =>
      import ('components/activity/down-link'),
    firstRecharge: () =>
      import ('components/activity/first-recharge'),
    firstRechargeOne: () =>
      import ('components/activity/first-recharge-one'),
    restrictedPurchase: () =>
      import ('components/activity/restricted-purchase'),
    newRestrictedPurchase: () =>
      import ('components/activity/new-restricted-purchase')
  }
}

</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

</style>
