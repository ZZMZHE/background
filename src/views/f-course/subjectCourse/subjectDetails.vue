<template>
    <div class="subjectDetails">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                     <el-form-item label="课程名称" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button type="" class="btn bg" size='small' @click="openCourseList({ type: 1 })">新增课程</el-button>
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <!-- <el-table-column
                        align="center"
                        label="课程图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="专题名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        label="已有课程"
                        align="center">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">{{ scope.row.reachAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="创建时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <!-- <span class="color" style="color: #7F0319" @click="goGrant({ id: scope.row.id, type: '2' })">查看</span> -->
                            <span class="color margin" @click="soldOut({ data: scope.row, t: 2  })">删除</span>
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
        <el-dialog title="新增课程" :visible.sync="dialogFormVisible" width="60%">
            <el-form>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                     <el-form-item label="课程名称" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="可用" value="0"></el-option>
                            <el-option label="过期" value="1"></el-option>
                            <el-option label="下架" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类目" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="可用" value="0"></el-option>
                            <el-option label="过期" value="1"></el-option>
                            <el-option label="下架" value="2"></el-option>
                        </el-select>
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
                    :data="tableData"
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
                        align="center"
                        label="课程图片">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.picUrl"
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
                        prop="discountAmount"
                        align="center"
                        label="价格">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">{{ scope.row.discountAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="课程类型"
                        align="center">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">满{{ scope.row.reachAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        align="center"
                        label="所属类目">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { couponList, couponAdd } from 'api/index.js'

export default {
    name: 'subjectDetails',
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                dateValue: [],
                status: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            categoryList: [],
            formLabelWidth: '85px',
            dialogFormVisible: false,
            courseData: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            let name = this.formInline.name
            let status = this.formInline.status
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0]
            let endTime = this.formInline.dateValue[1]
            couponList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                status,
                startTime,
                endTime
            }).then(res => {
                if (res) {
                    this.total = res.data.total
                    this.tableData = res.data.rows
                }
            })
        },
        // 下架商品
        soldOut(val) {
            let status = val.t
            this.$confirm('此操作将下架该优惠券, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                couponAdd(``, {
                    id: val.data.id,
                    name: val.data.name,
                    startTime: val.data.startTime,
                    endTime: val.data.endTime,
                    reachAmount: val.data.reachAmount,
                    discountAmount: val.data.discountAmount,
                    status,
                    depict: val.data.depict,
                    tag: val.data.tag
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
        // 打开新增弹框
        openCourseList() {
            this.dialogFormVisible = true
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
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
    .subjectDetails
        .conn
            padding 20px 14px
</style>
