<template>
    <div class="material">
        <div class="conn">
            <!-- <div class="header">
                <el-button size="small" @click="goDetails({ type: 1 })" class="btn">新增</el-button>
            </div> -->
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="message"
                        align="center"
                        label="名称">
                        <!-- <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">公开课</span>
                            <span v-if="scope.row.type == 2">精品课</span>
                            <span v-if="scope.row.type == 3">时尚课程</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        label="素材图"
                        align="center">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.imgUrl"
                                fit="cover">
                                </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        align="center"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="openDia(scope.row)">编辑</span>
                            <!-- <span class="color margin" @click="del({ id: scope.row.id })">删除</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="dialogBox">
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth" :required="true">
                        <el-input v-model="form.name" placeholder="请输入" disabled></el-input>
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
                            <span v-if="type == 4" style="color: red">建议上传326*162尺寸大小的图片</span>
                            <span v-else style="color: red">建议上传153*162尺寸大小的图片</span>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { cmsNavigationSkipList, cmsNavigationSkipAdd } from 'api/index.js'
export default {
    name: 'material',
    components: {},
    data() {
        return {
            tableData: [],
            form: {
                name: '',
                imgUrl: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '90px',
            type: 1
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '35'
        }
    },
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            cmsNavigationSkipList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
        },
        openDia(val) {
            this.dialogFormVisible = true
            this.type = val.type
            this.form.name = val.message
            // if (val.type === 1) {
            //     this.form.name = val.name
            // } else if (val.type === 2) {
            //     this.form.name = '精品课'
            // } else if (val.type === 3) {
            //     this.form.name = '时尚课程'
            // }
            this.form.imgUrl = val.imgUrl
        },
        update() {
            if (this.form.imgUrl === '' || this.form.imgUrl === undefined) {
                return this.$message.error('请上传图片')
            }
            cmsNavigationSkipAdd(``, {
                type: this.type,
                imgUrl: this.form.imgUrl
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('修改成功')
                    this.getData()
                    this.dialogFormVisible = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data
        }
    },
    created() {
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
    .material
        .conn
            padding 20px 14px
            background #fff
            .header
                background #ffffff
                .btn
                    background #C3C3C3
                    color #fff
                    margin 10px
            .tableBox
                padding 0 20px
</style>
