<template>
    <div class="goods">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="企业名称" prop="id">
                        <el-select v-model="formInline.id" placeholder="请选择">
                            <el-option v-for="(item, i) in companyList" :label="item.name" :value="item.id" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="资讯名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="选择日期：" prop="dateValue" >
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
                        <el-button @click="onSubmit" class="btn" style="background: #222222;color: #ffffff">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button class="btn" size='small' @click="goUpload({type: 1})" style="background: #222222;color: #ffffff">发布资讯</el-button>
                        <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量删除</el-button>
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
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="资讯标题"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column
                        label="企业名称"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.companyName }}</template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goUpdate({ id: scope.row.id, type: '2' })">查看</span>
                            <span class="color margin" @click="soldOut({ id: scope.row.id, type: '1' })">删除</span>
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

import { cmsCompanyInformationList, cmsCompanyInformationCompanyList, cmsCompanyInformationDel } from 'api/index.js'

export default {
    name: 'goods',
    components: {},
    data() {
        return {
            formInline: {
                name: null,
                dateValue: [],
                id: null
            },
            multipleSelection: [],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            companyList: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        getCategory() {
            cmsCompanyInformationCompanyList().then(res => {
                if (res.status === 200) {
                    this.companyList = res.data
                }
            })
        },
        // 获取数据
        getData() {
            let name = this.formInline.name || undefined
            let id = this.formInline.id || undefined
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0] || undefined
            let endTime = this.formInline.dateValue[1] || undefined
            cmsCompanyInformationList(``, {
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
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 下架商品
        soldOut(val) {
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
            this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cmsCompanyInformationDel(``, { ids }).then(res => {
                    if (res) {
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
            this.$router.push({ name: 'updateInfo', query: val })
        },
        // 去评论列表
        goGoodsTalk(val) {
            this.$router.push({ name: 'goodsTalk', query: val })
        },
        goUpload(val) {
            this.$router.push({ name: 'updateInfo', query: val })
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
    .goods
        .conn
            padding 20px 14px
            background #ffffff
            .tableBox
                padding 0 20px
</style>
