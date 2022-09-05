<template>
    <div class="userData">
       <div>
           <div class="searchBox">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="昵称">
                        <el-input class="search" v-model="formInline.nickname" placeholder="请输入昵称" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input class="search" v-model="formInline.tel" placeholder="请输入手机号" style="width: 180px"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="备注">
                        <el-input class="search" v-model="formInline.remark" placeholder="请输入备注" style="width: 180px"></el-input>
                    </el-form-item> -->
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择" style="width: 150px">
                            <!-- //1 免费 2 收费 为空全部 -->
                            <el-option label="已启用" value="0"></el-option>
                            <el-option label="已禁用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="注册时间" prop="dateValue">
                        <el-date-picker
                            v-model="formInline.dateValue"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            range-separator="~"
                            class="infoDate"
                            :default-time="['00:00:00', '23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button class="searchBtn" @click="search">搜索</el-button>
                        <el-button class="restBtn" @click="reset">重置</el-button>
                        <el-button class="searchBtn" @click="addStudent">添加学员</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column
                        prop="sort"
                        align="center"
                        width="100"
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
                        label="昵称">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="countMoney"
                        align="center"
                        width="180"
                        label="累计消费">
                        <template slot-scope="scope">
                            <span>{{ '￥' + scope.row.rechargeNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        width="200"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" style="color: #1890ff">已启用</span>
                            <span v-if="scope.row.status == 1" style="color: #FE093C">已禁用</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="remark"
                        align="center"
                        show-overflow-tooltip
                        label="备注">
                        <template slot-scope="scope">
                            <span>{{ scope.row.remark || '--' }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        align="center"
                        width="240"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" @click="godeta({ id: scope.row.id, type: 1 })">查看浏览轨迹</span>
                            <span class="color margin" @click="godeta({ id: scope.row.id, type: 3 })">查看课程</span>
                            <br/>
                            <span class="color" @click="godeta({ id: scope.row.id, type: 2 })">添加课程</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">移除</span>
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
</template>

<script>
//
import { userInteriorList, userInteriorUpdateInterior } from 'api/index.js'

export default {
    name: 'userData',
    components: {},
    data() {
        return {
            formInline: {
                nickname: undefined,
                tel: undefined,
                dateValue: [],
                status: undefined,
                remark: undefined
            },
            tableData: [],
            pageSize: 10,
            pageNum: 1,
            total: 10,
            dialogFormVisible: false,
            form: {
                remark: ''
            },
            formLabelWidth: '80px',
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 添加学员
        addStudent() {
            this.$router.push({ name: 'lineUserList' })
        },
        del(val) {
            this.$confirm(`是否将此用户移除？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userInteriorUpdateInterior(``, { id: val.id, isInterior: 0 }).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
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
        // 获取数据
        getData() {
            let name = this.formInline.nickname
            let tel = this.formInline.tel
            // if (!this.formInline.dateValue) {
            //     this.formInline.dateValue = []
            // }
            userInteriorList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                mobile: tel,
                nickname: name,
                status: this.formInline.status
                // remark: this.formInline.remark,
                // addTimeSt: this.formInline.dateValue[0],
                // addTimeEd: this.formInline.dateValue[1]
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        godeta(val) {
            this.$router.push({ name: 'lineCourse', query: val })
        },
        // 搜索
        search() {
            this.pageNum = 1
            this.getData()
        },
        reset() {
            this.formInline.nickname = undefined
            this.formInline.tel = undefined
            this.formInline.dateValue = []
            this.formInline.status = undefined
            this.formInline.remark = undefined
            this.pageSize = 10
            this.pageNum = 1
            this.getData()
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
    .paging
        text-align center
        padding 20px 0
        background #ffffff
    .color
        color #7F0319
        cursor pointer
    .margin
        margin-left 10px
    .userData
        width 100%
        .searchBox
            height 140px
            background #ffffff
            padding-left 80px
            // text-align center
            .demo-form-inline
                padding-top 54px
                .search
                    width 346px
                .searchBtn
                    background #222222
                    color #fff
        .tableBox
            padding 0 80px
            background #ffffff
</style>
