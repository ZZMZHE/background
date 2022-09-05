<template>
    <div class="advertisingDetails">
        <div class="conn">
            <div class="header">
                <div class="title" v-if="type == 1">新增</div>
                <div class="title" v-if="type == 2">编辑</div>
                <div class="btnList">
                    <el-button size="small" type="primary" v-if="type == 1" @click="upLoad">发布</el-button>
                    <el-button size="small" type="primary" v-if="type == 2"  @click="upLoad">确定</el-button>
                    <el-button size="small" plain @click="$router.go(-1)">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="主图" :required="true">
                        <el-upload
                            :key="2"
                            :with-credentials="true"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                            <i v-if="form.imgUrl" class="tihuan">点击替换</i>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="color: red">建议上传256*256尺寸大小的图片</span>
                    </el-form-item>
                    <el-form-item label="标题" :required="true">
                        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <wangedEdit :catchData="catchData" ref="detail" class="wanged"></wangedEdit>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { cmsAdAdd, cmsAdDetails } from 'api/index.js'

export default {
    name: 'advertisingDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            form: {
                imgUrl: '',
                title: '',
                htmlContent: '',
                sort: 1
            },
            type: '',
            id: ''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '68'
        }
    },
    watch: {},
    methods: {
        // 获取详情
        getData() {
            cmsAdDetails(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form.title = res.data.title
                    this.form.id = res.data.id
                    this.form.imgUrl = res.data.imgUrl
                    this.form.htmlContent = res.data.htmlContent
                    this.form.sort = res.data.sort
                    setTimeout(() => { this.$refs.detail.getData(res.data.htmlContent) }, 300)
                }
            })
        },
        // 编辑
        upLoad() {
            cmsAdAdd(``,
                this.form
            ).then(res => {
                if (res.status === 200) {
                    this.$message.success('编辑成功')
                    this.$router.go(-1)
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data
        },
        // 富文本内容
        catchData(val) {
            this.form.htmlContent = val
        }
    },
    created() {
        this.type = this.$route.query.type
        this.id = this.$route.query.id
        if (this.type.toString() === '2') {
            this.getData()
        }
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    @import '../../../assets/css/upload2.css'; // 引入公共css类
    .wanged >>> .w-e-text-container
        height: 300px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .advertisingDetails
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .header
                height 80px
                border-bottom 1px solid #F2F2F2
                .title
                    line-height 81px
                    float left
                    margin-left 20px
                    color #333333
                    font-size 20px
                .btnList
                    float right
                    margin-right 244px
                    line-height 81px
            .formBox
                width 50%
                padding-top 20px
                padding-bottom 20px
</style>
