<template>
  <div>

  <el-upload
    ref="imagesUploader"
    action="upload/"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :file-list="fileList"
    :on-error="handleUploadError">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "multiUploader",
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    props: {
      fileList: {
        type: Array,
        require: true
      },
      action: {
        type: String,
        default: 'upload/'
      },
    },
    methods: {
      getUploadFiles(){
        let uploadFiles = this.$refs.imagesUploader.uploadFiles;
        return uploadFiles.map(it => {
          let name = it.name
          let url = null;
          if (it.response) {
            url = it.response
          } else {
            url =  it.url;
          }
          return {
            name,url
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUploadError(err) {
        this.$message.error(err.message)
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
