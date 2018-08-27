import axios from 'axios'
import qs from 'qs'
import { PREFIX_URL } from 'api/config'
import { getSign } from 'common/util'
import { CHANNEL } from 'api/config'

export function addkamitask(uaid, userid, serviceid, prefixurl) {
  let url
  if (!prefixurl) {
    url = `${PREFIX_URL}/add_kami_tas`
  } else {
    if (prefixurl.length < 6) {
      url = `https://${prefixurl}.melonblock.com/app/add_kami_task`
    } else {
      if (prefixurl.indexOf('/app/') > -1) {
        url = `${prefixurl}add_kami_task`
      } else {
        url = `${prefixurl}/add_kami_task`
      }
    }
  }
  let data = {
    uaid: uaid,
    user_id: userid,
    service_type: 0,
    service_id: serviceid,
    market_position: 'KS',
    channel: CHANNEL,
    platform: '102'

  }
  return axios.post(url, qs.stringify(Object.assign({ sign: getSign(data) }, data)))
    .then(function(res) {
      console.log('网络: 加载详情完毕')
      return Promise.resolve(res.data)
    })
    .catch(function(error) {
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        return Promise.resolve({
          error: error.response.data,
          errorStatus: error.response.status
        })
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.resolve({
          errorStatus: error.message
        })
      }
    })
}

export function task(userid, taskid, prefixurl) {
  let url
  if (!prefixurl) {
    url = `${PREFIX_URL}/tasks`
  } else {
    if (prefixurl.length < 6) {
      url = `https://${prefixurl}.melonblock.com/app/tasks`
    } else {
      if (prefixurl.indexOf('/app/') > -1) {
        url = `${prefixurl}tasks`
      } else {
        url = `${prefixurl}/tasks`
      }
    }
  }
  let data = {
    user_id: userid
  }
  if (taskid) {
  	data = Object.assign({ task_id:taskid }, data)
  }
  // ,
  //   task_id: taskid
  return axios.post(url, qs.stringify(Object.assign({ sign: getSign(data) }, data)))
    .then(function(res) {
      console.log('网络: 加载详情完毕')
      return Promise.resolve(res.data)
    })
    .catch(function(error) {
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        return Promise.resolve({
          error: error.response.data,
          errorStatus: error.response.status
        })
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.resolve({
          errorStatus: error.message
        })
      }
    })
}
