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
                            <el-option label="启用" value="0"></el-option>
                            <el-option label="禁止登录" value="1"></el-option>
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
                        <el-button class="searchBtn" @click="$router.go(-1)">返回</el-button>
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
                        label="最近登录时间">
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" style="color: #1890ff">已启用</span>
                            <span v-if="scope.row.status == 1" style="color: #FE093C">已禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="240"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="color" @click="openDia({ id: scope.row.id })">添加</span>
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
        <el-dialog title="添加学员" :visible.sync="dialogFormVisible" width="500px">
            <el-form>
                <el-form-item label="过期时间" :label-width="formLabelWidth" :required="true">
                    <el-date-picker
                        v-model="interiorExpireTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:SS"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserStudent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//
import { userInteriorUserList, userInteriorUpdateInterior } from 'api/index.js'

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
            interiorExpireTime: '',
            dialogFormVisible: false,
            formLabelWidth: '80px',
            id: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        openDia(val) {
            this.id = val.id
            this.dialogFormVisible = true
        },
        addUserStudent() {
            userInteriorUpdateInterior(``, { id: this.id, isInterior: 1, interiorExpireTime: this.interiorExpireTime }).then(res => {
                if (res.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    })
                    this.$router.go(-1)
                }
            })
        },
        // 获取数据
        getData() {
            let name = this.formInline.nickname
            let tel = this.formInline.tel
            if (!this.formInline.dateValue) {
                this.formInline.dateValue = []
            }
            userInteriorUserList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                mobile: tel,
                nickname: name,
                status: this.formInline.status,
                remark: this.formInline.remark,
                addTimeSt: this.formInline.dateValue[0],
                addTimeEd: this.formInline.dateValue[1]
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        godeta(val) {
            this.$router.push({ name: 'userDetails', query: val })
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
