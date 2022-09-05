<template>
    <div class="userData">
       <div>
           <!-- <div class="searchBox">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="昵称">
                        <el-input class="search" v-model="formInline.nickname" placeholder="请输入昵称" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input class="search" v-model="formInline.tel" placeholder="请输入手机号" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input class="search" v-model="formInline.tel" placeholder="请输入标签" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="type">
                        <el-select v-model="formInline.type" placeholder="请选择" style="width: 150px">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="免费" value="1"></el-option>
                            <el-option label="付费" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间" prop="dateValue">
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
                    </el-form-item>
                    <el-form-item>
                        <el-button class="searchBtn" @click="search">搜索</el-button>
                        <el-button class="restBtn" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
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
                        prop="mobile"
                        align="center"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0">可用</span>
                            <span v-if="scope.row.status == 1">禁用</span>
                            <span v-if="scope.row.status == 2">注销</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        width="200"
                        align="center"
                        label="购买时间">
                    </el-table-column>
                    <el-table-column
                        prop="lastLoginTime"
                        align="center"
                        label="最近登录时间">
                    </el-table-column>
                    <!-- <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" @click="godeta({ id: scope.row.id })">查看浏览轨迹</span>
                            <span v-if="scope.row.status == 0" class="color margin" style="color: #FE093C" @click="stopLogin(scope.row.id, 1)">禁止登录</span>
                            <span v-if="scope.row.status == 1" class="color margin" style="color: #1890ff" @click="stopLogin(scope.row.id, 0)">启用登录</span>
                        </template>
                    </el-table-column> -->
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
import { courseUserList } from 'api/index.js'

export default {
    name: 'userData',
    components: {},
    data() {
        return {
            formInline: {
                nickname: undefined,
                tel: undefined
            },
            id: '',
            tableData: [],
            pageSize: 10,
            pageNum: 1,
            total: 10
        }
    },
    computed: {},
    watch: {},
    methods: {

        // 获取数据
        getData() {
            // let name = this.formInline.nickname
            // let tel = this.formInline.tel
            courseUserList(``, {
                id: this.id,
                pageSize: this.pageSize,
                pageNum: this.pageNum
                // mobile: tel,
                // nickname: name
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        // // 搜索
        // search() {
        //     this.getData()
        // },
        // reset() {
        //     this.formInline.nickname = undefined
        //     this.formInline.tel = undefined
        //     this.getData()
        // },
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
        this.id = this.$route.query.id
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
            padding 30px 80px
            background #ffffff
</style>
