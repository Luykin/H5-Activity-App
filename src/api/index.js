import axios from 'axios'
import qs from 'qs'
import {PREFIX_URL} from 'api/config'
import { getSign } from 'common/util'

export function getActivityDetail (uaid, userid, category, campaignid, prefixurl) {
  let url
  if (!prefixurl) {
    url = `${PREFIX_URL}/campaign_des`
  } else {
    if (prefixurl.length < 6) {
      url = `https://${prefixurl}.melonblock.com/app/campaign_des`
    } else {
      if (prefixurl.indexOf('/app/') > -1) {
        url = `${prefixurl}campaign_des`
      } else {
        url = `${prefixurl}/campaign_des`
      }
    }
  }
  let data = {
    uaid: uaid,
    user_id: userid,
    category: category,
    campaign_id: campaignid
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
