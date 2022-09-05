<template>
    <div class="courseTalk">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="商品ID：" prop="id">
                        <el-input v-model="formInline.id" placeholder="请输入" class="phoneId" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="订单编号：" prop="orderSn">
                        <el-input v-model="formInline.orderSn" placeholder="请输入" class="phoneId" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" class="phoneId" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="订单时间" prop="dateValue">
                        <el-date-picker
                            v-model="formInline.dateValue"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            range-separator="~"
                            class="infoDate"
                            :default-time="['00:00:00', '23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核状态" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择" style="width: 150px">
                            <el-option label="已通过" value="0"></el-option>
                            <el-option label="已拒绝" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="btn">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <!-- <el-button type="primary" class="btn" size='small' @click="goBack">返回上一页</el-button> -->
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <!-- type -->
            <div class="chooseOne">
               <div class="c-btn" :class="formInline.type == 0 ? 'active': ''" @click="changeType(0)">全部</div>
               <div class="c-btn" :class="formInline.type == 1 ? 'active': ''" @click="changeType(1)">本日</div>
               <div class="c-btn" :class="formInline.type == 2 ? 'active': ''" @click="changeType(2)">最近7天</div>
               <div class="c-btn" :class="formInline.type == 3 ? 'active': ''" @click="changeType(3)">最近30天</div>
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
                        label="是否隐藏"
                        align="center">
                        <template slot-scope="scope">
                            <el-switch
                                class="margin"
                                :disabled="scope.row.status == 1"
                                size="mini"
                                @change="flagChange({id: scope.row.id, isHide: scope.row.isHide})"
                                v-model="scope.row.isHide">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="aduit({ id: scope.row.id, status: 1 })" v-if="scope.row.status == 0">拒绝</span>
                            <span class="color" @click="aduit({ id: scope.row.id, status: 0 })" v-if="scope.row.status == 1">通过</span>
                            <span class="color margin" style="color: #7F0319" @click="openDia({ id: scope.row.id, sort: scope.row.sortOrder })">评论排序</span>
                            <span class="color margin" style="color: #7F0319" @click="goDetails({ id: scope.row.id })">查看详情</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除评论</span>
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

import { commentShopList, commentShopUpdate, commentShopDel, commentShopUpdateIsHide, commentShopUpdateStatus } from 'api/index.js'

export default {
    name: 'courseTalk',
    components: {},
    data() {
        return {
            formInline: {
                id: undefined,
                orderSn: undefined,
                name: undefined,
                dateValue: [],
                type: '0',
                status: undefined
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
            formLabelWidth: '110px'
        }
    },
    computed: {},
    watch: {},
    methods: {
        changeType(i) {
            this.formInline.type = i
            this.getData()
        },
        flagChange(val) {
            // let ids = []
            // ids.push(val.id)
            let status = 0
            if (val.isHide) {
                status = 1
            } else {
                status = 0
            }
            commentShopUpdateIsHide(``, { id: val.id, status }).then(res => {
                if (res.status === 200) {
                    this.getData()
                }
            })
        },
        aduit(val) {
            let txt = ''
            if (val.status === 1) {
                txt = '通过'
            } else {
                txt = '拒绝'
            }
            this.$confirm(`此操作将审核该评论, 是否${txt}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                commentShopUpdateStatus(``, { id: val.id, status: val.status }).then(res => {
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
        // 获取数据
        getData() {
            if (!this.formInline.dateValue) {
                this.formInline.dateValue = []
            }
            commentShopList(``, {
                id: this.formInline.id,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name: this.formInline.name,
                type: this.formInline.type,
                orderSn: this.formInline.orderSn,
                startTime: this.formInline.dateValue[0],
                endTime: this.formInline.dateValue[1],
                status: this.formInline.status
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    // 是否隐藏 0.正常 1.隐藏
                    res.data.rows.forEach(ele => {
                        if (ele.isHide === 1) {
                            ele.isHide = true
                        } else {
                            ele.isHide = false
                        }
                    })
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
            commentShopUpdate(``, {
                id: this.form.id,
                sort: this.form.sort
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('操作成功！')
                    this.dialogFormVisible = false
                    this.getData()
                }
            })
        },
        // 下架商品
        del(val) {
            this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                commentShopDel(``, { id: val.id }).then(res => {
                    if (res) {
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
        // 去详情
        goDetails(val) {
            this.$router.push({ name: 'shopCommentDetails', query: val })
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .chooseOne
        overflow hidden
        padding-left 20px
        .c-btn
            padding 5px 10px
            border 1px solid #9E9DA4
            color #9E9DA4
            float left
            margin-right 10px
            font-size 14px
            cursor pointer
        .active
            border 1px solid #81061C
            color #81061C
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .paging
        padding 20px 0
        text-align center
    .courseTalk
        .conn
            padding 20px 14px
            background #fff
            .tableBox
                padding 20px 20px
</style>
