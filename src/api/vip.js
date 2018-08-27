import axios from 'axios'
import qs from 'qs'
import {PREFIX_URL} from 'api/config'
import { getSign } from 'common/util'

export function getVips (uaid, prefixurl) {
  let url
  if (!prefixurl) {
    url = `${PREFIX_URL}/vips`
  } else {
    if (prefixurl.length < 6) {
      url = `https://${prefixurl}.melonblock.com/app/vips`
    } else {
      if (prefixurl.indexOf('/app/') > -1) {
        url = `${prefixurl}vips`
      } else {
        url = `${prefixurl}/vips`
      }
    }
  }
  let data = {
    uaid: uaid
  }
  return axios.post(url, qs.stringify(Object.assign({ sign: getSign(data) }, data)))
    .then(function (res) {
      console.log('网络: 加载详情完毕')
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
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
export function getUserInfo (uaid, userid, prefixurl, marketPosition) {
  let url
  if (!prefixurl) {
    url = `${PREFIX_URL}/user_info `
  } else {
    if (prefixurl.length < 6) {
      url = `https://${prefixurl}.melonblock.com/app/user_info `
    } else {
      if (prefixurl.indexOf('/app/') > -1) {
        url = `${prefixurl}user_info `
      } else {
        url = `${prefixurl}/user_info `
      }
    }
  }
  let data = {
    uaid: uaid,
    user_id: userid,
    market_position: marketPosition + ''
  }
  return axios.post(url, qs.stringify(Object.assign({ sign: getSign(data) }, data)))
    .then(function (res) {
      console.log('网络: 加载详情完毕')
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
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
