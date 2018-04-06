import request from '../utils/requests'

const BASE_URL = '/api/admin/product/category';

export function listCategory(params) {
  return request.get(BASE_URL,{params})
}

export function deleteCategory(id) {
  return request.delete(BASE_URL,{data:id})
}

export function getCategory(id) {
  return request.get(`${BASE_URL}/${id}`);
}

export function saveCategory(item) {
  request.post(BASE_URL, item)
}
