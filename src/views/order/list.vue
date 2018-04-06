<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="类目名称" v-model="query.keyword"> </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" height="800" border fit
              highlight-current-row>
      <el-table-column align="center" type="selection" width="40"></el-table-column>
      <el-table-column type="index" width="40" align="center" ></el-table-column>
      <el-table-column align="center" prop="id" label="订单ID" width="200" ></el-table-column>
      <el-table-column label="买家姓名" width="100" align="right">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>住址: {{ scope.row.buyerAddress }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.buyerName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="买家电话" prop="buyerPhone" width="100" align="right"></el-table-column>
      <el-table-column label="买家地址" prop="provinceName" width="100" align="right"></el-table-column>
      <el-table-column label="金额" prop="orderAmount" width="100" align="right"></el-table-column>
      <el-table-column label="订单状态" width="100" align="right">
        <template slot-scope="scope">
          <el-tag :type="scope.row.orderStatus | orderStatusFilter('tag')">{{scope.row.orderStatus | orderStatusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" prop="payStatus" width="100" align="right">
        <template slot-scope="scope">
          <el-tag :type="scope.row.payStatus | payStatusFilter('tag')">{{scope.row.payStatus | payStatusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间" width="240" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination small :current-page.sync="query.page" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
  import {query} from "@/utils/variables";
  import tableMixin from '@/mixin/table'
  import {listOrder} from '../../api/order'

  let dictMap = {}

  export default {
    name:'OrderList',
    mixins: [tableMixin],
    created() {
      this.fetchData()
    },
    filters:{
      orderStatusFilter(status,type) {
        if (type === 'tag') {
          const statusMap = {
            "20": 'success',
            "-1": 'danger',
            "1": 'info',
          }
          return statusMap[status]
        }else{
          return dictMap.orderStatus[status]
        }
      },
      payStatusFilter(status,type) {
        if (type === 'tag') {
          const statusMap = {
            "1": 'success',
            "0": 'danger',
          }
          return statusMap[status]
        }else{
          return dictMap.payStatus[status]
        }
      },
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        let {rows, total, page, dict} = await listOrder(this.query);
        this.list = rows;
        this.total = total;
        this.query.page = page;
        this.listLoading = false
        dictMap =  dict;
      },
      handleCurrentChange(page) {
        this.query.page = page;
        this.fetchData();
      },
      handleFilter() {
        this.query.page = 1
        this.fetchData()
      },
    }
  }
</script>

<style scoped>
  .goodsImg {
    height: 100px;
  }

  .block {
    text-align: right;
    padding: 10px;
  }
</style>

