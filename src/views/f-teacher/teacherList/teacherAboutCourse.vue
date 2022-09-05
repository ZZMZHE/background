<template>
    <div class="teacherAboutCourse">
        <div class="conn">
            <div class="head">
                <div class="txt" v-if="type == 1">老师关联课程</div>
                <div class="txt" v-if="type == 2">名师关联课程</div>
                <div class="back" @click="goback">返回上页</div>
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
                        prop="type"
                        align="center"
                        label="课程类型">
                        <template slot-scope="scope">
                           <span v-if="scope.row.type == 1">单节视频课程</span>
                           <span v-if="scope.row.type == 2">单节直播课程</span>
                           <span v-if="scope.row.type == 3">系列视频课程</span>
                           <span v-if="scope.row.type == 4">系列直播课程</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="categoryName2"
                        align="center"
                        label="所属类目">
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        align="center"
                        label="销量">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        align="center"
                        label="开课时间">
                    </el-table-column>
                    <el-table-column
                        v-if="type == 2"
                        align="center"
                        label="名师简介">
                        <template>
                           <span class="color" @click="goDetails({ id: id, type: type })">查看</span>
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
import { teacherCourseList } from 'api/index.js'
export default {
    name: 'teacherAboutCourse',
    components: {},
    data() {
        return {
            pageSize: 10,
            pageNum: 1,
            total: 10,
            tableData: [],
            id: undefined,
            type: undefined
        }
    },
    computed: {},
    watch: {},
    methods: {
        getData() {
            teacherCourseList(``, {
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
        goDetails(val) {
            this.$router.push({ name: 'topTeacherDetails', query: val })
        },
        // 返回上一页
        goback() {
            this.$router.push({ name: 'teacherList', query: { tabIndex: this.type } })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
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
    .teacherAboutCourse
        width 100%
        .conn
            margin 20px 20px 0 20px
            .head
                height 120px
                background #ffffff
                .txt
                    color #333333
                    font-size 20px
                    margin 50px 0 0 40px
                    float left
                .back
                    width 146px
                    height 38px
                    border 1px solid #C0C0C0
                    line-height 40px
                    text-align center
                    color #5A5A5A
                    font-size 18px
                    margin 40px 80px 0 0
                    float right
                    cursor pointer
            .tableBox
                padding 0 50px
                background #ffffff
</style>
