<template>
    <div class="roleList">
        <div class="conn">
            <div class="header">
                <el-button size="small" @click="add({type: 1})" class="btn">添加角色</el-button>
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
                        label="角色名称">
                    </el-table-column>
                    <el-table-column
                        prop="depict"
                        show-overflow-tooltip
                        align="center"
                        label="描述">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" @click="update({ name: scope.row.name, depict: scope.row.depict, id: scope.row.id, type: 2})">编辑</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                            <span class="color margin" @click="openPerDia({id: scope.row.id, name: scope.row.name, depict: scope.row.depict})">授权</span>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名称" prop="name" :required="true">
          <el-input v-model="dataForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="说明" prop="depict" :required="true">
          <el-input v-model="dataForm.depict" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 权限配置对话框 -->
    <el-dialog :visible.sync="permissionDialogFormVisible" title="权限配置" width="30%">
      <el-tree
        ref="tree"
        :data="permissionList"
        :default-checked-keys="assignedPermissions"
        show-checkbox
        node-key="id"
        highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.label }}</span>
          <!-- <el-tag v-if="data.api" type="success" size="mini">{{ data.api }}</el-tag> -->
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePermission">确定</el-button>
      </div>
    </el-dialog>

    </div>
</template>

<script>
import { roleList, roleAdd, roleInfo, roleDel, roleUpdatePermission } from 'api/index.js'
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
            roleList(``, {
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
            this.dataForm.name = ''
            this.dataForm.depict = ''
            this.type = t.type
            this.dialogFormVisible = true
        },
        // 编辑标签
        update(t) {
            this.title = '编辑'
            this.type = t.type
            this.dataForm.id = t.id
            this.dataForm.name = t.name
            this.dataForm.depict = t.depict
            this.dialogFormVisible = true
        },
        // 新增或编辑
        updateData() {
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    roleAdd(``, {
                        name: this.dataForm.name,
                        depict: this.dataForm.depict
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.dataForm.name = ''
                            this.dataForm.depict = ''
                            this.$message.success('新增成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                } else if (this.type === 2) {
                    roleAdd(``, {
                        id: this.dataForm.id,
                        name: this.dataForm.name,
                        depict: this.dataForm.depict
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.dataForm.name = ''
                            this.dataForm.depict = ''
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
            this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                roleDel(``, {
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
        // 打开权限列表
        openPerDia(val) {
            this.assignedPermissions = []
            roleInfo(``, {
                id: val.id
            }).then(res => {
                if (res.status === 200) {
                    this.permissionList = res.data
                    this.permissionList = this.permissionList.map(ele => {
                        return {
                            label: ele.name,
                            id: ele.id,
                            children: ele.child,
                            checked: ele.checked
                        }
                    })
                    this.permissionList.forEach(ele => {
                        if (ele.children) {
                            ele.children = ele.children.map(item => {
                                return {
                                    label: item.name,
                                    id: item.id,
                                    children: item.child,
                                    checked: item.checked
                                }
                            })

                            ele.children.forEach(i => {
                                if (i.children) {
                                    i.children = i.children.map(e => {
                                        return {
                                            label: e.name,
                                            id: e.id,
                                            checked: e.checked
                                        }
                                    })
                                    i.children.forEach(l => {
                                        if (l.checked === 0) {
                                            this.assignedPermissions.push(l.id)
                                        }
                                    })
                                }
                                if (i.checked === 0) {
                                    this.assignedPermissions.push(i.id)
                                }
                            })
                            if (ele.checked === 0) {
                                this.assignedPermissions.push(ele.id)
                            }
                        }
                    })
                }
            })
            this.permissionDialogFormVisible = true
            this.id = val.id
            this.name = val.name
            this.depict = val.depict
        },
        // 修改权限
        updatePermission() {
            roleUpdatePermission(``, {
                id: this.id,
                permissionIds: this.$refs.tree.getCheckedKeys(true)
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('编辑成功')
                    this.permissionDialogFormVisible = false
                    this.getData()
                }
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
            this.$router.push({ name: 'shopCateDetails', query: val })
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
