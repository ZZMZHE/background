<template>
    <div class="serveList">
        <div class="conn">
            <div class="header">
                <el-button size="small" @click="add({type: 1})" class="btn">新增</el-button>
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="title"
                        align="center"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <!-- <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id})">查看</span> -->
                            <span class="color margin" style="color: #7F0319" @click="update({ title: scope.row.title, id: scope.row.id, mobile: scope.row.mobile, type: 2})">编辑</span>
                            <!-- <span class="color margin" @click="del({ id: scope.row.id })">删除</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="form.title" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="form.mobile" placeholder="请输入"></el-input>
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
import { cmsHandleList, cmsHandleAdd } from 'api/index.js'
export default {
    name: 'serveList',
    components: {},
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                title: '',
                mobile: ''
            },
            title: '',
            formLabelWidth: '90px',
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
            cmsHandleList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
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
            this.form.title = t.title
            this.form.mobile = t.mobile
            this.dialogFormVisible = true
        },
        // 新增或编辑
        addOrUpdate() {
            if (this.form.title === '' || this.form.title === undefined) {
                return this.$message.error('请输入分类名称')
            }
            if (this.form.mobile === '' || this.form.mobile === undefined) {
                return this.$message.error('请输入手机号')
            }
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    cmsHandleAdd(``,
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
                    cmsHandleAdd(``, {
                        id: this.id,
                        title: this.form.title,
                        mobile: this.form.mobile
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.title = ''
                            this.form.mobile = ''
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
        }
        // 删除
        // del(val) {
        //     this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         mallGoodsCategoryDel(``, {
        //             id: val.id
        //         }).then(res => {
        //             if (res.status === 200) {
        //                 this.$message({
        //                     type: 'success',
        //                     message: '删除成功!'
        //                 })
        //                 this.getData()
        //             }
        //         })
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         })
        //     })
        // },
        // // 页数
        // handleSizeChange(val) {
        //     this.pageSize = val
        //     this.getData()
        // },
        // // 页码
        // handleCurrentChange(val) {
        //     this.pageNum = val
        //     this.getData()
        // },
        // // 点击查看
        // goDetails(val) {
        //     this.$router.push({ name: 'shopCateDetails', query: val })
        // }
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
    .els
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        display inline-block
        width 100px
        vertical-align: middle
    .serveList
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
