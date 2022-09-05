<template>
    <div class="accountList">
        <div class="conn">
            <div class="header">
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入姓名" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="tel">
                        <el-input v-model="formInline.tel" placeholder="请输入手机号" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="选择日期：" prop="dateValue" >
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
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="btn">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                        <el-button type="" class="btn" size='small' @click="del({ type: 2 })">批量删除</el-button>
                        <el-button class="btnAdd" size='small' @click="goCreateAccount">创建账号</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        align="center"
                        label="账号">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="roleIds"
                        show-overflow-tooltip
                        align="center"
                        label="角色">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        label="创建时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <!-- update({ id: scope.row.id, role: scope.row.roleIds }) -->
                            <span class="color" @click="goDetails({ id: scope.row.id })">编辑</span>
                            <!-- <span class="color margin" @click="del({ id: scope.row.id })">查看</span> -->
                            <span class="color margin" @click="del({ id: scope.row.id, type: 1 })">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
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
// , roleList
import { adminList, adminDel } from 'api/index.js'
export default {
    name: 'accountList',
    components: {},
    data() {
        return {
            formInline: {
                name: '',
                dateValue: [],
                tel: ''
            },
            tableData: [],
            multipleSelection: [],
            pageNum: '1',
            pageSize: '10',
            total: 10,
            centerDialogVisible: false,
            value: [],
            ruleList: [],
            oneRule: [],
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取账户列表
        getData() {
            let name = this.formInline.name || undefined
            let mobile = this.formInline.tel || undefined
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0] || undefined
            let endTime = this.formInline.dateValue[1] || undefined
            adminList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                startTime,
                endTime,
                mobile
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
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 创建账号
        goCreateAccount(val) {
            this.$router.push({ name: 'addAccount' })
        },
        // 删除账户
        del(val) {
            if (val.type === 1) {
                let ids = []
                ids.push(val.id)
                this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    adminDel('', { ids }).then(res => {
                        if (res) {
                            this.$message.success('删除成功！')
                            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            } else if (val.type === 2) {
                if (this.multipleSelection.length <= 0) {
                    return this.$message.error('请至少选择一项删除！')
                } else {
                    let ids = []
                    this.multipleSelection.forEach(ele => {
                        ids.push(ele.id)
                    })
                    this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        adminDel('', { ids }).then(res => {
                            if (res) {
                                this.$message.success('删除成功！')
                                this.getData({ pageNum: this.pageNum, pageSize: this.pageSize })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            }
        },
        goDetails(val) {
            this.$router.push({ name: 'updateAccount', query: val })
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
    .btnAdd
        background #222222
        color #ffffff
    .accountList
        .conn
            margin 20px 14px
            .header
                background #ffffff
                padding 10px
            .tableBox
                padding 0 60px
                background #ffffff
</style>
