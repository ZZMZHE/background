<template>
    <div class="talkList">
        <div class="conn">
            <div class="btnBox">
                <div class="txt">评论列表</div>
                <div class="btn">
                    <el-button size="small" @click="$router.go(-1)" plain>返 回</el-button>
                </div>
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column
                        prop="nickname"
                        align="center"
                        label="昵称">
                    </el-table-column>
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
                        prop="content"
                        align="center"
                        show-overflow-tooltip
                        label="内容">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="评论时间">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addTime }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="readCount"
                        align="center"
                        label="点赞数">
                        <template slot-scope="scope">
                            <span>{{ scope.row.readCount }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        align="center"
                        label="操作">
                        <!--  -->
                        <template slot-scope="scope">
                            <span class="color" @click="del({ id: scope.row.id, type: 2 })">删除</span>
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

import { newsInformationCommentList, newsInformationCommentDel } from 'api/index.js'

export default {
    name: 'talkList',
    components: {},
    data() {
        return {
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取列表
        getData() {
            newsInformationCommentList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                id: this.id
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
            this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                newsInformationCommentDel(``, {
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
        }
    },
    created() {
        this.id = this.$route.query.id
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
    .margin
        margin-left 10px
        color #1890FF
    .talkList
        .conn
            background #ffffff
            margin 20px 20px 0 20px
            .btnBox
                height 60px
                .txt
                    font-size 20px
                    line-height 60px
                    float left
                    margin-left 40px
                .btn
                    float right
                    margin-right 5%
                    margin-top 14px
            .tableBox
                padding 20px 60px 0 60px
                background #ffffff
</style>
