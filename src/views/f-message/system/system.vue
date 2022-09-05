<template>
    <div class="systemMessage">
        <div class="conn">
            <div class="title">系统消息推送</div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="90px" style="width: 40%">
                    <el-form-item label="标题：" :required="true">
                        <el-input v-model="form.title" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" :required="true">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option label="纯文本" value="1"></el-option>
                            <el-option label="富文本" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容：" :required="true">
                        <el-input
                            style="width: 80%"
                            type="textarea"
                            placeholder="请输入"
                            v-model="form.message"
                            rows="4"
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="详情：" class="richTxt" v-if="form.type == 2" :required="true">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <!-- <el-form-item label="标题：">
                        <el-upload
                            :action="uploadUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item> -->
                    <el-form-item style="text-align: center">
                        <el-button v-if="type == 1" class="bg" @click="messageAdd">推送</el-button>
                        <el-button @click="goBack">返回上一页</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import { informInfo, informAdd } from 'api/index.js'

export default {
    name: 'systemMessage',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            form: {
                title: undefined,
                message: undefined,
                htmlContent: undefined,
                type: undefined
            },
            dialogImageUrl: '',
            dialogVisible: false,
            type: undefined,
            id: undefined,
            f: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        // handleRemove(file, fileList) {
        //     console.log(file, fileList)
        // },
        // handlePictureCardPreview(file) {
        //     this.dialogImageUrl = file.url
        //     this.dialogVisible = true
        // },
        // handleSuccess(file) {
        //     this.form.picUrl = file.data
        // }
        // 推送详情
        getData() {
            informInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form = res.data
                    this.form.type = res.data.type + ''
                    if (res.data.type.toString() === '2') {
                        setTimeout(() => { this.$refs.text.getData(res.data.htmlContent) }, 300)
                    }
                }
            })
        },
        // 发送推送
        messageAdd() {
            if (!this.f) {
                this.f = true
                informAdd(``, this.form).then(res => {
                    if (res.status === 200) {
                        this.$message.success('添加推送成功')
                        this.goBack()
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 富文本内容
        catchData(val) {
            this.form.htmlContent = val
        },
        // 返回上一页
        goBack() {
            this.$router.go(-1)
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
    .wanged >>> .w-e-text-container
        height: 250px !important
    .bg
        background #222222
        color #ffffff
    .systemMessage
        .conn
            margin 20px
            background #ffffff
            .title
                padding 20px 0 0 20px
                font-size 20px
                color #333333
            .formBox
                padding 40px 0 30px 20px
</style>
