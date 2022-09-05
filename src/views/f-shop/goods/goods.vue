<template>
    <div class="goods">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
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
                    <el-form-item label="一级分类" prop="caregory">
                        <el-select v-model="formInline.caregory" placeholder="请选择" @change="getErCate">
                            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类" prop="caregory2">
                        <el-select v-model="formInline.caregory2" placeholder="请选择">
                            <el-option v-for="(item, index) in categoryList2" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button type="" class="btn bg" size='small' @click="goUpload">上传商品</el-button>
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
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
                        label="商品ID"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.id }}</template>
                    </el-table-column>
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
                            <span style="color: #A4503D" v-if="scope.row.price > 0">￥{{ scope.row.price }}</span>
                            <span style="color: #1890ff" v-else>免费</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="price"
                        align="center"
                        label="销量">
                    </el-table-column> -->
                    <el-table-column
                        prop="addTime"
                        label="发布时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goUpdate({ id: scope.row.id })">查看</span>
                            <span class="color margin" @click="goGoodsTalk({ id: scope.row.id })">查看评论</span>
                            <span v-if="scope.row.isOnSale == 0" class="color margin" @click="soldOut({ id: scope.row.id, isOnSale: scope.row.isOnSale })">上架</span>
                            <span v-if="scope.row.isOnSale == 1" style="color: red" class="color margin" @click="soldOut({ id: scope.row.id, isOnSale: scope.row.isOnSale })">下架</span>
                            <span class="color margin" @click="del({ id: scope.row.id, type: '1' })">删除</span>
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
    </div>
</template>

<script>

import { goodsList, categoryGoodList, goodsDel, goodsupdateSale } from 'api/index.js'

export default {
    name: 'goods',
    components: {},
    data() {
        return {
            formInline: {
                name: null,
                dateValue: [],
                caregory: null,
                caregory2: null
            },
            multipleSelection: [],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            categoryList: [],
            categoryList2: []
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
        getErCate() {
            categoryGoodList(``, { id: this.formInline.caregory }).then(res => {
                if (res.status === 200) {
                    this.categoryList2 = res.data
                }
            })
        },
        // 获取数据
        getData() {
            let name = this.formInline.name || undefined
            let categoryId1 = this.formInline.caregory || undefined
            let categoryId2 = this.formInline.caregory2 || undefined
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0] || undefined
            let endTime = this.formInline.dateValue[1] || undefined
            goodsList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                categoryId1,
                categoryId2,
                startTime,
                endTime
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    this.tableData = res.data.rows
                    if (this.pageNum > 1 && this.tableData.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getData()
                    }
                }
            })
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageSize = 10
            this.pageNum = 1
            this.getData()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getData()
        },
        // 多选
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // },
        // 下架商品
        soldOut(val) {
            let t = '上架'
            let status = val.isOnSale
            if (val.isOnSale === 0) {
                t = '上架'
                status = 1
            } else {
                t = '下架'
                status = 0
            }
            this.$confirm(`此操作将${t}该商品, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                goodsupdateSale(``, { id: val.id, status }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功！')
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
        del(val) {
            let ids = []
            if (val.type === '1') {
                ids.push(val.id)
            } else if (val.type === '2') {
                if (this.multipleSelection.length > 0) {
                    this.multipleSelection.forEach(ele => {
                        ids.push(ele.id)
                    })
                } else {
                    return this.$message.error('请选择要删除的商品！')
                }
            }
            this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                goodsDel(``, { ids }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功！')
                        this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
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
        // 去编辑商品
        goUpdate(val) {
            this.$router.push({ name: 'upDateGoods', query: val })
        },
        // 去评论列表
        goGoodsTalk(val) {
            this.$router.push({ name: 'goodsTalk', query: val })
        },
        goUpload() {
            this.$router.push({ name: 'uploadGoods' })
        }
    },
    created() {
        this.getCategory()
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
    .goods
        .conn
            padding 20px 14px
            background #fff
            .tableBox
                padding 20px
</style>
