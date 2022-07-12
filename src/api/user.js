import request from '@/utils/request'
export function userList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/user/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
export function count(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/user/count',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
