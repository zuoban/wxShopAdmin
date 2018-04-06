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
      <el-table-column align="center" prop="categoryName" label="类目名称" width="200" ></el-table-column>
      <el-table-column label="封面图片" align="center">
        <template slot-scope="scope"> <img class="goodsImg" :src="scope.row.icon" alt=""> </template>
      </el-table-column>
      <el-table-column label="优先级" prop="priority" width="100" align="right"></el-table-column>
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
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination small :current-page.sync="query.page" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import {query} from "@/utils/variables";
  import tableMixin from '@/mixin/table'
  import {listCategory, deleteCategory} from '../../api/goodsCategory'

  export default {
    name:'categoryList',
    mixins: [tableMixin],
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        let {rows, total, page} = await listCategory(this.query);
        this.list = rows;
        this.total = total;
        this.query.page = page;
        this.listLoading = false
      },
      edit(e) {
        this.$router.push({
          name: 'CategoryEdit',
          params: {
            id: e.id
          }
        })
      },
      async handleDelete(id) {
        let update = await deleteCategory(id)
        console.log(update)
        this.fetchData()
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

