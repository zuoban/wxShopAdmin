<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="商品名称"
                v-model="query.keyword"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" type="selection" width="40"></el-table-column>
      <el-table-column type="index" width="40" align="center" fixed></el-table-column>
      <el-table-column align="center" prop="productName" fixed label="商品名称" width="200"></el-table-column>
      <el-table-column label="封面图片" align="center">
        <template slot-scope="scope">
          <img class="goodsImg" :src="scope.row.productCover" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" width="100" align="center"></el-table-column>
      <el-table-column align="center" label="状态" width="240">
        <template slot-scope="scope">
          <el-tag :type="scope.row.productStatus | statusFilter('tag')">{{scope.row.productStatus | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row.id)" type="text" size="small">
            详情
          </el-button>
          <el-button @click="delete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination small :total="total" @current-change="currentChange"></el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="temp.productName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listProduct} from '@/api/productInfo'
  import tableMixin from "@/mixin/table";

  let dictMap = {}

  export default {
    mixins: [tableMixin],
    data() {
      return {
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        temp: {
          categoryId: '',
          id: '',
          images: '',
          priority: 10,
          productCover: '',
          productDescription: '',
          productName: '',
          productStatus: 1,
        },
        rules: {
          productName: [{required: true, message: 'type is required', trigger: 'change'}],
          // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
      }
    },
    created() {
      this.fetchData()
    },
    filters: {
      statusFilter(status,type) {
        if (type === 'tag') {
          const statusMap = {
            0: 'success',
            1: 'info',
            2: 'danger'
          }
          return statusMap[status]
        }else{
          return dictMap.productStatus[status]
        }
      },
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        let {rows, total, page, dict} = await listProduct(this.query)
        dictMap  = dict;
        this.list = rows;
        this.total = total;
        this.query.page = page;
        this.listLoading = false
      },
      detail(id) {
        this.$router.push({
          name: 'ProductEidt',
          params: {
            id
          }
        })
      },
      delete(e) {
      },
      currentChange(page) {
        this.query.page = page;
        this.fetchData();
      },
      handleFilter() {
        this.query.page = 1
        this.fetchData()
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(product, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      }
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

