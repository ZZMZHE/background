<template>
    <div class="bannerDateDetails">
        <div class="conn">
            <div class="header">
                <div v-if="type == 1" class="title">新增</div>
                <div v-if="type == 2" class="title">编辑</div>
                <div class="btnList">
                    <el-button v-if="type == 1" size="small" type="primary" @click="add">发布</el-button>
                    <el-button v-if="type == 2" size="small" type="primary" @click="update">确定</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标题" :required="true">
                        <el-input v-model="form.title" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :required="true">
                        <el-input-number v-model="form.sort" controls-position="right" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="详情类别" prop="type" :required="true">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option label="富文本" value="2"></el-option>
                            <el-option label="链接" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="引导图" :required="true">
                        <el-upload
                            :key="4"
                            :with-credentials="true"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-if="form.imageUrl" class="tihuan">点击替换</i>
                            <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="color: red">建议上传750*1344尺寸大小的图片</span>
                    </el-form-item>
                    <!-- <el-form-item label="轮播时间">
                        <el-input-number v-model="form.time" controls-position="right" :min="0"></el-input-number> s
                    </el-form-item> -->
                    <el-form-item label="跳转链接" v-if="form.type == 1" :required="true">
                        <el-input v-model="form.content" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="" v-if="form.type == 2" :required="true">
                       <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import { cmsBannerHomeStartAdd, cmsBannerHomeStartInfo } from 'api/index.js'

export default {
    name: 'bannerDateDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            form: {
                imageUrl: '',
                time: '',
                sort: '',
                title: '',
                content: '',
                htmlContent: '',
                type: 1
            },
            id: '',
            type: '',
            flag: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '65'
        }
    },
    watch: {},
    methods: {
        getData() {
            cmsBannerHomeStartInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form.imageUrl = res.data.imgUrl
                    this.form.title = res.data.title
                    this.form.sort = res.data.sort
                    this.form.type = res.data.type.toString()
                    if (res.data.type.toString() === '1') {
                        this.form.content = res.data.content
                    } else if (res.data.type.toString() === '2') {
                        this.form.htmlContent = res.data.htmlContent
                        setTimeout(() => { this.$refs.text.getData(res.data.htmlContent) }, 300)
                    }
                }
            })
        },
        // 添加
        add() {
            if (this.form.type.toString() === '1') {
                this.form.htmlContent = undefined
            } else {
                this.form.content = undefined
            }
            if (this.form.title === '') {
                return this.$message.error('请输入标题')
            } else if (this.form.imgUrl === '') {
                return this.$message.error('请上传图片')
            }
            if (this.form.type.toString() === '1' && (this.form.content === '' || this.form.content === undefined)) {
                return this.$message.error('请输入跳转链接')
            }
            if (this.form.type.toString() === '2' && (this.form.htmlContent === '' || this.form.htmlContent === undefined)) {
                return this.$message.error('请输入详情')
            }
            if (!this.flag) {
                this.flag = true
                cmsBannerHomeStartAdd(``, {
                    type: this.form.type,
                    sort: this.form.sort,
                    imgUrl: this.form.imageUrl,
                    status: 0,
                    title: this.form.title,
                    htmlContent: this.form.htmlContent,
                    content: this.form.content
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('添加成功！')
                        this.goBack()
                    }
                })
                setTimeout(() => {
                    this.flag = false
                }, 2000)
            }
        },
        // 编辑
        update() {
            if (this.form.type.toString() === '1') {
                this.form.htmlContent = undefined
            } else {
                this.form.content = undefined
            }
            if (this.form.title === '') {
                return this.$message.error('请输入标题')
            } else if (this.form.imgUrl === '') {
                return this.$message.error('请上传图片')
            }
            if (this.form.type.toString() === '1' && (this.form.content === '' || this.form.content === undefined)) {
                return this.$message.error('请输入跳转链接')
            }
            if (this.form.type.toString() === '2' && (this.form.htmlContent === '' || this.form.htmlContent === undefined)) {
                return this.$message.error('请输入详情')
            }
            cmsBannerHomeStartAdd(``, {
                id: this.id,
                type: this.form.type,
                sort: this.form.sort,
                imgUrl: this.form.imageUrl,
                status: 0,
                title: this.form.title,
                htmlContent: this.form.htmlContent,
                content: this.form.content
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('修改成功！')
                    this.goBack()
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imageUrl = res.data
        },
        // 富文本内容
        catchData(val) {
            this.form.htmlContent = val
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'bannerData' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        if (this.type.toString() === '2') {
            this.getData()
        }
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    @import '../../../assets/css/upload4.css'; // 引入公共css类
    .wanged >>> .w-e-text-container
        height: 300px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .bannerDateDetails
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
                margin-top 20px
                padding-bottom 20px
</style>
