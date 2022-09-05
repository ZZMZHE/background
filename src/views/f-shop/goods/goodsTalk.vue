<template>
    <div class="goodsTalk">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="评分：" prop="score">
                        <el-input v-model="formInline.score" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" class="btn" style="color: #ffffff;background: #222222">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button class="btn" size='small' @click="goBack" style="color: #ffffff;background: #222222">返回上一页</el-button>
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
                        label="用户头像">
                        <template slot-scope="scope">
                            <el-image
                            style="width: 40px; height: 40px"
                            :src="scope.row.faceUrl"
                            fit="cover"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="用户昵称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.nickname }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        label="发表时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="评分"
                        align="center">
                        <template slot-scope="scope">
                            <el-rate
                                disabled
                                v-model="scope.row.score"
                                :colors="colors">
                            </el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="openDia({ id: scope.row.id, sort: scope.row.sortOrder })">评论排序</span>
                            <span class="color margin" style="color: #7F0319" @click="goDetails({ id: scope.row.id, fId: id })">查看详情</span>
                            <span class="color margin" v-if="scope.row.status == 0" @click="del({ id: scope.row.id, status: scope.row.status })">隐藏</span>
                            <span class="color margin" v-if="scope.row.status == 1" @click="del({ id: scope.row.id, status: scope.row.status })">显示</span>
                            <!-- <span class="color margin" @click="soldOut({ id: scope.row.id, type: '1' })">下架</span> -->
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
        <el-dialog title="评论排序" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="form">
                <el-form-item label="序位" :label-width="formLabelWidth" :required="true">
                    <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="50"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="overhead">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { goodsCommentList, goodsCommentUpdate, goodsCommentDelete } from 'api/index.js'

export default {
    name: 'goodsTalk',
    components: {},
    data() {
        return {
            formInline: {
                score: null
            },
            form: {
                sort: 50,
                id: ''
            },
            multipleSelection: [],
            tableData: [],
            dialogFormVisible: false,
            pageNum: 1,
            pageSize: 10,
            total: 10,
            id: '',
            colors: ['#7F0319', '#7F0319', '#7F0319'],
            formLabelWidth: '100px'
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            let score = this.formInline.score || undefined
            goodsCommentList(``, {
                id: this.id,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                score
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
        openDia(val) {
            this.form.sort = val.sort
            this.form.id = val.id
            this.dialogFormVisible = true
        },
        // 顶置
        overhead() {
            goodsCommentUpdate(``, {
                id: this.form.id,
                sort: this.form.sort
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('操作成功！')
                    this.dialogFormVisible = false
                    this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
                }
            })
        },
        // 下架商品
        del(val) {
            let t = ''
            let status = 0
            if (val.status.toString() === '0') {
                status = 1
                t = '隐藏'
            } else if (val.status.toString() === '1') {
                status = 0
                t = '显示'
            }
            this.$confirm(`此操作将${t}该评论, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                goodsCommentDelete(``, { id: val.id, status: status }).then(res => {
                    if (res) {
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
        // 去详情
        goDetails(val) {
            this.$router.push({ name: 'talkDetails', query: val })
        },
        goBack() {
            this.$router.push({ name: 'goods' })
        },
        goUpload(val) {
            this.$router.push({ name: 'uploadGoods', query: val })
        }
    },
    created() {
        this.id = this.$route.query.id
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
    .goodsTalk
        .conn
            padding 20px 14px
            background #fff
            .tableBox
                padding 20px 20px 0 20px
</style>
