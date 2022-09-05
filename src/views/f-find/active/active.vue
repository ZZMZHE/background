<template>
    <div class="course">
        <div class="conn">
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
                        align="center"
                        label="用户头像">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.faceUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="用户昵称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.nickname }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        align="center"
                        show-overflow-tooltip
                        label="部分内容">
                        <template slot-scope="scope">
                            <span>{{ scope.row.content }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id, type: '2' })">查看</span>
                            <span class="color margin" @click="del({ id: scope.row.id, type: '2' })">删除</span>
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

import { coilTalkList, coilTalkDel } from 'api/index.js'

export default {
    name: 'course',
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
            coilTalkList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
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
        // 删除动态
        del(val) {
            this.$confirm('此操作将删除该动态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                coilTalkDel(``, {
                    id: val.id
                }).then(res => {
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
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.getData({ pageNum: 1, pageSize: 10 })
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
        goDetails(val) {
            this.$router.push({ name: 'activeDetails', query: val })
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
    .course
        .conn
            padding 20px 14px
            background #fff
            .tableBox
                padding 20px 50px
                background #ffffff
</style>
