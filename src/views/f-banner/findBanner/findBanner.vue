<template>
    <div class="findBanner">
        <div class="conn">
            <div class="header">
                <el-button size="small" @click="goDetails({ type: 1 })" class="btn">新增</el-button>
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
                        prop="title"
                        align="center"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="sort"
                        align="center"
                        label="排序">
                    </el-table-column>
                    <el-table-column
                        label="banner图"
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
                        prop="addTime"
                        align="center"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goDetails({ type: 2, id: scope.row.id })">编辑</span>
                            <span class="color margin" @click="del({ id: scope.row.id })">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { cmsBannerDiscoverHeadList, cmsBannerDiscoverHeadDel } from 'api/index.js'
export default {
    name: 'findBanner',
    components: {},
    data() {
        return {
            tableData: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            cmsBannerDiscoverHeadList().then(res => {
                if (res.status === 200) {
                    this.tableData = res.data
                }
            })
        },
        // 删除banner
        del(val) {
            this.$confirm('此操作将删除该banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cmsBannerDiscoverHeadDel(``, {
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
        // 点击查看
        goDetails(val) {
            if (val.type === 1 && this.tableData.length >= 5) {
                return this.$message.error('发现banner最多五张！')
            }
            this.$router.push({ name: 'findBannerDetails', query: val })
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
    .findBanner
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
