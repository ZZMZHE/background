<template>
    <div class="teacherRecommend">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-button type="" class="btn bg" size='small' @click="openCourseList({ type: 1 })">新增</el-button>
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
                        label="名字"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.nickname }}</template>
                    </el-table-column>
                    <el-table-column
                        label="手机号"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="courseCount"
                        label="课程数"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="课程销售额"
                        align="center">
                        <template slot-scope="scope">
                                <span>{{ '￥' + scope.row.coursePrice }}</span>
                            </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="popularityCount"
                        label="人气"
                        align="center">
                    </el-table-column> -->
                    <el-table-column
                        prop="fansCount"
                        label="粉丝"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="updateSort({ id: scope.row.id, sort: scope.row.sortOrder })">更改排序</span>
                            <span class="color margin" @click="soldOut({ id: scope.row.id, t: 2  })">删除</span>
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
        <el-dialog title="新增名师推荐" :visible.sync="dialogFormVisible" width="60%">
            <el-form>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                        <el-input v-model="formInline.tel" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <!-- <el-button type="" class="btn bg" size='small' @click="goGrant({ type: 1 })">发放优惠券</el-button> -->
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
                <el-table
                    ref="multipleTable"
                    border
                    :data="teacherData"
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                            prop="sort"
                            align="center"
                            label="头像">
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
                            label="名字">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="courseCount"
                            align="center"
                            label="课程数">
                        </el-table-column>
                        <el-table-column
                            prop="countMoney"
                            align="center"
                            label="课程销售额">
                            <template slot-scope="scope">
                                <span>{{ '￥' + scope.row.coursePrice }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="popularityCount"
                            align="center"
                            label="人气">
                        </el-table-column>
                        <el-table-column
                            prop="fansCount"
                            align="center"
                            label="粉丝">
                        </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="total1">
                    </el-pagination>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="recommendAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="推荐排序" :visible.sync="dialogFormVisible1" width="20%">
            <el-form :model="form">
                <el-form-item label="序位" :label-width="formLabelWidth" :required="true">
                    <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="50"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="overhead">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { eduTeacherRecommendList, eduTeacherRecommendTeacherList, eduTeacherRecommendAdd, eduTeacherRecommendDel, eduTeacherRecommendSortUpdate } from 'api/index.js'

export default {
    name: 'teacherRecommend',
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                tel: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            formLabelWidth: '95px',
            dialogFormVisible: false,
            teacherData: [],
            pageNum1: 1,
            pageSize1: 10,
            total1: 10,
            form: {
                id: undefined,
                sort: 50
            },
            dialogFormVisible1: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            eduTeacherRecommendList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                type: 2
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
        },
        // 下架商品
        soldOut(val) {
            this.$confirm('此操作将删除该名师的推荐, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduTeacherRecommendDel(``, {
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
        // 获取课程弹出框的列表
        getTeacherList() {
            let name = this.formInline.name
            let mobile = this.formInline.tel
            eduTeacherRecommendTeacherList(``, {
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                name,
                mobile,
                type: 2
            }).then(res => {
                if (res.status === 200) {
                    this.teacherData = res.data.rows
                    this.total1 = res.data.total
                    if (this.pageNum1 > 1 && this.teacherData.length < 1) {
                        this.pageNum1 = this.pageNum1 - 1
                        this.getTeacherList()
                    }
                }
            })
        },
        // 打开新增弹框
        openCourseList() {
            this.getTeacherList()
            // this.getGate()
            this.dialogFormVisible = true
        },
        // 新增
        recommendAdd() {
            let ids = []
            if (this.multipleSelection.length > 0) {
                this.multipleSelection.forEach(ele => {
                    ids.push(ele.id)
                })
            } else {
                return this.$message.error('请至少选择一名老师推荐')
            }
            eduTeacherRecommendAdd(``, {
                ids
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('添加成功')
                    this.getData()
                    this.dialogFormVisible = false
                }
            })
        },
        // 更改排序
        updateSort(val) {
            this.form.id = val.id
            this.form.sort = val.sort
            this.dialogFormVisible1 = true
        },
        // 确定更改排序
        overhead() {
            eduTeacherRecommendSortUpdate(``, this.form).then(res => {
                if (res.status === 200) {
                    this.$message.success('操作成功')
                    this.dialogFormVisible1 = false
                    this.getData()
                }
            })
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageNum1 = 1
            this.pageSize1 = 10
            this.getTeacherList()
        },
        // 搜索
        onSubmit() {
            this.pageNum1 = 1
            this.getTeacherList()
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
        // 每页几条
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getTeacherList()
        },
        // 前往第几页
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getTeacherList()
        },
        // // 去编辑商品
        // goUpdate(val) {
        //     this.$router.push({ name: 'upDateGoods', query: val })
        // },
        // // 去评论列表
        // goGoodsTalk(val) {
        //     this.$router.push({ name: 'goodsTalk', query: val })
        // },
        goGrant(val) {
            this.$router.push({ name: 'couponDetails', query: val })
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
    .teacherRecommend
        .conn
            padding 20px 14px
</style>
