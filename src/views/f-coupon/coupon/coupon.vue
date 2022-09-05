<template>
    <div class="coupon">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="可用" value="0"></el-option>
                            <el-option label="过期" value="1"></el-option>
                            <!-- <el-option label="下架" value="2"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优惠券名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="选择日期：" prop="dateValue">
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
                        <el-button type="" class="btn bg" size='small' @click="goGrant({ type: 1 })">发放优惠券</el-button>
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
                    <!-- <el-table-column
                        align="center"
                        label="图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="优惠券名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="discountAmount"
                        align="center"
                        label="金额">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">{{ scope.row.discountAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="使用条件"
                        align="center">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">满{{ scope.row.reachAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="grantCount"
                        align="center"
                        label="发放数量">
                    </el-table-column>
                    <el-table-column
                        prop="receiveCount"
                        align="center"
                        label="领取数量">
                        <template slot-scope="scope">
                            <span>{{ scope.row.receiveCount || '0' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="applyCount"
                        align="center"
                        label="使用数量">
                        <template slot-scope="scope">
                            <span>{{ scope.row.applyCount || '0' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="code"
                        align="center"
                        label="优惠码">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="到期时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        label="发放时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goGrant({ id: scope.row.id, type: '2' })">查看</span>
                            <span v-if="scope.row.status == 1"  class="color margin" style="color: #7F0319">已过期</span>
                            <span v-if="scope.row.status == 0 || scope.row.status == 1" class="color margin" @click="soldOut({ data: scope.row, t: 2  })">删除</span>
                            <!-- <span v-if="scope.row.status == 2" class="color margin" style="color: #7F0319"  @click="soldOut({ data: scope.row, t: 0 })">上架</span> -->
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

import { couponList, couponAdd } from 'api/index.js'

export default {
    name: 'coupon',
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                dateValue: [],
                status: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            categoryList: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            let name = this.formInline.name
            let status = this.formInline.status
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0]
            let endTime = this.formInline.dateValue[1]
            couponList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                status,
                startTime,
                endTime
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
        // 下架商品
        soldOut(val) {
            let status = val.t
            let txt = '删除'
            if (status === 0) { // 下架
                txt = '上架'
            } else if (status === 2) {
                txt = '删除'
            }
            this.$confirm(`此操作将${txt}该优惠券, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                couponAdd(``, {
                    id: val.data.id,
                    name: val.data.name,
                    startTime: val.data.startTime,
                    endTime: val.data.endTime,
                    reachAmount: val.data.reachAmount,
                    discountAmount: val.data.discountAmount,
                    grantCount: val.data.grantCount,
                    status,
                    depict: val.data.depict,
                    tag: val.data.tag
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success(`${txt}成功！`)
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
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // },

        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
        },
        // // 去编辑商品
        // goUpdate(val) {
        //     this.$router.push({ name: 'upDateGoods', query: val })
        // },
        // // 去评论列表
        // goGoodsTalk(val) {
        //     this.$router.push({ name: 'goodsTalk', query: val })
        // },
        goGrant(val) {
            this.$router.push({ name: 'couponDetails', query: val })
        }
    },
    created() {
        this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
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
    .coupon
        .conn
            margin 20px 14px
            background #ffffff
            .header
                padding 10px
            .tableBox
                padding 0 20px
</style>
