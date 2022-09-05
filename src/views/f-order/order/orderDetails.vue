<template>
    <div class="orderDetails">
        <div class="conn">
            <div class="head">
                <div class="title">订单详情：</div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
            </div>
            <div class="formBox" v-if="type == 1">
                <el-form ref="form" :model="courseData" label-width="85px" label-position="right" class="form" key="1">
                    <el-form-item label="订单编号：">
                        <span class="txt">{{courseData.orderSn}}</span>
                    </el-form-item>
                    <el-form-item label="课程内容：">
                        <span class="txt">{{courseData.content}}</span>
                    </el-form-item>
                    <el-form-item label="下单用户：">
                        <span class="txt">{{courseData.nickname}}</span>
                    </el-form-item>
                    <el-form-item label="订单状态：">
                        <span class="txt" v-if="courseData.orderStatus == 101">待付款</span>
                        <span class="txt" v-if="courseData.orderStatus == 102">取消付款</span>
                        <span class="txt" v-if="courseData.orderStatus == 103">支付超时</span>
                        <span class="txt" v-if="courseData.orderStatus == 201">已付款</span>
                        <span class="txt" v-if="courseData.orderStatus == 301">已发货</span>
                        <span class="txt" v-if="courseData.orderStatus == 401">已完成</span>
                    </el-form-item>
                    <el-form-item label="生成时间：">
                        <span class="txt">{{courseData.addTime}}</span>
                    </el-form-item>
                    <el-form-item label="金额：">
                        <span class="txt" style="color: #A4503D">￥{{courseData.goodsPrice}}</span>
                    </el-form-item>
                    <el-form-item label="支付信息：">
                        <span class="txt" v-if="courseData.payType == 0">未支付</span>
                        <span class="txt" v-if="courseData.payType == 1">支付宝</span>
                        <span class="txt" v-if="courseData.payType == 2">微信</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="formBox" v-if="type == 2">
                <el-form ref="form" :model="orderData" label-width="85px" label-position="right" class="form" key="2">
                    <el-form-item label="订单编号：">
                        <span class="txt">{{orderData.orderSn}}</span>
                    </el-form-item>
                    <el-form-item label="商品内容：">
                        <span class="txt">{{orderData.content}}</span>
                    </el-form-item>
                    <el-form-item label="下单用户：">
                        <span class="txt">{{orderData.nickname}}</span>
                    </el-form-item>
                    <el-form-item label="订单状态：">
                        <span class="txt" v-if="orderData.orderStatus == 101">待付款</span>
                        <span class="txt" v-if="orderData.orderStatus == 102">取消付款</span>
                        <span class="txt" v-if="orderData.orderStatus == 103">支付超时</span>
                        <span class="txt" v-if="orderData.orderStatus == 201">待发货</span>
                        <span class="txt" v-if="orderData.orderStatus == 301">已发货</span>
                        <span class="txt" v-if="orderData.orderStatus == 401">已完成</span>
                        <!-- <span class="txt" v-if="orderData.orderStatus == 501">已完成</span> -->
                    </el-form-item>
                    <el-form-item label="生成时间：">
                        <span class="txt">{{orderData.addTime}}</span>
                    </el-form-item>
                    <el-form-item label="金额：">
                        <span class="txt" style="color: #A4503D">￥{{orderData.goodsPrice}}</span>
                    </el-form-item>
                    <el-form-item label="买家留言：" v-if="orderData.remark">
                        <span class="txt">{{orderData.remark}}</span>
                    </el-form-item>
                    <el-form-item label="收货地址：">
                        <span class="txt">{{orderData.address}}</span>
                    </el-form-item>
                    <el-form-item v-if="orderData.orderStatus == 201">
                        <el-button class="btn" size="small" @click="openDia({ orderId: orderData.id })">发货</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog title="发货" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="快递单号" :label-width="formLabelWidth">
                    <el-input v-model="form.shipSn" placeholder="请输入"></el-input>
                </el-form-item>
                 <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-select v-model="form.id" placeholder="请选择" @change="getShip">
                        <el-option v-for="(item, index) in shipChannel" :key="index" :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="faHuo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { orderInfo, orderLogistics, expressList, eduOrderInfo } from 'api/index.js'

export default {
    name: 'orderDetails',
    components: {},
    data() {
        return {
            form: {
                orderId: '',
                shipSn: '',
                id: '',
                shipChannel: ''
            },
            shipChannel: [],
            formLabelWidth: '80px',
            dialogFormVisible: false,
            orderData: {},
            courseData: {},
            id: '',
            type: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取快递公司
        getShipData() {
            expressList().then(res => {
                if (res.status === 200) {
                    this.shipChannel = res.data
                }
            })
        },
        // 获取详情数据
        getData() {
            if (this.type.toString() === '2') {
                orderInfo(``, {
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.orderData = res.data.omsOrder
                        if (res.data.orderGoods.length > 0) {
                            let name = []
                            res.data.orderGoods.forEach(ele => {
                                name.push(ele.name)
                            })
                            let con = name.join(',')
                            this.orderData['content'] = con
                        }
                    }
                })
            } else if (this.type.toString() === '1') {
                eduOrderInfo(``, {
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.courseData = res.data.eduOrder
                        if (res.data.orderCourses.length > 0) {
                            let name = []
                            res.data.orderCourses.forEach(ele => {
                                name.push(ele.name)
                            })
                            let con = name.join(',')
                            this.courseData['content'] = con
                        }
                    }
                })
            }
        },
        // 获取选中快递公司名称
        getShip(n) {
            this.shipChannel.forEach(ele => {
                if (ele.id === n) {
                    this.form.shipChannel = ele.name
                }
            })
        },
        // 打开发货弹窗
        openDia(id) {
            this.form.orderId = id.orderId
            this.form.shipSn = ''
            this.form.shipChannel = ''
            this.form.id = ''
            this.dialogFormVisible = true
        },
        // 发货
        faHuo() {
            console.log(this.form)
            orderLogistics(``, this.form).then(res => {
                if (res.status === 200) {
                    this.$message.success('发货成功！')
                    this.dialogFormVisible = false
                    this.getData()
                }
            })
        },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'order' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.getData()
        this.getShipData()
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
                    .btn
                        background #222222
                        color #ffffff
</style>
