import request from '../utils/requests'

const BASE_URL = '/api/admin/order/master';

export function listOrder(params) {
  return request.get(BASE_URL, {params})
}

export function deleteOrder(id) {
  return request.delete(BASE_URL,{data:id})
}

export function getOrder(id) {
  return request.get(`${BASE_URL}/${id}`);
}

export function saveOrder(item) {
  return request.post(BASE_URL, item)
}

