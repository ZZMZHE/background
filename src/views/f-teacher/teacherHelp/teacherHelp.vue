<template>
    <div class="teacherHelp">
        <div class="conn">
            <div class="fenge" key="1">
                <div class="searchBox">
                    <el-form :inline="true" ref="teacher" :model="formInline" class="demo-form-inline" size="small">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input class="search" v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="tel">
                            <el-input class="search" v-model="formInline.tel" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="search">搜索</el-button>
                            <el-button class="restBtn" @click="onReset">重置</el-button>
                            <el-button class="searchBtn" @click="goAddTeacher({ type: 1 })">添加助教老师</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        border
                        :data="tableData"
                        :header-cell-style="{background:'#f5f5f5'}"
                        style="width: 100%">
                        <el-table-column
                            prop="sort"
                            align="center"
                            label="头像">
                            <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.faceUrl"
                                fit="cover">
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="nickname"
                            align="center"
                            label="名字">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="wxNumber"
                            align="center"
                            label="微信号">
                        </el-table-column>
                        <el-table-column
                            prop="courseCount"
                            align="center"
                            label="课程数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 1 })">查看详情</span>
                                <span class="colorBlue margin" @click="goAddTeacher({ type: 2, id: scope.row.id })">编辑</span>
                                <span class="colorBlue margin" @click="del({ id: scope.row.id })">删除</span>
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
        </div>
    </div>
</template>

<script>
import { eduTeacherAssistList, eduTeacherAssistDel } from 'api/index.js'
export default {
    name: 'teacherHelp',
    components: {},
    data() {
        return {
            formInline: {
                nickname: undefined,
                tel: undefined
            },
            tableData: [],
            pageSize: 10,
            pageNum: 1,
            total: 10,
            formLabelWidth: '80px'
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取老师列表
        getData() {
            let name = this.formInline.nickname
            let mobile = this.formInline.tel
            eduTeacherAssistList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                name,
                mobile
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
        // 搜索老师
        search() {
            this.pageNum = 1
            this.getData()
        },
        // 重置
        onReset() {
            this.$refs.teacher.resetFields()
            this.pageSize = 10
            this.pageNum = 1
            this.getData()
        },
        del(val) {
            this.$confirm('此操作将删除该助教老师, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                eduTeacherAssistDel(``, {
                    id: val.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功！')
                        this.getData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
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
        // 添加老师页面
        goAddTeacher(val) {
            this.$router.push({ name: 'teacherHelpAdd', query: val })
        },
        goDetails(val) {
            // if (val.type === 1) {
            this.$router.push({ name: 'aboutTeacherHelp', query: val })
            // } else if (val.type === 2) {
            //     this.$router.push({ name: 'topTeacherDetails', query: val })
            // }
            // this.$router.push({ name: 'userDetails' })
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .paging
        text-align center
        padding 20px 0
        background #ffffff
    .color
        color #7F0319
        cursor pointer
    .colorBlue
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .teacherHelp
        width 100%
        .conn
            margin 20px 20px 0 20px
            .tab
                height 40px
                padding 40px 0
                background #ffffff
                .tabBox
                    width 80px
                    height 36px
                    background #C3C3C3
                    color #9E9DA4
                    font-size 16px
                    line-height 36px
                    text-align center
                    float left
                    margin-left 20px
                    cursor pointer
                .active
                    color #FFFFFF
                    background #222222
        .searchBox
            height 50px
            padding-top 20px
            background #ffffff
            text-align center
            .demo-form-inline
                // padding-top 54px
                .search
                    width 346px
                .searchBtn
                    background #222222
                    color #fff
        .tableBox
            padding 0 80px
            background #ffffff
</style>
