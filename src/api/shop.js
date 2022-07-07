import request from '@/utils/request'
/**
 * 添加一个商品
 * @param data
 * @returns {Promise<unknown>}
 */
export function shopAdd(data){
  return new Promise((resove,reject)=>{
    request({
      url:'/shop/insertOne',
      method:'post',
      data
    }).then(res=>{
      resove(res)
    })
  })
}
/**
 * 获取所有商品
 * @param data
 * @returns {Promise<unknown>}
 */
export function shopList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shop/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 获取所有codetype
 * @param data
 * @returns {Promise<unknown>}
 */
export function codetypeList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/codetype/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 添加一个codetype
 * @param data
 * @returns {Promise<unknown>}
 */
export function codetypeAdd(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/codetype/insertOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 获取所有platform
 * @param data
 * @returns {Promise<unknown>}
 */
export function platformList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/platform/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 添加一个platform
 * @param data
 * @returns {Promise<unknown>}
 */
export function platformAdd(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/platform/insertOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 获取所有type
 * @param data
 * @returns {Promise<unknown>}
 */
export function typeList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/type/find',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 添加一个type
 * @param data
 * @returns {Promise<unknown>}
 */
export function typeAdd(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/type/insertOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 统计商品数量
 * @returns {Promise<unknown>}
 */
export function count() {
  return new Promise((resolve, reject) => {
    request({
      url: '/shop/count',
      method: 'post',
    }).then(res =>{
      resolve(res)
    })
  })
}

/**
 * 删除一个商品
 * @param data
 * @returns {Promise<unknown>}
 */
export function shopDelete(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shop/deleteOne',
      method: 'post',
      data
    }).then(res =>{
      resolve(res)
    })
  })
}
