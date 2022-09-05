<template>
    <div class="information">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="分类" prop="categoryId1">
                        <el-select v-model="formInline.categoryId1" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in categoryF"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题：" prop="title">
                        <el-input v-model="formInline.title" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="btn">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button size="small" @click="goDetails({ type: 1 })" class="btn1">新增</el-button>
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <!-- <div class="btnBox">
            </div> -->
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        align="center"
                        label="资讯ID">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        align="center"
                        label="资讯标题">
                    </el-table-column>
                    <el-table-column
                        prop="categoryName1"
                        align="center"
                        label="资讯分类">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        align="center"
                        label="发布人">
                        <template slot-scope="scope">
                            <span>{{ scope.row.nickname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="readCount"
                        align="center"
                        label="浏览人数">
                        <template slot-scope="scope">
                            <span>{{ scope.row.readCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <!--  -->
                        <template slot-scope="scope">
                            <span class="color" @click="goDetails({ id: scope.row.id, type: 2 })">编辑</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                            <span class="color margin" @click="goTalk({ id: scope.row.id })">评论列表</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :page-size="pageSize"
                        :page-sizes="[10,20,30,50,100]"
                        layout="prev, pager, next, sizes, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { newsInformationList, newsInformationDel, categoryNewsList } from 'api/index.js'

export default {
    name: 'information',
    components: {},
    data() {
        return {
            formInline: {
                categoryId1: undefined,
                title: undefined
            },
            categoryF: [],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        onSubmit() {
            this.pageNum = 1
            this.getData()
        },
        onReset() {
            this.formInline.categoryId1 = undefined
            this.formInline.title = undefined
            this.pageNum = 1
            this.pageSize = 10
            this.getData()
        },
        getCategory() {
            categoryNewsList(``, { id: 0 }).then(res => {
                if (res.status === 200) {
                    this.categoryF = res.data
                }
            })
        },
        // 获取列表
        getData() {
            newsInformationList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                categoryId1: this.formInline.categoryId1,
                title: this.formInline.title
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                    if (this.pageNum > 1 && this.tableData.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getData()
                    }
                }
            })
        },
        // 删除资讯
        del(val) {
            this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                newsInformationDel(``, {
                    id: val.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 页数
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
        },
        goTalk(val) {
            this.$router.push({ name: 'talkList', query: val })
        },
        goDetails(val) {
            this.$router.push({ name: 'informationDetails', query: val })
        }
    },
    created() {
        this.getData()
        this.getCategory()
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
    .margin
        margin-left 10px
        color #1890FF
    .information
        .conn
            background #ffffff
            margin 20px 20px 0 20px
            .header
                padding-top 20px
                padding-left 20px
            .btnBox
                margin 20px 0 20px 20px
            .btn1
                background #222222
                color #fff
                // margin 10px
            .tableBox
                padding 20px 60px 0 60px
                background #ffffff
</style>
