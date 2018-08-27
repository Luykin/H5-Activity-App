<template>
  <transition name="tips">
    <div class="titpsBody" @click="_close" v-show="open">
      <slot></slot>
    </div>
  </transition>
</template>
<script type="text/javascript">
export default {
  props: {
    showTips: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    _close() {
      this.open = false
    },
    _open() {
      this.open = true
      if (this.time) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        this.open = false
      }, 2000)
    }
  }
}
</script>
<style scoped>
.tips-enter-active, .tips-leave-active{
  transition: all .3s;
  opacity: 1;
}
.tips-enter, .tips-leave-to{
  transition: all .3s;
  opacity: 0;
}
.titpsBody{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999999;
  min-height: 15px;
  min-width: 190px;
  line-height: 20px;
  padding: 10px 15px;
  background: #333;
  opacity: .7;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
}
</style>