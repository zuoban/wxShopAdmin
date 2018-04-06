<template>
  <div class="app-container">
    <el-form ref="form" :model="item" label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="item.productName"></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <simple-uploader :file-url.sync="item.productCover"></simple-uploader>
      </el-form-item>
      <el-form-item label="轮播图">
        {{item.images.length}}
        <multi-uploader ref="imagesUploader" :file-list="item.images"></multi-uploader>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="item.productStatus" placeholder="请选择">
          <el-option
            v-for="(value,key) in item.dict.productStatus"
            :key="key"
            :label="value"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类目">
        <el-select type="number" v-model="item.categoryId" placeholder="请选择">
          <el-option
            v-for="(value,key) in item.dict.productCategory" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-input-number v-model="item.priority" :min="0" :max="99"></el-input-number>
      </el-form-item>
      <!--  规格表格 -->
      <el-form-item label="规格" v-if="item.id">
        <div style="margin-top: 20px">
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                     icon="el-icon-edit">添加
          </el-button>
          <el-button type="danger" @click="batchDelete" icon="el-icon-delete">批量删除</el-button>
        </div>
        <el-table :data="item.details" current-row-key="id" highlight-current-row style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="specifications" label="规格" width="120"></el-table-column>
          <el-table-column property="productPrice" label="单价" width="120"></el-table-column>
          <el-table-column property="productStock" label="库存"></el-table-column>
          <el-table-column property="priority" label="优先级"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img class="table-image" :src="scope.row.productPicture">
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button @click="deleteDetail(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="onCancel">放弃</el-button>
      </el-form-item>
    </el-form>

    <!--新增编辑对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="规格">
          <el-input v-model="form.specifications"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number v-model="form.productPrice" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="form.productStock" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model="form.priority" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="销量">
          <el-input-number v-model="form.sales" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="图片">
          <simple-uploader :file-url.sync="form.productPicture"></simple-uploader>
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
  import {getProduct, saveProduct} from "@/api/productInfo";
  import {deleteProductDetail, saveProductDetail} from "@/api/productDetail";

  export default {
    data() {
      return {
        item: {
          dict: {},
          images: [],
          policies: [],
          details: [{productPicture: '', id: ''}],
          productName: '',
          id: '',
        },
        form: {
          id: '',
          productPrice: 0,
          productStock: 0,
          specifications: '',
          priority: 0,
          productPicture: '',
          sales: 0
        },
        rules: [],
        textMap: {
          update: '编辑',
          create: '新增'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        content: {},
        editorOption: {},
        dialogImageUrl: '',
        dialogVisible: false,
        selectedIds: [],
      }
    },
    created() {
      if (this.$route.params.id) {
        this.getItem()
      }else {
        this.item={
          dict: {},
          images: [],
          policies: [],
          details: [{productPicture: '', id: ''}],
          productName: '',
          id: '',
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    },
    methods: {
      async getItem() {
        this.item = await getProduct(this.$route.params.id)
      },
      async save() {
        let {id, productName, productCover, productDescription, productStatus, categoryId, priority} = this.item;
        let images = this.$refs.imagesUploader.getUploadFiles().map(it=>it.url).join(';');
        let data = {id, productName, productCover, productDescription, productStatus, categoryId, priority, images};
        await saveProduct(data)
        this.$message.success("提交成功!")
        this.$router.go(-1);
      },
      onCancel() {
        this.$router.go(-1);
      },
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }, deleteDetail(row) {
        deleteProductDetail(row.id).when(
          this.item.details = this.item.details.filter(it => it != row)
        )
      },


      handleSelectionChange(val) {
        this.selectedIds = val.map(it => it.id);
      },

      batchDelete() {
        if (this.selectedIds.length > 0) {
          deleteProductDetail(this.selectedIds.join(','));
          this.item.details = this.item.details.filter(it => this.selectedIds.indexOf(it.id) === -1);
        } else {
          this.$message.warning('请选择要删除的记录!')
        }

      },
      /**
       * ============================== 表单 Dialog ============================
       */
      async createData() {
        console.log('createData')
        this.form.productId = this.item.id;
        let item = await saveProductDetail(this.form);
        console.log(item);
        this.item.details.push(item);
        console.log(this.item.details)
        this.dialogFormVisible = false
      },
      updateData() {
        console.log('updateData')
        this.dialogFormVisible = false
      },
      restForm() {
        this.form = {
          id: '',
          productPrice: 0,
          productStock: 0,
          specifications: '',
          priority: 0,
          productPicture: '',
          sales: 0,
        }
      },
      handleCreate() {
        this.restForm();
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        // this.$nextTick(() => {
        // this.$refs['dataForm'].clearValidate()
        // })
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

