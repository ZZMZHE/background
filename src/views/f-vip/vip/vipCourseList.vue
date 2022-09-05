<template>
    <div class="educationBannerDetails">
        <div class="conn">
            <div class="header">
                <div class="title">vip关联课程</div>
                <div class="btnList">
                    <el-button size="small" type="primary" @click="openDia">添加</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    :data="courseList"
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
                        label="价格"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span style="color: #A4503D" v-if="scope.row.price > 0">￥{{ scope.row.price }}</span>
                            <span style="color: #1890ff" v-else>免费</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="类型"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">单节视频课程</span>
                            <span v-if="scope.row.type == 2">单节直播课程</span>
                            <span v-if="scope.row.type == 3">系列视频课程</span>
                            <span v-if="scope.row.type == 4">系列直播课程</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="所属类目"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.categoryName2 || '--'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <!-- <span class="color" style="color: #7F0319" @click="goGrant({ id: scope.row.id, type: '2' })">查看</span> -->
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <div class="paging">
                    <el-pagination
                        @size-change="courseSizeChange"
                        @current-change="courseCurrentChange"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="courseTotal">
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
                    <el-form-item label="一级分类" prop="categoryId1">
                        <el-select v-model="formInline.categoryId1" placeholder="请选择" @change="selectChange">
                            <el-option
                                v-for="(item, index) in categoryF"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类" prop="categoryId2">
                        <el-select v-model="formInline.categoryId2" placeholder="请选择" @focus="errorGet">
                            <el-option
                                v-for="(item, index) in categoryS"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    ref="multipleTable"
                    border
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
                    <el-table-column
                        prop="categoryName2"
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
                <el-button type="primary" @click="addVipCouser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { eduVipFindDetail, eduVipCourseList, eduVipCategoryList, eduVipAddDetail, eduVipDel } from 'api/index.js'
export default {
    name: 'educationBannerDetails',
    components: {},
    data() {
        return {
            courseList: [],
            courseNum: 1,
            courseSize: 10,
            courseTotal: 10,
            formInline: {
                name: undefined,
                categoryId1: undefined,
                categoryId2: undefined
            },
            categoryF: [],
            categoryS: [],
            dialogFormVisible: false,
            pageNum: 1,
            pageSize: 10,
            total: 10,
            tableData: [],
            multipleSelection: [],
            type: '',
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        getData() {
            eduVipFindDetail(``, {
                id: this.id,
                pageNum: this.courseNum,
                pageSize: this.courseSize
            }).then(res => {
                if (res.status === 200) {
                    this.courseList = res.data.rows
                    this.courseTotal = res.data.total
                    if (this.courseNum > 1 && this.courseTotal.length < 1) {
                        this.courseNum = this.courseNum - 1
                        this.getData()
                    }
                }
            })
        },
        openDia() {
            this.getCategory()
            this.getCourseList()
            this.dialogFormVisible = true
        },
        getCourseList() {
            eduVipCourseList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name: this.formInline.name,
                categoryId1: this.formInline.categoryId1,
                categoryId2: this.formInline.categoryId2
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        // 获取一级类目
        getCategory() {
            eduVipCategoryList(``, {
                id: 0
            }).then(res => {
                if (res.status === 200) {
                    this.categoryF = res.data
                }
            })
        },
        // 获取二级类目
        selectChange() {
            eduVipCategoryList(``, {
                id: this.formInline.categoryId1
            }).then(res => {
                if (res.status === 200) {
                    this.categoryS = res.data
                }
            })
        },
        errorGet() {
            if (!this.formInline.categoryId1) {
                return this.$message.error('请先选择一级类目')
            }
        },
        // 添加
        addVipCouser() {
            let ids = []
            if (this.multipleSelection.length < 1) {
                return this.$message.error('请至少选择一个课程')
            } else {
                this.multipleSelection.forEach(ele => {
                    ids.push(ele.id)
                })
                eduVipAddDetail(``, {
                    id: this.id,
                    ids
                }).then(res => {
                    if (res.status === 200) {
                        this.getData()
                        this.dialogFormVisible = false
                        this.$message.success('添加成功')
                    }
                })
            }
        },
        del(val) {
            let ids = []
            ids.push(val.id)
            this.$confirm('此操作将删除该vip课程的关联, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduVipDel(``, {
                    id: this.id,
                    ids
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功！')
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
            this.pageNum = 1
            this.pageSize = 10
            this.getCourseList()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getCourseList()
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 每页几条
        courseSizeChange(val) {
            this.courseSize = val
            this.getData()
        },
        // 前往第几页
        courseCurrentChange(val) {
            this.courseNum = val
            this.getData()
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getCourseList()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getCourseList()
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'vip' })
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
    .educationBannerDetails
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .header
                height 80px
                border-bottom 1px solid #F2F2F2
                .title
                    line-height 81px
                    float left
                    margin-left 20px
                    color #333333
                    font-size 20px
                .btnList
                    float right
                    margin-right 244px
                    line-height 81px
            .formBox
                width 50%
                margin-top 20px
                padding-bottom 20px
            .tableBox
                padding 20px 50px 0 50px
</style>
