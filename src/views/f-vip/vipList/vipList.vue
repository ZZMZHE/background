<template>
    <div class="vipList">
        <div class="conn">
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <el-table-column
                        align="center"
                        label="头像">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.faceUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.nickname }}</template>
                    </el-table-column>
                    <el-table-column
                        label="开通会员档位"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.vipName }}</template>
                    </el-table-column>
                    <el-table-column
                        label="联系方式"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.mobile }}</template>
                    </el-table-column>
                    <el-table-column
                        label="入会时间"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.addTime }}</template>
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

import { eduVipMemberList } from 'api/index.js'

export default {
    name: 'vipList',
    components: {},
    data() {
        return {
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
            eduVipMemberList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    this.tableData = res.data.rows
                }
            })
        },
        // 多选
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // },

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
        goDetails(val) {
            this.$router.push({ name: 'updateVip', query: val })
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
    .vipList
        .conn
            padding 20px 14px
            .tableBox
                padding 20px 50px
                background #ffffff
</style>
