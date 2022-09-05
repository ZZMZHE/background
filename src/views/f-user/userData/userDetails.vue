<template>
    <div class="courseDetails">
        <div class="conn">
            <div class="header">
                <div class="btn">浏览轨迹</div>
                <el-button size="small" @click="goback"  plain class="back">返回上一页</el-button>
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="sort"
                        align="center"
                        label="课程图片">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.coverUrl"
                                fit="cover">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="课程名称">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        label="价格">
                    </el-table-column>
                     <el-table-column
                        label="课程类型"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">单节视频课程</span>
                            <span v-if="scope.row.type == 2">单节直播课程</span>
                            <span v-if="scope.row.type == 3">系列视频课程</span>
                            <span v-if="scope.row.type == 4">系列直播课程</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="categoryName1"
                        align="center"
                        label="所属类目">
                    </el-table-column> -->
                    <el-table-column
                        prop="startTime"
                        align="center"
                        label="开课时间">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="浏览时间">
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
import { userBrowseList } from 'api/index.js'
export default {
    name: 'courseDetails',
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
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '10'
        }
    },
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            userBrowseList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                id: this.id
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
        // 返回上一页
        goback() {
            this.$router.push({ name: 'userData' })
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
    @import '../../../assets/css/upload3.css';
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
    .courseDetails
        .conn
            padding 20px 14px
            .header
                background #ffffff
                height 80px
                .btn
                    margin 20px
                    float left
                .back
                    float right
                    margin 10px 41px 10px 10px
            .tableBox
                padding 0 50px
                background #ffffff
</style>
