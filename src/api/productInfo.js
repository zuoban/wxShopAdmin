import request from '../utils/requests'

const BASE_URL = '/api/admin/product/info';

export function listProduct(params) {
  return request.get(BASE_URL, {params})
}

export function deleteProduct(id) {
  return request.delete(BASE_URL,{data:id})
}

export function getProduct(id) {
  return request.get(`${BASE_URL}/${id}`);
}

export function saveProduct(item) {
  return request.post(BASE_URL, item)
}

