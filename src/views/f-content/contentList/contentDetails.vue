<template>
    <div class="contentDetails">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">添加求购信息：</div>
                <div class="title" v-if="type == 2">编辑求购信息：</div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
                <el-button size="small" v-if="type == 1" class="back bg" @click="add">确定</el-button>
                <el-button size="small" v-if="type == 2" class="back bg" @click="add">编辑</el-button>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="qiuGouData" label-width="95px" label-position="right" class="form">
                    <el-form-item label="求购企业：" prop="companyName" :required="true">
                        <el-input class="couName" v-model="qiuGouData.companyName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="求购类型" prop="needType" :required="true">
                        <el-input class="couName" v-model="qiuGouData.needType" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="企业地址：" prop="companyAddress" :required="true">
                        <el-input class="couName" v-model="qiuGouData.companyAddress" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="求购意向：" prop="needIntention" :required="true">
                        <el-input class="couName" v-model="qiuGouData.needIntention" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="求购需求：" prop="needDemand" :required="true">
                        <el-input class="couName" v-model="qiuGouData.needDemand" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="求购内容：" prop="needContent" :required="true">
                        <el-input type="textarea" maxlength="200" show-word-limit :rows="4" class="couName" v-model="qiuGouData.needContent" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="linkman" :required="true">
                        <!-- <el-input-number placeholder="请输入" v-model="qiuGouData.linkman" controls-position="right" :min="1"></el-input-number> -->
                        <el-input class="couName" v-model="qiuGouData.linkman" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="mobile" :required="true">
                        <el-input class="couName" v-model="qiuGouData.mobile" maxLength="11" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email" :required="true">
                        <el-input class="couName" v-model="qiuGouData.email" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { cmsCompanyNeedBuyAdd, cmsCompanyNeedBuyInfo } from 'api/index.js'
export default {
    name: 'contentDetails',
    components: {},
    data() {
        return {
            qiuGouData: {
                companyName: undefined,
                job: undefined,
                jobRequire: undefined,
                jobDepict: undefined,
                peopleCount: undefined,
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
            cmsCompanyNeedBuyInfo(``, {
                id: this.id
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.qiuGouData = res.data
                }
            })
        },
        // 添加
        add() {
            if (this.qiuGouData.companyName === '' || this.qiuGouData.companyName === undefined) {
                return this.$message.error('请输入求购企业名称')
            } else if (this.qiuGouData.needType === '' || this.qiuGouData.needType === undefined) {
                return this.$message.error('请输入求购类型')
            } else if (this.qiuGouData.companyAddress === '' || this.qiuGouData.companyAddress === undefined) {
                return this.$message.error('请输入求购企业地址')
            } else if (this.qiuGouData.needIntention === '' || this.qiuGouData.needIntention === undefined) {
                return this.$message.error('请输入求购意向')
            } else if (this.qiuGouData.needDemand === '' || this.qiuGouData.needDemand === undefined) {
                return this.$message.error('请输入求购需求')
            } else if (this.qiuGouData.needContent === '' || this.qiuGouData.needContent === undefined) {
                return this.$message.error('请输入求购内容')
            } else if (this.qiuGouData.linkman === '' || this.qiuGouData.linkman === undefined) {
                return this.$message.error('请输入联系人')
            } else if (this.qiuGouData.mobile === '' || this.qiuGouData.mobile === undefined) {
                return this.$message.error('请输入手机号')
            } else if (this.qiuGouData.email === '' || this.qiuGouData.email === undefined) {
                return this.$message.error('请输入邮箱')
            }
            if (!this.f) {
                this.f = true
                cmsCompanyNeedBuyAdd(``, this.qiuGouData).then(res => {
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
                    font-size 18px
                    color #333333
                .back
                    float right
                    margin-top 30px
            .formBox
                padding-top 20px
                width 40%
</style>
