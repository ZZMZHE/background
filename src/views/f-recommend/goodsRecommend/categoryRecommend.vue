<template>
    <div class="categoryRemmend">
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
                        prop="name"
                        align="center"
                        label="类目名称">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id, name: scope.row.name})">查看</span>
                            <span class="color margin" style="color: #7F0319" @click="update({ name: scope.row.name, sortOrder: scope.row.sortOrder, id: scope.row.id, type: 2})">编辑</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :page-size="pageSize"
                        :page-sizes="[10,20,30,50,100]"
                        layout="prev, pager, next, sizes, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="序位" :label-width="formLabelWidth" :required="true">
                    <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="50"></el-input-number>
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
import { mallGoodsRecommendList, mallGoodsRecommendAdd, mallGoodsRecommendDel } from 'api/index.js'
export default {
    name: 'categoryRemmend',
    components: {},
    data() {
        return {
            pageSize: 10,
            pageNum: 1,
            total: 10,
            tableData: [],
            dialogFormVisible: false,
            form: {
                name: '',
                sort: ''
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
            mallGoodsRecommendList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                    if (this.pageNum > 1 && this.tableData.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getData()
                    }
                }
            })
        },
        // 添加标签
        add(t) {
            this.title = '新增'
            this.form.name = ''
            this.form.sort = ''
            this.type = t.type
            this.dialogFormVisible = true
        },
        // 编辑标签
        update(t) {
            this.title = '编辑'
            this.id = t.id
            this.type = t.type
            this.form.name = t.name
            this.form.sort = t.sortOrder
            this.dialogFormVisible = true
        },
        // 新增或编辑
        addOrUpdate() {
            if (this.form.name === '' || this.form.name === undefined) {
                return this.$message.error('请输入类目名称')
            }
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    mallGoodsRecommendAdd(``, {
                        sortOrder: this.form.sort,
                        name: this.form.name
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.name = ''
                            this.$message.success('新增成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                } else if (this.type === 2) {
                    mallGoodsRecommendAdd(``, {
                        id: this.id,
                        sortOrder: this.form.sort,
                        name: this.form.name
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
        del(val) {
            this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                mallGoodsRecommendDel(``, {
                    id: val.id,
                    type: 2
                }).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 页数
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
        },
        // 点击查看
        goDetails(val) {
            this.$router.push({ name: 'goodsRecommend', query: val })
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
    .els
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        display inline-block
        width 100px
        vertical-align: middle
    .categoryRemmend
        .conn
            padding 20px 14px
            .header
                background #ffffff
                .btn
                    background #222222
                    color #fff
                    margin 10px
</style>
