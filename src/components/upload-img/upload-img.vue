<template>
    <div class="upload-img">
        <div v-if="!url" class="upload-show">
            <label class="add">
                <input type="file" style="visibility: hidden; position: absolute" @change="handleImgUpload">
                <i class="el-icon-plus upload-icon"></i>
            </label>
        </div>
        <div v-if="url" class="img-show">
            <div class="img" :style="`background-image: url(${url}); background-size: contain; background-repeat: no-repeat; background-position: center`"></div>
            <i class="el-icon-circle-close close-icon" @click="handleImgRemove"></i>
        </div>
    </div>
</template>

<script>
// import { upload } from 'api/index.js'
import axios from 'axios'
export default {
    name: 'upload-img',
    props: {
        order: { // 图片的顺序
            type: Number,
            default: 1
        },
        url: { // 图片的网络地址
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleImgUpload(e) {
            let file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)
            axios.post('http://39.100.93.227:8081/admin/file/upload/30', formData, {
                headers: {
                    'content-type': 'multiple/form-data'
                }
            }).then(res => {
                if (res) {
                    this.$emit('success', res.data.data, this.order)
                }
            })
        },
        handleImgRemove() {
            this.$emit('remove', this.order)
        }
    }
}
</script>

<style lang="stylus" scoped>
.upload-img
    width: 100%
    height: 100%
    border: 1px dashed #d9d9d9
    background-color: #fbfdff
    border-radius: 6px
    position: relative
    cursor pointer
    &:hover
        border-color: #409eff
    .upload-show
        width: 100%
        height: 100%
        .add
            display inline-block
            width: 100%
            height: 100%
            text-align center
            cursor pointer
            .upload-icon
                margin-top: 50%
                transform: translateY(-50%)
                font-size: 25px
    .img-show
        width: 100%
        height: 100%
        overflow hidden
        border-radius: 10px
        .img
            width: 100%
            height: 100%
        .close-icon
            position: absolute
            font-size: 18px
            right: -8px
            top: -8px
            background: #000
            color: #ffffff
            border-radius: 50%
            cursor pointer
</style>
