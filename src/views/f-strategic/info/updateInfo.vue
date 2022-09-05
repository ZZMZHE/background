<template>
    <div class="informationDetails">
        <div class="conn">
            <div class="title" v-if="type == 1">发布资讯</div>
            <div class="title" v-if="type == 2">查看资讯</div>
            <el-divider></el-divider>
            <div class="formBox">
                <el-form :model="formInline" ref="formInline" label-width="110px" class="demo-form-inline" size="small">
                    <el-form-item label="资讯标题：" prop="title" :required="true">
                        <el-input v-model="formInline.title" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="资讯副标题：" prop="subtitle" :required="true">
                        <el-input v-model="formInline.subtitle" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="企业列表：" prop="companyId" :required="true">
                        <el-select v-model="formInline.companyId" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in companyList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="资讯封面：" :required="true">
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
                            <img width="100%" :src="formInline.coverUrl" alt="">
                        </el-dialog>
                        <span style="color: red">建议上传690*325尺寸大小的图片</span>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="资讯详情：" class="richTxt" :required="true">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="发布人：" prop="nickname" :required="true">
                        <el-input v-model="formInline.nickname" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="序位：" prop="sortOrder" :required="true">
                        <el-input-number placeholder="请输入" v-model="formInline.sortOrder" controls-position="right" :min="1" :max="100"></el-input-number>
                    </el-form-item>
                    <el-divider></el-divider>
                </el-form>
            </div>
            <!-- <el-divider></el-divider> -->
            <div class="btnList">
                <el-button type="primary" size="small" @click="fabu" v-if="type == 1">立即发布</el-button>
                <el-button type="primary" size="small" @click="fabu" v-if="type == 2">保存编辑</el-button>
                <el-button size="small" @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>

import { cmsCompanyInformationAdd, cmsCompanyInformationCompanyList, cmsCompanyInformationInfo } from 'api/index.js'

export default {
    name: 'informationDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            formInline: {
                companyId: undefined,
                title: undefined,
                categoryId1: undefined,
                coverUrl: undefined,
                nickname: undefined,
                sortOrder: '1',
                content: undefined
            },
            companyList: [],
            picArr: [],
            dialogVisible: false,
            type: '',
            id: '',
            f: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '70'
        }
    },
    watch: {},
    methods: {
        getCategory() {
            cmsCompanyInformationCompanyList().then(res => {
                if (res.status === 200) {
                    this.companyList = res.data
                }
            })
        },
        getData() {
            cmsCompanyInformationInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.formInline = res.data
                    this.picArr = []
                    let pic = {
                        uid: '1',
                        url: this.formInline.coverUrl
                    }
                    this.picArr.push(pic)
                    setTimeout(() => { this.$refs.text.getData(res.data.content) }, 300)
                }
            })
        },
        handleSuccess(file, fileList) {
            this.formInline.coverUrl = file.data
        },
        handleRemove(file, fileList) {
            this.formInline.coverUrl = undefined
        },
        handlePictureCardPreview(file) {
            this.formInline.coverUrl = file.url
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
            if (this.formInline.title === '' || this.formInline.title === undefined) {
                return this.$message.error('请输入标题')
            } else if (this.formInline.subtitle === '' || this.formInline.subtitle === undefined) {
                return this.$message.error('请输入副标题')
            } else if (this.formInline.companyId === '' || this.formInline.companyId === undefined) {
                return this.$message.error('请选择企业')
            } else if (this.formInline.coverUrl === '' || this.formInline.coverUrl === undefined) {
                return this.$message.error('请上传封面')
            } else if (this.formInline.content === '' || this.formInline.content === undefined) {
                return this.$message.error('请输入详情')
            } else if (this.formInline.nickname === '' || this.formInline.nickname === undefined) {
                return this.$message.error('请输入发布人')
            }
            if (!this.f) {
                this.f = true
                cmsCompanyInformationAdd(``, this.formInline).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功！')
                        this.$router.go(-1)
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 返回
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.getCategory()
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
