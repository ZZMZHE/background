<template>
    <div class="contentDetails">
        <div class="conn">
            <div class="head">
                <div class="title">申请详情：</div>
                <el-button plain size="small" v-if="type == 1" class="back" @click="goBack">返回上一页</el-button>
                <el-button plain size="small" v-if="type == 2" class="back" @click="goBack">返回上一页</el-button>
            </div>
            <div class="formBox" v-if="type == 1">
                <el-form ref="form" :model="contentData" label-width="85px" label-position="right" class="form">
                    <el-form-item label="姓名：">
                        <span class="txt">{{contentData.name}}</span>
                    </el-form-item>
                    <el-form-item label="出生年月：">
                        <span class="txt">{{contentData.birthday}}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <span class="txt" v-if="contentData.gender == 0">未知</span>
                        <span class="txt" v-if="contentData.gender == 1">女</span>
                        <span class="txt" v-if="contentData.gender == 2">男</span>
                    </el-form-item>
                    <el-form-item label="职业：">
                        <span class="txt">{{contentData.position}}</span>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <span class="txt jianjie">{{contentData.mobile}}</span>
                    </el-form-item>
                    <el-form-item label="微信号：">
                        <span class="txt">{{contentData.wxNumber}}</span>
                    </el-form-item>
                     <el-form-item label="教学经验：">
                        <span class="txt">{{contentData.experience}}</span>
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!-- <span class="txt">{{contentData.wxNumber}}</span> -->
                        <span v-if="keys == 0" class="txt" style="color: #9E9DA4">待审核</span>
                        <span v-if="keys == 1" class="txt" style="color: #1ABC9C">已通过</span>
                        <span v-if="keys == 2" class="txt" style="color: #FE093C">已拒绝</span>
                    </el-form-item>
                    <el-form-item>
                        <div class="btnBox" v-if="keys == 0">
                            <el-button class="bg" size="small" @click="auditTeacher(1)">通过</el-button>
                            <el-button size="small" @click="auditTeacher(2)">拒绝</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="formBox" v-if="type == 2">
                <el-form ref="form" :model="contentData" label-width="150px" label-position="right" class="form">
                    <el-form-item label="姓名：">
                        <span class="txt">{{contentData.name}}</span>
                    </el-form-item>
                    <el-form-item label="出生年月：">
                        <span class="txt">{{contentData.birthday}}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <span class="txt" v-if="contentData.gender == 0">未知</span>
                        <span class="txt" v-if="contentData.gender == 1">女</span>
                        <span class="txt" v-if="contentData.gender == 2">男</span>
                    </el-form-item>
                    <el-form-item label="职业：">
                        <span class="txt">{{contentData.job}}</span>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <span class="txt jianjie">{{contentData.mobile}}</span>
                    </el-form-item>
                    <el-form-item label="微信号：">
                        <span class="txt">{{contentData.wxNumber}}</span>
                    </el-form-item>
                    <el-form-item label="是否微商：">
                        <span class="txt" v-if="contentData.isSmallShop == 0">否</span>
                        <span class="txt" v-if="contentData.isSmallShop == 1">是</span>
                    </el-form-item>
                    <el-form-item label="是否代购：">
                        <span class="txt" v-if="contentData.replaceBuy == 0">否</span>
                        <span class="txt" v-if="contentData.replaceBuy == 1">是</span>
                    </el-form-item>
                    <el-form-item label="是否其他平台店主：">
                        <span class="txt" v-if="contentData.isOtherShopkeeper == 0">否</span>
                        <span class="txt" v-if="contentData.isOtherShopkeeper == 1">是</span>
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!-- <span class="txt">{{contentData.wxNumber}}</span> -->
                        <span v-if="keys == 0" class="txt" style="color: #9E9DA4">待审核</span>
                        <span v-if="keys == 1" class="txt" style="color: #1ABC9C">已通过</span>
                        <span v-if="keys == 2" class="txt" style="color: #FE093C">已拒绝</span>
                    </el-form-item>
                    <el-form-item>
                        <div class="btnBox" v-if="keys == 0">
                            <el-button class="bg" size="small" @click="auditPush(1)">通过</el-button>
                            <el-button size="small" @click="auditPush(2)">拒绝</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { eduTeacherApplyInfo, eduTeacherApplyUpdate, cmsPushMarketInfo, cmsPushMarketUpdate } from 'api/index.js'

export default {
    name: 'contentDetails',
    components: {},
    data() {
        return {
            contentData: {
                name: undefined,
                birthday: undefined,
                gender: undefined,
                position: undefined,
                mobile: undefined,
                wxNumber: undefined,
                experience: undefined,
                job: undefined
            },
            id: '',
            type: '',
            keys: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情数据
        getData() {
            if (this.type.toString() === '1') {
                eduTeacherApplyInfo(``, {
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.contentData = res.data
                    }
                })
            } else if (this.type.toString() === '2') {
                cmsPushMarketInfo(``, {
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.contentData = res.data
                    }
                })
            }
        },
        auditTeacher(s) {
            let msg = '审核通过'
            if (s === 2) {
                msg = '审核失败'
            }
            this.$confirm('此操作将审核该申请, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: msg,
                type: 'warning'
            }).then(() => {
                if (s === 2) {
                    this.$prompt('请输入失败原因', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        eduTeacherApplyUpdate(``, {
                            id: this.id,
                            status: s,
                            rejectReason: value
                        }).then(res => {
                            if (res.status === 200) {
                                this.$message.success('操作成功')
                                this.goBack()
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                } else {
                    eduTeacherApplyUpdate(``, {
                        id: this.id,
                        status: s
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('操作成功')
                            this.goBack()
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 审核推手
        auditPush(s) {
            let msg = '审核通过'
            if (s === 2) {
                msg = '审核失败'
            }
            this.$confirm('此操作将审核该申请, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: msg,
                type: 'warning'
            }).then(() => {
                if (s === 2) {
                    this.$prompt('请输入失败原因', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        cmsPushMarketUpdate(``, {
                            id: this.id,
                            status: s,
                            rejectReason: value
                        }).then(res => {
                            if (res.status === 200) {
                                this.$message.success('操作成功')
                                this.goBack()
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                } else {
                    cmsPushMarketUpdate(``, {
                        id: this.id,
                        status: s
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('操作成功')
                            this.goBack()
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 返回上一层
        goBack() {
            if (this.type.toString() === '1') {
                this.$router.push({ name: 'auditTeacher' })
            } else if (this.type.toString() === '2') {
                this.$router.push({ name: 'auditPush' })
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.keys = this.$route.query.status
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .contentDetails
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
                .back
                    float right
                    margin-top 30px
            .formBox
                margin 0 80px
                border-top 1px solid #F2F2F2
                .form
                    padding-top 20px
                    .el-form-item
                        margin-bottom 0px
                    .imgBox
                        width 60px
                        height 60px
                        overflow hidden
                        cursor pointer
                        img
                            width 100%
                            height 100%
                    .txt
                        color #9E9DA4
                    .jianjie
                        width 40%
                        display block
                    .bg
                        background #222222
                        color #ffffff
                        margin-right 20px
</style>
