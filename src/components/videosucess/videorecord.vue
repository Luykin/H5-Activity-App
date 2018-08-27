<template>
  <div>
    <div class="header flex">
      <div class="_back flex" @click="_back">
        <i class="el-icon-arrow-left head-icon"></i>
      </div>
      购买记录
    </div>
    <div class="record-box">
      <div v-for="item in recordList" class="record-box-item flex" @click="_exchange(item)">
        <div class="rci-title flex">{{item.label}}</div>
        <div class="rci-title flex">购买时间 : {{item.create}}</div>
        <i class="el-icon-arrow-right you-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { task } from 'api/videocard'
import { CHANNEL } from 'api/config'
import { timeChange } from 'common/util'
export default {
  data() {
    return {
      signalData: null,
      recordList: null
    }
  },
  mounted() {
    this._setActivity()
  },
  created() {
    this.$root.eventHub.$on('record', (res) => {
      this._getTask()
    })
  },
  methods: {
    _exchange(item) {
      this.$router.replace({
        path: `/video-sucess?good=${item.service_category}&id=${item.id}&user_id=${this.signalData.user_id}&env=${this.signalData.env}`
      })
      this.$root.eventHub.$emit('sucess',{
        
      })
    },
    _back() {
      this.$router.back()
    },
    _setActivity() {
      this.signalData = this.$route.query
      const query = this.$route.query
      if (!query.user_id || !query.env) {
        this.$nextTick(() => {
          this._tips('缺少必填参数')
        })
        return false
      } else {
        this._getTask()
        // this._getActivityDetail(this.signalData.uaid, this.signalData.user_id, this.signalData.category, this.signalData.campaign_id, this.signalData.env)
      }
    },
    _getTask() {
      task(this.signalData.user_id, false, this.signalData.env).then((res) => {
        if (res) {
          this.recordList = this._formatRecord(res)
        }
      })
    },
    _formatRecord(list) {
      const ret = []
      list.forEach((item) => {
        if (item.channel === CHANNEL) {
          item.create = timeChange(item.create)
          ret.push(item)
        }
      })
      return ret
    }
  }
}

</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  font-size: 18px;
  background: #fff;
}

.head-icon {
  font-size: 20px;
}

._back {
  position: absolute;
  left: 0px;
  top: 0;
  bottom: 0;
  width: 50px;
}

.record-box {
  width: 100%;
  height: auto;
  margin-top: 51px;
}

.record-box-item {
  width: 100%;
  height: 60px;
  flex-wrap: wrap;
  align-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: relative;
}

.rci-title {
  width: 90%;
  height: 45%;
  padding: 0 5%;
  justify-content: flex-start;
}
.you-icon{
  position: absolute;
  right: 18px;
  font-size: 18px;
}
</style>
