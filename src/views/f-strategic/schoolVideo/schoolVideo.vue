<template>
    <div class="schoolVideo">
        <div class="conn">
            <div class="title">线下学院视频管理</div>
            <div class="videoBox">
                <video controlsList="nodownload" :src="signPlayUrl" controls="controls"></video>
                <div class="progress" v-if="progressFlag">
                    <el-progress type="circle" :percentage="progress" :format="format"></el-progress>
                </div>
            </div>
            <div class="btnList">
                <el-upload
                    ref="videoUpload"
                    class="upload-demo"
                    :data="uploadData"
                    :action="uploadVideoUrl"
                    :on-change="handleChange"
                    :before-upload="beforeUpload"
                    :on-remove="handleRemove"
                    accept="video/mp4"
                    :multiple="false"
                    :auto-upload="false"
                    :show-file-list="false">
                    <el-button type="primary" v-if="videoUrl == undefined || videoUrl == ''" size="small">上传视频</el-button>
                    <el-button type="danger" v-else size="small">替换视频</el-button>
                </el-upload>
                <!-- <el-button size="small">保存</el-button> -->
            </div>
            <div class="title">视频封面</div>
            <div class="videoBox imgBox">
                <el-upload
                    :with-credentials="true"
                    :key="1"
                    ref="clear"
                    accept="image/*"
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="coverUrl" :src="coverUrl" class="avatar1">
                    <i v-else class="el-icon-camera-solid avatar-uploader-icon1"></i>
                    <i class="tihuan1">点击上传图片</i>
                </el-upload>
                <span style="color: red">建议上传750*370尺寸大小的图片</span>
            </div>
             <div class="btnList">
                 <el-button size="small" @click="updateVideo" class="btn">提交修改</el-button>
             </div>
        </div>
    </div>
</template>

<script>
//
import { cmsSchoolVideoInfo, vodUploadSignature, cmsSchoolVideoUpdate } from 'api/index.js'
import TcVod from 'vod-js-sdk-v6'

export default {
    name: 'schoolVideo',
    components: {},
    data() {
        return {
            signPlayUrl: '',
            videoUrl: '',
            uploadData: {},
            uploadVideoUrl: '',
            progress: 0,
            progressFlag: false,
            flag: false,
            fileId: '',
            id: '',
            coverUrl: ''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '67'
        }
    },
    watch: {},
    methods: {
        updateVideo() {
            if (this.coverUrl === '') {
                return this.$message.error('请上传视频封面')
            }
            if (this.videoUrl) {
                cmsSchoolVideoUpdate(``, { id: this.id, videoUrl: this.videoUrl, coverUrl: this.coverUrl }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功')
                        this.getData()
                    }
                })
            } else {
                this.$message.error('未获取到视频地址')
            }
        },
        getData() {
            cmsSchoolVideoInfo().then(res => {
                if (res.status === 200) {
                    this.videoUrl = res.data.videoUrl
                    this.signPlayUrl = res.data.signPlayUrl
                    this.coverUrl = res.data.coverUrl
                    this.id = res.data.id
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.coverUrl = res.data
        },
        // 总数据
        format(percentage) {
            return percentage + '%'
        },
        // web 上传
        getUpload(file, sign) {
            // 通过 import 引入的话，new TcVod(opts) 即可
            // new TcVod.default(opts) 是 script 引入 的用法
            const that = this
            const tcVod = new TcVod({
                getSignature: function () {
                    return sign
                    // return '123245'
                } // 前文中所述的获取上传签名的函数
            })
            that.uploader = tcVod.upload({
                mediaFile: file // 媒体文件（视频或音频或图片），类型为 File
            })
            that.uploader.on('media_progress', function(info) {
                // console.log(info.percent) // 进度
                that.progress = (info.percent * 100).toFixed(2)
                that.progress = parseFloat(that.progress)
                if (that.progress > 0.00 && that.progress < 100.00) {
                    that.progressFlag = true
                } else if (that.progress === 100.00) {
                    setTimeout(() => {
                        that.progressFlag = false
                    }, 500)
                }
            })
            that.uploader.on('media_upload', function(info) {
                // uploaderInfo.isVideoUploadSuccess = true
                // console.log(info)
            })
            // 回调结果说明
            // type doneResult = {
            //   fileId: string,
            //   video: {
            //     url: string
            //   },
            //   coverUrl: {
            //     url: string
            //   }
            // }
            that.uploader.done().then(function (doneResult) {
                // deal with doneResult
                // console.log(doneResult)
                that.videoUrl = doneResult.video.url
                that.fileId = doneResult.fileId
                // that.updateVideo(doneResult.video.url)
                // localStorage.setItem('fileUrl', doneResult.video.url)
                // localStorage.setItem('fileId', doneResult.fileId)

                that.flag = false
            }).catch(function (err) {
                that.$message.error(err + '')
            })
        },
        // 删除上传视频
        handleRemove(file, fileList) {
            this.progress = 0
            this.progressFlag = false
            this.uploader.cancel()
        },
        // 上传之前的文件校验
        beforeUpload(file) {
            console.log(123)
            var FileExt = file.name.replace(/.+\./, '')
            if (['mp4'].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: 'warning',
                    message: '请上传后缀名为mp4的视频文件！'
                })
                return false
            }
        },
        handleChange(file) {
            var FileExt = file.name.replace(/.+\./, '')
            // if (['wmv', 'mpg', 'mov', 'ram', 'rm', 'swf', 'flv', 'mp4', 'rmvb', 'mpeg'].indexOf(FileExt.toLowerCase()) === -1) {
            //     this.$message({
            //         type: 'error',
            //         message: '请上传后缀名为wmv,mpg,mov,ram,rm,swf,flv,mp4,rmvb或mpeg的视频文件！'
            //     })
            //     return false
            // }
            if (['mp4'].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: 'error',
                    message: '请上传后缀名为mp4的视频文件！'
                })
                this.fileList = []
                return false
            }
            if (file.status === 'ready') {
                vodUploadSignature().then(res => {
                    if (res.status === 200) {
                        this.flag = true
                        this.signPlayUrl = ''
                        this.getUpload(file.raw, res.data)
                    }
                })
            }
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
    @import '../../../assets/css/upload1.css'; // 引入公共css类
    .schoolVideo
        .conn
            padding 40px
            width 750px
            margin 0 auto
            .title
                font-size 20px
                padding 20px
            .imgBox
                span {
                    line-height 40px
                }
            .videoBox
                width 100%
                position relative
                .progress
                    position absolute
                    top 50%
                    left 50%
                    margin-left -59px
                    margin-top -59px
                video
                    width 100%
                    height 370px
            .btnList
                padding 20px 0
                text-align center

</style>
