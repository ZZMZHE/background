<template>el-upload
    <div class="upload-video">
        <el-upload
            class="avatar-uploader el-upload--text"
            :class="{ 'border-none': showVideoPath ? true : false }"
            :action="uploadUrl"
            :show-file-list="false"
            accept=".mp4"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :on-progress="uploadVideoProcess"
            :on-error="handleErr">
            <video
                v-if="this.showVideoPath !='' && !videoFlag"
                :src="this.showVideoPath"
                class="avatar video-avatar"
                controls="controls">您的浏览器不支持视频播放
            </video>
            <i
                v-else-if="this.showVideoPath =='' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon">
            </i>
            <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top:30px;">
            </el-progress>
            <el-button
                class="video-btn"
                slot="trigger"
                size="small"
                v-if="isShowUploadVideo"
                type="primary">
                选取文件
            </el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'upload-video',
    data() {
        return {
            uploadUrl: 'http://39.100.93.227:8081/admin/file/upload/30', // 你要上传视频到你后台的地址
            videoFlag: false, // 是否显示进度条
            videoUploadPercent: '', // 进度条的进度
            isShowUploadVideo: false, // 显示上传按钮
            showVideoPath: '' // 获取到的视频路径
        }
    },
    methods: {
        beforeUploadVideo (file) {
            const isLt20M = file.size / 1024 / 1024 < 20
            if (['video/mp4'].indexOf(file.type) === -1) { // 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message.error('请上传正确的视频格式')
                return false
            }
            if (!isLt20M) {
                this.$message.error('上传视频大小不能超过20MB哦!')
                return false
            }
            this.isShowUploadVideo = false
        },
        // 进度条
        uploadVideoProcess (event, file, fileList) {
            this.videoFlag = true
            this.videoUploadPercent = file.percentage.toFixed(0) * 1
        },

        // 上传成功回调
        handleVideoSuccess (res, file) {
            this.isShowUploadVideo = true
            this.videoFlag = false
            this.videoUploadPercent = 0
            if (res.status === 200) {
                this.showVideoPath = res.data
                this.$emit('successVideo', res.data)
            } else {
                this.$message.error('视频上传失败，请重新上传！')
            }
        },
        handleErr(err) {
            if (err) {
                this.$message.error('视频上传服务器出问题啦！')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .avatar-uploader >>> .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader.border-none >>> .el-upload {
        border: none
    }
    .avatar-uploader >>> .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 168px;
        height: 168px;
        line-height: 168px;
        text-align: center;
    }
    .avatar {
        width: 168px;
        height: 168px;
        display: block;
    }
    .video-avatar {
        width: 200px;
        height: 200px;
    }
</style>
