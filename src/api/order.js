import request from '@/utils/request'
export function shoporderList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_shoporder/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
export function shoporderCount(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_shoporder/count',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
export function shoporderDelete(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_shoporder/deleteOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

export function viporderList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_viporder/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
export function viporderCount(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_viporder/count',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
export function viporderDelete(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/all_viporder/deleteOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
