<template>
    <div class="statistics">
        <!-- <div class="head">
            <el-form ref="form" class="form" label-width="80px">
                <el-form-item label="当前城市">
                    <el-select size="small" v-model="city" placeholder="请选择城市" class="selectCity">
                        <el-option label="杭州市" value="1"></el-option>
                        <el-option label="温州市" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div> -->
        <div class="tableCard">
            <div class="chooseOne">
                <div class="c-btn" :class="type == 1 ? 'active': ''" @click="changeType(1)">本日</div>
                <div class="c-btn" :class="type == 2 ? 'active': ''" @click="changeType(2)">最近7天</div>
                <div class="c-btn" :class="type == 3 ? 'active': ''" @click="changeType(3)">最近30天</div>
                <div class="c-btn" :class="type == 4 ? 'active': ''" @click="changeType(4)">1年</div>
            </div>
            <div class="cardBox">
                <div class="tit">
                    <div class="txt">课程</div>
                </div>
                <div class="numCard">
                    <div class="numBox">
                        <p class="numTxt" v-if="type == 1">今日课程销售额</p>
                        <p class="numTxt" v-if="type == 2">近7天课程销售额</p>
                        <p class="numTxt" v-if="type == 3">近30天课程销售额</p>
                        <p class="numTxt" v-if="type == 4">近一年课程销售额</p>
                        <p class="num">￥{{ courseData.price != null ? courseData.price.toFixed(2) : '0'}}</p>
                        <p>累计销售额: <span>￥{{courseData.priceTotal != null ? courseData.priceTotal.toFixed(2) : '0'}}</span></p>
                    </div>
                    <div class="numBox">
                        <p class="numTxt" v-if="type == 1">今日课程购买量</p>
                        <p class="numTxt" v-if="type == 2">近7天课程购买量</p>
                        <p class="numTxt" v-if="type == 3">近30天课程购买量</p>
                        <p class="numTxt" v-if="type == 4">近一年课程购买量</p>
                        <p class="num">{{courseData.count || '0'}}</p>
                        <p>累计购买量: <span>{{courseData.countTotal || '0'}}</span></p>
                    </div>
                </div>
                <div class="searchBox">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                        <el-form-item label="课程名称">
                            <el-input class="search" v-model="formInline.name" placeholder="请输入课程名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="onSearch(1)">搜索</el-button>
                            <el-button  class="restBtn" @click="onReset(1)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="tableData1"
                        border
                        :header-cell-style="{background:'#f5f5f5'}"
                        height="320px"
                        style="width: 100%">
                        <el-table-column
                            prop="sort"
                            align="center"
                            type="index"
                            width="60"
                            :index="typeIndex"
                            label="排行">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            align="center"
                            label="课程名称">
                        </el-table-column>
                        <el-table-column
                            prop="count"
                            align="center"
                            label="今日订单数">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            align="center"
                            label="今日销售额">
                            <template slot-scope="scope">
                                <span>{{scope.row.price != null ? scope.row.price.toFixed(2) : '--'}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                     <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            background
                            :page-size="pageSize1"
                            :page-sizes="[5,10,15,20,25]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total1">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="cardBox">
                <div class="tit">
                    <div class="txt">商城</div>
                </div>
                <div class="numCard">
                    <div class="numBox">
                        <p class="numTxt" v-if="type == 1">销售额</p>
                        <p class="numTxt" v-if="type == 2">近7天商城销售额</p>
                        <p class="numTxt" v-if="type == 3">近30天商城销售额</p>
                        <p class="numTxt" v-if="type == 4">近一年商城销售额</p>
                        <p class="num">￥{{ goodsData.price != null ? goodsData.price.toFixed(2) : '0'}}</p>
                        <p>累计销售额: <span>￥{{ goodsData.priceTotal != null ? goodsData.priceTotal.toFixed(2) : '0'}}</span></p>
                    </div>
                    <div class="numBox">
                        <p class="numTxt" v-if="type == 1">今日商城订单量</p>
                        <p class="numTxt" v-if="type == 2">近7天商城订单量</p>
                        <p class="numTxt" v-if="type == 3">近30天商城订单量</p>
                        <p class="numTxt" v-if="type == 4">近一年商城订单量</p>
                        <p class="num">{{goodsData.count || '0'}}</p>
                        <p>累计销售额: <span>{{goodsData.countTotal || '0'}}</span></p>
                    </div>
                </div>
                <div class="searchBox">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                        <el-form-item label="商品名称">
                            <el-input class="search" v-model="formInline.goods" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="onSearch(2)">搜索</el-button>
                            <el-button  class="restBtn" @click="onReset(2)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="tableData2"
                        border
                        :header-cell-style="{background:'#f5f5f5'}"
                        height="320px"
                        style="width: 100%">
                        <el-table-column
                            prop="sort"
                            align="center"
                            type="index"
                            width="60"
                            :index="typeIndex1"
                            label="排行">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            align="center"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="count"
                            align="center"
                            label="今日订单数">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            align="center"
                            label="今日销售额">
                            <template slot-scope="scope">
                                <span>{{scope.row.price != null ? scope.row.price.toFixed(2) : '--'}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                     <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            background
                            :page-size="pageSize2"
                            :page-sizes="[5,10,15,20,25]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="subtotal">
            <div class="searchCourse">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="课程名称">
                        <el-select size="small" v-model="formInline.courseName" placeholder="请选择课程名称" class="selectCity" @change="selectChange(1)">
                            <el-option label="语文" value="1"></el-option>
                            <el-option label="数学" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-select size="small" v-model="formInline.goodsName" placeholder="请选择商品名称" class="selectCity" @change="selectChange(2)">
                            <el-option label="辣条" value="1"></el-option>
                            <el-option label="快乐水" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="countCourse">
                <div class="tadayPrice">今日销售额：<span>￥1263.00</span></div>
                <div class="price">￥156.05</div>
                <div class="name">手绘</div>
            </div>
        </div>
        <div class="shopCardList">
            <div class="shopCard" v-for="(item, index) in shopList" :key="index">
                <p class="shopName">{{item.name}}今日销售额</p>
                <p class="num">￥{{item.money}}</p>
                <p class="numTxt">今日购买量 <span>{{item.count}}</span></p>
                <p>累计销售额<span>￥{{item.allmoney}}</span></p>
            </div>
        </div> -->
        <div class="footBar">
            <div class="user">用户活跃数</div>
            <div class="newUser userBox">
                <span class="txt colorRed">新增用户数</span>
                <span class="num">{{countData.userDayCount}}</span>
            </div>
            <div class="allUser userBox">
                <span class="txt colorBlack">总用户数</span>
                <span class="num">{{ countData.userCount }}</span>
                <span class="backgroundImg">
                    <img :src="require('../../../assets/images/top.png')" alt="">
                </span>
                <span class="count">{{countData.userDayCount}}</span>
            </div>
            <div class="yodayUser userBox">
                <span class="txt colorBlue">日活跃用户数</span>
                <span class="num">{{countData.userActiveCount}}</span>
                <span class="backgroundImg" v-if="countData.userActiveAddCount >= 0">
                    <img :src="require('../../../assets/images/top.png')" alt="">
                </span>
                <span class="backgroundImg" v-else>
                    <img :src="require('../../../assets/images/bottom.png')" alt="">
                </span>
                <span class="count">{{countData.userActiveAddCount}}</span>
            </div>
        </div>
    </div>
</template>

<script>

import { eduOrderCount, mallOrderCount, userCount } from 'api/index.js'

export default {
    name: 'statistics',
    components: {},
    data() {
        return {
            // city: '',
            type: 1,
            courseData: {},
            goodsData: {},
            formInline: {
                name: undefined,
                goods: undefined,
                goodsName: '',
                course: '',
                courseName: ''
            },
            tableData1: [],
            tableData2: [],
            pageNum1: 1,
            pageSize1: 5,
            total1: 5,
            pageNum2: 1,
            pageSize2: 5,
            total2: 5,
            countData: {}
            // shopList: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        changeType(i) {
            this.type = i
            this.getCourseData()
            this.getGoodsData()
        },
        // 排行
        typeIndex(index) {
            let vm = this // 处理分页数据的 index
            return (index + 1) + (vm.pageNum1 - 1) * vm.pageSize1
        },
        typeIndex1(index) {
            let vm = this // 处理分页数据的 index
            return (index + 1) + (vm.pageNum2 - 1) * vm.pageSize2
        },
        // 获取课程数据
        getCourseData() {
            let name = this.formInline.name
            eduOrderCount(``, {
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                name,
                type: this.type
            }).then(res => {
                if (res.status === 200) {
                    this.courseData = res.data
                    this.tableData1 = res.data.orderCountVos.rows
                    this.total1 = res.data.orderCountVos.total
                }
            })
        },
        getUserCount() {
            userCount().then(res => {
                if (res.status === 200) {
                    this.countData = res.data
                }
            })
        },
        // 获取商品数据
        getGoodsData() {
            let name = this.formInline.goods
            mallOrderCount(``, {
                pageNum: this.pageNum2,
                pageSize: this.pageSize2,
                name,
                type: this.type
            }).then(res => {
                if (res.status === 200) {
                    this.goodsData = res.data
                    this.tableData2 = res.data.orderCountVos.rows
                    this.total2 = res.data.orderCountVos.total
                }
            })
        },
        // 搜索
        onSearch(t) {
            if (t === 1) {
                this.pageNum1 = 1
                this.getCourseData()
            } else if (t === 2) {
                this.pageNum2 = 1
                this.getGoodsData()
            }
        },
        // 重置
        onReset(t) {
            if (t === 1) {
                this.formInline.name = undefined
                this.pageNum1 = 1
                this.pageSize1 = 10
                this.getCourseData()
            } else if (t === 2) {
                this.formInline.goods = undefined
                this.pageNum2 = 1
                this.pageSize2 = 10
                this.getGoodsData()
            }
        },
        // 每页几条
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getCourseData()
        },
        // 前往第几页
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getCourseData()
        },
        // 每页几条
        handleSizeChange2(val) {
            this.pageSize2 = val
            this.getGoodsData()
        },
        // 前往第几页
        handleCurrentChange2(val) {
            this.pageNum2 = val
            this.getGoodsData()
        },
        selectChange(t) {
            if (t === 2) {
                this.formInline.courseName = ''
            } else {
                this.formInline.goodsName = ''
            }
        }
    },
    created() {
        this.getCourseData()
        this.getGoodsData()
        this.getUserCount()
    }
}
</script>

<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .chooseOne
        overflow hidden
        margin-left 40px
        width 1420px
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
    .tableBox
        padding 0 10px
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .paging
        text-align center
        padding 20px 0
    .statistics
        width 100%
        height 100%
        .head
            width 100%
            height 68px
            position fixed
            left 240px
            top 60px
            background #FFFFFF
            z-index 99
            .form
                padding-top 14px
            .selectCity
                width 164px
        .tableCard
            width 100%
            height 776px
            margin 20px 0 20px 0
            padding-left 20px
            .cardBox
                width 700px
                height 776px
                background #fff
                float left
                margin-left 40px
                .tit
                    height 86px
                    border-bottom 1px solid #F2F2F2
                    .txt
                        color #333333
                        font-size 26px
                        line-height 87px
                        padding-left 30px
                .numCard
                    padding 30px 0
                    height 160px
                    width 100%
                    border-bottom 1px solid #F2F2F2
                    .numBox
                        min-width 240px
                        height 160px
                        background #F7F7F7
                        margin-left 30px
                        float left
                        p
                            color #555555
                            font-size 16px
                            padding 10px 0
                            margin-left 20px
                        .numTxt
                            padding 20px 0 10px 0
                        .num
                            font-size 40px
                            color #333333
                            padding-right 20px
                .searchBox
                    margin 30px 0 0 73px
                    .search
                        width 346px
                    .searchBtn
                        background #222222
                        color #fff
        .subtotal
            background #ffffff
            height 68px
            width 100%
            .searchCourse
                float left
                width 50%
                .demo-form-inline
                    padding-top 18px
                    margin-left 40px
                    .selectCity
                        width 200px
            .countCourse
                float left
                width 50%
                height 68px
                .name
                    height 68px
                    line-height 68px
                    font-size 20px
                    color #7F0319
                    margin-right 30px
                    float right
                .price
                    height 68px
                    line-height 68px
                    font-size 40px
                    color #333333
                    margin-right 30px
                    float right
                .tadayPrice
                    height 68px
                    margin-top 36px
                    font-size 16px
                    color #9E9DA4
                    float right
                    margin-right 181px
        .shopCardList
            width 100%
            margin 0 0 107px 37px
            overflow hidden
            .shopCard
                min-width 240px
                height 182px
                float left
                margin-right 20px
                margin-top 20px
                background #ffffff
                p
                    padding-left 20px
                    color #9E9DA4
                    font-size 16px
                .shopName
                    color #9E9DA4
                    font-size 16px
                    padding-top 22px
                .num
                    color #333333
                    font-size 40px
                    padding 20px 10px 20px 20px
                .numTxt
                    padding 0 0 10px 20px
        .footBar
            width 100%;
            height 160px
            background #FFFFFF
            position relative
            text-align center
            .user
                color #333333
                font-size 20px
                position absolute
                top 20px
                left 48px
            .userBox
                float left
                width 33%
                height 160px
                .num
                    font-size 40px
                    color #333333
                    line-height 160px
                .txt
                    font-size 16px
                    margin-right 26px
                .colorRed
                    color #7F0319
                .colorBlack
                    color #222222
                .colorBlue
                    color #0099E6
                .count
                    color #9E9DA4
                    font-size 16px
                    margin-left 10px
                .backgroundImg
                    display inline-block
                    width 10px
                    height 10px
                    margin-left 10px
                    img
                        width 100%
                        height 100%
</style>
