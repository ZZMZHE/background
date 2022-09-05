<template>
    <div class="addTeacher">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">新增老师：</div>
                <div class="title" v-if="type == 3">新增名师：</div>
                <div class="title" v-if="type == 2">编辑老师：</div>
                <div class="title" v-if="type == 4">编辑名师：</div>
                <div class="btnList">
                    <el-button v-if="type == 1 || type == 3" plain size="small" class="back bg" @click="grant">确认添加</el-button>
                    <el-button v-if="type == 2 || type == 4" plain size="small" class="back bg" @click="grant">保存编辑</el-button>
                    <el-button plain size="small" class="back" @click="goBack({ tabIndex })">返回上一页</el-button>
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
                    <el-form-item label="老师职位：" :required="true">
                        <el-input class="couName" v-model="teacherData.position" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" :required="true">
                        <el-select v-model="teacherData.gender" placeholder="请选择">
                            <el-option label="未知" value="0"></el-option>
                            <el-option label="男" value="2"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="毕业院校：" :required="true">
                        <el-input class="couName" v-model="teacherData.graduateSchool" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="个人主页：" :required="true">
                        <el-input class="couName" v-model="teacherData.homepage" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="标语：" :required="true">
                        <el-input class="couName" v-model="teacherData.slogan" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="资历：" :required="true">
                        <el-input
                            style="width: 400px"
                            :rows="3"
                            type="textarea"
                            placeholder="请输入"
                            v-model="teacherData.qualification"
                            maxlength="100"
                            show-word-limit
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="出生日期：" :required="true">
                        <el-date-picker
                            v-model="teacherData.birthday"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:SS"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="手机号（账号）：" v-if="type == 1 || type == 3" :required="true">
                        <el-input class="couName" v-model="teacherData.mobile" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" v-if="type == 1 || type == 3" :required="true">
                        <el-input class="couName" v-model="teacherData.password" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码：" v-if="type == 2 || type == 4" :required="true">
                        <el-input class="couName" v-model="teacherData.password" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="简介：" class="richTxt" :required="true">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { teacherAdd, teacherInfo } from 'api/index.js'

export default {
    name: 'addTeacher',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            teacherData: {
                id: undefined,
                mobile: undefined,
                type: 1,
                status: 0,
                nickname: undefined,
                faceUrl: undefined,
                gender: undefined,
                position: undefined,
                graduateSchool: undefined,
                slogan: undefined,
                homepage: undefined,
                introduce: undefined,
                birthday: undefined,
                qualification: undefined,
                password: undefined
            },
            id: undefined,
            type: 2,
            tabIndex: undefined,
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
            teacherInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.teacherData = res.data
                    setTimeout(() => { this.$refs.text.getData(res.data.introduce) }, 300)
                    this.teacherData.password = null
                    this.teacherData.gender = res.data.gender + ''
                }
            })
        },
        // 头像上传
        handleSuccess(file) {
            this.teacherData.faceUrl = file.data
        },
        // 富文本内容
        catchData(val) {
            this.teacherData.introduce = val
        },
        // 确认添加或编辑
        grant() {
            if (this.teacherData.nickname === '' || this.teacherData.nickname === undefined) {
                return this.$message.error('请输入老师名称')
            } else if (this.teacherData.faceUrl === '' || this.teacherData.faceUrl === undefined) {
                return this.$message.error('请上传老师头像')
            } else if (this.teacherData.position === '' || this.teacherData.position === undefined) {
                return this.$message.error('请输入老师职位')
            } else if (this.teacherData.gender === '' || this.teacherData.gender === undefined) {
                return this.$message.error('请输入老师性别')
            } else if (this.teacherData.graduateSchool === '' || this.teacherData.graduateSchool === undefined) {
                return this.$message.error('请输入老师毕业院校')
            } else if (this.teacherData.homepage === '' || this.teacherData.homepage === undefined) {
                return this.$message.error('请输入个人主页')
            } else if (this.teacherData.slogan === '' || this.teacherData.slogan === undefined) {
                return this.$message.error('请输入标语')
            } else if (this.teacherData.qualification === '' || this.teacherData.qualification === undefined) {
                return this.$message.error('请输入资历')
            } else if (this.teacherData.birthday === '' || this.teacherData.birthday === undefined) {
                return this.$message.error('请输入出生日期')
            } else if (this.teacherData.introduce === '' || this.teacherData.introduce === undefined) {
                return this.$message.error('请输入简介')
            }
            if (this.teacherData.password !== '' || this.teacherData.password !== undefined || this.teacherData.password !== null) {
                var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
                if (reg.test(this.teacherData.password)) {
                    return this.$message.error('密码里不能有汉字！')
                }
            }
            if (parseInt(this.type) === 1 || parseInt(this.type) === 3) {
                if (!this.flag) {
                    this.flag = true
                    teacherAdd(``,
                        this.teacherData
                    ).then(res => {
                        if (res.status === 200) {
                            this.$message.success('添加成功')
                            this.goBack({ tabIndex: this.tabIndex })
                        }
                    })
                    setTimeout(() => {
                        this.flag = false
                    }, 2000)
                }
            } else if (parseInt(this.type) === 2 || parseInt(this.type) === 4) {
                this.teacherData.id = this.id
                teacherAdd(``,
                    this.teacherData
                ).then(res => {
                    if (res.status === 200) {
                        this.$message.success('编辑成功')
                        this.goBack({ tabIndex: this.tabIndex })
                    }
                })
            }
        },
        // 返回上一页
        goBack(val) {
            this.$router.push({ name: 'teacherList', query: val })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.tabIndex = this.$route.query.tabIndex
        if (parseInt(this.type) === 1 || parseInt(this.type) === 2) {
            this.teacherData.type = 1
        } else if (parseInt(this.type) === 3 || parseInt(this.type) === 4) {
            this.teacherData.type = 2
        }
        if (parseInt(this.type) === 4 ||　parseInt(this.type) === 2) {
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
    .addTeacher
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
