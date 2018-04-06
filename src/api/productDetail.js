import request from '../utils/requests'

const BASE_URL = '/api/admin/product/detail';

export function deleteProductDetail(id) {
  return request.delete(BASE_URL, {data: id})
}

export function saveProductDetail(item) {
  return request.post(BASE_URL, item)
}
