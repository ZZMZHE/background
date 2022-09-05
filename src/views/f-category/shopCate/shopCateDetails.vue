<template>
    <div class="shopCateDetails">
        <div class="conn">
            <div class="header">
                <el-button size="small" @click="add({type: 1})" class="btn">新增</el-button>
                <el-button size="small" @click="goback"  plain class="back">返回上一页</el-button>
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
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="sort"
                        align="center"
                        label="logo">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.imgUrl"
                                fit="cover">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="update({ imgUrl: scope.row.imgUrl, name: scope.row.name, englishName: scope.row.englishName, id: scope.row.id, type: 2})">编辑</span>
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
                <el-form-item label="名称" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="logo" :label-width="formLabelWidth" :required="true">
                        <el-upload
                            ref="clear"
                            accept="image/*"
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
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
import { mallGoodsCategoryList, mallGoodsCategorySonAdd, mallGoodsCategoryDel } from 'api/index.js'
export default {
    name: 'shopCateDetails',
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
                imgUrl: ''
            },
            title: '',
            formLabelWidth: '90px',
            type: '',
            id: '',
            fId: '',
            f: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '24'
        }
    },
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            mallGoodsCategoryList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                id: this.fId
            }).then(res => {
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
            this.form.imgUrl = ''
            this.type = t.type
            this.dialogFormVisible = true
        },
        // 编辑标签
        update(t) {
            this.title = '编辑'
            this.type = t.type
            this.id = t.id
            this.form.name = t.name
            this.form.imgUrl = t.imgUrl
            this.dialogFormVisible = true
        },
        // 新增或编辑
        addOrUpdate() {
            if (this.form.name === '' || this.form.name === undefined) {
                return this.$message.error('请输入名称')
            } else if (this.form.imgUrl === '' || this.form.imgUrl === undefined) {
                return this.$message.error('请上传logo')
            }
            if (!this.f) {
                this.f = true
                if (this.type === 1) { // 新增
                    mallGoodsCategorySonAdd(``, {
                        name: this.form.name,
                        status: 1,
                        imgUrl: this.form.imgUrl,
                        sortOrder: 1,
                        pid: this.fId
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.name = ''
                            this.form.imgUrl = ''
                            this.$message.success('新增成功')
                            this.dialogFormVisible = false
                            this.getData()
                        }
                    })
                } else if (this.type === 2) {
                    mallGoodsCategorySonAdd(``, {
                        id: this.id,
                        name: this.form.name,
                        status: 1,
                        imgUrl: this.form.imgUrl,
                        sortOrder: 1,
                        pid: this.fId
                    }).then(res => {
                        if (res.status === 200) {
                            this.type = ''
                            this.form.name = ''
                            this.form.imgUrl = ''
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
                mallGoodsCategoryDel(``, {
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
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data
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
        // 返回上一页
        goback() {
            this.$router.push({ name: 'shopCate' })
        }
    },
    created() {
        this.fId = this.$route.query.id
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    @import '../../../assets/css/upload3.css';
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
    .shopCateDetails
        .conn
            padding 20px 14px
            background #fff
            .header
                background #ffffff
                .btn
                    background #222222
                    color #fff
                    margin 10px
                .back
                    float right
                    margin 10px 41px 10px 10px
            .tableBox
                padding 0 20px
</style>
