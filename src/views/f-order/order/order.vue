<template>
    <div class="order">
        <div class="conn">
            <div class="tab">
                <div class="tabBox" :class="tabIndex == 2 ? 'active' : ''" @click="changeTab(2)">商品订单</div>
                <div class="tabBox" style="margin-right: 20px" :class="tabIndex == 1 ? 'active' : ''" @click="changeTab(1)">课程订单</div>
            </div>
            <div class="fenge" v-if="tabIndex == 1">
                <div class="searchBox">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" ref="form1" key="1">
                        <el-form-item label="订单编号" prop="orderSn">
                            <el-input class="search" v-model="formInline.orderSn" placeholder="请输入订单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="生成时间" prop="dateValue">
                            <el-date-picker
                                v-model="formInline.dateValue"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                range-separator="~"
                                class="infoDate"
                                :default-time="['00:00:00', '23:59:59']"
                                value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="formInline.status" placeholder="请选择">
                                <!--
                                    101订单生成 201支付完成 301商家发货 401用户确认收货
                                -->
                                <el-option label="待付款" value="101"></el-option>
                                <el-option label="取消付款" value="102"></el-option>
                                <el-option label="支付超时" value="103"></el-option>
                                <el-option label="已付款" value="201"></el-option>
                                <el-option label="已发货" value="301"></el-option>
                                <el-option label="已完成" value="401"></el-option>
                                <!-- <el-option label="已完成" value="501"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="search">搜索</el-button>
                            <el-button class="restBtn" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        key="1"
                        border
                        :data="tableData1"
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%">
                        <el-table-column
                            prop="orderSn"
                            align="center"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="nickname"
                            align="center"
                            label="用户">
                        </el-table-column>
                        <el-table-column
                            prop="countMoney"
                            align="center"
                            label="金额">
                            <template slot-scope="scope">
                                <span style="color: #7F0319">{{ '￥' + scope.row.goodsPrice }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderStatus"
                            align="center"
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.orderStatus == 101">待付款</span>
                                <span v-if="scope.row.orderStatus == 102">取消付款</span>
                                <span v-if="scope.row.orderStatus == 103">支付超时</span>
                                <span v-if="scope.row.orderStatus == 201">已付款</span>
                                <span v-if="scope.row.orderStatus == 301">已发货</span>
                                <span v-if="scope.row.orderStatus == 401">已完成</span>
                                <!-- <span v-if="scope.row.orderStatus == 501">已完成</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="addTime"
                            align="center"
                            label="生成时间">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 1 })">查看</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            background
                            :page-size="pageSize1"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total1">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="fenge" v-if="tabIndex == 2">
                <div class="searchBox">
                    <el-form :inline="true" :model="formInline1" class="demo-form-inline" size="small" ref="form2" key="2">
                        <el-form-item label="订单编号" prop="orderSn">
                            <el-input class="search" v-model="formInline1.orderSn" placeholder="请输入订单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="生成时间" prop="dateValue">
                            <el-date-picker
                                v-model="formInline1.dateValue"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                range-separator="~"
                                class="infoDate"
                                :default-time="['00:00:00', '23:59:59']"
                                value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="formInline1.status" placeholder="请选择">
                                <!-- <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option> -->
                                <el-option label="待付款" value="101"></el-option>
                                <el-option label="取消付款" value="102"></el-option>
                                <el-option label="支付超时" value="103"></el-option>
                                <el-option label="待发货" value="201"></el-option>
                                <el-option label="已发货" value="301"></el-option>
                                <el-option label="已完成" value="401"></el-option>
                                <!-- <el-option label="已完成" value="501"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="search">搜索</el-button>
                            <el-button class="restBtn" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="tableData2"
                        border
                        key="2"
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%">
                        <el-table-column
                            prop="orderSn"
                            align="center"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="nickname"
                            align="center"
                            label="用户">
                        </el-table-column>
                        <el-table-column
                            prop="countMoney"
                            align="center"
                            label="金额">
                            <template slot-scope="scope">
                                <span style="color: #7F0319">{{ '￥' + scope.row.goodsPrice }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderStatus"
                            align="center"
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.orderStatus == 101">待付款</span>
                                <span v-if="scope.row.orderStatus == 102">取消付款</span>
                                <span v-if="scope.row.orderStatus == 103">支付超时</span>
                                <span v-if="scope.row.orderStatus == 201">待发货</span>
                                <span v-if="scope.row.orderStatus == 301">已发货</span>
                                <span v-if="scope.row.orderStatus == 401">已完成</span>
                                <!-- <span v-if="scope.row.orderStatus == 501">已完成</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="addTime"
                            align="center"
                            label="生成时间">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <!--  -->
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 2 })">查看</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            background
                            :page-size="pageSize2"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { orderList, eduOrderList } from 'api/index.js'

export default {
    name: 'order',
    components: {},
    data() {
        return {
            tabIndex: 1,
            formInline: {
                orderSn: undefined,
                status: undefined,
                dateValue: []
            },
            formInline1: {
                orderSn: undefined,
                status: undefined,
                dateValue: []
            },
            tableData1: [],
            pageSize1: 10,
            pageNum1: 1,
            total1: 10,
            tableData2: [],
            pageSize2: 10,
            pageNum2: 1,
            total2: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取订单列表
        getData() {
            if (this.tabIndex === 1) {
                if (this.formInline.dateValue === null) {
                    this.formInline.dateValue = []
                }
                let orderSn = this.formInline.orderSn
                let orderStatus = parseInt(this.formInline.status)
                let startTime = this.formInline.dateValue[0]
                let endTime = this.formInline.dateValue[1]
                eduOrderList(``, {
                    pageNum: this.pageNum1,
                    pageSize: this.pageSize1,
                    orderSn,
                    orderStatus,
                    startTime,
                    endTime
                }).then(res => {
                    if (res.status === 200) {
                        this.total1 = res.data.total
                        this.tableData1 = res.data.rows
                    }
                })
            } else if (this.tabIndex === 2) {
                if (this.formInline1.dateValue === null) {
                    this.formInline1.dateValue = []
                }
                let orderSn = this.formInline1.orderSn
                let orderStatus = parseInt(this.formInline1.status)
                let startTime = this.formInline1.dateValue[0]
                let endTime = this.formInline1.dateValue[1]
                orderList(``, {
                    pageNum: this.pageNum2,
                    pageSize: this.pageSize2,
                    orderSn,
                    orderStatus,
                    startTime,
                    endTime
                }).then(res => {
                    if (res.status === 200) {
                        this.total2 = res.data.total
                        this.tableData2 = res.data.rows
                    }
                })
            }
        },
        // tab切换
        changeTab(t) {
            this.tabIndex = t
            this.pageNum1 = 1
            this.pageNum2 = 1
            this.getData()
        },
        // 搜索
        search() {
            if (this.tabIndex === 1) {
                this.pageNum1 = 1
                this.getData()
            } else if (this.tabIndex === 2) {
                this.pageNum2 = 1
                this.getData()
            }
        },
        // 重置
        reset() {
            if (this.tabIndex === 1) {
                this.pageSize1 = 10
                this.pageNum1 = 1
                this.$refs.form1.resetFields()
                this.getData()
            } else if (this.tabIndex === 2) {
                this.pageSize2pageNum2 = 10
                this.pageNum2 = 1
                this.$refs.form2.resetFields()
                this.getData()
            }
        },
        // 页数
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getData()
        },
        // 页码
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getData()
        },
        // 页数
        handleSizeChange2(val) {
            this.pageSize2 = val
            this.getData()
        },
        // 页码
        handleCurrentChange2(val) {
            this.pageNum2 = val
            this.getData()
        },
        goDetails(val) {
            // if (val.type === 1) {
            //     this.$router.push({ name: 'teacherAboutCourse', query: val })
            // } else if (val.type === 2) {
            //     this.$router.push({ name: 'topTeacherDetails', query: val })
            // }
            this.$router.push({ name: 'orderDetails', query: val })
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .paging
        text-align center
        padding 20px 0
        background #ffffff
    .color
        color #7F0319
        cursor pointer
    .colorBlue
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .order
        width 100%
        .conn
            margin 20px 20px 0 20px
            .tab
                height 40px
                padding 30px 0
                background #ffffff
                .tabBox
                    width 120px
                    height 36px
                    background #C3C3C3
                    color #9E9DA4
                    font-size 16px
                    line-height 36px
                    text-align center
                    float right
                    margin-right 80px
                    cursor pointer
                .active
                    color #FFFFFF
                    background #222222
        .searchBox
            height 70px
            background #ffffff
            text-align center
            .demo-form-inline
                // padding-top 54px
                .search
                    width 346px
                .searchBtn
                    background #222222
                    color #fff
        .tableBox
            padding 0 80px
            background #ffffff
</style>
