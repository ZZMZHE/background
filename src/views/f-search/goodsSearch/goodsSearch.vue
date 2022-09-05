<template>
    <div class="findSearch">
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
                        prop="keyword"
                        align="center"
                        label="搜索标签名称">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="update({keyword:scope.row.keyword, id: scope.row.id, type: 2})">编辑</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="标签名称" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
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
import { cmsKeywordGoodsList, cmsKeywordGoodsAdd, cmsKeywordGoodsDel } from 'api/index.js'
export default {
    name: 'findSearch',
    components: {},
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                name: ''
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
            cmsKeywordGoodsList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
        },
        // 添加标签
        add(t) {
            if (this.tableData.length >= 10) {
                return this.$message.error('最多添加10个搜索词！')
            }
            this.title = '新增'
            this.form.name = ''
            this.type = t.type
            this.dialogFormVisible = true
        },
        // 编辑标签
        update(t) {
            this.title = '编辑'
            this.type = t.type
            this.id = t.id
            this.form.name = t.keyword
            this.dialogFormVisible = true
        },
        // 新增或编辑
        addOrUpdate() {
            if (this.form.name === '' || this.form.name === undefined) {
                return this.$message.error('请输入标签名称')
            }
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    cmsKeywordGoodsAdd(``, {
                        keyword: this.form.name
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
                    cmsKeywordGoodsAdd(``, {
                        id: this.id,
                        keyword: this.form.name
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
            this.$confirm('此操作将删除该关键字, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cmsKeywordGoodsDel(``, {
                    id: val.id
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
        // 点击查看
        goDetails(val) {
            this.$router.push({ name: 'educationBottomBannerDetails', query: val })
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
    .findSearch
        .conn
            padding 20px 14px
            .header
                background #ffffff
                .btn
                    background #222222
                    color #fff
                    margin 10px
</style>
