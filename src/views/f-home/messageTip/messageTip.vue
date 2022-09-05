<template>
    <div class="messageTip">
        <div class="conn">
            <div class="tab">
                <div class="tabBox" :class="tabIndex == 1 ? 'active' : ''" @click="changeTab(1)">订单变更信息提示</div>
                <div class="tabBox" :class="tabIndex == 2 ? 'active' : ''" @click="changeTab(2)">用户反馈消息提示</div>
                <div class="tabBox" :class="tabIndex == 3 ? 'active' : ''" @click="changeTab(3)">申请成为推手提示</div>
            </div>
        </div>
        <div class="tableBox" v-if="tabIndex == 1">
            <el-table
                :data="tableData1"
                :header-cell-style="{background:'#f5f5f5'}"
                style="width: 100%">
                <el-table-column
                    prop="sort"
                    align="center"
                    label="头像">
                    <template slot-scope="scope">
                       <el-image
                        style="width: 40px; height: 40px"
                        :src="scope.row.imgUrl"
                        fit="cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    align="center"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="order"
                    align="center"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="变更后订单状态">
                    <template slot-scope="scope">
                       <span class="color" v-if="scope.row.status == 0">已发货</span>
                       <span v-if="scope.row.status == 1">已付款</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                       <span class="color" v-if="scope.row.status == 0">请前往处理</span>
                       <span v-if="scope.row.status == 1">已处理</span>
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
        <div class="tableBox" v-if="tabIndex == 2">
            <el-table
                :data="tableData2"
                :header-cell-style="{background:'#f5f5f5'}"
                style="width: 100%">
                <el-table-column
                    prop="sort"
                    align="center"
                    label="头像">
                    <template slot-scope="scope">
                       <el-image
                        style="width: 40px; height: 40px"
                        :src="scope.row.imgUrl"
                        fit="cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    align="center"
                    label="反馈内容">
                </el-table-column>
                <el-table-column
                    prop="order"
                    align="center"
                    label="时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                       <span class="color" v-if="scope.row.status == 0">请前往处理</span>
                       <span v-if="scope.row.status == 1">已处理</span>
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
        <div class="tableBox" v-if="tabIndex == 3">
            <el-table
                :data="tableData3"
                :header-cell-style="{background:'#f5f5f5'}"
                style="width: 100%">
                <el-table-column
                    prop="sort"
                    align="center"
                    label="头像">
                    <template slot-scope="scope">
                       <el-image
                        style="width: 40px; height: 40px"
                        :src="scope.row.imgUrl"
                        fit="cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="order"
                    align="center"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                       <span class="color" v-if="scope.row.status == 0">请前往处理</span>
                       <span v-if="scope.row.status == 1">已处理</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging">
                <el-pagination
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    background
                    :page-size="pageSize3"
                    :page-sizes="[10,20,30,50,100]"
                    layout="prev, pager, next, sizes, jumper"
                    :total="total3">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'messageTip',
    components: {},
    data() {
        return {
            tabIndex: 1,
            tableData1: [
                {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }
            ],
            pageSize1: 10,
            pageNum1: 1,
            total1: 10,
            tableData2: [
                {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人2',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }
            ],
            pageSize2: 10,
            pageNum2: 1,
            total2: 10,
            tableData3: [
                {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人3',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 0
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }, {
                    imgUrl: require('../../../assets/images/dou.png'),
                    name: '某人',
                    tel: '13578946511',
                    order: '123456789987654321',
                    status: 1
                }
            ],
            pageSize3: 10,
            pageNum3: 1,
            total3: 10
        }
    },
    computed: {},
    watch: {},
    methods: {
        // tab切换
        changeTab(t) {
            this.tabIndex = t
        },
        // 每页几条
        handleSizeChange1(val) {
            this.pageSize1 = val
        },
        // 前往第几页
        handleCurrentChange1(val) {
            this.pageNum1 = val
        },
        // 每页几条
        handleSizeChange2(val) {
            this.pageSize2 = val
        },
        // 前往第几页
        handleCurrentChange2(val) {
            this.pageNum2 = val
        },
        // 每页几条
        handleSizeChange3(val) {
            this.pageSize3 = val
        },
        // 前往第几页
        handleCurrentChange3(val) {
            this.pageNum3 = val
        }
    },
    created() {}
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .paging
        text-align center
        padding 20px 0
    .color
        color #7F0319
    .messageTip
        width 100%
        height 100%
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .tab
                width 100%;
                height 40px
                margin-left 20px
                padding 20px 0 40px 0
                .tabBox
                    width 140px
                    height 36px
                    background #C3C3C3
                    color #9E9DA4
                    font-size 14px
                    line-height 36px
                    text-align center
                    float left
                    margin-left 20px
                    cursor pointer
                .active
                    color #FFFFFF
                    background #222222
        .tableBox
            padding 0 20px

</style>
