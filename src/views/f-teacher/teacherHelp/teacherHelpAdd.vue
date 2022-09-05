<template>
    <div class="teacherHelpAdd">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">新增助教老师：</div>
                <div class="title" v-if="type == 2">编辑助教老师：</div>
                <div class="btnList">
                    <el-button v-if="type == 1" plain size="small" class="back bg" @click="grant">确认添加</el-button>
                    <el-button v-if="type == 2" plain size="small" class="back bg" @click="grant">保存编辑</el-button>
                    <el-button plain size="small" class="back" @click="goBack()">返回上一页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="teacherData" label-width="150px" label-position="right" class="form" size="small">
                    <el-form-item label="老师名称：" :required="true">
                        <el-input class="couName" v-model="teacherData.nickname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="老师头像：" prop="name" :required="true">
                        <el-upload
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess">
                            <img v-if="teacherData.faceUrl" :src="teacherData.faceUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                        <span style="color: red">建议上传120*120尺寸大小的作为头像</span>
                    </el-form-item>
                    <el-form-item label="手机号：" :required="true">
                        <el-input class="couName" v-model="teacherData.mobile" placeholder="请输入" maxLength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号：" :required="true">
                        <el-input class="couName" v-model="teacherData.wxNumber" placeholder="请输入" maxLength="11"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { eduTeacherAssistAdd, eduTeacherAssistInfo } from 'api/index.js'

export default {
    name: 'teacherHelpAdd',
    components: {
    },
    data() {
        return {
            teacherData: {
                id: undefined,
                mobile: undefined,
                nickname: undefined,
                faceUrl: undefined,
                wxNumber: undefined
            },
            id: undefined,
            type: 2,
            flag: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        // 获取详情
        getData() {
            eduTeacherAssistInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.teacherData = res.data
                }
            })
        },
        // 头像上传
        handleSuccess(file) {
            this.teacherData.faceUrl = file.data
        },

        // 确认添加或编辑
        grant() {
            if (this.teacherData.nickname === '' || this.teacherData.nickname === undefined) {
                return this.$message.error('请输入老师名称')
            } else if (this.teacherData.faceUrl === '' || this.teacherData.faceUrl === undefined) {
                return this.$message.error('请上传老师头像')
            } else if (this.teacherData.mobile === '' || this.teacherData.mobile === undefined) {
                return this.$message.error('请输入手机号')
            } else if (this.teacherData.wxNumber === '' || this.teacherData.wxNumber === undefined) {
                return this.$message.error('请输入微信号')
            }

            if (parseInt(this.type) === 1) {
                if (!this.flag) {
                    this.flag = true
                    eduTeacherAssistAdd(``,
                        this.teacherData
                    ).then(res => {
                        if (res.status === 200) {
                            this.$message.success('添加成功')
                            this.goBack()
                        }
                    })
                    setTimeout(() => {
                        this.flag = false
                    }, 2000)
                }
            } else if (parseInt(this.type) === 2) {
                this.teacherData.id = this.id
                eduTeacherAssistAdd(``,
                    this.teacherData
                ).then(res => {
                    if (res.status === 200) {
                        this.$message.success('编辑成功')
                        this.goBack()
                    }
                })
            }
        },
        // 返回上一页
        goBack(val) {
            this.$router.push({ name: 'teacherHelp' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        if (parseInt(this.type) === 2) {
            this.getData()
        }
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
@import '../../../assets/css/upload3.css'; // 引入公共css类
    .wanged >>> .w-e-text-container
        height: 250px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .bg
        background #222222
        color: #ffffff
    .paging
        padding 20px 0
        text-align center
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .teacherHelpAdd
        .conn
            margin 20px 20px 0 20px
            .head
                height 90px
                line-height 90px
                margin 0 35px
                border-bottom 1px solid #F2F2F2
                .title
                    float left
                    color #333333
                .btnList
                    float right
                // .back
                .bg
                    background #222222
                    color: #ffffff
            .formBox
                margin 0 80px
                border-top 1px solid #F2F2F2
                .form
                    padding-top 20px
                    // .el-form-item
                    //     margin-bottom 0px
                    .richTxt
                        width 600px
                    .box
                        position relative
                        // height 90px
                        overflow hidden
                        .taecherBox
                            height 80px
                            width 140px
                            border 1px solid #C0C0C0
                            float left
                            border-radius 8px
                            margin-top 8px
                            margin-right 10px
                            position relative
                            .imgBox
                                width 40px
                                height 40px
                                border-radius 50%
                                margin 6px auto 0 auto
                                overflow hidden
                                img
                                    width 100%
                                    height 100%
                            .name
                                text-align center
                                color #C0C0C0
                            .el-icon-error
                                font-size 20px
                                position absolute
                                color #C0C0C0
                                right -8px
                                top -8px
                                cursor pointer
                            .el-icon-error:hover
                                color red
                        .btnBox
                            float left
                            .listAdd
                                float left
                                margin-left 10px
                                color #1890FF
                                cursor pointer
                                margin-top 60px
                            .oneself:hover, .list:hover
                                color red
                    .couName
                        width 35%
                    .txt
                        color #9E9DA4
                    .btn
                        background #222222
                        color #ffffff
</style>
