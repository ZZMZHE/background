<template>
    <div class="onlineServeList">
        <div class="conn">
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="name"
                        align="center"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        align="center"
                        label="评分">
                        <template slot-scope="scope">
                            <!-- score-template="{scope.row.rate}" -->
                            <el-rate
                                v-model="scope.row.score"
                                disabled
                                show-score
                                text-color="#ff9900"
                                >
                                </el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        align="center"
                        label="账户名称">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        align="center"
                        label="类型">
                        <template slot-scope="scope">
                            <!-- score-template="{scope.row.rate}" -->
                            <span v-if="scope.row.type == 1">总客服</span>
                            <span v-if="scope.row.type == 2">课程客服</span>
                            <span v-if="scope.row.type == 3">商城客服</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id})">查看</span>
                            <span class="color margin" style="color: #7F0319" @click="update({ name: scope.row.name, id: scope.row.id, mobile: scope.row.mobile, type: 2})">编辑</span>
                            <!-- <span class="color margin" @click="del({ id: scope.row.id })">删除</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="1000px">
            <el-form :model="form">
                <el-form-item label="名称：" :label-width="formLabelWidth">
                    <el-input style="width:500px" v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="选择管理员账号：" :label-width="formLabelWidth">
                    <div class="header">
                        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                            <el-form-item label="名称：" prop="name">
                                <el-input v-model="formInline.name" placeholder="请输入姓名" class="phoneId"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" prop="tel">
                                <el-input v-model="formInline.tel" placeholder="请输入手机号" class="phoneId"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="选择日期：" prop="dateValue" >
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
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" class="btn">搜索</el-button>
                                <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="tableBox">
                        <el-table
                            ref="multipleTable"
                            border
                            :data="accountData"
                            tooltip-effect="dark"
                            :header-cell-style="{background:'#f5f5f5'}"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <!-- <el-table-column
                                label="名称"
                                show-overflow-tooltip
                                align="center">
                                <template slot-scope="scope">{{ scope.row.name }}</template>
                            </el-table-column> -->
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
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { cmsOnlineServiceList, cmsOnlineServiceAdminList, cmsOnlineServiceUpdate } from 'api/index.js'
export default {
    name: 'onlineServeList',
    components: {},
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                name: ''
            },
            accountData: [],
            formInline: {
                name: '',
                dateValue: [],
                tel: ''
            },
            multipleSelection: [],
            pageNum: '1',
            pageSize: '10',
            total: 10,
            title: '',
            formLabelWidth: '150px',
            type: '',
            id: '',
            f: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            cmsOnlineServiceList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
        },
        getAccountList() {
            let name = this.formInline.name || undefined
            let mobile = this.formInline.tel || undefined
            if (this.formInline.dateValue === null) {
                this.formInline.dateValue = []
            }
            let startTime = this.formInline.dateValue[0] || undefined
            let endTime = this.formInline.dateValue[1] || undefined
            cmsOnlineServiceAdminList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                startTime,
                endTime,
                mobile
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    this.accountData = res.data.rows
                    if (this.pageNum > 1 && this.accountData.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getAccountList()
                    }
                }
            })
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageNum = 1
            this.pageSize = 10
            this.getAccountList()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getAccountList()
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getAccountList()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getAccountList()
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 添加标签
        add(t) {
            if (this.tableData.length > 0) {
                return this.$message.error('只能有一个客服哦！')
            }
            this.title = '新增'
            this.form.title = ''
            this.form.mobile = ''
            this.type = t.type
            this.dialogFormVisible = true
        },
        // 编辑标签
        update(t) {
            this.title = '编辑'
            this.type = t.type
            this.id = t.id
            this.form.name = t.name
            // this.form.mobile = t.mobile
            this.dialogFormVisible = true
        },
        // 新增或编辑
        addOrUpdate() {
            if (this.form.name === '' || this.form.name === undefined) {
                return this.$message.error('请输入名称')
            }
            if (this.multipleSelection.length <= 0) {
                return this.$message.error('请选择关联账户')
            }
            if (this.multipleSelection.length >= 2) {
                return this.$message.error('只能关联一个账户')
            }
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    cmsOnlineServiceUpdate(``,
                        this.form
                    ).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.title = ''
                            this.form.mobile = ''
                            this.$message.success('新增成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                } else if (this.type === 2) {
                    cmsOnlineServiceUpdate(``, {
                        id: this.id,
                        name: this.form.name,
                        adminId: this.multipleSelection[0].id
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.name = ''
                            this.$message.success('编辑成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                }
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 删除

        // // 点击查看
        goDetails(val) {
            this.$router.push({ name: 'onlineServeListDetail', query: val })
        }
    },
    created() {
        this.getData()
        this.getAccountList()
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
    .els
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        display inline-block
        width 100px
        vertical-align: middle
    .onlineServeList
        .conn
            padding 20px 14px
            background #fff
            .header
                background #ffffff
                .btn
                    background #222222
                    color #fff
                    margin 10px
        .tableBox
            padding 0 20px
</style>
