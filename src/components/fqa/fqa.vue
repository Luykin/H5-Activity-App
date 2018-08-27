<template>
  <div class="area" ref='area'>
    <div class="fqa-header flex">
      <div class="series-title flex" v-for="(item, index) in series" :class="{'active-series-title': index == activeAnswer}" @click.stop="_chose(index)">
        {{item}}
      </div>
    </div>
    <div class="faq-question-mainbox">
      <div v-for="(item,index) in answer[activeAnswer]" class="flex faq-question">
        <div class="faq-question-warp flex" @click.stop="_showInfo(item, index)" ref='faq'>
          <img src="http://p7o5mvmp4.bkt.clouddn.com/%E9%97%AE%E5%8F%B7icon@3x.png" alt="问题题目" class="icon-fqa">
          <div class="faq-question-title ellipsis">{{item.q}}</div>
          <img src="http://p7o5mvmp4.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4%E5%8F%B3@3x.png" alt="点击打开" class="icon-fqa-you">
        </div>
        <div class="faq-answer" ref="faqA">{{item.a}}</div>
      </div>
    </div>
    <top-tips ref="toptips">{{tips}}</top-tips>
  </div>
</template>
<script type="text/javascript">
import topTips from 'base/topTips/toptips'
import { FQA } from 'common/fqa'
export default {
  data() {
    return {
      tips: '',
      series: ['基础问题', '快手系列', '空间系列', '抖音系列'],
      answer: [],
      activeAnswer: 0
    }
  },
  created() {
    this.answer = FQA
  },
  computed: {},
  mounted() {
    // this.$refs.scroller.$el.style.top = '60px'
    // this.$refs.scroller.$el.style.background = '#F9F9F9'
    this.$refs.faqA.forEach((item, index) => {
      if (index === 0) {
        item.className = 'faq-answer open-faq-answer'
        this.$refs.faq[index].className = 'faq-question-warp open flex'
      } else {
        item.className = 'faq-answer'
        this.$refs.faq[index].className = 'faq-question-warp flex'
      }
    })
  },
  methods: {
    _chose(index) {
      this.activeAnswer = index
      this.$refs.faqA.forEach((item, index) => {
        if (index === 0) {
          item.className = 'faq-answer open-faq-answer'
          this.$refs.faq[index].className = 'faq-question-warp open flex'
        } else {
          item.className = 'faq-answer'
          this.$refs.faq[index].className = 'faq-question-warp flex'
        }
      })
    },
    _tips(res) {
      this.tips = res
      this.$refs.toptips._open()
    },
    _showInfo(item, index) {
      if (!item.show) {
        item.show = 1
        this.$refs.faqA[index].className = 'faq-answer open-faq-answer'
        this.$refs.faq[index].className = 'faq-question-warp open flex'
      } else {
        item.show = 0
        this.$refs.faqA[index].className = 'faq-answer'
        this.$refs.faq[index].className = 'faq-question-warp flex'
      }
    }
  },
  components: {
    topTips
  }
}

</script>
<style scoped>
.faq-question-mainbox {
  position: fixed;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.fqa-header {
  width: 100%;
  height: 60px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  justify-content: flex-start;
  padding-bottom: 10px;
  background: #F9F9F9;
}

.series-title {
  display: inline-block;
  padding: 10px;
  border-radius: 100px;
  background: #EDEDED;
  color: #BCBCBC;
  margin: 0px 5px;
  flex-shrink: 0;
  flex-grow: 0;
}

.active-series-title {
  background: #FFA057;
  color: #fff;
}

.faq-question {
  min-height: 50px;
  background: #fff;
  color: #353535;
  border-bottom: .5px solid #ededed;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.icon-fqa {
  width: 22px;
  height: auto;
  margin: 0 8px;
}

.faq-question-title {
  max-width: calc(90%);
  max-width: calc(100% - 40px);
  font-size: 15px;
}

.faq-answer {
  width: 94%;
  flex-shrink: 0;
  color: #999;
  font-size: 14px;
  line-height: 25px;
  padding: 0;
  border-top: .5px solid #ededed;
  transform-origin: center 0 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.faq-question-warp {
  width: 100%;
  height: 58px;
  flex-wrap: wrap;
  justify-content: flex-start;
}


@keyframes showOut {
  0% {
    opacity: 0;
    height: auto;
    padding: 5px 3%;
    transform: scale(1, 0);
  }
  100% {
    opacity: 1;
    height: auto;
    padding: 5px 3%;
    transform: scale(1, 1);
  }
}

@keyframes iconOut {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes iconIn {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.icon-fqa-you {
  width: 10px;
  height: auto;
  margin: 0 5px;
  animation: iconIn .5s ease-out 1 forwards;
}

.open .icon-fqa-you {
  animation: iconOut .5s ease-out 1 forwards;
}

.open-faq-answer {
  /*transform-origin: center 0 0;*/
  /*  animation: showOut .5s ease-out 1 forwards;*/
  opacity: 1;
  height: auto;
  padding: 5px 3%;
}

</style>
