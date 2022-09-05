<template>
    <div class="informationDetails">
        <div class="conn">
            <div class="title" v-if="type == 1">新增企业</div>
            <div class="title" v-if="type == 2">查看企业</div>
            <el-divider></el-divider>
            <div class="formBox">
                <el-form :model="formInline" ref="formInline" label-width="110px" class="demo-form-inline" size="small">
                    <el-form-item label="企业标题：" prop="name" :required="true">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="企业logo：" :required="true">
                        <el-upload
                            :action="uploadUrl"
                            :with-credentials="true"
                            list-type="picture-card"
                            :limit="1"
                            :file-list="picArr"
                            :on-exceed="morePic"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="formInline.imgUrl" alt="">
                        </el-dialog>
                        <span style="color: red">建议上传206*280尺寸大小的图片</span>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="企业详情：" class="richTxt" :required="true">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-divider></el-divider>
                </el-form>
            </div>
            <!-- <el-divider></el-divider> -->
            <div class="btnList">
                <el-button type="primary" size="small" @click="fabu" v-if="type == 1">确定新增</el-button>
                <el-button type="primary" size="small" @click="fabu" v-if="type == 2">保存编辑</el-button>
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>

import { cmsCompanyAdd, cmsCompanyInfo } from 'api/index.js'

export default {
    name: 'informationDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            formInline: {
                id: undefined,
                name: undefined,
                imgUrl: undefined,
                content: undefined
            },
            picArr: [],
            dialogVisible: false,
            type: '',
            id: '',
            f: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '71'
        }
    },
    watch: {},
    methods: {
        getData() {
            cmsCompanyInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.formInline = res.data
                    this.picArr = []
                    let pic = {
                        uid: '1',
                        url: this.formInline.imgUrl
                    }
                    this.picArr.push(pic)
                    setTimeout(() => { this.$refs.text.getData(res.data.content) }, 300)
                }
            })
        },
        handleSuccess(file, fileList) {
            this.formInline.imgUrl = file.data
        },
        handleRemove(file, fileList) {
            this.formInline.imgUrl = undefined
        },
        handlePictureCardPreview(file) {
            this.formInline.imgUrl = file.url
            this.dialogVisible = true
        },
        morePic() {
            return this.$message.error('最多上传一张封面')
        },
        // 富文本内容
        catchData(val) {
            this.formInline.content = val
        },
        // 发布商品
        fabu() {
            if (this.formInline.name === '' || this.formInline.name === undefined) {
                return this.$message.error('请输入标题')
            } else if (this.formInline.imgUrl === '' || this.formInline.imgUrl === undefined) {
                return this.$message.error('请上传封面')
            } else if (this.formInline.content === '' || this.formInline.content === undefined) {
                return this.$message.error('请输入详情')
            }
            if (!this.f) {
                this.f = true
                cmsCompanyAdd(``, this.formInline).then(res => {
                    if (res.status === 200) {
                        this.$message.success('发布成功！')
                        this.$router.go(-1)
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
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
@import '../../../assets/css/upload3.css'; // 引入公共css类
    .disabled
        position absolute
        width 178px
        height 178px
        background rgba(0, 0, 0, 0)
        z-index 100
        cursor not-allowed !important
    .wanged >>> .w-e-text-container
        height: 250px !important
    .informationDetails
        .conn
            padding 20px 14px
            .title
                font-size 20px
                padding-left 20px
            .formBox
                .phoneId
                    width 20%
                .richTxt
                    width 600px
            .awardList
                overflow hidden
                .addAward
                    margin-top 95px
                    float left
                    margin-left 20px
                .awardBox
                    border 1px solid #ccc
                    width: 18%
                    height 200px
                    float left
                    margin 10px 10px
                    .awardTop
                        overflow hidden
                        .awardLeft
                            float left
                            margin 25px 8px
                        .awardRight
                            float left
                            margin 35px 0 10px 15px
                            p
                                line-height 30px
                            .txt
                                font-size 16px
                                span
                                    color #1890FF
                    .awardBottom
                        background #f7f9fa
                        border-top 1px solid #ccc
                        .btnList
                            height 58px
                            cursor pointer
                            .update
                                width 49%
                                line-height 58px
                                border-right 1px solid #ccc
                                float left
                                text-align center
                                color #8d8f8f
                            .del
                                width 50%
                                line-height 58px
                                float left
                                text-align center
                                color #ff3333
                            .del:hover, .update:hover
                                color #1890FF
            .parameterList
                overflow hidden
                .addparameter
                    margin-top 77px
                    float left
                    margin-left 20px
                .parameterBox
                    border 1px solid #ccc
                    width: 18%
                    height 164px
                    float left
                    margin 10px 10px
                    .parameterTop
                        overflow hidden
                        .parameterLeft
                            float left
                            margin 25px 8px
                        .parameterRight
                            float left
                            height 85px
                            margin-left 15px
                            margin-top 20px
                            p
                                line-height 30px
                            .txt
                                font-size 16px
                                span
                                    color #1890FF
                    .parameterBottom
                        background #f7f9fa
                        border-top 1px solid #ccc
                        .btnList
                            height 58px
                            cursor pointer
                            .update
                                width 49%
                                line-height 58px
                                border-right 1px solid #ccc
                                float left
                                text-align center
                                color #8d8f8f
                            .del
                                width 50%
                                line-height 58px
                                float left
                                text-align center
                                color #ff3333
                            .del:hover, .update:hover
                                color #1890FF
            .addGoodsMessage
                text-align center
                .el-button
                    width 250px
            .btnList
                text-align center
</style>
