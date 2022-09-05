<template>
    <div class="educationBannerDetails">
        <div class="conn">
            <div class="header">
                <div class="title">编辑</div>
                <div class="btnList">
                    <el-button size="small" type="primary" @click="update">确定</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input-number v-model="form.price" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <!-- <el-form-item label="">
                       <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item> -->
                    <el-form-item label="包含课程">
                       <div class="tableBox">
                            <el-table
                                ref="multipleTable"
                                border
                                :data="form.eduCourseVoList"
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
                                    label="价格"
                                    show-overflow-tooltip
                                    align="center">
                                    <template slot-scope="scope">
                                        <span style="color: #A4503D">￥{{ scope.row.name }}</span>
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
                                        <span style="color: #A4503D">￥{{ scope.row.categoryName2 }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="endTime"
                                    label="时间"
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
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="openDia">添加课程</el-button>
                    </el-form-item>
                </el-form>
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
                    border
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
import { eduVipInfo, eduVipCourseList } from 'api/index.js'
export default {
    name: 'educationBannerDetails',
    components: {
        // wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            form: {
                name: undefined,
                price: undefined,
                eduCourseVoList: []
            },
            formInline: {
                name: undefined,
                dateValue: [],
                status: undefined
            },
            dialogFormVisible: false,
            pageNum: 1,
            pageSize: 10,
            total: 10,
            formLabelWidth: '85px',
            tableData: [],
            type: '',
            id: ''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        getData() {
            eduVipInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form = res.data
                    this.form.imgUrl = res.data.imgUrl
                    this.form.sort = res.data.sort
                    this.form.type = res.data.type.toString()
                    if (res.data.type.toString() === '1') {
                        this.form.link = res.data.content
                    } else if (res.data.type.toString() === '2') {
                        this.form.txt = res.data.content
                        setTimeout(() => { this.$refs.text.getData(res.data.content) }, 300)
                    }
                }
            })
        },
        getCourseList() {
            eduVipCourseList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name: this.formInline.name
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        // 添加
        add() {
            if (this.form.type === '1') {
                this.form.content = this.form.link
            } else if (this.form.type === '2') {
                this.form.content = this.form.txt
            }
            // cmsBannerAdd(``, {
            //     type: 3,
            //     sort: this.form.sort,
            //     imgUrl: this.form.imgUrl,
            //     typeBanner: this.form.type,
            //     content: this.form.content,
            //     status: 0
            // }).then(res => {
            //     if (res.status === 200) {
            //         this.$message.success('添加成功！')
            //         this.goBack()
            //     }
            // })
        },
        // 编辑
        update() {
            if (this.form.type === '1') {
                this.form.content = this.form.link
            } else if (this.form.type === '2') {
                this.form.content = this.form.txt
            }
            // cmsBannerAdd(``, {
            //     id: this.id,
            //     type: 3,
            //     sort: this.form.sort,
            //     imgUrl: this.form.imgUrl,
            //     typeBanner: this.form.type,
            //     content: this.form.content,
            //     status: 0
            // }).then(res => {
            //     if (res.status === 200) {
            //         this.$message.success('修改成功！')
            //         this.goBack()
            //     }
            // })
        },
        // 富文本内容
        // catchData(val) {
        //     this.form.txt = val
        // },
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
        handleSelectionChange(val) {
            this.multipleSelection = val
        },

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
        openDia() {
            this.dialogFormVisible = true
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'educationBanner' })
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
    .wanged >>> .w-e-text-container
        height: 300px !important
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
</style>
