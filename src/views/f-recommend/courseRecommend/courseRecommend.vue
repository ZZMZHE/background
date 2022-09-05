<template>
    <div class="courseRecommend">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" ref="formInline" class="demo-form-inline" size="small">
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
                        label="主图">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.imgUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="类目名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <!-- <el-table-column
                        label="类型"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">单节视频课程</span>
                            <span v-if="scope.row.type == 2">单节直播课程</span>
                            <span v-if="scope.row.type == 3">系列视频课程</span>
                            <span v-if="scope.row.type == 4">系列直播课程</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="addTime"
                        label="时间"
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
        <!-- <el-dialog title="新增课程" :visible.sync="dialogFormVisible" width="60%">
            <el-form>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                     <el-form-item label="课程名称" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="类目" prop="categoryId1">
                        <el-select v-model="formInline.categoryId1" placeholder="请选择">
                            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    ref="multipleTable"
                    :data="courseData"
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
                        prop="discountAmount"
                        align="center"
                        label="价格">
                        <template slot-scope="scope">
                            <span style="color: #A4503D">￥{{ scope.row.price }}</span>
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
                    <el-table-column
                        prop="categoryName2"
                        align="center"
                        label="所属类目">
                    </el-table-column>
                </el-table>
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
        </el-dialog> -->
        <el-dialog title="新增课程分类推荐" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="form">
                <el-form-item label="一级分类" :label-width="formLabelWidth">
                    <el-select v-model="formInline.categoryId1" placeholder="请选择" @change="getErCategory">
                        <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类" :label-width="formLabelWidth">
                    <el-select v-model="formInline.categoryId2" placeholder="请选择">
                        <el-option v-for="(item, index) in erCategoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="recommendAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="推荐排序" :visible.sync="dialogFormVisible1" width="20%">
            <el-form :model="form">
                <el-form-item label="序位" :label-width="formLabelWidth" :required="true">
                    <el-input-number v-model="form.sort" controls-position="right" :min="0" :max="50"></el-input-number>
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

import { eduCourseRecommendList, eduCourseRecommendCourseList, eduCourseRecommendCategoryList, eduCourseRecommendAdd, eduCourseRecommendDel, eduCourseRecommendSortUpdate } from 'api/index.js'

export default {
    name: 'courseRecommend',
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                dateValue: [],
                status: undefined,
                categoryId1: '',
                categoryId2: ''
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            categoryList: [],
            erCategoryList: [],
            formLabelWidth: '95px',
            dialogFormVisible: false,
            courseData: [],
            pageNum1: 1,
            pageSize1: 10,
            total1: 10,
            form: {
                id: undefined,
                sort: 50
            },
            dialogFormVisible1: false,
            f: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            eduCourseRecommendList(``, {
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
        // 下架商品
        soldOut(val) {
            this.$confirm('此操作将删除该课程的推荐, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduCourseRecommendDel(``, {
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
        getCourseList() {
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let name = this.formInline.name
            let categoryId1 = this.formInline.categoryId1
            let startTime = this.formInline.dateValue[0]
            let endTime = this.formInline.dateValue[1]
            eduCourseRecommendCourseList(``, {
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                name,
                categoryId1,
                startTime,
                endTime
            }).then(res => {
                if (res.status === 200) {
                    this.courseData = res.data.rows
                    this.total1 = res.data.total
                    if (this.pageNum1 > 1 && this.courseData.length < 1) {
                        this.pageNum1 = this.pageNum1 - 1
                        this.courseData()
                    }
                }
            })
        },
        // 获取类目
        getGate() {
            eduCourseRecommendCategoryList(``, {
                id: 0
            }).then(res => {
                if (res.status === 200) {
                    this.categoryList = res.data
                }
            })
        },
        // 二级类目
        getErCategory() {
            eduCourseRecommendCategoryList(``, {
                id: this.formInline.categoryId1
            }).then(res => {
                if (res.status === 200) {
                    this.erCategoryList = res.data
                }
            })
        },
        // 打开新增弹框
        openCourseList() {
            this.formInline.categoryId1 = ''
            this.formInline.categoryId2 = ''
            // this.getCourseList()
            this.getGate()
            this.dialogFormVisible = true
        },
        // 新增
        recommendAdd() {
            // let ids = []
            // if (this.multipleSelection.length > 0) {
            //     this.multipleSelection.forEach(ele => {
            //         ids.push(ele.id)
            //     })
            // } else {
            //     return this.$message.error('请至少选择一个课程推荐')
            // }
            // eduCourseRecommendAdd(``, {
            //     ids
            // }).then(res => {
            //     if (res.status === 200) {
            //         this.$message.success('添加成功')
            //         this.getData()
            //         this.dialogFormVisible = false
            //     }
            // })
            if (!this.formInline.categoryId1) {
                return this.$message.error('请选择一级分类')
            }
            if (this.erCategoryList.length < 1) {
                return this.$message.error('暂无二级分类')
            }
            if (!this.formInline.categoryId2) {
                return this.$message.error('请选择二级分类')
            }
            if (!this.f) {
                this.f = true
                let ids = []
                ids.push(this.formInline.categoryId2)
                eduCourseRecommendAdd(``, {
                    ids
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('添加成功')
                        this.getData()
                        this.dialogFormVisible = false
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 更改排序
        updateSort(val) {
            this.form.id = val.id
            this.form.sort = val.sort
            this.dialogFormVisible1 = true
        },
        // 确定更改排序
        overhead() {
            eduCourseRecommendSortUpdate(``, this.form).then(res => {
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
            this.getCourseList()
        },
        // 搜索
        onSubmit() {
            this.pageNum1 = 1
            this.getCourseList()
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
            this.getCourseList()
        },
        // 前往第几页
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getCourseList()
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
    .courseRecommend
        .conn
            padding 20px 14px
</style>
