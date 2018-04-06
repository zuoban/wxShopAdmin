import request from '@/utils/axios'
import { parse } from 'url';
const baseUrl = 'product/category'
//获取商品类目列表
 function getList(listPage = 1) {
  return request(baseUrl,'get',{
    page:listPage
  })
}
//删除商品类目
 function deleteList(typeId) {
  return request(`${baseUrl}`,'delete',{
    categoryIds:typeId
  })
}
//获取商品类目详情
 function getListDetail(typeId) {
  return request(`${baseUrl}/${typeId}`)
}
//保存商品类类目详情
 function saveListDetail(typeData) {
  return request(`${baseUrl}`,'post',{
    producCategory:typeData
  })
}

export {getList,deleteList,getListDetail,saveListDetail}