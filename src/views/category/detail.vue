<template>
  <div class="app-container">

    <el-form :model="item" label-width="120px">
      <el-form-item label="类目名称">
        <el-input v-model="item.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="类目图片">
        <el-upload
          class="avatar-uploader"
          action="upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="item.icon" :src="item.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优先级">
        <el-input-number v-model="item.priority" :min="1" :max="99"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="onCancel">放弃</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getCategory, saveCategory} from '@/api/goodsCategory'

  export default {
    data() {
      return {
        item: {
          id:'',
          categoryName:'',
          icon:'',
          priority:0,
        }
      }
    },
    created() {
      var id = this.$route.params.id;
      console.log(id)
      if (id) {
        this.getItem(id)
      }
    },
    methods: {
      async getItem(id) {
        this.item = await getCategory(id)
      },
      async save() {
        let {id, icon, priority, categoryName} = this.item;
        let obj = {id, icon, priority, categoryName};
        await saveCategory(obj)
        this.$router.push({name:'CategoryList'});
      },
      onCancel() {
        this.$router.go(-1);
      },
      handleAvatarSuccess(res, file) {
        this.item.icon = res;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        var isImage = /(png|jpe?g|gif)?$/.test(file.type)
        if (!isImage) {
          this.$message.error('上传图片只能是 [png,jpg,jpeg,gif] 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isImage && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .itemImg {
    height: 200px;
  }

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

