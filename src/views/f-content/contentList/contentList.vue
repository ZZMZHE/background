<template>
    <div class="contentList">
        <div class="conn">
            <div class="tab">
                <div class="tabBox" :class="tabIndex == 2 ? 'active' : ''" @click="changeTab(2)">求购信息</div>
                <div class="tabBox" style="margin-right: 20px" :class="tabIndex == 1 ? 'active' : ''" @click="changeTab(1)">招聘信息</div>
            </div>
            <div class="fenge" v-if="tabIndex == 1" key="1">
                <div class="tableBox">
                    <div class="addBox">
                        <el-button type="" class="active" size="small" plain @click="addZhaop({ type: 1, tabIndex: 1 })">添加招聘</el-button>
                    </div>
                    <el-table
                        :data="tableData1"
                        border
                        key="1"
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%">
                        <el-table-column
                            prop="companyName"
                            align="center"
                            label="招聘企业">
                        </el-table-column>
                        <el-table-column
                            prop="job"
                            align="center"
                            label="岗位名称">
                        </el-table-column>
                        <el-table-column
                            prop="addTime"
                            align="center"
                            label="发布时间">
                            <template slot-scope="scope">
                                <span>{{ scope.row.addTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="peopleCount"
                            align="center"
                            label="招聘人数">
                        </el-table-column>
                        <el-table-column
                            prop="salary"
                            align="center"
                            label="薪资">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="color margin" @click="addZhaop({ id: scope.row.id, type: 2, tabIndex: 1 })">编辑</span>
                                <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            background
                            :page-size="pageSize1"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total1">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="fenge" v-if="tabIndex == 2" key="2">
                <div class="tableBox">
                    <div class="addBox">
                        <el-button type="" class="active" size="small" plain @click="goDetails({ type: 1, tabIndex: 2 })">添加求购</el-button>
                    </div>
                    <el-table
                        :data="tableData2"
                        border
                        :header-cell-style="{background:'#f5f5f5'}"
                        key="2"
                        style="width: 100%">
                        <el-table-column
                            prop="needIntention"
                            align="center"
                            label="求购意向">
                        </el-table-column>
                        <el-table-column
                            prop="needType"
                            align="center"
                            label="求购类型">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            align="center"
                            label="公司名称">
                            <template slot-scope="scope">
                                <span>{{ scope.row.companyName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="linkman"
                            align="center"
                            label="联系人">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="电话">
                        </el-table-column>
                        <el-table-column
                            prop="companyAddress"
                            align="center"
                            show-overflow-tooltip
                            label="所在地">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <!--  -->
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 2, tabIndex: 2 })">编辑</span>
                                <span class="color margin" @click="qiuGouDel({ id: scope.row.id })">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            background
                            :page-size="pageSize2"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cmsCompanyRecruitList, cmsCompanyNeedBuyList, cmsCompanyRecruitDel, cmsCompanyNeedBuyDel } from 'api/index.js'

export default {
    name: 'contentList',
    components: {},
    data() {
        return {
            tabIndex: 1,
            tableData1: [],
            pageSize1: 10,
            pageNum1: 1,
            total1: 10,
            tableData2: [],
            pageSize2: 10,
            pageNum2: 1,
            total2: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取订单列表
        getData() {
            if (this.tabIndex.toString() === '1') {
                cmsCompanyRecruitList(``, {
                    pageNum: this.pageNum1,
                    pageSize: this.pageSize1
                }).then(res => {
                    if (res.status === 200) {
                        this.total1 = res.data.total
                        this.tableData1 = res.data.rows
                        if (this.pageNum1 > 1 && this.tableData1.length < 1) {
                            this.pageNum1 = this.pageNum1 - 1
                            this.getData()
                        }
                    }
                })
            } else if (this.tabIndex.toString() === '2') {
                cmsCompanyNeedBuyList(``, {
                    pageNum: this.pageNum2,
                    pageSize: this.pageSize2
                }).then(res => {
                    if (res.status === 200) {
                        this.total2 = res.data.total
                        this.tableData2 = res.data.rows
                        if (this.pageNum2 > 1 && this.tableData2.length < 1) {
                            this.pageNum2 = this.pageNum2 - 1
                            this.getData()
                        }
                    }
                })
            }
        },
        del(val) {
            this.$confirm('此操作将永久删除该招聘信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cmsCompanyRecruitDel(``, { id: val.id }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功')
                        this.tabIndex = 1
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
        // 求购删除
        qiuGouDel(val) {
            this.$confirm('此操作将永久删除该求购信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cmsCompanyNeedBuyDel(``, { id: val.id }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功')
                        this.tabIndex = 2
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
        // 添加招聘信息
        addZhaop(val) {
            this.$router.push({ name: 'addContent', query: val })
        },
        // tab切换
        changeTab(t) {
            this.tabIndex = t
            this.pageNum1 = 1
            this.pageNum2 = 1
            this.getData()
        },
        // 页数
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getData()
        },
        // 页码
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getData()
        },
        // 页数
        handleSizeChange2(val) {
            this.pageSize2 = val
            this.getData()
        },
        // 页码
        handleCurrentChange2(val) {
            this.pageNum2 = val
            this.getData()
        },
        goDetails(val) {
            // if (val.type === 1) {
            //     this.$router.push({ name: 'teacherAboutCourse', query: val })
            // } else if (val.type === 2) {
            //     this.$router.push({ name: 'topTeacherDetails', query: val })
            // }
            this.$router.push({ name: 'contentDetails', query: val })
        }
    },
    created() {
        if (this.$route.query.tabIndex) {
            this.tabIndex = this.$route.query.tabIndex
        } else {
            this.tabIndex = 1
        }
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
    .colorBlue
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
        color #1890FF
    .contentList
        width 100%
        .conn
            margin 20px 20px 0 20px
            .tab
                height 40px
                padding 30px 0
                background #ffffff
                .tabBox
                    width 120px
                    height 36px
                    background #C3C3C3
                    color #9E9DA4
                    font-size 16px
                    line-height 36px
                    text-align center
                    float right
                    margin-right 80px
                    cursor pointer
                .active
                    color #FFFFFF
                    background #222222
        .searchBox
            height 70px
            background #ffffff
            text-align center
            .demo-form-inline
                // padding-top 54px
                .search
                    width 346px
                .searchBtn
                    background #222222
                    color #fff
        .tableBox
            padding 0 80px
            background #ffffff
            .addBox
                background #ffffff
                padding 0 0 20px 20px
                .el-button
                    background #222222
                    color #ffffff
</style>
