<template>
    <div class="auditPush">
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
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <!-- <el-table-column
                        align="center"
                        label="用户头像">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="用户名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        label="性别"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.gender == 0">未知</span>
                            <span v-if="scope.row.gender == 1">女</span>
                            <span v-if="scope.row.gender == 2">男</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="手机号"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.mobile }}</template>
                    </el-table-column>
                    <el-table-column
                        label="是否微商"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSmallShop == 1">是</span>
                            <span v-if="scope.row.isSmallShop == 0">否</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="是否代购"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.replaceBuy == 1">是</span>
                            <span v-if="scope.row.replaceBuy == 0">否</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="是否其他平台店主"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isOtherShopkeeper == 1">是</span>
                            <span v-if="scope.row.isOtherShopkeeper == 0">否</span>
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
                            <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id, type: '2', status: scope.row.status })">查看详情</span>
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

import { cmsPushMarketList } from 'api/index.js'

export default {
    name: 'auditPush',
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
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            cmsPushMarketList(``, {
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
            this.$router.push({ name: 'pushAuditDetails', query: val })
        }
    },
    created() {
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
    .auditPush
        .conn
            padding 20px 14px
            background #fff
            .header
                margin-left 15px
            .tableBox
                padding 20px 50px
                background #ffffff
</style>
