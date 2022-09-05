<template>
    <div class="auditWithdraw">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                     <el-form-item label="申请时间" prop="dateValue">
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

                    <el-form-item label="审核状态" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="已通过" value="1"></el-option>
                            <el-option label="已拒绝" value="2"></el-option>
                        </el-select>
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
                    <el-table-column
                        label="持卡人名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.bankCardName }}</template>
                    </el-table-column>
                    <el-table-column
                        label="手机号"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.mobile }}</template>
                    </el-table-column>
                    <el-table-column
                        label="银行"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="提现金额"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.money }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="银行卡号"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankCardNumber }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="审核状态"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" style="color: #9E9DA4">待审核</span>
                            <span v-if="scope.row.status == 1" style="color: #1ABC9C">已通过</span>
                            <span v-if="scope.row.status == 2" style="color: #FE093C">已拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="discountAmount"
                        align="center"
                        show-overflow-tooltip
                        label="申请时间">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" class="color" style="color: #409EFF" @click="auditSuccess({ id: scope.row.id })">审核通过</span>
                            <span v-if="scope.row.status == 0" class="color margin" style="color: #7F0319" @click="auditFaile({ id: scope.row.id })">审核失败</span>
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

import { eduTeacherWithdrawList, eduTeacherWithdrawUpdateStatus } from 'api/index.js'

export default {
    name: 'auditWithdraw',
    components: {},
    data() {
        return {
            formInline: {
                dateValue: [],
                status: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            // 审核状态 status 0.待审核 1.审核通过 2.已拒绝
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            eduTeacherWithdrawList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                status: this.formInline.status,
                startTime: this.formInline.dateValue[0],
                endTime: this.formInline.dateValue[1]
            }).then(res => {
                if (res) {
                    this.total = res.data.total
                    this.tableData = res.data.rows
                }
            })
        },
        // 审核成功
        auditSuccess(val) {
            this.$confirm('此操作将通过此提现申请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduTeacherWithdrawUpdateStatus(``, {
                    id: val.id,
                    status: 1
                }).then(res => {
                    if (res.status === 200) {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 审核失败
        auditFaile(val) {
            this.$confirm('此操作将拒绝此提现申请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduTeacherWithdrawUpdateStatus(``, {
                    id: val.id,
                    status: 2
                }).then(res => {
                    if (res.status === 200) {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
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
            // this.pageSize = 10
            this.pageNum = 1
            this.getData()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
        },
        // 重置
        onReset() {
            this.pageNum = 1
            this.pageSize = 10
            this.formInline.status = undefined
            this.formInline.dateValue = []
            this.getData()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getData()
        },
        goDetails(val) {
            this.$router.push({ name: 'auditDetails', query: val })
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
    .auditWithdraw
        .conn
            padding 20px 14px
            .header
                margin-left 15px
            .tableBox
                padding 20px 50px
                background #ffffff
</style>
