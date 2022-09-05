<template>
    <div class="course">
        <div class="conn">
            <el-button v-if="type == 1" type="" class="btn bg" style="margin: 20px 0" size='small' @click="$router.go(-1)">返回</el-button>
            <div class="header" v-if="type != 1">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                     <el-form-item label="课程名称" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="是否免费" prop="type">
                        <el-select v-model="formInline.type" placeholder="请选择">
                            <!-- //1 免费 2 收费 为空全部 -->
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="免费" value="1"></el-option>
                            <el-option label="付费" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button type="" class="btn bg" size='small' @click="$router.go(-1)">返回</el-button>
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
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
                        label="课程ID"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="课程图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.coverUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="课程名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        label="价格">
                        <template slot-scope="scope">
                            <span style="color: #A4503D" v-if="scope.row.price > 0">￥{{ scope.row.price }}</span>
                            <span style="color: #1890ff" v-else>免费</span>
                        </template>
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
                        prop="categoryName2"
                        align="center"
                        label="所属类目">
                    </el-table-column>
                    <el-table-column
                        prop="priceTotal"
                        align="center"
                        label="销量">
                    </el-table-column> -->
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
                        prop="count"
                        label="学习人数"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        v-if="type != 1"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="addCourse({ id: scope.row.id, type: 1 })" v-if="type == 2">添加</span>
                            <span class="color margin" style="color: #7F0319" @click="addCourse({ id: scope.row.id, type: 2 })" v-if="type == 3">移除</span>
                            <!-- <br> -->
                            <!-- <span class="color" style="color: #7F0319" @click="goStudent({ id: scope.row.id })">查看学员</span>
                            <span v-if="scope.row.status == 1" style="color: red" class="color margin" @click="soldOut({ id: scope.row.id, status: scope.row.status })">下架</span>
                            <span v-if="scope.row.status == 0" class="color margin" @click="soldOut({ id: scope.row.id, status: scope.row.status })">上架</span> -->
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

import { userInteriorBrowseList, userInteriorCourseList, userInteriorFindCourseList, userInteriorAddCourse, userInteriorDelCourse } from 'api/index.js'
export default {
    name: 'course',
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                dateValue: [],
                categoryId1: undefined,
                categoryId2: undefined,
                type: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            categoryList: [],
            categoryList2: [],
            type: 1
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 查看学员
        goStudent(val) {
            this.$router.push({ name: 'student', query: val })
        },
        // 获取类型列表
        // getTypeList() {
        //     categoryCourseList(``, {
        //         id: 0
        //     }).then(res => {
        //         if (res.status === 200) {
        //             this.categoryList = res.data
        //         }
        //     })
        // },
        // getErJi() {
        //     categoryCourseList(``, {
        //         id: this.formInline.categoryId1
        //     }).then(res => {
        //         if (res.status === 200) {
        //             this.categoryList2 = res.data
        //         }
        //     })
        // },
        // 获取数据
        getData() {
            let name = this.formInline.name
            let categoryId1 = this.formInline.categoryId1
            let categoryId2 = this.formInline.categoryId2
            let type = this.formInline.type
            if (Number(this.type) === 1) {
                // let startTime = this.formInline.dateValue[0]
                // let endTime = this.formInline.dateValue[1]
                userInteriorBrowseList(``, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.rows
                        if (this.pageNum > 1 && this.tableData.length < 1) {
                            this.pageNum = this.pageNum - 1
                            this.getData()
                        }
                    }
                })
            } else if (Number(this.type) === 2) {
                // let startTime = this.formInline.dateValue[0]
                // let endTime = this.formInline.dateValue[1]
                userInteriorFindCourseList(``, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name,
                    categoryId1,
                    categoryId2,
                    type,
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.rows
                        if (this.pageNum > 1 && this.tableData.length < 1) {
                            this.pageNum = this.pageNum - 1
                            this.getData()
                        }
                    }
                })
            } else if (Number(this.type) === 3) {
                // let startTime = this.formInline.dateValue[0]
                // let endTime = this.formInline.dateValue[1]
                userInteriorCourseList(``, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name,
                    categoryId1,
                    categoryId2,
                    type,
                    id: this.id
                }).then(res => {
                    if (res.status === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.rows
                        if (this.pageNum > 1 && this.tableData.length < 1) {
                            this.pageNum = this.pageNum - 1
                            this.getData()
                        }
                    }
                })
            }
        },
        // 下架课程
        addCourse(val) { //
            if (val.type === 1) {
                this.$confirm(`是否添加该课程?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userInteriorAddCourse(``, {
                        id: val.id,
                        userId: this.id
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('操作成功！')
                            this.$router.go(-1)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            } else if (val.type === 2) {
                this.$confirm(`是否移除该课程?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userInteriorDelCourse(``, {
                        id: val.id,
                        userId: this.id
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('操作成功！')
                            this.$router.go(-1)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            }
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageNum = 1
            this.pageSize = 10
            this.getData()
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
            this.getData()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
        }
        // // 去编辑商品

        // // 去评论列表
        // goGoodsTalk(val) {
        //     this.$router.push({ name: 'goodsTalk', query: val })
        // },
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
    .bg
        background #222222
        color #ffffff
    .course
        .conn
            padding 20px 14px
</style>
