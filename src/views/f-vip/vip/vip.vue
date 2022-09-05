<template>
    <div class="vip">
        <div class="conn">
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <el-table-column
                        label="套餐名称"
                        show-overflow-tooltip
                        align="center">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        label="最后修改时间"
                        
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" style="color: #1890ff" @click="openDia(scope.row)">编辑</span>
                            <span class="color" style="color: #7F0319;margin-left: 10px" @click="goDetails({ id: scope.row.id })">查看</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="套餐名称" label-width="90px" :required="true">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="价格" label-width="90px" :required="true">
                    <el-input-number placeholder="请输入" v-model="form.price" controls-position="right" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="排序" label-width="90px" :required="true">
                    <el-input-number v-model="form.sortOrder" placeholder="请输入" controls-position="right" :min="1" :max="3"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateVip">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { eduVipList, eduVipUpdate } from 'api/index.js'

export default {
    name: 'vip',
    components: {},
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                id: undefined,
                name: undefined,
                price: undefined,
                sortOrder: undefined
            }
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            eduVipList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
        },
        openDia(val) {
            this.form.id = val.id
            this.form.name = val.name
            this.form.price = val.price
            this.form.sortOrder = val.sortOrder
            // this.dialogFormVisible = true
            this.$router.push('./edipVip');
        },
        // 编辑会员信息
        updateVip() {
            eduVipUpdate(``, this.form).then(res => {
                if (res.status === 200) {
                    this.getData()
                    this.dialogFormVisible = false
                    this.$message.success('编辑成功')
                }
            })
        },
        goDetails(val) {
            this.$router.push({ name: 'vipCourseList', query: val })
        }
    },
    created() {
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
    .vip
        .conn
            padding 20px 14px
            .tableBox
                padding 20px 50px
                background #ffffff
</style>
