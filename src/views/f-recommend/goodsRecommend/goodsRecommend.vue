<template>
    <div class="goodsRecommend">
        <div class="conn">
            <div class="title">
                <div class="titLeft" >{{name}}：</div>
                <div class="btnList">
                    <el-button size="small" class="back bg" @click="openGoodsDia">添加推荐商品</el-button>
                    <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
                </div>
            </div>
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" key="1">
                    <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间：" prop="dateValue" >
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
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <!--@selection-change="handleSelectionChange"  <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                    </el-table-column> -->
                    <el-table-column
                        align="center"
                        label="图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        label="分类"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.categoryName }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        label="价格">
                        <template slot-scope="scope">
                            <span style="color: #7F0319">￥{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        label="销量">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        label="添加时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="updateSort({ id: scope.row.id, sort: scope.row.sortOrder })">更改排序</span>
                            <span class="color margin" @click="soldOut({ id: scope.row.id, type: '1' })">删除</span>
                            <!-- <span class="color margin" @click="soldOut({ id: scope.row.id, type: '1' })">下架</span> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="新增商品推荐" :visible.sync="dialogFormVisible" width="60%">
            <el-form>
                <el-form :inline="true" :model="formInline1" ref="formInline1" class="demo-form-inline" size="small" key="2">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="formInline1.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="caregory">
                        <el-select v-model="formInline1.caregory" placeholder="请选择">
                            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit1" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset1('formInline1')" class="btn">重置</el-button>
                        <!-- <el-button type="" class="btn bg" size='small' @click="goGrant({ type: 1 })">发放优惠券</el-button> -->
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
                <el-table
                    ref="multipleTable"
                    border
                    :data="goodsData"
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="商品图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="categoryName"
                        align="center"
                        label="分类">
                    </el-table-column>
                    <el-table-column
                        prop="discountAmount"
                        align="center"
                        label="价格">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">￥{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="total1">
                    </el-pagination>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="recommendAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="推荐排序" :visible.sync="dialogFormVisible1" width="20%">
            <el-form :model="form">
                <el-form-item label="序位" :label-width="formLabelWidth" :required="true">
                    <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="50"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="overhead">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { mallGoodsRecommendFindDetail, categoryGoodList, mallGoodsRecommendDeleteDetail, mallGoodsRecommendGoodsList, mallGoodsRecommendAddDetail, mallGoodsRecommendSortUpdate } from 'api/index.js'

export default {
    name: 'goodsRecommend',
    components: {},
    data() {
        return {
            formInline: {
                name: null,
                dateValue: []
            },
            formInline1: {
                name: null,
                caregory: null
            },
            multipleSelection: [],
            tableData: [],
            goodsData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            dialogFormVisible: false,
            pageNum1: 1,
            pageSize1: 10,
            total1: 10,
            categoryList: [],
            id: undefined,
            name: undefined,
            formLabelWidth: '95px',
            form: {
                id: undefined,
                sort: 50
            },
            dialogFormVisible1: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        getCategory() {
            categoryGoodList(``, { id: 0 }).then(res => {
                if (res.status === 200) {
                    this.categoryList = res.data
                }
            })
        },
        // 获取数据
        getData() {
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let name = this.formInline.name || undefined
            let startTime = this.formInline.dateValue[0] || undefined
            let endTime = this.formInline.dateValue[1] || undefined
            let id = this.id
            mallGoodsRecommendFindDetail(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                startTime,
                endTime,
                id
            }).then(res => {
                if (res) {
                    this.total = res.data.total
                    this.tableData = res.data.rows
                    if (this.pageNum > 1 && this.tableData.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getData()
                    }
                }
            })
        },
        getGoodsList() {
            let name = this.formInline1.name || null
            let categoryId1 = this.formInline1.caregory || null
            mallGoodsRecommendGoodsList(``, {
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                name,
                categoryId1
            }).then(res => {
                if (res) {
                    this.total1 = res.data.total
                    this.goodsData = res.data.rows
                    if (this.pageNum1 > 1 && this.goodsData.length < 1) {
                        this.pageNum1 = this.pageNum1 - 1
                        this.getGoodsList()
                    }
                }
            })
        },
        // 打开添加弹窗
        openGoodsDia() {
            this.getGoodsList()
            this.getCategory()
            this.dialogFormVisible = true
        },
        // 新增
        recommendAdd() {
            let ids = []
            if (this.multipleSelection.length > 0) {
                this.multipleSelection.forEach(ele => {
                    ids.push(ele.id)
                })
            } else {
                return this.$message.error('请至少选择一个商品推荐')
            }
            mallGoodsRecommendAddDetail(``, {
                ids,
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('添加成功')
                    this.getData()
                    this.dialogFormVisible = false
                }
            })
        },
        // 更改排序
        updateSort(val) {
            this.form.id = val.id
            this.form.sort = val.sort
            this.dialogFormVisible1 = true
        },
        // 确定更改排序
        overhead() {
            mallGoodsRecommendSortUpdate(``, this.form).then(res => {
                if (res.status === 200) {
                    this.$message.success('操作成功')
                    this.dialogFormVisible1 = false
                    this.getData()
                }
            })
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageNum = 1
            this.pageSize = 10
            this.getData()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getData()
        },
        // 重置
        onReset1() {
            this.$refs.formInline1.resetFields()
            this.pageNum1 = 1
            this.pageSize1 = 10
            this.getGoodsList()
        },
        // 搜索
        onSubmit1() {
            this.pageNum1 = 1
            this.getGoodsList()
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 下架商品
        soldOut(val) {
            this.$confirm('此操作将删除该商品推荐, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                mallGoodsRecommendDeleteDetail(``, {
                    id: val.id
                }).then(res => {
                    if (res) {
                        this.$message.success('删除成功！')
                        this.getData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
        },
        // 每页几条
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getGoodsList()
        },
        // 前往第几页
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getGoodsList()
        },
        // 去编辑商品
        goBack(val) {
            this.$router.push({ name: 'categoryRecommend', query: val })
        },
        goUpload() {
            this.$router.push({ name: 'uploadGoods' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.name = this.$route.query.name
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .paging
        padding 20px 0
        text-align center
    .bg
        background #222222
        color #ffffff
    .goodsRecommend
        .conn
            margin 20px 14px
            background #ffffff
            .title
                height 90px
                line-height 90px
                margin 0 35px
                border-bottom 1px solid #F2F2F2
                .titLeft
                    float left
                    color #333333
                .btnList
                    float right
            .header
                padding-top 20px
                padding-left 20px
            .tableBox
                padding 0 40px
</style>
