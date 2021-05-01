import request from '@/utils/request'

const URL = 'op/order'

export function addOrder(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function delOrder(data) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      orderId: data
    }
  })
}

export function getByPhone(data) {
  return request({
    url: URL + '/by/phone/'+data,
    method: 'post',
    data: {

    }
  })
}

export function batchDelOrder(data) {
  return request({
    url: URL + '/batchDelete',
    method: 'post',
    data: {
      data: data
    }
  })
}



export function cancelOrder(id) {
  return request({
    url: URL + '/cancel',
    method: 'post',
    data: {
      orderId: id
    }
  })
}

export function updateStatus(data,i) {
  return request({
    url: URL + '/update/status/'+i,
    method: 'post',
    data: data
  })
}

export function getCurrCount() {
  return request({
    url: URL + '/select',
    method: 'post',
    data: {}
  })
}


export function updateOrder(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function payOrder(id) {
  return request({
    url: URL + '/pay',
    method: 'post',
    data: {
      orderId: id,
    }
  })
}

export function getOrderByUserId(data) {
  return request({
    url: URL + '/user/'+data,
    method: 'post',
    data: {
    }
  })
}

export function getOrderByNameAndPhone(data,i) {
  return request({
    url: URL + '/withNameAndPhone/'+i,
    method: 'post',
    data: data
  })
}



export function getOrderById(data) {
  return request({
    url: URL + '/'+data,
    method: 'post',
    data: {

    }
  })
}

export function getAllOrder() {
  return request({
    url: URL ,
    method: 'post',
  })
}

export function getOrderCount() {
  return request({
    url: URL + '/count',
    method: 'post',
  })
}
