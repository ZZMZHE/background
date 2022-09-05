<template>
    <div class="teacherList">
        <div class="conn">
            <div class="tab">
                <div class="tabBox" :class="tabIndex == 1 ? 'active' : ''" @click="changeTab(1)">普通</div>
                <div class="tabBox" :class="tabIndex == 2 ? 'active' : ''" @click="changeTab(2)">名师</div>
            </div>
            <div class="fenge" v-if="tabIndex == 1" key="1">
                <div class="searchBox">
                    <el-form :inline="true" ref="teacher1" :model="formInline" class="demo-form-inline" size="small">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input class="search" v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="tel">
                            <el-input class="search" v-model="formInline.tel" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="search">搜索</el-button>
                            <el-button class="restBtn" @click="onReset">重置</el-button>
                            <el-button class="searchBtn" @click="goAddTeacher({ type: 1, tabIndex: tabIndex })">添加老师</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="tableData1"
                        border
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
                        <!-- <el-table-column
                            prop="courseCount"
                            align="center"
                            label="课程数">
                        </el-table-column>
                        <el-table-column
                            prop="coursePrice"
                            align="center"
                            label="课程销售额">
                            <template slot-scope="scope">
                                <span>{{ '￥' + scope.row.coursePrice }}</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 1 })">查看详情</span>
                                <span class="colorBlue margin" @click="goAddTeacher({ type: 2, id: scope.row.id, tabIndex: tabIndex })">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            background
                            :page-size="pageSize1"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total1">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="fenge" v-if="tabIndex == 2" key="2">
                <div class="searchBox">
                    <el-form :inline="true" :model="formInline1" ref="teacher2" class="demo-form-inline" size="small">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input class="search" v-model="formInline1.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="tel">
                            <el-input class="search" v-model="formInline1.tel" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="searchBtn" @click="search">搜索</el-button>
                            <el-button class="restBtn" @click="onReset">重置</el-button>
                            <el-button class="searchBtn" @click="goAddTeacher({ type: 3, tabIndex: tabIndex })">添加名师</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tableBox" v-if="tabIndex == 2">
                    <el-table
                        :data="tableData2"
                        border
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
                            prop="courseCount"
                            align="center"
                            label="课程数">
                        </el-table-column>
                        <el-table-column
                            prop="countMoney"
                            align="center"
                            label="课程销售额">
                            <template slot-scope="scope">
                                <span>{{ '￥' + scope.row.coursePrice }}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="hot"
                            align="center"
                            label="人气">
                        </el-table-column> -->
                        <el-table-column
                            prop="fansCount"
                            align="center"
                            label="粉丝">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="color" @click="goDetails({ id: scope.row.id, type: 2 })" >查看详情</span>
                                <span class="colorBlue margin" @click="goAddTeacher({ type: 4, id: scope.row.id, tabIndex: tabIndex })">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            background
                            :page-size="pageSize2"
                            :page-sizes="[10,20,30,50,100]"
                            layout="prev, pager, next, sizes, jumper"
                            :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- <el-dialog title="账号分配" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.acount" placeholder="请输入"></el-input>
                </el-form-item>
                 <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog> -->
        <!-- <el-dialog title="账号分配" :visible.sync="dialogFormVisible1" width="30%">
            <el-form :model="form1">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.acount" placeholder="请输入"></el-input>
                </el-form-item>
                 <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import { teacherList } from 'api/index.js'
export default {
    name: 'teacherList',
    components: {},
    data() {
        return {
            // form: {
            //     acount: undefined,
            //     password: undefined
            // },
            // dialogFormVisible: false,
            // form1: {
            //     acount: undefined,
            //     password: undefined
            // },
            // dialogFormVisible1: false,
            tabIndex: 1,
            formInline: {
                nickname: undefined,
                tel: undefined
            },
            formInline1: {
                nickname: undefined,
                tel: undefined
            },
            tableData1: [],
            pageSize1: 10,
            pageNum1: 1,
            total1: 10,
            tableData2: [],
            pageSize2: 10,
            pageNum2: 1,
            total2: 10,
            formLabelWidth: '80px'
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取老师列表
        getData() {
            if (parseInt(this.tabIndex) === 1) {
                let name = this.formInline.nickname
                let mobile = this.formInline.tel
                teacherList(``, {
                    pageSize: this.pageSize1,
                    pageNum: this.pageNum1,
                    type: 1,
                    name,
                    mobile
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData1 = res.data.rows
                        this.total1 = res.data.total
                        if (this.pageNum1 > 1 && this.tableData1.length < 1) {
                            this.pageNum1 = this.pageNum1 - 1
                            this.getData()
                        }
                    }
                })
            } else if (parseInt(this.tabIndex) === 2) {
                let name = this.formInline1.nickname
                let mobile = this.formInline1.tel
                teacherList(``, {
                    pageSize: this.pageSize2,
                    pageNum: this.pageNum2,
                    type: 2,
                    name,
                    mobile
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData2 = res.data.rows
                        this.total2 = res.data.total
                        if (this.pageNum2 > 1 && this.tableData2.length < 1) {
                            this.pageNum2 = this.pageNum2 - 1
                            this.getData()
                        }
                    }
                })
            }
        },
        // 搜索老师
        search() {
            this.getData()
        },
        // 重置
        onReset() {
            if (parseInt(this.tabIndex) === 1) {
                this.pageNum1 = 1
                this.pageSize1 = 10
                this.$refs.teacher1.resetFields()
                this.getData()
            } else if (parseInt(this.tabIndex) === 2) {
                this.pageNum2 = 1
                this.pageSize2 = 10
                this.$refs.teacher2.resetFields()
                this.getData()
            }
        },
        // tab切换
        changeTab(t) {
            this.tabIndex = t
            this.pageNum1 = 1
            this.pageNum2 = 1
            this.formInline = {}
            this.formInline1 = {}
            this.$router.push({ name: 'teacherList', query: { tabIndex: t } })
            this.getData()
        },
        // 页数
        handleSizeChange1(val) {
            this.pageSize1 = val
            this.getData()
        },
        // 页码
        handleCurrentChange1(val) {
            this.pageNum1 = val
            this.getData()
        },
        // 页数
        handleSizeChange2(val) {
            this.pageSize2 = val
            this.getData()
        },
        // 页码
        handleCurrentChange2(val) {
            this.pageNum2 = val
            this.getData()
        },
        // 添加老师页面
        goAddTeacher(val) {
            this.$router.push({ name: 'addTeacher', query: val })
        },
        goDetails(val) {
            // if (val.type === 1) {
            this.$router.push({ name: 'teacherAboutCourse', query: val })
            // } else if (val.type === 2) {
            //     this.$router.push({ name: 'topTeacherDetails', query: val })
            // }
            // this.$router.push({ name: 'userDetails' })
        }
    },
    created() {
        if (this.$route.query.tabIndex) {
            this.tabIndex = this.$route.query.tabIndex
        } else {
            this.tabIndex = 1
        }
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
    .teacherList
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
            height 70px
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
