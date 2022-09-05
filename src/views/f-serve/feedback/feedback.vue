<template>
    <div class="feedback">
        <div class="conn">
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="faceUrl"
                        align="center"
                        label="用户头像">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.faceUrl"
                                fit="cover">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        align="center"
                        label="用户名称">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="反馈时间">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        align="center"
                        label="联系方式">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        align="center"
                        show-overflow-tooltip
                        label="反馈内容">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" style="color: red">待处理</span>
                            <span v-if="scope.row.status == 1" style="color: #409EFF">已处理</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color margin" style="color: #7F0319" @click="goDetails({ id: scope.row.id })">查看详情</span>
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
import { cmsFeedbackList } from 'api/index.js'
export default {
    name: 'feedback',
    components: {},
    data() {
        return {
            pageSize: 10,
            pageNum: 1,
            total: 10,
            tableData: [],
            type: '',
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            cmsFeedbackList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        goDetails(val) {
            this.$router.push({ name: 'feedbackDetails', query: val })
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
    .els
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        display inline-block
        width 100px
        vertical-align: middle
    .feedback
        .conn
            background #ffffff
            margin 20px 14px
            .tableBox
                padding 20px 80px

</style>
