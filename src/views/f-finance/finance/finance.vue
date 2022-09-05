<template>
    <div class="finance">
        <div class="conn">
            <div class="chooseOne">
                <div class="c-btn" :class="status == 0 ? 'active': ''" @click="changeStatus(0)">全部订单</div>
                <div class="c-btn" :class="status == 1 ? 'active': ''" @click="changeStatus(1)">课程订单</div>
                <div class="c-btn" :class="status == 2 ? 'active': ''" @click="changeStatus(2)">商品订单</div>
            </div>
            <div class="header">
                <div class="header_top">
                    <div class="title">财务统计（金额）</div>
                    <div class="btnList">
                        <el-radio-group v-model="radio" size="small" @change="getRadioData">
                            <el-radio-button label="1">本日</el-radio-button>
                            <el-radio-button label="2">本周</el-radio-button>
                            <el-radio-button label="3">本月</el-radio-button>
                            <el-radio-button label="4">本年</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="header_bottom">
                    <div class="box right">
                        <div class="boxData">
                            <div class="txt">总金额</div>
                            <div class="num">￥{{moneyData.priceTotal}}</div>
                        </div>
                    </div>
                    <div class="box">
                        <div class="boxData marginRight">
                            <div class="txt">待到账金额</div>
                            <div class="num">￥{{moneyData.price}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tableBox" v-if="status != 2">
                <div class="tableHead">
                    <div class="txt">课程订单</div>
                    <div class="formBox">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" ref="form1" key="1">
                            <!-- <el-form-item label="状态" prop="status">
                                <el-select v-model="formInline.status" placeholder="请选择">
                                    <el-option label="待支付" value="101"></el-option>
                                    <el-option label="待发货" value="201"></el-option>
                                    <el-option label="已发货" value="301"></el-option>
                                    <el-option label="已完成" value="401"></el-option>
                                </el-select>
                            </el-form-item> -->
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
                            <el-form-item>
                                <el-button class="searchBtn bg" @click="search1">搜索</el-button>
                                <el-button class="restBtn" @click="reset1">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btn">
                        <el-button size="small" class="restBtn bg" @click="openDia(1)">报表导出</el-button>
                    </div>
                    <!-- @selection-change="handleSelectionChange" -->
                    <el-table
                        key="1"
                        :data="tableData1"
                        border
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%"
                        >
                        <!-- <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column> -->
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
                            prop="actualPrice"
                            align="center"
                            label="金额">
                            <template slot-scope="scope">
                                <span style="color: #7F0319">￥{{ scope.row.actualPrice }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderStatus"
                            align="center"
                            label="状态">
                            <template>
                                <span style="color: #7F0319">已到账</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="addTime"
                            align="center"
                            label="生成时间">
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
            <div class="tableBox" v-if="status != 1">
                <div class="tableHead">
                    <div class="txt">商品订单</div>
                    <div class="formBox">
                        <el-form :inline="true" :model="formInline2" class="demo-form-inline" size="small" ref="form2" key="2">
                            <el-form-item label="状态" prop="status">
                                <el-select v-model="formInline2.status" placeholder="请选择">
                                    <!-- <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option> -->
                                    <el-option label="待到账" value="1"></el-option>
                                    <el-option label="已到账" value="2"></el-option>
                                    <!-- <el-option label="已完成" value="501"></el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item label="生成时间" prop="dateValue">
                                <el-date-picker
                                    v-model="formInline2.dateValue"
                                    type="datetimerange"
                                    :default-time="['00:00:00', '23:59:59']"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    range-separator="~"
                                    class="infoDate"
                                    value-format="yyyy-MM-dd HH:mm:SS" >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="searchBtn bg" @click="search2">搜索</el-button>
                                <el-button class="restBtn" @click="reset2">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btn">
                        <el-button size="small" class="restBtn bg" @click="openDia(2)">报表导出</el-button>
                    </div>
                    <!-- @selection-change="handleSelectionChange" -->
                    <el-table
                        key="2"
                        border
                        :data="tableData2"
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%"
                        >
                        <!-- <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column> -->
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
                            prop="goodsPrice"
                            align="center"
                            label="金额">
                            <template slot-scope="scope">
                                <span style="color: #7F0319">￥{{ scope.row.goodsPrice }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderStatus"
                            align="center"
                            label="状态">
                            <template slot-scope="scope">

                                <span style="color: #7F0319" v-if="scope.row.orderStatus == 401">已到账</span>
                                <span style="color: #1890FF" v-else>待到账</span>
                                <!-- <span v-if="scope.row.orderStatus == 501">已完成</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="addTime"
                            align="center"
                            label="生成时间">
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
        <el-dialog title="选择导出的时间间隔" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="生成时间" prop="dateValue" :required="true">
                    <el-date-picker
                        v-model="form.dateValue"
                        type="datetimerange"
                        :default-time="['00:00:00', '23:59:59']"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="~"
                        class="infoDate"
                        value-format="yyyy-MM-dd HH:mm:SS" >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="exportForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// , countFile
import { countCountGoods, countCountCourse, countCount } from 'api/index.js'
export default {
    name: 'finance',
    components: {},
    data() {
        return {
            dialogFormVisible: false,
            form: {
                dateValue: []
            },
            moneyData: {},
            radio: '1',
            status: 0,
            // multipleSelection: [],
            tableData1: [],
            pageSize1: 10,
            pageNum1: 1,
            total1: 10,
            formInline: {
                orderSn: undefined,
                status: undefined,
                dateValue: []
            },
            formInline2: {
                orderSn: undefined,
                status: undefined,
                dateValue: []
            },
            tableData2: [],
            pageSize2: 10,
            pageNum2: 1,
            total2: 10,
            type: undefined
        }
    },
    computed: {
        downLoadUrl() {
            return this.$store.state.downLoadUrl
        }
    },
    watch: {},
    methods: {
        changeStatus(i) {
            this.status = i
            this.getData()
            this.getShopOrder()
            this.getCourseOrder()
        },
        // 获取金额
        getData() {
            countCount(``, {
                type: this.radio,
                status: this.status
            }).then(res => {
                if (res.status === 200) {
                    this.moneyData = res.data
                }
            })
        },
        // 获取商品订单
        getShopOrder() {
            if (this.formInline2.dateValue === null) {
                this.formInline2.dateValue = []
            }
            let startTime = this.formInline2.dateValue[0]
            let endTime = this.formInline2.dateValue[1]
            // let orderSn = this.formInline2.orderSn
            let type = this.formInline2.status
            countCountGoods(``, {
                pageNum: this.pageNum2,
                pageSize: this.pageSize2,
                type,
                startTime,
                endTime,
                status: this.status
                // orderSn
            }).then(res => {
                if (res.status === 200) {
                    this.tableData2 = res.data.rows
                    this.total2 = res.data.total
                    // if (this.pageNum2 > 1 && this.tableData2.length < 1) {
                    //     this.pageNum2 = this.pageNum2 - 1
                    //     this.getShopOrder()
                    // }
                }
            })
        },
        // 报表导出弹框
        openDia(t) {
            this.type = t
            this.dialogFormVisible = true
        },
        // 导出表格
        exportForm() {
            window.open(`${this.downLoadUrl}?type=${this.type}&startTime=${this.form.dateValue[0]}&endTime=${this.form.dateValue[1]}`)
            this.dialogFormVisible = false
            this.form.dateValue = []
        },
        // 获取课程订单
        getCourseOrder() {
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0]
            let endTime = this.formInline.dateValue[1]
            countCountCourse(``, {
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                startTime,
                status: this.status,
                endTime
            }).then(res => {
                if (res.status === 200) {
                    this.tableData1 = res.data.rows
                    this.total1 = res.data.total
                    // if (this.pageNum1 > 1 && this.tableData1.length < 1) {
                    //     this.pageNum1 = this.pageNum1 - 1
                    //     this.getCourseOrder()
                    // }
                }
            })
        },
        // 获取按钮
        getRadioData() {
            this.getData()
        },
        // 搜索
        search1() {
            this.pageNum1 = 1
            this.getCourseOrder()
        },
        // 重置
        reset1() {
            this.pageNum1 = 1
            this.pageSize1 = 10
            this.$refs.form1.resetFields()
            this.getCourseOrder()
        },
        // 搜索
        search2() {
            this.pageNum2 = 1
            this.getShopOrder()
        },
        // 重置
        reset2() {
            this.pageNum2 = 1
            this.pageSize2 = 10
            this.$refs.form2.resetFields()
            this.getShopOrder()
        },
        // 页数
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getCourseOrder()
        },
        // 页码
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getCourseOrder()
        },
        // 页数
        handleSizeChange2(val) {
            this.pageSize2 = val
            this.getShopOrder()
        },
        // 页码
        handleCurrentChange2(val) {
            this.pageNum2 = val
            this.getShopOrder()
        }
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // }
    },
    created() {
        this.getData()
        this.getShopOrder()
        this.getCourseOrder()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .chooseOne
        overflow hidden
        // margin-left 40px
        background #ffffff
        padding-top 20px
        padding-left 20px
        padding-bottom 20px
        border-bottom 1px solid #f2f2f2
        .c-btn
            padding 5px 10px
            border 1px solid #9E9DA4
            color #9E9DA4
            float left
            margin-right 10px
            font-size 14px
            cursor pointer
        .active
            border 1px solid #81061C
            color #81061C
    .paging
        text-align center
        padding 20px 0
        background #ffffff
    .bg
        background #222222
        color #ffffff
    .finance
        .conn
            margin 20px 20px 0 20px
            .header
                height 327px
                background #ffffff
                .header_top
                    height 86px
                    border-bottom 1px solid #F2F2F2
                    .title
                        font-size 26px
                        color #333333
                        line-height 87px
                        float left
                        margin-left 30px
                    .btnList
                        float right
                        margin-top 27px
                        margin-right 180px
                .header_bottom
                    height 240px
                    .box
                        width 50%
                        height 240px
                        float left
                        margin-top 30px
                        .boxData
                            min-width 240px
                            height 160px
                            background #F7F7F7
                            margin-right 77px
                            float right
                            .txt
                                font-size 16px
                                color #9E9DA4
                                margin 20px 0 0 20px
                            .num
                                font-size 40px
                                color #333333
                                margin 40px 0 0 20px
                                padding-right 10px
                        .marginRight
                            margin-left 77px
                            float left
            .tableBox
                padding 0 30px
                margin 20px 0
                background #ffffff
                .txt
                    float left
                    margin 30px 50px 0 0
                    font-size 26px
                    color #333333
                .formBox
                    float left
                    margin-top 25px
                .btn
                    float right
                    margin-right 88px
                    margin-top 25px

</style>
