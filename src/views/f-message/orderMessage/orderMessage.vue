<template>
    <div class="orderMessage">
        <div class="conn">
            <div class="btn">
                <el-switch
                    style="display: block"
                    v-model="flag"
                    inactive-text="是否开启订单状态推送">
                </el-switch>
            </div>
            <div class="tableBox">
                <el-table
                    key="1"
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        align="center"
                        label="订单编号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="用户">
                    </el-table-column>
                    <el-table-column
                        prop="countMoney"
                        align="center"
                        label="金额">
                        <template slot-scope="scope">
                            <span style="color: #7F0319">{{ '￥' + scope.row.countMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.orderStatus == 101">待付款</span>
                            <span v-if="scope.row.orderStatus == 201">待发货</span>
                            <span v-if="scope.row.orderStatus == 301">已发货</span>
                            <span v-if="scope.row.orderStatus == 401">待评价</span>
                            <span v-if="scope.row.orderStatus == 501">已完成</span>
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

export default {
    name: 'orderMessage',
    components: {},
    data() {
        return {
            flag: false, // 是否开启订单状态推送
            tableData: [],
            pageSize: 10,
            pageNum: 1,
            total: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 页数
        handleSizeChange(val) {
            this.pageSize = val
            // this.getData()
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val
            // this.getData()
        }
    },
    created() {}
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .el-switch >>> span
        color: #9E9DA4 !important
    .paging
        text-align center
        padding 20px 0
        background #ffffff
    .orderMessage
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .btn
                padding 30px 0 30px 150px
            .tableBox
                padding 0 80px
</style>
