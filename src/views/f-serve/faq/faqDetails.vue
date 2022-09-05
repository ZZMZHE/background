<template>
    <div class="faqDetails">
        <div class="conn">
            <div class="header">
                <div class="title">问题详情：</div>
                <div class="btnList">
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="标题" :required="true">
                        <el-input v-model="form.title" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :required="true">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="form.textarea">
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item label="图片">
                        <el-upload
                            ref="clear"
                            accept="image/*"
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="btnBox">
                <div class="save" @click="update">保存编辑</div>
                <div class="save quxiao" @click="quxiao">取消编辑</div>
            </div>
        </div>
    </div>
</template>

<script>

import { cmsHelpInfo, cmsHelpAdd } from 'api/index.js'

export default {
    name: 'faqDetails',
    components: {},
    data() {
        return {
            form: {
                // imgUrl: '',
                title: '',
                textarea: ''
            },
            id: '',
            type: ''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '80'
        }
    },
    watch: {},
    methods: {
        getData() {
            cmsHelpInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form.title = res.data.issue
                    this.form.textarea = res.data.answer
                    // this.form.imgUrl = JSON.parse(res.data.imgUrlJson)[0]
                }
            })
        },
        // 编辑
        update() {
            // let arr = []
            // arr.push(this.form.imgUrl)
            cmsHelpAdd(``, {
                id: this.id,
                issue: this.form.title,
                answer: this.form.textarea,
                // imgUrlJson: arr,
                status: 0
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('修改成功！')
                    this.goBack()
                    // this.getData()
                }
            })
        },
        // 取消编辑
        quxiao() {
            cmsHelpInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form.title = res.data.issue
                    this.form.textarea = res.data.answer
                    if (res.data.imgUrlJson) {
                        this.form.imgUrl = JSON.parse(res.data.imgUrlJson)[0]
                    }
                    this.$message.success('已取消')
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'faq' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
   @import '../../../assets/css/upload3.css';
    .wanged >>> .w-e-text-container
        height: 300px !important
    .faqDetails
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
            .btnBox
                height 60px
                background #ffffff
                .save
                    width 148px
                    height 40px
                    background #222222
                    text-align center
                    line-height 40px
                    color #ffffff
                    font-size 18px
                    float left
                    margin-left 312px
                    cursor pointer
                .quxiao
                    margin-left 40px
                    background #ffffff
                    width 146px
                    height 38px
                    color #9E9DA4
                    border 1px solid #9E9DA4
</style>
