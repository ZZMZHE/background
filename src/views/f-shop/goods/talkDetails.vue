<template>
    <div class="topTeacherDetails">
        <div class="conn">
            <div class="head">
                <div class="txt">评论详情</div>
                <div class="back" @click="goback">返回上页</div>
            </div>
            <div class="orderBox">
                <div class="formBox">
                    <el-form ref="form" :model="orderData" label-width="85px" label-position="right" class="form">
                        <el-form-item label="订单号：">
                            <span class="txt">{{orderData.orderSn}}</span>
                        </el-form-item>
                        <el-form-item label="商品图片：">
                            <div class="imgBox" @click="openPic(orderData.picUrl)">
                                <img :src="orderData.picUrl" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item label="商品名称：">
                            <span class="txt">{{orderData.name}}</span>
                        </el-form-item>
                        <el-form-item label="课程价格：">
                            <span class="txt" style="color: #A4503D">￥{{orderData.price}}</span>
                        </el-form-item>
                        <el-form-item label="购买时间：">
                            <span class="txt">{{orderData.addTime}}</span>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <span class="txt">{{orderData.remark}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="userBox">
                <div class="formBox">
                    <div class="title">购买人详情</div>
                    <el-form ref="form" :model="orderData" label-width="85px" label-position="right" class="form">
                        <el-form-item label="用户昵称：">
                            <span class="txt">{{orderData.nickname}}</span>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <span class="txt">{{orderData.tel}}</span>
                        </el-form-item>
                        <el-form-item label="收货地址：">
                            <span class="txt">{{orderData.address}}</span>
                        </el-form-item>
                        <el-form-item label="收货人：">
                            <span class="txt">{{orderData.consignee}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="talkBox">
                <div class="formBox">
                    <div class="title">评论详情</div>
                    <el-form ref="form" :model="talkData" label-width="85px" label-position="right" class="form">
                        <el-form-item label="评分：">
                            <div class="rateBox">
                                <el-rate
                                    disabled
                                    v-model="talkData.score"
                                    :colors="colors">
                                </el-rate>
                            </div>
                        </el-form-item>
                        <el-form-item label="评价时间：">
                            <span class="txt">{{talkData.addTime}}</span>
                        </el-form-item>
                        <el-form-item label="评价内容：" prop="content">
                            <el-input
                                style="width: 25%"
                                type="textarea"
                                placeholder="请输入"
                                v-model="talkData.content"
                                rows="2"
                                disabled
                                >
                                <!-- maxlength="200"
                                show-word-limit -->
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片：">
                            <div class="imgBox" v-for="(item, index) in talkData.imgUrls" :key="index" @click="openPic(item)">
                                <img :src="item" alt="">
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="talkBox">
                <div class="formBox">
                    <div class="title">追评详情</div>
                    <el-form ref="form" :model="talkData" label-width="85px" label-position="right" class="form">
                        <el-form-item label="追评时间：">
                            <span class="txt">{{talkData.appendTime}}</span>
                        </el-form-item>
                        <el-form-item label="评价内容：" prop="appendContent">
                            <el-input
                                style="width: 25%"
                                type="textarea"
                                placeholder="请输入"
                                v-model="talkData.appendContent"
                                rows="2"
                                disabled
                                >
                                <!-- maxlength="200"
                                show-word-limit -->
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片：" v-if="talkData.appendImgUrls">
                            <div class="imgBox" v-for="(item, index) in talkData.appendImgUrls" :key="index" @click="openPic(item)">
                                <img :src="item" alt="">
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { goodsCommentInfo } from 'api/index.js'
export default {
    name: 'topTeacherDetails',
    components: {},
    data() {
        return {
            orderData: {},
            talkData: {},
            userData: {},
            colors: ['#7F0319', '#7F0319', '#7F0319'],
            id: '',
            dialogImageUrl: '',
            dialogVisible: false,
            fId: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        getData() {
            goodsCommentInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    // this.MallGoodsComment
                    this.talkData = res.data.mallGoodsComment
                    this.orderData = res.data.orderAndGoodVo
                }
            })
        },
        openPic(url) {
            this.dialogVisible = true
            this.dialogImageUrl = url
        },
        // 返回上一页
        goback() {
            this.$router.push({ name: 'goodsTalk', query: { id: this.fId } })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.fId = this.$route.query.fId
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .topTeacherDetails
        width 100%
        .conn
            margin 20px 20px 0 20px
            .head
                height 120px
                background #ffffff
                .txt
                    color #333333
                    font-size 20px
                    margin 50px 0 0 40px
                    float left
                .back
                    width 146px
                    height 38px
                    border 1px solid #C0C0C0
                    line-height 40px
                    text-align center
                    color #5A5A5A
                    font-size 18px
                    margin 40px 80px 0 0
                    float right
                    cursor pointer
            .orderBox
                width 100%
                background #ffffff
                .formBox
                    margin 0 80px
                    border-top 1px solid #F2F2F2
                    .form
                        padding-top 40px
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
            .userBox
                width 100%
                background #ffffff
                .formBox
                    margin 0 80px
                    border-top 1px solid #F2F2F2
                    .title
                        padding-top 40px
                        padding-bottom 20px
                    .form
                        .el-form-item
                            margin-bottom 0px
                            .txt
                                color #9E9DA4
            .talkBox
                width 100%
                background #ffffff
                overflow hidden
                padding 20px 0
                .formBox
                    margin 0 80px
                    border-top 1px solid #F2F2F2
                    .title
                        padding-top 40px
                        padding-bottom 20px
                    .form
                        .el-form-item
                            // margin-bottom 0px
                            .rateBox
                                margin-top 10px
                            .txt
                                color #9E9DA4
                            .imgBox
                                width 120px
                                height: 120px
                                float left
                                margin-right 10px
                                overflow hidden
                                cursor pointer
                                img
                                    width 100%
                                    height 100%

</style>
