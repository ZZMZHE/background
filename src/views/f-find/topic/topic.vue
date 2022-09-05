<template>
    <div class="roleList">
        <div class="conn">
            <div class="header">
                <el-button size="small" @click="add({type: 1})" class="btn">新增话题</el-button>
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
                        label="话题名称">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        show-overflow-tooltip
                        align="center"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color margin" @click="add({ name: scope.row.name, id: scope.row.id, type: 2 })">编辑</span>
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

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
            <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="话题名称" prop="name" :required="true">
                    <el-input v-model="dataForm.name" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { coilDiscussList, coilDiscussAdd, coilDiscussDel } from 'api/index.js'
export default {
    name: 'roleList',
    components: {},
    data() {
        return {
            dialogFormVisible: false,
            dataForm: {
                id: undefined,
                name: undefined,
                depict: undefined
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ]
            },
            permissionDialogFormVisible: false,
            systemPermissions: null,
            assignedPermissions: [],
            pageSize: 10,
            pageNum: 1,
            total: 10,
            tableData: [],
            permissionList: [],
            title: '',
            type: '',
            id: '',
            name: '',
            depict: '',
            f: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            coilDiscussList(``, {
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
        add(val) {
            if (val.type === 1) {
                this.title = '新增话题'
                this.dataForm.name = ''
                this.type = val.type
                this.dialogFormVisible = true
            } else if (val.type === 2) {
                this.title = '编辑话题'
                this.id = val.id
                this.dataForm.name = val.name
                this.type = val.type
                this.dialogFormVisible = true
            }
        },
        // 新增或编辑
        updateData() {
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    coilDiscussAdd(``, {
                        name: this.dataForm.name,
                        sortOrder: 50
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.dataForm.name = ''
                            this.$message.success('新增成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                } else {
                    coilDiscussAdd(``, {
                        name: this.dataForm.name,
                        id: this.id,
                        sortOrder: 50
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.dataForm.name = ''
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
            this.$confirm('此操作将删除该话题, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                coilDiscussDel(``, {
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
        // 页数
        handleSizeChange(val) {
            this.pageSize = val
            this.getData()
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
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
    .roleList
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
