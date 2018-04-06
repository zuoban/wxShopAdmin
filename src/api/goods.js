import request from '@/utils/axios'
import { parse } from 'url'
const baseUrl = 'product/info'
/* 获取商品*/
function getGoodsList() {
  return request(baseUrl)
}
/**
 * 保存商品
 * @param good_data
 */
function saveGoodsList(good_data) {
  return request(baseUrl, 'post', {
    productMaster: good_data
  })
}
// 删除商品
function deleteGoodsList(good_id) {
  return request(baseUrl, 'delete', {
    productIds: good_id
  })
}
// 上下架商品
function putGoodsList(good_id_status) {
  return request(baseUrl, 'put', {
    updateStatusDto: good_id_status
  })
}
// 获取商品详情
function getGoodsDetail(id) {
  return request(`${baseUrl}/${id}`)
}
export {
  getGoodsList,
  saveGoodsList,
  putGoodsList,
  getGoodsDetail
}
