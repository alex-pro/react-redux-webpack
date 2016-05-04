import request from 'axios'
import config from '../config/index'

export default (params) => {
  const method = params.method,
        url = `${params.host || config.apiPath}${params.path}`,
        responseType = 'json',
        headers = {
          'Content-Type': 'application/json',
          'Accept': `application/vnd.${config.apiName}.${config.apiVersion}+json`
        },
        requestParams = { method, url, responseType, headers }

  if (params.auth) {
    Object.assign(headers, params.auth)
  }

  if (params.data) {
    requestParams.data = params.data
  }

  return request(requestParams)
}
