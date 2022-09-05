<template>
    <div class="orderDetails">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">增加优惠券：</div>
                <div class="title" v-if="type == 2">优惠券详情：</div>
                <div class="btnList">
                    <el-button v-if="type == 1" plain size="small" class="back bg" @click="grant">确认发放</el-button>
                    <!-- <el-button v-if="type == 2" plain size="small" class="back bg" @click="grant">保存编辑</el-button> -->
                    <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="couponData" label-width="160px" label-position="right" class="form" size="small" :disabled="type == 2">
                    <el-form-item label="优惠券名称" :required="type == 1">
                        <el-input class="couName" v-model="couponData.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="发放范围">
                        <el-select v-model="couponData.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="选择日期" :required="type == 1">
                        <el-date-picker
                            v-model="couponData.dateValue"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            range-separator="~"
                            class="infoDate"
                            :default-time="['00:00:00', '23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发放数量" :required="type == 1">
                        <el-input-number placeholder="请输入" v-model="couponData.grantCount" :step-strictly="true" :step="1" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="使用条件（门槛金额)" :required="type == 1">
                        <el-input-number placeholder="请输入" v-model="couponData.reachAmount" :step-strictly="true" :step="1" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="优惠金额" :required="type == 1">
                        <el-input-number placeholder="请输入" :step-strictly="true" :step="1" v-model="couponData.discountAmount" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="优惠券介绍" :required="type == 1">
                        <el-input class="couName" v-model="couponData.depict" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券标签" :required="type == 1">
                        <el-input class="couName" v-model="couponData.tag" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠码" v-if="type == 2" :required="type == 1">
                        <el-input disabled style="width: 20%" v-model="couponData.code" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { couponAdd, couponInfo } from 'api/index.js'

export default {
    name: 'orderDetails',
    components: {},
    data() {
        return {
            couponData: {
                id: undefined,
                name: undefined,
                region: undefined,
                dateValue: [],
                depict: undefined,
                tag: undefined,
                grantCount: undefined,
                reachAmount: undefined,
                discountAmount: undefined,
                code: undefined
            },
            id: '',
            type: '',
            flag: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情数据
        getData() {
            couponInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.couponData = res.data
                    this.couponData['dateValue'] = []
                    this.couponData.dateValue.push(this.couponData.startTime)
                    this.couponData.dateValue.push(this.couponData.endTime)
                }
            })
        },
        // 确认发布
        grant() {
            if (this.couponData.name === '' || this.couponData.name === undefined) {
                return this.$message.error('请输入优惠券名称')
            } else if (this.couponData.dateValue.length < 1) {
                return this.$message.error('请选择优惠券使用日期')
            } else if (this.couponData.grantCount === '' || this.couponData.grantCount === undefined) {
                return this.$message.error('请输入发放数量')
            } else if (this.couponData.reachAmount === '' || this.couponData.reachAmount === undefined) {
                return this.$message.error('请输入使用条件')
            } else if (this.couponData.discountAmount === '' || this.couponData.discountAmount === undefined) {
                return this.$message.error('请输入优惠金额')
            } else if (this.couponData.depict === '' || this.couponData.depict === undefined) {
                return this.$message.error('请输入优惠介绍')
            } else if (this.couponData.tag === '' || this.couponData.tag === undefined) {
                return this.$message.error('请输入优惠标签')
            }
            if (!this.flag) {
                this.flag = true
                if (this.couponData.dateValue === null) {
                    this.couponData.dateValue = []
                }
                couponAdd(``, {
                    id: this.couponData.id,
                    name: this.couponData.name,
                    startTime: this.couponData.dateValue[0],
                    endTime: this.couponData.dateValue[1],
                    reachAmount: this.couponData.reachAmount,
                    grantCount: this.couponData.grantCount,
                    discountAmount: this.couponData.discountAmount,
                    status: 0,
                    depict: this.couponData.depict,
                    tag: this.couponData.tag
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('发布成功！')
                        this.goBack()
                    }
                })
                setTimeout(() => {
                    this.flag = false
                }, 2000)
            }
        },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'coupon' })
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
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .orderDetails
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
                    .couName
                        width 35%
                    .txt
                        color #9E9DA4
                    .btn
                        background #222222
                        color #ffffff
</style>
