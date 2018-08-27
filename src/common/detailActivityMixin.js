import {getActivityDetail} from 'api/index'
export const Mixin = {
  data () {
    return {
      detailData: false,
      popup: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 获取活动详情
    _getActivityDetail (uaid, userid, category, campaignid, prefixurl, fn) {
      getActivityDetail(uaid, userid, category, campaignid, prefixurl).then((res) => {
        if (res.errorStatus) {
          this.$emit('tips', '错误' + res.errorStatus)
          return
        }
        if (res) {
          this.detailData = this._normapirce(res)
          this._inint()
          if (fn) {
            fn()
          }
          if (res.bg_color) {
            this._setAreaBackground(res.bg_color)
          }
        }
      })
    },
    _normapirce(res) {
      if (res.goods) {
        res.goods.forEach((item) => {
          item.discount = item.discount.slice(0,3)
        })
      }
      return res
    },
    _setAreaBackground (background) {
      this.$emit('setBackground', background)
    },
    _setState () {
      this.popup = true
    }
  }
}
