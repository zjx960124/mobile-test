import request from '@/utils/http.js'

/**
 * 获取验证码
 */
export function getValidationCode(params) {
  return request({
    url: '/rest/enroll/getCode',
    method: 'get',
    params
  })
}

/**
 * 校验验证码
 */
 export function validationCode(params) {
  return request({
    url: '/rest/enroll/selectCode',
    method: 'post',
    params
  })
}