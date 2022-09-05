<template>
    <div class="systemList">
        <div class="conn">
            <div class="add">
                <el-button class="bg" size="small" @click="goInfo({ type: 1 })">添加推送</el-button>
            </div>
            <div class="tableBox">
                <el-table
                    key="1"
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        align="center"
                        label="标题">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        align="center"
                        label="类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">纯文本</span>
                            <span v-if="scope.row.type == 2">富文本</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="message"
                        align="center"
                        show-overflow-tooltip
                        label="内容">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" @click="goInfo({ id: scope.row.id, type: 2 })">查看</span>
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

import { informList } from 'api/index.js'

export default {
    name: 'systemList',
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
        // 获取列表
        getData() {
            informList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
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
        // 去详情
        goInfo(val) {
            this.$router.push({ name: 'systemMessage', query: val })
        }
    },
    created() {
        this.getData()
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
    .systemList
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .add
                height 50px
                .bg
                    background #222222
                    color #ffffff
                    margin 8px 0 0 80px
            .btn
                padding 30px 0 30px 150px
            .tableBox
                padding 0 80px
</style>
