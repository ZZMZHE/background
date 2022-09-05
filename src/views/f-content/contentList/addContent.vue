<template>
    <div class="addContent">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">添加招聘信息：</div>
                <div class="title" v-if="type == 2">编辑招聘信息：</div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
                <el-button size="small" v-if="type == 1" class="back bg" @click="add">确定</el-button>
                <el-button size="small" v-if="type == 2" class="back bg" @click="add">保存编辑</el-button>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="zhaoPinData" label-width="95px" label-position="right" class="form">
                    <el-form-item label="招聘企业：" prop="companyName" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.companyName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位名称：" prop="job" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.job" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="任职要求：" prop="jobRequire" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.jobRequire" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="任职描述：" prop="jobDepict" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.jobDepict" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘人数：" prop="peopleCount" :required="true">
                        <el-input-number placeholder="请输入" v-model="zhaoPinData.peopleCount" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="薪资：" :required="true">
                        <el-input-number placeholder="请输入" v-model="zhaoPinData.salary1" controls-position="right" :min="5000" :max="15000"></el-input-number>
                        <span style="padding: 0 10px">--</span>
                        <el-input-number placeholder="请输入" v-model="zhaoPinData.salary2" controls-position="right" :min="5000" :max="15000"></el-input-number>
                        <!-- <el-input class="couName" v-model="zhaoPinData.salary" placeholder="请输入"></el-input> -->
                    </el-form-item>
                    <el-form-item label="手机号：" prop="mobile" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.mobile" placeholder="请输入" maxLength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.email" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="企业简介：" prop="companyBrief" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.companyBrief" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址：" prop="companyAddress" :required="true">
                        <el-input class="couName" v-model="zhaoPinData.companyAddress" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { cmsCompanyRecruitAdd, cmsCompanyRecruitInfo } from 'api/index.js'
export default {
    name: 'addContent',
    components: {},
    data() {
        return {
            zhaoPinData: {
                companyName: undefined,
                job: undefined,
                jobRequire: undefined,
                jobDepict: undefined,
                peopleCount: undefined,
                salary1: undefined,
                salary2: undefined,
                salary: undefined,
                mobile: undefined,
                email: undefined,
                companyBrief: undefined,
                companyAddress: undefined
            },
            id: '',
            type: '',
            tabIndex: '',
            f: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情数据
        getData() {
            cmsCompanyRecruitInfo(``, {
                id: this.id
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.zhaoPinData = res.data
                }
            })
        },
        // 添加
        add() {
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (this.zhaoPinData.companyName === '' || this.zhaoPinData.companyName === undefined) {
                return this.$message.error('请输入企业名称')
            } else if (this.zhaoPinData.job === '' || this.zhaoPinData.job === undefined) {
                return this.$message.error('请输入岗位名称')
            } else if (this.zhaoPinData.jobRequire === '' || this.zhaoPinData.jobRequire === undefined) {
                return this.$message.error('请输入任职要求')
            } else if (this.zhaoPinData.jobDepict === '' || this.zhaoPinData.jobDepict === undefined) {
                return this.$message.error('请输入任职描述')
            } else if (this.zhaoPinData.peopleCount === '' || this.zhaoPinData.peopleCount === undefined) {
                return this.$message.error('请输入招聘人数')
            } else if (this.zhaoPinData.salary1 === '' || this.zhaoPinData.salary1 === undefined) {
                return this.$message.error('请输入薪资')
            } else if (this.zhaoPinData.salary2 === '' || this.zhaoPinData.salary2 === undefined) {
                return this.$message.error('请输入薪资')
            } else if (this.zhaoPinData.mobile === '' || this.zhaoPinData.mobile === undefined) {
                return this.$message.error('请输入电话')
            } else if (this.zhaoPinData.email === '' || this.zhaoPinData.email === undefined) {
                return this.$message.error('请输入邮箱')
            } else if (this.zhaoPinData.companyBrief === '' || this.zhaoPinData.companyBrief === undefined) {
                return this.$message.error('请输入公司简介')
            } else if (this.zhaoPinData.companyAddress === '' || this.zhaoPinData.companyAddress === undefined) {
                return this.$message.error('请输入公司地址')
            }
            if (!reg.test(this.zhaoPinData.email)) {
                return this.$message.error('邮箱格式不正确')
            }
            this.zhaoPinData.salary = '￥' + this.zhaoPinData.salary1 + ' -- ￥' + this.zhaoPinData.salary2
            if (!this.f) {
                this.f = true
                cmsCompanyRecruitAdd(``, this.zhaoPinData).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功！')
                        this.goBack()
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'contentList', query: { tabIndex: this.tabIndex } })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.tabIndex = this.$route.query.tabIndex
        this.type = this.$route.query.type
        if (this.type.toString() === '2') {
            this.getData()
        }
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .bg
        background #222222
        color #ffffff
        margin-right 10px
    .addContent
        .conn
            margin 20px 20px 0 20px
            .head
                height 90px
                line-height 90px
                margin 0 35px
                border-bottom 1px solid #F2F2F2
                .title
                    float left
                    font-size 18px
                    color #333333
                .back
                    float right
                    margin-top 30px
            .formBox
                padding-top 20px
                width 40%
</style>
